<script lang="ts">
  import { onMount } from 'svelte'
  import { useLocale } from '$lib/i18n/index.svelte'

  const loc = useLocale()
  const { t, setLocale } = loc

  let scrolled = $state(false)
  let activeHref = $state('#top')

  const sectionIds = ['top', 'news', 'sets', 'location', 'about', 'booking']

  function onScroll() {
    scrolled = window.scrollY > 40
    const y = window.scrollY + window.innerHeight * 0.3
    let activeId = sectionIds[0]
    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el && el.offsetTop <= y) activeId = id
    })
    activeHref = '#' + activeId
  }

  function closeMenu() {
    document.body.classList.remove('menu-open')
  }

  function toggleMenu() {
    document.body.classList.toggle('menu-open')
  }

  onMount(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    if (!window.matchMedia('(hover: none)').matches) {
      const dot = document.createElement('div')
      dot.className = 'cursor-dot'
      const ring = document.createElement('div')
      ring.className = 'cursor-ring'
      document.body.append(dot, ring)

      let mx = window.innerWidth / 2, my = window.innerHeight / 2
      let rx = mx, ry = my
      let animId: number

      const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
      window.addEventListener('mousemove', onMove)

      const loop = () => {
        rx += (mx - rx) * 0.18
        ry += (my - ry) * 0.18
        dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`
        ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`
        animId = requestAnimationFrame(loop)
      }
      loop()

      const addHover = (e: Event) => {
        if ((e.target as Element).closest('a,button,.set-card,.news-card,.lang-toggle button'))
          ring.classList.add('hover')
      }
      const removeHover = (e: Event) => {
        if ((e.target as Element).closest('a,button,.set-card,.news-card,.lang-toggle button'))
          ring.classList.remove('hover')
      }
      document.addEventListener('mouseover', addHover)
      document.addEventListener('mouseout', removeHover)

      return () => {
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('mousemove', onMove)
        document.removeEventListener('mouseover', addHover)
        document.removeEventListener('mouseout', removeHover)
        cancelAnimationFrame(animId)
        dot.remove()
        ring.remove()
      }
    }

    return () => window.removeEventListener('scroll', onScroll)
  })
</script>

<header class="sv-nav" class:scrolled>
  <a href="#top" aria-label="ShutterVerse Home" onclick={closeMenu}>
    <img src="/logos/BIG.png" alt="ShutterVerse Studio" class="sv-logo" />
  </a>

  <nav class="sv-nav-links">
    {#each [
      { href: '#top',      label: t.nav.home },
      { href: '#news',     label: t.nav.news },
      { href: '#sets',     label: t.nav.sets },
      { href: '#location', label: t.nav.location },
      { href: '#about',    label: t.nav.about },
      { href: '#booking',  label: t.nav.booking },
    ] as item}
      <a href={item.href} class:active={activeHref === item.href} onclick={closeMenu}>
        {item.label}
      </a>
    {/each}
  </nav>

  <button class="sv-burger" aria-label="Menu" onclick={toggleMenu}>
    <span></span><span></span><span></span>
  </button>

  <div class="sv-nav-right">
    <div class="lang-toggle" role="group" aria-label="Language">
      <button class:active={loc.locale === 'de'} onclick={() => setLocale('de')}>DE</button>
      <button class:active={loc.locale === 'en'} onclick={() => setLocale('en')}>EN</button>
    </div>
  </div>
</header>
