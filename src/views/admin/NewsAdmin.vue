<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-white">News</h1>
        <p class="text-gray-500 text-sm mt-1">{{ items.length }} Einträge</p>
      </div>
      <button @click="openCreate" class="btn-primary">
        <i class="bi bi-plus-lg mr-1.5"></i> Neue News
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
          <i class="bi bi-image text-gray-600"></i>
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-white font-medium truncate">{{ item.title?.de || item.title?.en }}</div>
          <div class="text-gray-500 text-xs mt-0.5">ID: {{ item.id }} · {{ formatDate(item.created) }}</div>
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
        Noch keine News vorhanden.
      </div>
    </div>

    <AdminModal v-if="showModal" :title="editItem ? 'News bearbeiten' : 'Neue News'" @close="closeModal">
      <form @submit.prevent="submitForm" class="space-y-4">
        <FormField label="ID" required>
          <input v-model="form.id" type="text" class="input" :disabled="!!editItem" required />
        </FormField>
        <LocaleTextInput label="Titel" v-model="form.title" required placeholder="Titel" />
        <LocaleTextInput label="Beschreibung" v-model="form.description" required multiline placeholder="Beschreibung" />
        <FormField label="Titelbild">
          <ImageUpload v-model="form.titleImg" :preview="editItem?.titleImg?.url" />
        </FormField>
        <FormError :message="formError" />
        <div class="flex justify-end gap-3 pt-2">
          <button type="button" @click="closeModal" class="btn-secondary">Abbrechen</button>
          <button type="submit" :disabled="saving" class="btn-primary">
            {{ saving ? 'Wird gespeichert…' : (editItem ? 'Speichern' : 'Erstellen') }}
          </button>
        </div>
      </form>
    </AdminModal>

    <ConfirmDialog
      v-if="deleteTarget"
      :message="`News &quot;${deleteTarget.title?.de || deleteTarget.title?.en}&quot; wirklich löschen?`"
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

const { apiClient } = useApiClient()

const items = ref<any[]>([])
const loading = ref(true)
const showModal = ref(false)
const editItem = ref<any>(null)
const deleteTarget = ref<any>(null)
const saving = ref(false)
const formError = ref('')

const emptyForm = () => ({
  id: '',
  title: { de: '', en: '' },
  description: { de: '', en: '' },
  titleImg: null as File | null,
})

const form = ref(emptyForm())

async function load() {
  loading.value = true
  const { data } = await apiClient.get('/api/news')
  items.value = data
  loading.value = false
}

onMounted(load)

function openCreate() {
  editItem.value = null
  form.value = emptyForm()
  formError.value = ''
  showModal.value = true
}

function openEdit(item: any) {
  editItem.value = item
  form.value = {
    id: item.id,
    title: { de: item.title?.de ?? '', en: item.title?.en ?? '' },
    description: { de: item.description?.de ?? '', en: item.description?.en ?? '' },
    titleImg: null,
  }
  formError.value = ''
  showModal.value = true
}

function closeModal() { showModal.value = false }
function confirmDelete(item: any) { deleteTarget.value = item }

async function deleteItem() {
  await apiClient.delete(`/api/news/${deleteTarget.value.id}`)
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
    fd.append('description_de', form.value.description.de)
    fd.append('description_en', form.value.description.en ?? '')
    if (form.value.titleImg) fd.append('titleImg', form.value.titleImg)

    if (editItem.value) {
      await apiClient.patch(`/api/news/${editItem.value.id}`, fd)
    } else {
      await apiClient.post('/api/news', fd)
    }
    closeModal()
    await load()
  } catch (err: any) {
    formError.value = err.response?.data?.Error || 'Fehler beim Speichern.'
  } finally {
    saving.value = false
  }
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('de-AT', { day: '2-digit', month: '2-digit', year: 'numeric' })
}
</script>
