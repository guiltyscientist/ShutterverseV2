import axios from 'axios'

/**
 * Stale-while-revalidate-Fetch: liefert sofort die zuletzt gecachte Antwort
 * aus dem localStorage (falls vorhanden) und aktualisiert sie danach still
 * mit frischen Daten vom Server. `apply` kann dadurch zweimal aufgerufen werden.
 */
export async function swrGet<T>(url: string, apply: (data: T) => void): Promise<void> {
  const key = `swr:${url}`

  try {
    const cached = localStorage.getItem(key)
    if (cached) apply(JSON.parse(cached))
  } catch {
    // defekter Cache-Eintrag oder localStorage nicht verfügbar — ignorieren
  }

  try {
    const { data } = await axios.get<T>(url)
    apply(data)
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch {
      // Speicher voll o.ä. — Cache ist nur Beschleunigung, kein Muss
    }
  } catch {
    // Server nicht erreichbar — gecachte Daten bleiben stehen
  }
}
