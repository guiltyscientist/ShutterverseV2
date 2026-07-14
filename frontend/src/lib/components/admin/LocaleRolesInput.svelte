<script lang="ts">
  import FormField from './FormField.svelte'

  interface RolesValue { de: string[]; en: string[] }
  let { value = $bindable<RolesValue>({ de: [], en: [] }) }: { value?: RolesValue } = $props()

  let newRole = $state({ de: '', en: '' })

  function addRole(lang: 'de' | 'en') {
    const r = newRole[lang].trim()
    if (r && !value[lang].includes(r)) value = { ...value, [lang]: [...value[lang], r] }
    newRole[lang] = ''
  }
  function removeRole(lang: 'de' | 'en', i: number) {
    const updated = [...value[lang]]
    updated.splice(i, 1)
    value = { ...value, [lang]: updated }
  }
</script>

<FormField label="Rollen">
  <div class="space-y-3">
    {#each (['de', 'en'] as const) as lang}
      <div>
        <div class="flex flex-wrap gap-2 mb-2">
          {#each value[lang] as role, i}
            <span class="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full {lang === 'de' ? 'admin-badge-de' : 'admin-badge-en'}">
              {role}
              <button type="button" onclick={() => removeRole(lang, i)} class="hover:opacity-70 ml-0.5" aria-label="Rolle entfernen">
                <i class="bi bi-x"></i>
              </button>
            </span>
          {/each}
        </div>
        <div class="flex gap-2">
          <input
            bind:value={newRole[lang]}
            type="text"
            class="input flex-1 text-sm"
            placeholder={lang === 'de' ? 'Rolle auf Deutsch…' : 'Role in English…'}
            onkeydown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addRole(lang) } }}
          />
          <button type="button" onclick={() => addRole(lang)} class="btn-secondary px-3" aria-label="Rolle hinzufügen">
            <i class="bi bi-plus"></i>
          </button>
        </div>
      </div>
    {/each}
  </div>
</FormField>
