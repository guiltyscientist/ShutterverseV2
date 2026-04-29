import { ref, computed } from 'vue'
import de from '../locales/de'
import en from '../locales/en'

export type Locale = 'de' | 'en'

const STORAGE_KEY = 'shutterverse_locale'
const translations = { de, en }

/** Priority: 1. localStorage  2. Browser-Sprache  3. Deutsch als Fallback */
const detectLocale = (): Locale => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'de' || saved === 'en') return saved

  const browserLang = navigator.language ?? ''
  return browserLang.startsWith('de') ? 'de' : 'en'
}

const locale = ref<Locale>(detectLocale())

export function useLocale() {
  const t = computed(() => translations[locale.value])

  const setLocale = (l: Locale) => {
    locale.value = l
    localStorage.setItem(STORAGE_KEY, l)
  }

  return { locale, t, setLocale }
}
