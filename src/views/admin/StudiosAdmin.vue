<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-white">Studios</h1>
        <p class="text-gray-500 text-sm mt-1">{{ items.length }} Studios</p>
      </div>
      <button @click="openCreate" class="btn-primary">
        <i class="bi bi-plus-lg mr-1.5"></i> Neues Studio
      </button>
    </div>

    <div class="space-y-3">
      <div
        v-for="item in items"
        :key="item._id"
        class="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-4"
      >
        <img
          v-if="item.titleImg?.url"
          :src="item.titleImg.url"
          class="w-16 h-16 object-cover rounded-lg shrink-0"
        />
        <div v-else class="w-16 h-16 bg-gray-800 rounded-lg shrink-0 flex items-center justify-center">
          <i class="bi bi-camera text-gray-600 text-xl"></i>
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-white font-medium truncate">{{ item.title?.de || item.title?.en }}</div>
          <div class="text-gray-500 text-xs mt-0.5">
            ID: {{ item.id }} · {{ item.images?.length || 0 }} Bilder
          </div>
        </div>
        <div class="flex gap-2 shrink-0">
          <button @click="openEdit(item)" class="btn-icon text-gray-400 hover:text-amber-400">
            <i class="bi bi-pencil"></i>
          </button>
          <button @click="confirmDelete(item)" class="btn-icon text-gray-400 hover:text-red-400">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
      <div v-if="!loading && items.length === 0" class="text-center text-gray-600 py-12">
        Noch keine Studios vorhanden.
      </div>
    </div>

    <AdminModal v-if="showModal" :title="editItem ? 'Studio bearbeiten' : 'Neues Studio'" @close="closeModal">
      <form @submit.prevent="submitForm" class="space-y-4">
        <FormField label="ID" required>
          <input v-model="form.id" type="text" class="input" :disabled="!!editItem" required />
        </FormField>
        <LocaleTextInput label="Titel" v-model="form.title" required placeholder="Studioname" />
        <LocaleTextInput label="Beschreibung" v-model="form.description" multiline placeholder="Beschreibung des Studios" />
        <LocaleTextInput label="Ausstattung" v-model="form.equipment" multiline placeholder="z.B. Canon EOS R5, Ringlight (kommagetrennt)" />
        <FormField label="Titelbild">
          <ImageUpload v-model="form.titleImg" :preview="editItem?.titleImg?.url" />
        </FormField>
        <FormField label="Weitere Bilder">
          <input
            ref="galleryInput"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            class="block w-full text-sm text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-gray-800 file:text-gray-300 file:text-sm hover:file:bg-gray-700 transition-colors cursor-pointer"
            @change="onGalleryChange"
          />
          <p v-if="galleryCompressing" class="mt-1.5 text-xs text-amber-400 flex items-center gap-1.5">
            <i class="bi bi-arrow-clockwise animate-spin"></i> Bilder werden komprimiert…
          </p>
          <p v-else-if="galleryError" class="mt-1.5 text-xs text-green-400 flex items-center gap-1">
            <i class="bi bi-info-circle"></i> {{ galleryError }}
          </p>

          <!-- Bereits gespeicherte Bilder (nur beim Bearbeiten) -->
          <div v-if="currentImages.length" class="mt-3">
            <p class="text-xs text-gray-500 mb-1.5">Gespeichert</p>
            <div class="flex flex-wrap gap-2">
              <div v-for="img in currentImages" :key="img.publicId" class="relative group">
                <img :src="img.url" class="w-16 h-16 object-cover rounded-lg" />
                <button
                  type="button"
                  @click="removeSingleImage(img.publicId)"
                  class="absolute -top-1 -right-1 w-5 h-5 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <i class="bi bi-x text-white text-xs"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Ausstehende neue Bilder (noch nicht hochgeladen) -->
          <div v-if="form.newImages.length" class="mt-3">
            <p class="text-xs text-gray-500 mb-1.5">Neu hinzugefügt ({{ form.newImages.length }})</p>
            <div class="flex flex-wrap gap-2">
              <div v-for="(file, i) in form.newImages" :key="i" class="relative group">
                <img :src="pendingPreviews[i]" class="w-16 h-16 object-cover rounded-lg border border-amber-500/40" />
                <button
                  type="button"
                  @click="removePendingImage(i)"
                  class="absolute -top-1 -right-1 w-5 h-5 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <i class="bi bi-x text-white text-xs"></i>
                </button>
              </div>
            </div>
          </div>
        </FormField>
        <FormError :message="formError" />
        <div class="flex justify-end gap-3 pt-2">
          <button type="button" @click="closeModal" class="btn-secondary">Abbrechen</button>
          <button type="submit" :disabled="saving || galleryCompressing" class="btn-primary">
            {{ saving ? 'Wird gespeichert…' : galleryCompressing ? 'Komprimierung läuft…' : (editItem ? 'Speichern' : 'Erstellen') }}
          </button>
        </div>
      </form>
    </AdminModal>

    <ConfirmDialog
      v-if="deleteTarget"
      :message="`Studio &quot;${deleteTarget.title?.de || deleteTarget.title?.en}&quot; wirklich löschen?`"
      @confirm="deleteItem"
      @cancel="deleteTarget = null"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useApiClient } from '../../composables/useApiClient'
import AdminModal from '../../components/admin/AdminModal.vue'
import FormField from '../../components/admin/FormField.vue'
import FormError from '../../components/admin/FormError.vue'
import ImageUpload from '../../components/admin/ImageUpload.vue'
import ConfirmDialog from '../../components/admin/ConfirmDialog.vue'
import LocaleTextInput from '../../components/admin/LocaleTextInput.vue'
import { compressImage, fmt } from '../../composables/useImageCompressor'

const { apiClient } = useApiClient()

const items = ref<any[]>([])
const loading = ref(true)
const showModal = ref(false)
const editItem = ref<any>(null)
const deleteTarget = ref<any>(null)
const saving = ref(false)
const formError = ref('')
const galleryError = ref('')
const galleryCompressing = ref(false)
const currentImages = ref<{ url: string; publicId: string }[]>([])
// Object-URLs für die Vorschau ausstehender neuer Bilder
const pendingPreviews = ref<string[]>([])
// Ref auf das file-Input-Element, um es nach jeder Auswahl zu resetten
const galleryInput = ref<HTMLInputElement | null>(null)

const MAX_BYTES = 10 * 1024 * 1024

const emptyForm = () => ({
  id: '',
  title: { de: '', en: '' },
  description: { de: '', en: '' },
  equipment: { de: '', en: '' },
  titleImg: null as File | null,
  newImages: [] as File[],
})

const form = ref(emptyForm())

async function load() {
  loading.value = true
  const { data } = await apiClient.get('/api/studios')
  items.value = data
  loading.value = false
}

onMounted(load)

function resetPending() {
  pendingPreviews.value.forEach(url => URL.revokeObjectURL(url))
  pendingPreviews.value = []
  form.value.newImages = []
  galleryError.value = ''
  galleryCompressing.value = false
  if (galleryInput.value) galleryInput.value.value = ''
}

function openCreate() {
  editItem.value = null
  form.value = emptyForm()
  currentImages.value = []
  resetPending()
  formError.value = ''
  showModal.value = true
}

function openEdit(item: any) {
  editItem.value = item
  form.value = {
    id: item.id,
    title: { de: item.title?.de ?? '', en: item.title?.en ?? '' },
    description: { de: item.description?.de ?? '', en: item.description?.en ?? '' },
    equipment: { de: item.equipment?.de ?? '', en: item.equipment?.en ?? '' },
    titleImg: null,
    newImages: [],
  }
  currentImages.value = item.images ? [...item.images] : []
  resetPending()
  formError.value = ''
  showModal.value = true
}

function closeModal() {
  resetPending()
  showModal.value = false
}

function confirmDelete(item: any) { deleteTarget.value = item }

async function onGalleryChange(e: Event) {
  const picked = Array.from((e.target as HTMLInputElement).files || [])
  if (galleryInput.value) galleryInput.value.value = ''
  if (!picked.length) return

  galleryError.value = ''
  galleryCompressing.value = true

  const errors: string[] = []
  for (const file of picked) {
    try {
      const result = await compressImage(file, MAX_BYTES)
      form.value.newImages.push(result.file)
      pendingPreviews.value.push(URL.createObjectURL(result.file))
      if (result.wasCompressed) {
        errors.push(`„${file.name}" komprimiert: ${fmt(result.originalSize)} → ${fmt(result.compressedSize)}`)
      }
    } catch (err: any) {
      errors.push(`„${file.name}": ${err.message ?? 'Fehler'}`)
    }
  }

  galleryCompressing.value = false
  if (errors.length) galleryError.value = errors.join(' · ')
}

function removePendingImage(i: number) {
  URL.revokeObjectURL(pendingPreviews.value[i]!)
  pendingPreviews.value.splice(i, 1)
  form.value.newImages.splice(i, 1)
}

async function removeSingleImage(publicId: string) {
  await apiClient.delete(`/api/studios/${editItem.value.id}/images/${encodeURIComponent(publicId)}`)
  currentImages.value = currentImages.value.filter(i => i.publicId !== publicId)
}

async function deleteItem() {
  await apiClient.delete(`/api/studios/${deleteTarget.value.id}`)
  deleteTarget.value = null
  await load()
}

async function submitForm() {
  saving.value = true
  formError.value = ''
  try {
    const fd = new FormData()
    fd.append('id', form.value.id)
    fd.append('title_de', form.value.title.de)
    fd.append('title_en', form.value.title.en ?? '')
    fd.append('description_de', form.value.description.de ?? '')
    fd.append('description_en', form.value.description.en ?? '')
    fd.append('equipment_de', form.value.equipment.de ?? '')
    fd.append('equipment_en', form.value.equipment.en ?? '')
    if (form.value.titleImg) fd.append('titleImg', form.value.titleImg)
    form.value.newImages.forEach(f => fd.append('images', f))

    if (editItem.value) {
      await apiClient.patch(`/api/studios/${editItem.value.id}`, fd)
    } else {
      await apiClient.post('/api/studios', fd)
    }
    closeModal()
    await load()
  } catch (err: any) {
    formError.value = err.response?.data?.Error || 'Fehler beim Speichern.'
  } finally {
    saving.value = false
  }
}
</script>
