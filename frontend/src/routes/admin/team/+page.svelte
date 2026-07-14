<script lang="ts">
  import { onMount } from 'svelte'
  import { apiClient } from '$lib/api/client'
  import AdminModal from '$lib/components/admin/AdminModal.svelte'
  import ConfirmDialog from '$lib/components/admin/ConfirmDialog.svelte'
  import FormField from '$lib/components/admin/FormField.svelte'
  import FormError from '$lib/components/admin/FormError.svelte'
  import ImageUpload from '$lib/components/admin/ImageUpload.svelte'
  import LocaleTextInput from '$lib/components/admin/LocaleTextInput.svelte'
  import LocaleRolesInput from '$lib/components/admin/LocaleRolesInput.svelte'

  const platforms = ['LinkedIn','Instagram','Twitter','GitHub','Facebook','YouTube','Website','Behance','Dribbble']

  let items        = $state<any[]>([])
  let loading      = $state(true)
  let showModal    = $state(false)
  let editItem     = $state<any>(null)
  let deleteTarget = $state<any>(null)
  let saving       = $state(false)
  let formError    = $state('')

  const emptyForm = () => ({
    firstName: '', lastName: '', description: { de: '', en: '' },
    roles: { de: [] as string[], en: [] as string[] },
    socialMedia: [] as { platform: string; url: string }[],
    profilImg: null as File | null,
    removeProfilImg: false,
  })
  let form = $state(emptyForm())

  async function load() { loading = true; const { data } = await apiClient.get('/api/team'); items = data; loading = false }
  onMount(load)

  function openCreate() { editItem = null; form = emptyForm(); formError = ''; showModal = true }
  function openEdit(item: any) {
    editItem = item
    form = { firstName: item.firstName, lastName: item.lastName,
      description: { de: item.description?.de ?? '', en: item.description?.en ?? '' },
      roles: { de: [...(item.roles?.de || [])], en: [...(item.roles?.en || [])] },
      socialMedia: item.socialMedia ? item.socialMedia.map((s: any) => ({ ...s })) : [],
      profilImg: null, removeProfilImg: false }
    formError = ''; showModal = true
  }
  function closeModal() { showModal = false }

  function addSocialMedia() { form.socialMedia.push({ platform: '', url: '' }) }
  function removeSocialMedia(i: number) { form.socialMedia.splice(i, 1) }

  async function deleteItem() { await apiClient.delete(`/api/team/${deleteTarget.id}`); deleteTarget = null; await load() }

  async function submitForm(e: SubmitEvent) {
    e.preventDefault(); saving = true; formError = ''
    try {
      const fd = new FormData()
      fd.append('firstName', form.firstName)
      fd.append('lastName', form.lastName)
      fd.append('description_de', form.description.de ?? '')
      fd.append('description_en', form.description.en ?? '')
      fd.append('roles_de', JSON.stringify(form.roles.de))
      fd.append('roles_en', JSON.stringify(form.roles.en))
      fd.append('socialMedia', JSON.stringify(form.socialMedia.filter(s => s.platform && s.url)))
      if (form.profilImg) fd.append('profilImg', form.profilImg)
      if (editItem) fd.append('removeProfilImg', String(form.removeProfilImg))
      if (editItem) await apiClient.patch(`/api/team/${editItem.id}`, fd)
      else          await apiClient.post('/api/team', fd)
      closeModal(); await load()
    } catch (err: any) { formError = err.response?.data?.Error || 'Fehler beim Speichern.'
    } finally { saving = false }
  }
</script>

<svelte:head><title>Team – Admin</title></svelte:head>

<div class="flex items-center justify-between mb-6">
  <div>
    <h1 class="admin-page-title text-2xl">Team</h1>
    <p class="admin-page-sub mt-1">{items.length} Mitglieder</p>
  </div>
  <button onclick={openCreate} class="btn-primary"><i class="bi bi-plus-lg mr-1.5"></i> Neues Mitglied</button>
</div>

<div class="space-y-3">
  {#each items as item (item._id)}
    <div class="admin-card rounded-xl p-4 flex items-center gap-4">
      {#if item.profilImg?.url}
        <img src={item.profilImg.url} class="w-12 h-12 object-cover rounded-full shrink-0" alt={item.firstName} />
      {:else}
        <div class="admin-thumb-fallback w-12 h-12 rounded-full shrink-0 flex items-center justify-center">
          <i class="bi bi-person"></i>
        </div>
      {/if}
      <div class="flex-1 min-w-0">
        <div class="font-medium" style="color: var(--ink-0)">{item.firstName} {item.lastName}</div>
        <div class="admin-page-sub mt-0.5 truncate" style="letter-spacing: 0.04em;">{item.roles?.de?.join(', ') || '–'}</div>
      </div>
      <div class="flex gap-2 shrink-0">
        <button onclick={() => openEdit(item)} class="btn-icon admin-icon-btn edit" aria-label="Bearbeiten"><i class="bi bi-pencil"></i></button>
        <button onclick={() => { deleteTarget = item }} class="btn-icon admin-icon-btn danger" aria-label="Löschen"><i class="bi bi-trash"></i></button>
      </div>
    </div>
  {/each}
  {#if !loading && items.length === 0}
    <div class="admin-empty text-center py-12">Noch keine Mitglieder vorhanden.</div>
  {/if}
</div>

{#if showModal}
  <AdminModal title={editItem ? 'Mitglied bearbeiten' : 'Neues Mitglied'} onclose={closeModal}>
    <form onsubmit={submitForm} class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <FormField label="Vorname" required={true}>
          <input bind:value={form.firstName} type="text" class="input" required />
        </FormField>
        <FormField label="Nachname" required={true}>
          <input bind:value={form.lastName} type="text" class="input" required />
        </FormField>
      </div>
      <LocaleTextInput label="Beschreibung" bind:value={form.description} multiline placeholder="Kurzbeschreibung" />
      <LocaleRolesInput bind:value={form.roles} />
      <FormField label="Social Media">
        <div class="space-y-2 mb-2">
          {#each form.socialMedia as sm, i}
            <div class="flex gap-2 items-center">
              <select bind:value={sm.platform} class="input w-36 shrink-0">
                <option value="">Plattform</option>
                {#each platforms as p}<option value={p}>{p}</option>{/each}
              </select>
              <input bind:value={sm.url} type="url" class="input flex-1" placeholder="URL" />
              <button type="button" onclick={() => removeSocialMedia(i)} class="btn-icon admin-icon-btn danger" aria-label="Eintrag entfernen">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
          {/each}
        </div>
        <button type="button" onclick={addSocialMedia} class="btn-secondary text-sm">
          <i class="bi bi-plus mr-1"></i> Eintrag hinzufügen
        </button>
      </FormField>
      <FormField label="Profilbild">
        <ImageUpload bind:file={form.profilImg} bind:removeExisting={form.removeProfilImg} preview={editItem?.profilImg?.url} />
      </FormField>
      <FormError message={formError} />
      <div class="flex justify-end gap-3 pt-2">
        <button type="button" onclick={closeModal} class="btn-secondary">Abbrechen</button>
        <button type="submit" disabled={saving} class="btn-primary">{saving ? 'Wird gespeichert…' : editItem ? 'Speichern' : 'Erstellen'}</button>
      </div>
    </form>
  </AdminModal>
{/if}

{#if deleteTarget}
  <ConfirmDialog
    message={`Mitglied "${deleteTarget.firstName} ${deleteTarget.lastName}" wirklich löschen?`}
    onconfirm={deleteItem}
    oncancel={() => { deleteTarget = null }}
  />
{/if}
