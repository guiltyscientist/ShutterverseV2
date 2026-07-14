interface SwipeOptions {
  onNext: () => void
  onPrev: () => void
  /** Mindeststrecke in px, ab der die Geste als Swipe zählt */
  threshold?: number
}

/**
 * Horizontales Wischen auf einem Element.
 *
 * Unterdrückt dabei gezielt die Zurück/Vor-Navigation des Browsers: Sobald die
 * Geste eindeutig horizontal ist, wird preventDefault() aufgerufen. Damit das
 * überhaupt möglich ist, muss der touchmove-Listener nicht-passiv sein UND das
 * Element `touch-action: pan-y` tragen (siehe .sdm im CSS) — sonst behandelt der
 * Browser die Geste selbst und der Event ist nicht mehr abbrechbar.
 *
 * Vertikales Wischen bleibt unangetastet, damit die Seite normal scrollt.
 */
export function swipe(node: HTMLElement, options: SwipeOptions) {
  let opts = options
  let startX = 0
  let startY = 0
  let tracking = false
  let horizontal = false

  function onTouchStart(e: TouchEvent) {
    if (e.touches.length !== 1) return
    startX = e.touches[0]!.clientX
    startY = e.touches[0]!.clientY
    tracking = true
    horizontal = false
  }

  function onTouchMove(e: TouchEvent) {
    if (!tracking || e.touches.length !== 1) return
    const dx = e.touches[0]!.clientX - startX
    const dy = e.touches[0]!.clientY - startY

    if (!horizontal) {
      // Richtung erst festlegen, wenn die Geste eindeutig genug ist
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return
      if (Math.abs(dy) >= Math.abs(dx)) {
        tracking = false // vertikal → Seite normal scrollen lassen
        return
      }
      horizontal = true
    }

    // Horizontale Geste gehört uns → Browser-Zurück/Vor unterbinden
    if (e.cancelable) e.preventDefault()
  }

  function onTouchEnd(e: TouchEvent) {
    if (!tracking || !horizontal) {
      tracking = false
      return
    }
    tracking = false
    const dx = (e.changedTouches[0]?.clientX ?? startX) - startX
    if (Math.abs(dx) < (opts.threshold ?? 45)) return
    // Konvention (Instagram, iOS Fotos): nach links wischen holt das nächste Bild
    // heran, nach rechts wischen zieht das vorherige zurück.
    if (dx < 0) opts.onNext()
    else opts.onPrev()
  }

  function onTouchCancel() {
    tracking = false
  }

  node.addEventListener('touchstart', onTouchStart, { passive: true })
  node.addEventListener('touchmove', onTouchMove, { passive: false })
  node.addEventListener('touchend', onTouchEnd, { passive: true })
  node.addEventListener('touchcancel', onTouchCancel, { passive: true })

  return {
    update(next: SwipeOptions) {
      opts = next
    },
    destroy() {
      node.removeEventListener('touchstart', onTouchStart)
      node.removeEventListener('touchmove', onTouchMove)
      node.removeEventListener('touchend', onTouchEnd)
      node.removeEventListener('touchcancel', onTouchCancel)
    },
  }
}
