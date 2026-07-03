<script lang="ts">
  import { onMount } from 'svelte'
  import NavBar from '$lib/components/NavBar.svelte'
  import Home from '$lib/components/Home.svelte'
  import News from '$lib/components/News.svelte'
  import Studios from '$lib/components/Studios.svelte'
  import Location from '$lib/components/Location.svelte'
  import Team from '$lib/components/Team.svelte'
  import Impressum from '$lib/components/Impressum.svelte'
  import { useLocale } from '$lib/i18n/index.svelte'
  import { reveal } from '$lib/actions/reveal'

  const { t } = useLocale()

  onMount(() => {
    // Browser/SvelteKit restore the previous scroll position on reload — this
    // landing page should always start at the hero (or at the hash target).
    history.scrollRestoration = 'manual'
    const target = location.hash ? document.getElementById(location.hash.slice(1)) : null
    const resetScroll = () => {
      if (target) {
        const nav = document.querySelector('.sv-nav') as HTMLElement | null
        window.scrollTo({ top: target.offsetTop - (nav?.offsetHeight ?? 0) })
      } else {
        window.scrollTo(0, 0)
      }
    }
    resetScroll()
    // SvelteKit applies its own scroll restore right after hydration —
    // run again on the next frame so ours wins.
    requestAnimationFrame(resetScroll)
  })

  function smoothScroll(e: MouseEvent) {
    const link = (e.target as Element).closest('a[href^="#"]') as HTMLAnchorElement | null
    if (!link) return
    const id = link.getAttribute('href')?.slice(1)
    if (!id) return
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()
    const nav = document.querySelector('.sv-nav') as HTMLElement | null
    // Measure nav height in its *scrolled* state — that's the height it will
    // have once the scroll lands. When the nav is still in its large unscrolled
    // state we must suppress the CSS padding-transition before measuring,
    // otherwise offsetHeight still returns the unscrolled value.
    let navH = 0
    if (nav) {
      const wasScrolled = nav.classList.contains('scrolled')
      if (!wasScrolled) {
        nav.style.transition = 'none'
        nav.classList.add('scrolled')
        void nav.offsetHeight // force synchronous reflow
      }
      navH = nav.offsetHeight
      if (!wasScrolled) {
        nav.classList.remove('scrolled')
        void nav.offsetHeight // flush removal before re-enabling transition
        requestAnimationFrame(() => { nav.style.transition = '' })
      }
    }
    window.scrollTo({ top: el.offsetTop - navH, behavior: 'smooth' })
  }
</script>

<svelte:head>
  <title>ShutterVerse Studio</title>
</svelte:head>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
<div id="app" onclick={smoothScroll}>
  <NavBar />
  <Home />
  <News />
  <Studios />
  <Location />
  <Team />

  <section class="sv-booking" id="booking">
    <div class="booking-inner" use:reveal>
      <h2>{t.bookingSection.h}</h2>
      <p>{t.bookingSection.p}</p>
      <a href="https://booking.shutterverse.at" target="_blank" rel="noopener noreferrer" class="sv-btn">
        <span>{t.bookingSection.cta}</span>
        <span class="arrow"></span>
      </a>
    </div>
  </section>

  <Impressum />
</div>
