<script lang="ts">
  import { compressImage, fmt } from '$lib/utils/imageCompressor'

  const MAX_BYTES = 10 * 1024 * 1024
  let { file = $bindable<File | null>(null), preview = '' }: { file?: File | null; preview?: string } = $props()

  let localPreview  = $state<string | null>(null)
  let compressing   = $state(false)
  let info          = $state('')
  let hasError      = $state(false)

  const currentPreview = $derived(localPreview || preview || null)

  $effect(() => {
    if (!file) { localPreview = null; info = ''; hasError = false }
  })

  async function onFileChange(e: Event) {
    const input = e.target as HTMLInputElement
    const picked = input.files?.[0] ?? null
    info = ''; hasError = false

    if (!picked) { file = null; localPreview = null; return }

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
</script>

<div>
  {#if currentPreview}
    <div class="mb-2">
      <img src={currentPreview} class="h-24 w-24 object-cover rounded-lg" style="border: 1px solid rgba(255,255,255,0.12)" alt="Vorschau" />
    </div>
  {/if}
  <input
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
