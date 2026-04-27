<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'
import Home from './components/Home.vue'
import News from './components/News.vue'
import Studios from './components/Studios.vue'
import Location from './components/Location.vue'
import Team from './components/Team.vue'
import Impressum from './components/Impressum.vue'

const route = useRoute()
const isAdminRoute = computed(() => route.path.startsWith('/admin'))

// ── Snap-scroll ───────────────────────────────────────────────────────────────

const DURATION     = 500   // animation ms
const LOCK_DURATION = 1100  // ms — long enough to eat trackpad momentum
const MIN_DELTA    = 5     // ignore wheel events smaller than this (momentum)

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

const getNavHeight = () =>
  document.getElementById('main-navbar')?.offsetHeight ?? 64

const getSnapPoints = (): number[] => {
  const navH = getNavHeight()
  const studioIds = Array.from(
    document.querySelectorAll<HTMLElement>('[id^="studio-details-"]')
  ).map(el => `#${el.id}`)

  return ['#home', '#news', '#studios', ...studioIds, '#location', '#team', '#impressum']
    .map(sel => document.querySelector<HTMLElement>(sel))
    .filter((el): el is HTMLElement => !!el && el.offsetHeight > 0)
    .map(el => Math.round(el.getBoundingClientRect().top + window.scrollY - navH))
    .sort((a, b) => a - b)
    .filter((v, i, arr) => i === 0 || v - arr[i - 1] > 40)
}

// We track which section index we're on ourselves — never derived from scrollY
// mid-animation, so it can't drift out of sync.
let currentIdx = 0
let scrollLocked = false
let lockTimer: ReturnType<typeof setTimeout> | null = null
let rafId: number | null = null

const animateTo = (targetY: number) => {
  if (rafId !== null) cancelAnimationFrame(rafId)
  const startY = window.scrollY
  const dist   = targetY - startY
  if (Math.abs(dist) < 1) return
  let t0: number | null = null
  const step = (ts: number) => {
    if (!t0) t0 = ts
    const p = Math.min((ts - t0) / DURATION, 1)
    window.scrollTo(0, startY + dist * easeInOut(p))
    rafId = p < 1 ? requestAnimationFrame(step) : null
  }
  rafId = requestAnimationFrame(step)
}

const lock = () => {
  scrollLocked = true
  if (lockTimer !== null) clearTimeout(lockTimer)
  lockTimer = setTimeout(() => { scrollLocked = false }, LOCK_DURATION)
}

// Re-sync currentIdx after external navigation (NavBar links, etc.)
const syncIdx = () => {
  if (scrollLocked) return
  const pts = getSnapPoints()
  const cur = window.scrollY
  let idx = 0
  for (let i = 0; i < pts.length; i++) {
    if (pts[i] <= cur) idx = i
    else break
  }
  currentIdx = idx
}

const scrollToSection = (dir: 1 | -1) => {
  if (scrollLocked) return
  const pts = getSnapPoints()
  if (!pts.length) return
  const next = currentIdx + dir
  if (next < 0 || next >= pts.length) return
  currentIdx = next   // update immediately — can't drift via scrollY reads
  lock()
  animateTo(pts[next])
}

// Desktop wheel
const onWheel = (e: WheelEvent) => {
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
  e.preventDefault()
  if (scrollLocked) return
  if (Math.abs(e.deltaY) < MIN_DELTA) return   // ignore tiny momentum ticks
  scrollToSection(e.deltaY > 0 ? 1 : -1)
}

// Mobile touch
let ty0 = 0, tx0 = 0
const onTouchStart = (e: TouchEvent) => { ty0 = e.touches[0].clientY; tx0 = e.touches[0].clientX }
const onTouchEnd   = (e: TouchEvent) => {
  const dy = e.changedTouches[0].clientY - ty0
  const dx = e.changedTouches[0].clientX - tx0
  if (Math.abs(dy) < 40 || Math.abs(dy) < Math.abs(dx)) return
  scrollToSection(dy < 0 ? 1 : -1)
}

// Sync after user navigates via NavBar or internal buttons
let scrollTimer: ReturnType<typeof setTimeout> | null = null
const onScroll = () => {
  if (scrollLocked) return
  if (scrollTimer !== null) clearTimeout(scrollTimer)
  scrollTimer = setTimeout(syncIdx, 150)
}

onMounted(() => {
  syncIdx()
  window.addEventListener('wheel',      onWheel,      { passive: false })
  window.addEventListener('touchstart', onTouchStart, { passive: true  })
  window.addEventListener('touchend',   onTouchEnd,   { passive: true  })
  window.addEventListener('scroll',     onScroll,     { passive: true  })
})

onUnmounted(() => {
  window.removeEventListener('wheel',      onWheel)
  window.removeEventListener('touchstart', onTouchStart)
  window.removeEventListener('touchend',   onTouchEnd)
  window.removeEventListener('scroll',     onScroll)
  if (rafId      !== null) cancelAnimationFrame(rafId)
  if (lockTimer  !== null) clearTimeout(lockTimer)
  if (scrollTimer !== null) clearTimeout(scrollTimer)
})
</script>

<template>
  <RouterView v-if="isAdminRoute" />

  <div v-else id="app" class="bg-gray-900">
    <NavBar />
    <section id="home"><Home /></section>
    <section id="news"><News /></section>
    <section id="studios"><Studios /></section>
    <section id="location"><Location /></section>
    <section id="team"><Team /></section>
    <section id="impressum"><Impressum /></section>
  </div>
</template>

<style>
a { text-decoration: none; }
section { scroll-margin-top: 0; }
</style>
