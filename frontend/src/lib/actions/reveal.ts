export function reveal(node: HTMLElement) {
  node.classList.add('reveal')
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return
      node.classList.add('in')
      observer.disconnect()
    },
    { threshold: 0.12 }
  )
  observer.observe(node)
  return {
    update() {},
    destroy() { observer.disconnect() },
  }
}
