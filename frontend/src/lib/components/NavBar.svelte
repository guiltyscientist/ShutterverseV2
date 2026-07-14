<script lang="ts">
  import { onMount } from 'svelte'
  import { useLocale } from '$lib/i18n/index.svelte'

  const loc = useLocale()
  const { t, setLocale } = loc

  let scrolled = $state(false)
  let activeHref = $state('#top')

  const sectionIds = ['top', 'news', 'sets', 'location', 'about', 'booking']

  // Die Stapel-Karten docken unter der Navbar an — ihre echte Höhe messen,
  // statt sie im CSS zu schätzen (sie schrumpft beim Scrollen).
  function syncNavHeight() {
    const nav = document.querySelector('.sv-nav') as HTMLElement | null
    if (nav) document.documentElement.style.setProperty('--nav-h', `${nav.offsetHeight}px`)
  }

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
    window.addEventListener('resize', syncNavHeight)
    onScroll()
    // Nach dem Umschalten auf den gescrollten (kleineren) Zustand neu messen
    const ro = new ResizeObserver(syncNavHeight)
    const nav = document.querySelector('.sv-nav')
    if (nav) ro.observe(nav)
    syncNavHeight()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', syncNavHeight)
      ro.disconnect()
    }
  })
</script>

<header class="sv-nav" class:scrolled>
  <a href="#top" aria-label="ShutterVerse Home" onclick={closeMenu}>
    <img src="/logos/BIG.png" alt="ShutterVerse Studio" class="sv-logo" />
  </a>

  <!-- Abdunkelnde linke Hälfte hinter dem Menü-Panel, schließt beim Antippen -->
  <button class="sv-menu-overlay" aria-label="Menü schließen" tabindex="-1" onclick={closeMenu}></button>

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
    <!-- Language switch inside the mobile menu (hidden on desktop) -->
    <div class="lang-toggle menu-lang" role="group" aria-label="Language">
      <button class:active={loc.locale === 'de'} onclick={() => setLocale('de')}>DE</button>
      <button class:active={loc.locale === 'en'} onclick={() => setLocale('en')}>EN</button>
    </div>
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
