<script lang="ts">
  import FormField from './FormField.svelte'

  interface LocaleValue { de: string | null; en: string | null }
  let {
    label, value = $bindable<LocaleValue>({ de: '', en: '' }),
    required = false, multiline = false, placeholder = ''
  }: { label: string; value?: LocaleValue; required?: boolean; multiline?: boolean; placeholder?: string } = $props()
</script>

<FormField {label} {required}>
  <div class="space-y-2">
    {#each (['de', 'en'] as const) as lang}
      <div class="flex items-center gap-2">
        <span class="admin-locale-tag text-xs font-semibold w-6 shrink-0" class:de={lang === 'de'} class:en={lang === 'en'}>
          {lang.toUpperCase()}
        </span>
        {#if multiline}
          <textarea
            value={value[lang] ?? ''}
            oninput={(e) => { value = { ...value, [lang]: (e.target as HTMLTextAreaElement).value } }}
            class="input flex-1 min-h-20 resize-y"
            placeholder={placeholder ? `${placeholder} (${lang === 'de' ? 'Deutsch' : 'English'})` : (lang === 'de' ? 'Deutsch' : 'English')}
            required={required && lang === 'de'}
          ></textarea>
        {:else}
          <input
            type="text"
            value={value[lang] ?? ''}
            oninput={(e) => { value = { ...value, [lang]: (e.target as HTMLInputElement).value } }}
            class="input flex-1"
            placeholder={placeholder ? `${placeholder} (${lang === 'de' ? 'Deutsch' : 'English'})` : (lang === 'de' ? 'Deutsch' : 'English')}
            required={required && lang === 'de'}
          />
        {/if}
      </div>
    {/each}
  </div>
</FormField>
