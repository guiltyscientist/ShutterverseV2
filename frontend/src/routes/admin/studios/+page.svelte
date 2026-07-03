<script lang="ts">
  import { onMount } from 'svelte'
  import { apiClient } from '$lib/api/client'
  import { compressImage, fmt } from '$lib/utils/imageCompressor'
  import AdminModal from '$lib/components/admin/AdminModal.svelte'
  import ConfirmDialog from '$lib/components/admin/ConfirmDialog.svelte'
  import FormField from '$lib/components/admin/FormField.svelte'
  import FormError from '$lib/components/admin/FormError.svelte'
  import ImageUpload from '$lib/components/admin/ImageUpload.svelte'
  import LocaleTextInput from '$lib/components/admin/LocaleTextInput.svelte'

  const MAX_BYTES = 10 * 1024 * 1024

  let items          = $state<any[]>([])
  let loading        = $state(true)
  let showModal      = $state(false)
  let editItem       = $state<any>(null)
  let deleteTarget   = $state<any>(null)
  let saving         = $state(false)
  let formError      = $state('')
  let galleryError   = $state('')
  let galleryCompressing = $state(false)
  let currentImages  = $state<{ url: string; publicId: string }[]>([])
  let pendingPreviews = $state<string[]>([])
  let galleryInputEl = $state<HTMLInputElement | null>(null)

  const emptyForm = () => ({
    title: { de: '', en: '' }, description: { de: '', en: '' },
    equipment: { de: '', en: '' }, titleImg: null as File | null, newImages: [] as File[],
  })
  let form = $state(emptyForm())

  async function load() {
    loading = true
    const { data } = await apiClient.get('/api/studios')
    items = data
    loading = false
  }
  onMount(load)

  function resetPending() {
    pendingPreviews.forEach(u => URL.revokeObjectURL(u))
    pendingPreviews = []
    form.newImages = []
    galleryError = ''
    galleryCompressing = false
    if (galleryInputEl) galleryInputEl.value = ''
  }

  function openCreate() {
    editItem = null; form = emptyForm(); currentImages = []; resetPending(); formError = ''; showModal = true
  }

  function openEdit(item: any) {
    editItem = item
    form = { title: { de: item.title?.de ?? '', en: item.title?.en ?? '' },
      description: { de: item.description?.de ?? '', en: item.description?.en ?? '' },
      equipment: { de: item.equipment?.de ?? '', en: item.equipment?.en ?? '' }, titleImg: null, newImages: [] }
    currentImages = item.images ? [...item.images] : []
    resetPending(); formError = ''; showModal = true
  }

  function closeModal() { resetPending(); showModal = false }

  async function onGalleryChange(e: Event) {
    const picked = Array.from((e.target as HTMLInputElement).files || [])
    if (galleryInputEl) galleryInputEl.value = ''
    if (!picked.length) return
    galleryError = ''; galleryCompressing = true
    const notes: string[] = []
    for (const file of picked) {
      try {
        const r = await compressImage(file, MAX_BYTES)
        form.newImages.push(r.file)
        pendingPreviews.push(URL.createObjectURL(r.file))
        if (r.wasCompressed) notes.push(`„${file.name}" komprimiert: ${fmt(r.originalSize)} → ${fmt(r.compressedSize)}`)
      } catch (err: any) { notes.push(`„${file.name}": ${err.message ?? 'Fehler'}`) }
    }
    galleryCompressing = false
    if (notes.length) galleryError = notes.join(' · ')
  }

  function removePending(i: number) {
    URL.revokeObjectURL(pendingPreviews[i]!)
    pendingPreviews.splice(i, 1)
    form.newImages.splice(i, 1)
  }

  async function removeSingleImage(publicId: string) {
    await apiClient.delete(`/api/studios/${editItem.id}/images/${encodeURIComponent(publicId)}`)
    currentImages = currentImages.filter(i => i.publicId !== publicId)
  }

  async function deleteItem() {
    await apiClient.delete(`/api/studios/${deleteTarget.id}`)
    deleteTarget = null; await load()
  }

  async function submitForm(e: SubmitEvent) {
    e.preventDefault(); saving = true; formError = ''
    try {
      const fd = new FormData()
      fd.append('title_de', form.title.de)
      fd.append('title_en', form.title.en ?? '')
      fd.append('description_de', form.description.de ?? '')
      fd.append('description_en', form.description.en ?? '')
      fd.append('equipment_de', form.equipment.de ?? '')
      fd.append('equipment_en', form.equipment.en ?? '')
      if (form.titleImg) fd.append('titleImg', form.titleImg)
      form.newImages.forEach(f => fd.append('images', f))
      if (editItem) await apiClient.patch(`/api/studios/${editItem.id}`, fd)
      else          await apiClient.post('/api/studios', fd)
      closeModal(); await load()
    } catch (err: any) {
      formError = err.response?.data?.Error || 'Fehler beim Speichern.'
    } finally { saving = false }
  }
</script>

<svelte:head><title>Studios – Admin</title></svelte:head>

<div class="flex items-center justify-between mb-6">
  <div>
    <h1 class="admin-page-title text-2xl">Studios</h1>
    <p class="admin-page-sub mt-1">{items.length} Studios</p>
  </div>
  <button onclick={openCreate} class="btn-primary">
    <i class="bi bi-plus-lg mr-1.5"></i> Neues Studio
  </button>
</div>

<div class="space-y-3">
  {#each items as item (item._id)}
    <div class="admin-card rounded-xl p-4 flex items-center gap-4">
      {#if item.titleImg?.url}
        <img src={item.titleImg.url} class="w-16 h-16 object-cover rounded-lg shrink-0" alt={item.title?.de} />
      {:else}
        <div class="admin-thumb-fallback w-16 h-16 rounded-lg shrink-0 flex items-center justify-center">
          <i class="bi bi-camera text-xl"></i>
        </div>
      {/if}
      <div class="flex-1 min-w-0">
        <div class="font-medium truncate" style="color: var(--ink-0)">{item.title?.de || item.title?.en}</div>
        <div class="admin-page-sub mt-0.5" style="letter-spacing: 0.04em;">{item.images?.length || 0} Bilder</div>
      </div>
      <div class="flex gap-2 shrink-0">
        <button onclick={() => openEdit(item)} class="btn-icon admin-icon-btn edit"><i class="bi bi-pencil"></i></button>
        <button onclick={() => { deleteTarget = item }} class="btn-icon admin-icon-btn danger"><i class="bi bi-trash"></i></button>
      </div>
    </div>
  {/each}
  {#if !loading && items.length === 0}
    <div class="admin-empty text-center py-12">Noch keine Studios vorhanden.</div>
  {/if}
</div>

{#if showModal}
  <AdminModal title={editItem ? 'Studio bearbeiten' : 'Neues Studio'} onclose={closeModal}>
    <form onsubmit={submitForm} class="space-y-4">
      <LocaleTextInput label="Titel" bind:value={form.title} required={true} placeholder="Studioname" />
      <LocaleTextInput label="Beschreibung" bind:value={form.description} multiline placeholder="Beschreibung des Studios" />
      <LocaleTextInput label="Ausstattung" bind:value={form.equipment} multiline placeholder="z.B. Canon EOS R5, Ringlight (kommagetrennt)" />
      <FormField label="Titelbild">
        <ImageUpload bind:file={form.titleImg} preview={editItem?.titleImg?.url} />
      </FormField>
      <FormField label="Weitere Bilder">
        <input bind:this={galleryInputEl} type="file" accept="image/jpeg,image/png,image/webp" multiple
          class="admin-file-input block w-full text-sm cursor-pointer"
          style="color: var(--ink-1)"
          onchange={onGalleryChange}
        />
        {#if galleryCompressing}
          <p class="admin-info mt-1.5 text-xs flex items-center gap-1.5"><i class="bi bi-arrow-clockwise animate-spin"></i> Bilder werden komprimiert…</p>
        {:else if galleryError}
          <p class="admin-success mt-1.5 text-xs flex items-center gap-1"><i class="bi bi-info-circle"></i> {galleryError}</p>
        {/if}
        {#if currentImages.length}
          <div class="mt-3">
            <p class="admin-page-sub mb-1.5">Gespeichert</p>
            <div class="flex flex-wrap gap-2">
              {#each currentImages as img (img.publicId)}
                <div class="relative group">
                  <img src={img.url} class="w-16 h-16 object-cover rounded-lg" alt="" />
                  <button type="button" onclick={() => removeSingleImage(img.publicId)}
                    class="admin-remove-chip absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <i class="bi bi-x text-xs" style="color: var(--ink-0)"></i>
                  </button>
                </div>
              {/each}
            </div>
          </div>
        {/if}
        {#if pendingPreviews.length}
          <div class="mt-3">
            <p class="admin-page-sub mb-1.5">Neu hinzugefügt ({pendingPreviews.length})</p>
            <div class="flex flex-wrap gap-2">
              {#each pendingPreviews as url, i}
                <div class="relative group">
                  <img src={url} class="w-16 h-16 object-cover rounded-lg" style="border: 1px solid rgba(0,240,255,0.4)" alt="" />
                  <button type="button" onclick={() => removePending(i)}
                    class="admin-remove-chip absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <i class="bi bi-x text-xs" style="color: var(--ink-0)"></i>
                  </button>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </FormField>
      <FormError message={formError} />
      <div class="flex justify-end gap-3 pt-2">
        <button type="button" onclick={closeModal} class="btn-secondary">Abbrechen</button>
        <button type="submit" disabled={saving || galleryCompressing} class="btn-primary">
          {saving ? 'Wird gespeichert…' : galleryCompressing ? 'Komprimierung läuft…' : editItem ? 'Speichern' : 'Erstellen'}
        </button>
      </div>
    </form>
  </AdminModal>
{/if}

{#if deleteTarget}
  <ConfirmDialog
    message={`Studio "${deleteTarget.title?.de || deleteTarget.title?.en}" wirklich löschen?`}
    onconfirm={deleteItem}
    oncancel={() => { deleteTarget = null }}
  />
{/if}
