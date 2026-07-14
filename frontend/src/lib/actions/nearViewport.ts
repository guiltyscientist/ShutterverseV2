/**
 * Ruft onNear genau einmal auf, sobald das Element in Viewport-Nähe kommt
 * (rootMargin als Vorlauf, damit Bilder vor dem Sichtbarwerden laden).
 */
export function nearViewport(node: HTMLElement, onNear: () => void) {
  if (typeof IntersectionObserver === 'undefined') {
    onNear()
    return { destroy() {} }
  }
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return
      onNear()
      observer.disconnect()
    },
    { rootMargin: '800px 0px' }
  )
  observer.observe(node)
  return {
    destroy() { observer.disconnect() },
  }
}
