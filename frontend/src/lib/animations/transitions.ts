import anime from 'animejs'

/** Svelte action — fades + slides in a page/section on mount (used for admin view transitions). */
export function pageEnter(node: HTMLElement, opts: { delay?: number } = {}) {
  anime({
    targets: node,
    opacity: [0, 1],
    translateY: [12, 0],
    duration: 380,
    delay: opts.delay ?? 0,
    easing: 'easeOutCubic',
    // Clear the leftover inline transform: a transformed ancestor becomes the
    // containing block for position:fixed children (modals), breaking their
    // viewport centering.
    complete: () => { node.style.transform = '' },
  })
  return { destroy() {} }
}

/** Anime.js timeline for the hero intro (called imperatively from Home). */
export function heroIntro(welcomeEl: HTMLElement, logoEl: HTMLElement) {
  anime.set([welcomeEl, logoEl], { opacity: 0 })

  anime.timeline({ easing: 'easeOutExpo' })
    .add({
      targets: welcomeEl,
      opacity: [0, 1],
      translateY: [-18, 0],
      duration: 900,
      delay: 300,
    })
    .add({
      targets: logoEl,
      opacity: [0, 1],
      translateY: [18, 0],
      scale: [0.95, 1],
      duration: 1000,
    }, '-=500')
}

/** Stagger animate a list of elements into view (cards, rows, etc.). */
export function staggerIn(targets: string | HTMLElement[], opts: { delay?: number; stagger?: number } = {}) {
  anime({
    targets,
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 550,
    delay: anime.stagger(opts.stagger ?? 80, { start: opts.delay ?? 0 }),
    easing: 'easeOutCubic',
  })
}

/** Quick scale-bounce on click — attach as Svelte action. */
export function clickBounce(node: HTMLElement) {
  const handler = () => {
    anime({ targets: node, scale: [1, 0.93, 1], duration: 300, easing: 'easeOutElastic(1, .6)' })
  }
  node.addEventListener('click', handler)
  return { destroy() { node.removeEventListener('click', handler) } }
}

/** Modal entrance animation. */
export function modalEnter(node: HTMLElement) {
  anime({
    targets: node,
    opacity: [0, 1],
    scale: [0.95, 1],
    translateY: [-8, 0],
    duration: 300,
    easing: 'easeOutCubic',
  })
  return { destroy() {} }
}
