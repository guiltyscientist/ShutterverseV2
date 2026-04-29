import type { DirectiveBinding } from 'vue'

interface RevealOptions {
  delay?: number       // ms before animation starts
  duration?: number    // ms animation duration
  distance?: number    // px slide distance
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  threshold?: number   // 0–1, how much of el must be visible to trigger
  once?: boolean       // default true — animate only once
}

export const vReveal = {
  mounted(el: HTMLElement, binding: DirectiveBinding<RevealOptions | number | undefined>) {
    const opts: RevealOptions =
      typeof binding.value === 'number'
        ? { delay: binding.value }
        : binding.value ?? {}

    const {
      delay     = 0,
      duration  = 600,
      distance  = 28,
      direction = 'up',
      threshold = 0.12,
      once      = true,
    } = opts

    const translate =
      direction === 'up'    ? `translateY(${distance}px)`  :
      direction === 'down'  ? `translateY(-${distance}px)` :
      direction === 'left'  ? `translateX(${distance}px)`  :
      direction === 'right' ? `translateX(-${distance}px)` :
      'none'

    // Initial hidden state
    Object.assign(el.style, {
      opacity:    '0',
      transform:  translate,
      transition: `opacity ${duration}ms cubic-bezier(.4,0,.2,1) ${delay}ms, transform ${duration}ms cubic-bezier(.4,0,.2,1) ${delay}ms`,
      willChange: 'opacity, transform',
    })

    const show = () => {
      el.style.opacity   = '1'
      el.style.transform = 'none'
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show()
          if (once) observer.unobserve(el)
        } else if (!once) {
          // Reset when scrolled back past element
          el.style.opacity   = '0'
          el.style.transform = translate
        }
      },
      { threshold }
    )

    observer.observe(el)

    // Clean up on unmount
    ;(el as any).__revealObserver__ = observer
  },

  unmounted(el: HTMLElement) {
    ;(el as any).__revealObserver__?.disconnect()
  },
}
