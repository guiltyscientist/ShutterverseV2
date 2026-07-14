<script lang="ts">
  import { compressImage, fmt } from '$lib/utils/imageCompressor'

  const MAX_BYTES = 10 * 1024 * 1024
  let { file = $bindable<File | null>(null), preview = '', removeExisting = $bindable(false) }:
    { file?: File | null; preview?: string; removeExisting?: boolean } = $props()

  let inputEl       = $state<HTMLInputElement | null>(null)
  let localPreview  = $state<string | null>(null)
  let compressing   = $state(false)
  let info          = $state('')
  let hasError      = $state(false)

  const currentPreview = $derived(localPreview || (removeExisting ? null : preview) || null)

  $effect(() => {
    if (!file) { localPreview = null; info = ''; hasError = false }
  })

  async function onFileChange(e: Event) {
    const input = e.target as HTMLInputElement
    const picked = input.files?.[0] ?? null
    info = ''; hasError = false

    if (!picked) { file = null; localPreview = null; return }

    removeExisting = false

    if (picked.size <= MAX_BYTES) {
      file = picked; localPreview = URL.createObjectURL(picked); return
    }

    compressing = true
    try {
      const r = await compressImage(picked, MAX_BYTES)
      file = r.file
      localPreview = URL.createObjectURL(r.file)
      info = `Komprimiert: ${fmt(r.originalSize)} → ${fmt(r.compressedSize)}`
    } catch (err: any) {
      info = err.message ?? 'Komprimierung fehlgeschlagen.'
      hasError = true
      input.value = ''
      file = null; localPreview = null
    } finally { compressing = false }
  }

  function removeImage() {
    if (localPreview) {
      URL.revokeObjectURL(localPreview)
      file = null; localPreview = null; info = ''; hasError = false
      if (inputEl) inputEl.value = ''
    } else if (preview) {
      removeExisting = true
    }
  }
</script>

<div>
  {#if currentPreview}
    <div class="mb-2 relative inline-block group">
      <img src={currentPreview} class="h-24 w-24 object-cover rounded-lg" style="border: 1px solid rgba(255,255,255,0.12)" alt="Vorschau" />
      <button type="button" onclick={removeImage} aria-label="Bild entfernen"
        class="admin-remove-chip absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <i class="bi bi-x text-xs" style="color: var(--ink-0)"></i>
      </button>
    </div>
  {/if}
  {#if removeExisting && !localPreview && preview}
    <p class="mt-1 mb-2 text-xs flex items-center gap-1.5" style="color: var(--neon-magenta)">
      <i class="bi bi-trash"></i> Bild wird beim Speichern entfernt.
      <button type="button" onclick={() => { removeExisting = false }} class="underline cursor-pointer" style="color: var(--ink-1)">
        Rückgängig
      </button>
    </p>
  {/if}
  <input
    bind:this={inputEl}
    type="file"
    accept="image/jpeg,image/png,image/webp"
    disabled={compressing}
    class="admin-file-input block w-full text-sm cursor-pointer"
    style="color: var(--ink-1)"
    onchange={onFileChange}
  />
  {#if compressing}
    <p class="admin-info mt-1.5 text-xs flex items-center gap-1.5">
      <i class="bi bi-arrow-clockwise animate-spin"></i> Wird komprimiert…
    </p>
  {:else if info}
    <p class="mt-1.5 text-xs flex items-center gap-1" class:admin-success={!hasError}
       style={hasError ? 'color: var(--neon-magenta)' : ''}>
      <i class="bi" class:bi-check-circle={!hasError} class:bi-exclamation-circle={hasError}></i>
      {info}
    </p>
  {/if}
</div>
