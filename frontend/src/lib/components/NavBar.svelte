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

  // Bei den position:sticky-Karten liefert offsetTop die GEKLEBTE Position statt
  // der Fluss-Position — der Scroll-Spy würde dadurch den falschen Punkt markieren.
  // Deshalb einmal sauber messen (Sticky kurz aussetzen) und cachen, statt bei
  // jedem Scroll-Event einen Reflow zu erzwingen.
  let sectionTops: Record<string, number> = {}

  function measureSections() {
    const tops: Record<string, number> = {}
    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (!el) continue
      const prev = el.style.position
      el.style.position = 'static'
      tops[id] = el.offsetTop
      el.style.position = prev
    }
    sectionTops = tops
  }

  function onScroll() {
    scrolled = window.scrollY > 40
    const y = window.scrollY + window.innerHeight * 0.3
    let activeId = sectionIds[0]
    for (const id of sectionIds) {
      const top = sectionTops[id]
      if (top !== undefined && top <= y) activeId = id
    }

    const href = '#' + activeId
    if (href === activeHref) return
    activeHref = href

    // URL an die aktuelle Sektion anpassen, damit ein Reload oder ein geteilter
    // Link wieder dort landet statt oben. replaceState: erzeugt keine History-
    // Einträge (sonst wäre der Zurück-Button unbrauchbar) und löst keinen Sprung
    // aus. Am Hero bleibt die URL sauber ohne Hash.
    const url = activeId === 'top'
      ? location.pathname + location.search
      : href
    history.replaceState(history.state, '', url)
  }

  function closeMenu() {
    document.body.classList.remove('menu-open')
  }

  function toggleMenu() {
    document.body.classList.toggle('menu-open')
  }

  onMount(() => {
    const onResize = () => { syncNavHeight(); measureSections(); onScroll() }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    // Nach dem Umschalten auf den gescrollten (kleineren) Zustand neu messen
    const navRo = new ResizeObserver(syncNavHeight)
    const nav = document.querySelector('.sv-nav')
    if (nav) navRo.observe(nav)

    // Studios/News laden asynchron nach — die Sektionspositionen verschieben sich
    // dadurch. Bei Höhenänderung der Seite neu vermessen.
    const bodyRo = new ResizeObserver(() => { measureSections(); onScroll() })
    bodyRo.observe(document.body)

    syncNavHeight()
    measureSections()
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      navRo.disconnect()
      bodyRo.disconnect()
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
