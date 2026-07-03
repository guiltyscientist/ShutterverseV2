/**
 * Svelte action: sets up a stroke-dashoffset tracing animation on the first
 * <text> child of the SVG. Everything (dasharray, dashoffset, animation) is
 * applied from JS *after* fonts are loaded so measurements are accurate and
 * the animation starts from the correct initial value.
 */
export function traceNum(node: SVGSVGElement) {
  function setup() {
    const text = node.querySelector<SVGTextElement>('text')
    if (!text) return

    const advanceWidth = text.getComputedTextLength()
    if (advanceWidth === 0) {
      // Font not measured yet — retry on next frame
      requestAnimationFrame(setup)
      return
    }

    const total = Math.max(Math.round(advanceWidth * 4.5), 1200)
    const dot   = 52
    const dur   = +(total / 210).toFixed(1)

    // Set initial stroke state BEFORE attaching the animation so the
    // browser uses the correct `from` value (total → 0).
    text.setAttribute('stroke-dasharray',  `${dot} ${total - dot}`)
    text.setAttribute('stroke-dashoffset', `${total}`)

    // Start animation only now — guarantees correct start value
    text.style.animation = `num-stroke-trace ${dur}s linear infinite`
  }

  if (typeof document !== 'undefined') {
    ;(document.fonts?.ready ?? Promise.resolve()).then(setup)
  }

  return { destroy() {} }
}
