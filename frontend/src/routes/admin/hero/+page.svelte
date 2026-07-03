<script lang="ts">
  import { onMount } from 'svelte'
  import { apiClient } from '$lib/api/client'
  import { compressImage } from '$lib/utils/imageCompressor'
  import ConfirmDialog from '$lib/components/admin/ConfirmDialog.svelte'
  import FormError from '$lib/components/admin/FormError.svelte'

  const MAX_IMAGE_BYTES = 10 * 1024 * 1024
  const MAX_VIDEO_BYTES = 50 * 1024 * 1024

  let items        = $state<any[]>([])
  let loading      = $state(true)
  let uploading    = $state(false)
  let deleteTarget = $state<any>(null)
  let error        = $state('')
  let inputEl      = $state<HTMLInputElement | null>(null)

  async function load() {
    loading = true
    const { data } = await apiClient.get('/api/hero')
    items = data
    loading = false
  }
  onMount(load)

  async function onFileChange(e: Event) {
    const input = e.target as HTMLInputElement
    let file = input.files?.[0] ?? null
    input.value = ''
    if (!file) return
    error = ''

    try {
      if (file.type.startsWith('video/')) {
        if (file.size > MAX_VIDEO_BYTES) {
          error = 'Video zu groß (max. 50 MB). Tipp: kurzer Loop von 5–10 Sekunden reicht für den Hero.'
          return
        }
      } else {
        const r = await compressImage(file, MAX_IMAGE_BYTES)
        file = r.file
      }

      uploading = true
      const fd = new FormData()
      fd.append('media', file)
      await apiClient.post('/api/hero', fd)
      await load()
    } catch (err: any) {
      error = err.response?.data?.Error || err.message || 'Fehler beim Hochladen.'
    } finally {
      uploading = false
    }
  }

  async function deleteItem() {
    try {
      await apiClient.delete(`/api/hero/${deleteTarget.id}`)
      deleteTarget = null
      await load()
    } catch (err: any) {
      error = err.response?.data?.Error || 'Fehler beim Löschen.'
      deleteTarget = null
    }
  }

  const hasVideo = $derived(items.some(i => i.type === 'video'))
</script>

<svelte:head><title>Hero – Admin</title></svelte:head>

<div class="flex items-center justify-between mb-6 flex-wrap gap-3">
  <div>
    <h1 class="admin-page-title text-2xl">Hero-Medien</h1>
    <p class="admin-page-sub mt-1">{items.length} Medien</p>
  </div>
  <label class="btn-primary cursor-pointer" class:opacity-55={uploading}>
    {#if uploading}
      <i class="bi bi-arrow-clockwise animate-spin mr-1.5"></i> Wird hochgeladen…
    {:else}
      <i class="bi bi-plus-lg mr-1.5"></i> Bild / Video hinzufügen
    {/if}
    <input bind:this={inputEl} type="file" class="hidden"
      accept="image/jpeg,image/png,image/webp,video/mp4,video/webm,video/quicktime"
      disabled={uploading} onchange={onFileChange} />
  </label>
</div>

<div class="admin-card rounded-xl p-4 mb-6">
  <p class="admin-page-sub" style="letter-spacing: 0.06em; line-height: 1.8; text-transform: none; font-size: 12px;">
    <i class="bi bi-info-circle mr-1.5" style="color: var(--neon-cyan)"></i>
    Gibt es ein <strong>Video</strong>, läuft das neueste als Hero-Hintergrund (stumm, als Loop).
    Ohne Video zeigen die <strong>Bilder</strong> eine langsame Überblend-Slideshow.
    Ohne Medien bleibt der animierte Verlauf.
    Empfehlung für Videos: 5–10 Sekunden Loop, 1080p, ohne Ton — Cloudinary komprimiert automatisch, sodass kaum mehr Traffic entsteht als bei einem großen Foto.
  </p>
</div>

<FormError message={error} />

<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-3">
  {#each items as item (item.id)}
    <div class="admin-card rounded-xl overflow-hidden group relative">
      {#if item.type === 'video'}
        <video src={item.url} class="w-full h-36 object-cover" muted loop playsinline
          onmouseenter={(e) => (e.currentTarget as HTMLVideoElement).play()}
          onmouseleave={(e) => (e.currentTarget as HTMLVideoElement).pause()}
        ></video>
      {:else}
        <img src={item.url} class="w-full h-36 object-cover" alt="Hero Medium" />
      {/if}
      <div class="p-3 flex items-center justify-between">
        <span class="text-xs px-2.5 py-1 rounded-full {item.type === 'video' ? 'admin-badge-de' : 'admin-badge-en'}">
          {#if item.type === 'video'}<i class="bi bi-play-fill mr-1"></i>Video{:else}<i class="bi bi-image mr-1"></i>Bild{/if}
        </span>
        <button onclick={() => { deleteTarget = item }} class="btn-icon admin-icon-btn danger" aria-label="Löschen">
          <i class="bi bi-trash"></i>
        </button>
      </div>
      {#if item.type === 'video' && hasVideo && items.find(i => i.type === 'video')?.id === item.id}
        <span class="absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full admin-badge-de">Aktiv im Hero</span>
      {/if}
    </div>
  {/each}
</div>

{#if !loading && items.length === 0}
  <div class="admin-empty text-center py-12">Noch keine Hero-Medien — es läuft der animierte Verlauf.</div>
{/if}

{#if deleteTarget}
  <ConfirmDialog
    message={`Dieses ${deleteTarget.type === 'video' ? 'Video' : 'Bild'} wirklich löschen?`}
    onconfirm={deleteItem}
    oncancel={() => { deleteTarget = null }}
  />
{/if}
