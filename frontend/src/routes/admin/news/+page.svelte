<script lang="ts">
  import { onMount } from 'svelte'
  import { apiClient } from '$lib/api/client'
  import AdminModal from '$lib/components/admin/AdminModal.svelte'
  import ConfirmDialog from '$lib/components/admin/ConfirmDialog.svelte'
  import FormField from '$lib/components/admin/FormField.svelte'
  import FormError from '$lib/components/admin/FormError.svelte'
  import ImageUpload from '$lib/components/admin/ImageUpload.svelte'
  import LocaleTextInput from '$lib/components/admin/LocaleTextInput.svelte'

  let items        = $state<any[]>([])
  let loading      = $state(true)
  let showModal    = $state(false)
  let editItem     = $state<any>(null)
  let deleteTarget = $state<any>(null)
  let saving       = $state(false)
  let formError    = $state('')

  const newsTags = [
    { value: 'news',     label: 'News' },
    { value: 'event',    label: 'Event' },
    { value: 'set',      label: 'Set' },
    { value: 'workshop', label: 'Workshop' },
  ]

  const emptyForm = () => ({ title: { de: '', en: '' }, description: { de: '', en: '' }, tag: 'news', titleImg: null as File | null })
  let form = $state(emptyForm())

  async function load() { loading = true; const { data } = await apiClient.get('/api/news'); items = data; loading = false }
  onMount(load)

  function openCreate() { editItem = null; form = emptyForm(); formError = ''; showModal = true }
  function openEdit(item: any) {
    editItem = item
    form = { title: { de: item.title?.de ?? '', en: item.title?.en ?? '' },
      description: { de: item.description?.de ?? '', en: item.description?.en ?? '' },
      tag: item.tag ?? 'news', titleImg: null }
    formError = ''; showModal = true
  }
  function closeModal() { showModal = false }

  async function deleteItem() { await apiClient.delete(`/api/news/${deleteTarget.id}`); deleteTarget = null; await load() }

  async function submitForm(e: SubmitEvent) {
    e.preventDefault(); saving = true; formError = ''
    try {
      const fd = new FormData()
      fd.append('title_de', form.title.de)
      fd.append('title_en', form.title.en ?? '')
      fd.append('description_de', form.description.de)
      fd.append('description_en', form.description.en ?? '')
      fd.append('tag', form.tag)
      if (form.titleImg) fd.append('titleImg', form.titleImg)
      if (editItem) await apiClient.patch(`/api/news/${editItem.id}`, fd)
      else          await apiClient.post('/api/news', fd)
      closeModal(); await load()
    } catch (err: any) { formError = err.response?.data?.Error || 'Fehler beim Speichern.'
    } finally { saving = false }
  }

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString('de-AT', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }
</script>

<svelte:head><title>News – Admin</title></svelte:head>

<div class="flex items-center justify-between mb-6">
  <div>
    <h1 class="admin-page-title text-2xl">News</h1>
    <p class="admin-page-sub mt-1">{items.length} Einträge</p>
  </div>
  <button onclick={openCreate} class="btn-primary"><i class="bi bi-plus-lg mr-1.5"></i> Neue News</button>
</div>

<div class="space-y-3">
  {#each items as item (item._id)}
    <div class="admin-card rounded-xl p-4 flex items-center gap-4">
      {#if item.titleImg?.url}
        <img src={item.titleImg.url} class="w-16 h-16 object-cover rounded-lg shrink-0" alt={item.title?.de} />
      {:else}
        <div class="admin-thumb-fallback w-16 h-16 rounded-lg shrink-0 flex items-center justify-center">
          <i class="bi bi-image"></i>
        </div>
      {/if}
      <div class="flex-1 min-w-0">
        <div class="font-medium truncate" style="color: var(--ink-0)">{item.title?.de || item.title?.en}</div>
        <div class="admin-page-sub mt-0.5" style="letter-spacing: 0.04em;">{(item.tag ?? 'news').toUpperCase()} · {formatDate(item.created)}</div>
      </div>
      <div class="flex gap-2 shrink-0">
        <button onclick={() => openEdit(item)} class="btn-icon admin-icon-btn edit"><i class="bi bi-pencil"></i></button>
        <button onclick={() => { deleteTarget = item }} class="btn-icon admin-icon-btn danger"><i class="bi bi-trash"></i></button>
      </div>
    </div>
  {/each}
  {#if !loading && items.length === 0}
    <div class="admin-empty text-center py-12">Noch keine News vorhanden.</div>
  {/if}
</div>

{#if showModal}
  <AdminModal title={editItem ? 'News bearbeiten' : 'Neue News'} onclose={closeModal}>
    <form onsubmit={submitForm} class="space-y-4">
      <FormField label="Tag" required={true}>
        <select bind:value={form.tag} class="input" required>
          {#each newsTags as t}<option value={t.value}>{t.label}</option>{/each}
        </select>
      </FormField>
      <LocaleTextInput label="Titel" bind:value={form.title} required={true} placeholder="Titel" />
      <LocaleTextInput label="Beschreibung" bind:value={form.description} required={true} multiline placeholder="Beschreibung" />
      <FormField label="Titelbild">
        <ImageUpload bind:file={form.titleImg} preview={editItem?.titleImg?.url} />
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
    message={`News "${deleteTarget.title?.de || deleteTarget.title?.en}" wirklich löschen?`}
    onconfirm={deleteItem}
    oncancel={() => { deleteTarget = null }}
  />
{/if}
