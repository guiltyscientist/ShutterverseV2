<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-white">Team</h1>
        <p class="text-gray-500 text-sm mt-1">{{ items.length }} Mitglieder</p>
      </div>
      <button @click="openCreate" class="btn-primary">
        <i class="bi bi-plus-lg mr-1.5"></i> Neues Mitglied
      </button>
    </div>

    <div class="space-y-3">
      <div
        v-for="item in items"
        :key="item._id"
        class="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-4"
      >
        <img
          v-if="item.profilImg?.url"
          :src="item.profilImg.url"
          class="w-12 h-12 object-cover rounded-full shrink-0"
        />
        <div v-else class="w-12 h-12 bg-gray-800 rounded-full shrink-0 flex items-center justify-center">
          <i class="bi bi-person text-gray-600"></i>
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-white font-medium">{{ item.firstName }} {{ item.lastName }}</div>
          <div class="text-gray-500 text-xs mt-0.5 truncate">
            {{ item.roles?.de?.join(', ') || '–' }}
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
        Noch keine Mitglieder vorhanden.
      </div>
    </div>

    <AdminModal v-if="showModal" :title="editItem ? 'Mitglied bearbeiten' : 'Neues Mitglied'" @close="closeModal">
      <form @submit.prevent="submitForm" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <FormField label="Vorname" required>
            <input v-model="form.firstName" type="text" class="input" required />
          </FormField>
          <FormField label="Nachname" required>
            <input v-model="form.lastName" type="text" class="input" required />
          </FormField>
        </div>
        <FormField label="ID" required>
          <input v-model="form.id" type="text" class="input" :disabled="!!editItem" required />
        </FormField>
        <LocaleTextInput label="Beschreibung" v-model="form.description" multiline placeholder="Kurzbeschreibung" />
        <LocaleRolesInput v-model="form.roles" />
        <FormField label="Social Media">
          <div class="space-y-2 mb-2">
            <div v-for="(sm, i) in form.socialMedia" :key="i" class="flex gap-2 items-center">
              <select v-model="sm.platform" class="input w-36 shrink-0">
                <option value="">Plattform</option>
                <option v-for="p in platforms" :key="p" :value="p">{{ p }}</option>
              </select>
              <input v-model="sm.url" type="url" class="input flex-1" placeholder="URL" />
              <button type="button" @click="removeSocialMedia(i)" class="btn-icon text-gray-500 hover:text-red-400">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
          </div>
          <button type="button" @click="addSocialMedia" class="btn-secondary text-sm">
            <i class="bi bi-plus mr-1"></i> Eintrag hinzufügen
          </button>
        </FormField>
        <FormField label="Profilbild">
          <ImageUpload v-model="form.profilImg" :preview="editItem?.profilImg?.url" />
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
      :message="`Mitglied &quot;${deleteTarget.firstName} ${deleteTarget.lastName}&quot; wirklich löschen?`"
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
import LocaleRolesInput from '../../components/admin/LocaleRolesInput.vue'

const { apiClient } = useApiClient()

const items = ref<any[]>([])
const loading = ref(true)
const showModal = ref(false)
const editItem = ref<any>(null)
const deleteTarget = ref<any>(null)
const saving = ref(false)
const formError = ref('')

const platforms = ['LinkedIn', 'Instagram', 'Twitter', 'GitHub', 'Facebook', 'YouTube', 'Website', 'Behance', 'Dribbble']

const emptyForm = () => ({
  id: '',
  firstName: '',
  lastName: '',
  description: { de: '', en: '' },
  roles: { de: [] as string[], en: [] as string[] },
  socialMedia: [] as { platform: string; url: string }[],
  profilImg: null as File | null,
})

const form = ref(emptyForm())

async function load() {
  loading.value = true
  const { data } = await apiClient.get('/api/team')
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
    firstName: item.firstName,
    lastName: item.lastName,
    description: { de: item.description?.de ?? '', en: item.description?.en ?? '' },
    roles: {
      de: [...(item.roles?.de || [])],
      en: [...(item.roles?.en || [])],
    },
    socialMedia: item.socialMedia ? item.socialMedia.map((s: any) => ({ ...s })) : [],
    profilImg: null,
  }
  formError.value = ''
  showModal.value = true
}

function closeModal() { showModal.value = false }
function confirmDelete(item: any) { deleteTarget.value = item }

function addSocialMedia() { form.value.socialMedia.push({ platform: '', url: '' }) }
function removeSocialMedia(i: number) { form.value.socialMedia.splice(i, 1) }

async function deleteItem() {
  await apiClient.delete(`/api/team/${deleteTarget.value.id}`)
  deleteTarget.value = null
  await load()
}

async function submitForm() {
  saving.value = true
  formError.value = ''
  try {
    const fd = new FormData()
    fd.append('id', form.value.id)
    fd.append('firstName', form.value.firstName)
    fd.append('lastName', form.value.lastName)
    fd.append('description_de', form.value.description.de ?? '')
    fd.append('description_en', form.value.description.en ?? '')
    fd.append('roles_de', JSON.stringify(form.value.roles.de))
    fd.append('roles_en', JSON.stringify(form.value.roles.en))
    fd.append('socialMedia', JSON.stringify(form.value.socialMedia.filter(s => s.platform && s.url)))
    if (form.value.profilImg) fd.append('profilImg', form.value.profilImg)

    if (editItem.value) {
      await apiClient.patch(`/api/team/${editItem.value.id}`, fd)
    } else {
      await apiClient.post('/api/team', fd)
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
