import { useLocale } from './useLocale'

export type LocaleText = { de?: string | null; en?: string | null } | null | undefined
export type LocaleArr = { de?: string[] | null; en?: string[] | null } | null | undefined

export function useLocalText() {
    const { locale } = useLocale()

    /** Returns the localized string for the current locale, falling back to 'de'. */
    function lt(field: LocaleText): string {
        if (!field) return ''
        return field[locale.value] || field.de || field.en || ''
    }

    /** Returns the localized string array for the current locale, falling back to 'de'. */
    function ltArr(field: LocaleArr): string[] {
        if (!field) return []
        return field[locale.value] || field.de || []
    }

    return { lt, ltArr }
}
