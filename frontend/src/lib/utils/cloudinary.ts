/**
 * Fügt eine Cloudinary-Delivery-Transformation in eine Bild-URL ein,
 * z.B. cldUrl(url, 'w_160,h_160,c_fill,q_auto,f_auto').
 * Nicht-Cloudinary-URLs werden unverändert zurückgegeben.
 */
const UPLOAD_SEGMENT = '/upload/'

export function cldUrl(url: string | null | undefined, transform: string): string | null {
  if (!url) return null
  if (!url.includes('res.cloudinary.com')) return url
  const idx = url.indexOf(UPLOAD_SEGMENT)
  if (idx === -1) return url
  const cut = idx + UPLOAD_SEGMENT.length
  return url.slice(0, cut) + transform + '/' + url.slice(cut)
}

/** Gängige Größen, damit überall dieselben Varianten gecacht werden */
export const CLD = {
  thumb: 'w_160,h_160,c_fill,q_auto,f_auto',
  card: 'w_1000,c_limit,q_auto,f_auto',
  main: 'w_1200,c_limit,q_auto,f_auto',
} as const
