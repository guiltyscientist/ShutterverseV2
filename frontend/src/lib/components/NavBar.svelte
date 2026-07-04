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
