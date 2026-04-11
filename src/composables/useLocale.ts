import { ref, computed } from 'vue'
import de from '../locales/de'
import en from '../locales/en'

export type Locale = 'de' | 'en'

const translations = { de, en }

const defaultLocale: Locale =
  typeof navigator !== 'undefined' && navigator.language.startsWith('de') ? 'de' : 'en'

const locale = ref<Locale>(defaultLocale)

export function useLocale() {
  const t = computed(() => translations[locale.value])
  const setLocale = (l: Locale) => { locale.value = l }
  return { locale, t, setLocale }
}
