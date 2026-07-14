<script lang="ts">
  import FormField from './FormField.svelte'

  let { value = $bindable<string[]>([]), label = 'Tags', placeholder = 'Tag eingeben…', max = 10 }:
    { value?: string[]; label?: string; placeholder?: string; max?: number } = $props()

  let newTag = $state('')

  function addTag() {
    const t = newTag.trim()
    if (t && value.length < max && !value.includes(t)) value = [...value, t]
    newTag = ''
  }
  function removeTag(i: number) {
    const updated = [...value]
    updated.splice(i, 1)
    value = updated
  }
</script>

<FormField {label}>
  {#if value.length}
    <div class="flex flex-wrap gap-2 mb-2">
      {#each value as tag, i}
        <span class="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full admin-badge-de">
          {tag}
          <button type="button" onclick={() => removeTag(i)} class="hover:opacity-70 ml-0.5" aria-label="Tag entfernen">
            <i class="bi bi-x"></i>
          </button>
        </span>
      {/each}
    </div>
  {/if}
  <div class="flex gap-2">
    <input
      bind:value={newTag}
      type="text"
      class="input flex-1 text-sm"
      {placeholder}
      disabled={value.length >= max}
      onkeydown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }}
    />
    <button type="button" onclick={addTag} disabled={value.length >= max} class="btn-secondary px-3" aria-label="Tag hinzufügen">
      <i class="bi bi-plus"></i>
    </button>
  </div>
  <p class="admin-page-sub mt-1.5 text-xs">{value.length}/{max} Tags</p>
</FormField>
