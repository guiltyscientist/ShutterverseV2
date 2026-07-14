<script lang="ts">
  import { onMount, tick } from 'svelte'
  import NavBar from '$lib/components/NavBar.svelte'
  import Home from '$lib/components/Home.svelte'
  import News from '$lib/components/News.svelte'
  import Studios from '$lib/components/Studios.svelte'
  import Location from '$lib/components/Location.svelte'
  import Team from '$lib/components/Team.svelte'
  import Impressum from '$lib/components/Impressum.svelte'
  import { useLocale } from '$lib/i18n/index.svelte'
  import { reveal } from '$lib/actions/reveal'
  import { swrGet } from '$lib/utils/swr'
  import { cldUrl } from '$lib/utils/cloudinary'

  const { t, lt } = useLocale()

  const BOOKING_URL = 'https://booking.shutterverse.at'

  interface TeaserSet { id: string; title: any; titleImg: string | null; bookingUrl: string | null }
  let teaserSets = $state<TeaserSet[]>([])

  // Blendet die Seite aus, solange sie beim Reload mit #hash noch an die richtige
  // Position gebracht wird — so wird der falsche Zwischenzustand nie gezeigt.
  let positioning = $state(false)

  onMount(() => {
    swrGet<{ studios: TeaserSet[] }>('/api/studios/title-images', (data) => {
      teaserSets = Array.isArray(data?.studios) ? data.studios : []
    })
  })

  // Die Stapel-Karten sind position: sticky. offsetTop liefert bei einer gerade
  // angedockten Karte deren GEKLEBTE Position statt der Position im Dokumentfluss —
  // ein Sprung zu #sets würde dann irgendwo in den Studios landen. Deshalb die
  // Sticky-Positionierung für die Messung kurz aussetzen.
  function flowTop(el: HTMLElement) {
    const prev = el.style.position
    el.style.position = 'static'
    const top = el.offsetTop
    el.style.position = prev
    return top
  }

  // Stapel-Karten docken bei top: 0 an und haben die Navbar-Höhe schon als
  // padding-top drin. Zusätzlich navH abzuziehen würde den Abstand doppelt
  // zählen — nur normale Sektionen brauchen den Versatz.
  function scrollTargetFor(el: HTMLElement, navH: number) {
    return flowTop(el) - (el.closest('.stack-zone') ? 0 : navH)
  }

  // Navbar-Höhe im *gescrollten* Zustand messen — das ist die Höhe, die sie hat,
  // sobald der Scroll gelandet ist. Steht sie noch im großen ungescrollten Zustand,
  // muss die CSS-Transition kurz ausgesetzt werden, sonst liefert offsetHeight
  // weiterhin den ungescrollten (zu großen) Wert.
  function navHeight() {
    const nav = document.querySelector('.sv-nav') as HTMLElement | null
    if (!nav) return 0
    const wasScrolled = nav.classList.contains('scrolled')
    if (!wasScrolled) {
      nav.style.transition = 'none'
      nav.classList.add('scrolled')
      void nav.offsetHeight // force synchronous reflow
    }
    const h = nav.offsetHeight
    if (!wasScrolled) {
      nav.classList.remove('scrolled')
      void nav.offsetHeight // flush removal before re-enabling transition
      requestAnimationFrame(() => { nav.style.transition = '' })
    }
    return h
  }

  onMount(() => {
    // Browser/SvelteKit restore the previous scroll position on reload — this
    // landing page should always start at the hero (or at the hash target).
    history.scrollRestoration = 'manual'
    const id = location.hash ? location.hash.slice(1) : null

    if (!id) {
      const toTop = () => window.scrollTo(0, 0)
      toTop()
      requestAnimationFrame(toTop)
      return
    }

    // Sobald der Nutzer selbst scrollt, nicht mehr nachkorrigieren.
    let userScrolled = false
    const markScrolled = () => { userScrolled = true }
    const opts = { passive: true, once: true } as const
    window.addEventListener('wheel', markScrolled, opts)
    window.addEventListener('touchstart', markScrolled, opts)
    window.addEventListener('keydown', markScrolled, { once: true })

    const applyScroll = () => {
      if (userScrolled) return
      const el = document.getElementById(id)
      if (el) window.scrollTo({ top: scrollTargetFor(el, navHeight()) })
    }

    // Nachkorrektur: die vorab berechnete Navbar-Höhe kann danebenliegen, weil die
    // Navbar beim Scrollstart noch 0,3 s lang ihre Höhe wechselt. Deshalb hier die
    // TATSÄCHLICH gerenderte Position messen und die Restabweichung ausgleichen.
    // (Sticky-Karten sind so nicht messbar — deren angedockte Position wäre immer 0.)
    const correctScroll = () => {
      if (userScrolled) return
      const el = document.getElementById(id)
      if (!el || el.closest('.stack-zone')) return
      const nav = document.querySelector('.sv-nav') as HTMLElement | null
      const delta = el.getBoundingClientRect().top - (nav?.offsetHeight ?? 0)
      if (Math.abs(delta) > 1) window.scrollBy({ top: delta })
    }

    // Kein sichtbarer Sprung mehr: Die Seite bleibt unsichtbar, bis sie korrekt
    // positioniert ist. Vorher lässt sich die Zielposition schlicht nicht sicher
    // berechnen, weil sich das Layout noch verschiebt —
    //   1. Svelte schreibt die (aus dem Cache synchron gesetzten) News/Studios
    //      erst NACH diesem onMount ins DOM  → tick()
    //   2. die Google-Fonts laden nach und ändern die Texthöhen → fonts.ready
    // Erst danach steht das Layout, wird gescrollt und die Seite eingeblendet.
    positioning = true

    const settleAndScroll = async () => {
      await tick()
      await Promise.race([
        document.fonts?.ready ?? Promise.resolve(),
        new Promise((r) => setTimeout(r, 700)), // Notbremse: nie länger warten
      ])
      await tick()

      applyScroll()
      requestAnimationFrame(() => {
        applyScroll()
        correctScroll()
        positioning = false // jetzt erst sichtbar — bereits an der richtigen Stelle
      })
    }
    settleAndScroll()

    // Sicherheitsnetz für den Erstbesuch (leerer Cache → Daten kommen erst aus
    // dem Netz, das Layout wächst dann noch nach dem Einblenden).
    const fixups = [
      setTimeout(correctScroll, 900),
      setTimeout(() => { positioning = false }, 1500), // Seite nie hängen lassen
    ]

    // Studios/News laden asynchron nach — dadurch wächst die Seite und die
    // Sektionen verschieben sich unter der bereits gesetzten Scroll-Position weg.
    // Bis der Nutzer selbst scrollt, das Ziel nachziehen.
    const ro = new ResizeObserver(() => { applyScroll(); correctScroll() })
    ro.observe(document.body)
    const stopRetry = setTimeout(() => ro.disconnect(), 3000)

    return () => {
      ro.disconnect()
      clearTimeout(stopRetry)
      fixups.forEach(clearTimeout)
      window.removeEventListener('wheel', markScrolled)
      window.removeEventListener('touchstart', markScrolled)
      window.removeEventListener('keydown', markScrolled)
    }
  })

  function smoothScroll(e: MouseEvent) {
    const link = (e.target as Element).closest('a[href^="#"]') as HTMLAnchorElement | null
    if (!link) return
    const id = link.getAttribute('href')?.slice(1)
    if (!id) return
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()
    // Auf Mobile ohne weiches Scrollen: Der Weg führt durch den Sticky-Kartenstapel,
    // und beim Durchrasen blitzen die dazwischenliegenden Karten kurz auf — das
    // sieht aus wie ein Renderfehler. Ein direkter Sprung ist dort sauberer.
    const smooth = !window.matchMedia('(max-width: 1080px)').matches
    window.scrollTo({
      top: scrollTargetFor(el, navHeight()),
      behavior: smooth ? 'smooth' : 'auto',
    })
  }
</script>

<svelte:head>
  <title>ShutterVerse Studio</title>
</svelte:head>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div id="app" class:positioning onclick={smoothScroll}>
  <NavBar />
  <Home />
  <News />
  <!-- Sticky-Karten-Stapel: Set-Übersicht → Studio-Details.
       Der Wrapper begrenzt den Stapel: ab Location scrollt alles normal weiter. -->
  <div class="stack-zone">
    <Studios />
    <!-- Verweilzone, in der die letzte Karte (Studio 3) angedockt bleibt -->
    <div class="stack-dwell" aria-hidden="true"></div>
  </div>
  <Location />
  <Team />

  <section class="sv-booking" id="booking">
    <div class="booking-inner" use:reveal>
      <div class="section-head">
        <div>
          <div class="eyebrow">{t.bookingSection.eyebrow}</div>
          <h2>{t.bookingSection.h}</h2>
        </div>
      </div>
      {#if teaserSets.length > 0}
        <div class="bk-sets">
          {#each teaserSets as s (s.id)}
            <a
              class="bk-set"
              href={s.bookingUrl || BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="{lt(s.title)} – {t.bookingSection.cta}"
            >
              <div class="bk-set-media">
                {#if s.titleImg}
                  <div class="bk-set-img" style="background-image: url({cldUrl(s.titleImg, 'w_720,h_960,c_fill,q_auto,f_auto')})"></div>
                {/if}
                <div class="bk-set-scrim"></div>
                <span class="bk-set-title">{lt(s.title)}</span>
              </div>
              <span class="bk-set-cta">
                <span>{t.bookingSection.cta}</span>
                <span class="arrow"></span>
              </span>
            </a>
          {/each}
        </div>
      {:else}
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" class="sv-btn">
          <span>{t.bookingSection.cta}</span>
          <span class="arrow"></span>
        </a>
      {/if}
    </div>
  </section>

  <Impressum />
</div>
