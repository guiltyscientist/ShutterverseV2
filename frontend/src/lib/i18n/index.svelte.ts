import de from './de'
import en from './en'

export type Locale = 'de' | 'en'
export type Translations = typeof de

const translations = { de, en }
const STORAGE_KEY = 'shutterverse_locale'

function detect(): Locale {
  if (typeof localStorage === 'undefined') return 'de'
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'de' || saved === 'en') return saved
  return (navigator?.language ?? '').startsWith('de') ? 'de' : 'en'
}

let locale = $state<Locale>(detect())

export type LocaleText = { de?: string | null; en?: string | null } | null | undefined
export type LocaleArr  = { de?: string[] | null; en?: string[] | null } | null | undefined

// Proxy for `t` — reads `locale` ($state) on every property access so
// template expressions like {t.nav.home} are automatically reactive.
// Destructuring `const { t } = useLocale()` is safe: `t` is always this
// same proxy object, and its getters re-read `locale` on every access.
const tProxy = new Proxy({} as typeof de, {
  get(_, section: string | symbol): any {
    if (typeof section !== 'string') return undefined
    const trans = (translations[locale] as any)[section]
    if (trans === null || trans === undefined || typeof trans !== 'object') return trans
    // Nested proxy so leaf reads also track `locale`
    return new Proxy(trans as object, {
      get(_, key: string | symbol): any {
        if (typeof key !== 'string') return undefined
        return (translations[locale] as any)[section][key]
      }
    })
  }
})

export function useLocale() {
  function setLocale(l: Locale) {
    locale = l
    if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, l)
  }

  function lt(field: LocaleText): string {
    if (!field) return ''
    return field[locale] || field.de || field.en || ''
  }

  function ltArr(field: LocaleArr): string[] {
    if (!field) return []
    return field[locale] || field.de || []
  }

  return {
    // Getter — must be accessed as `loc.locale`, NOT destructured, to stay reactive
    get locale() { return locale },
    t: tProxy,
    setLocale,
    lt,
    ltArr,
  }
}
