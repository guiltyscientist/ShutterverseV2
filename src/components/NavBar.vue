<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLocale } from '../composables/useLocale'

const { t, locale, setLocale } = useLocale()
const open = ref(false)

const tags = computed(() => [
  { name: t.value.nav.home, href: '#home' },
  { name: t.value.nav.news, href: '#news' },
  { name: t.value.nav.studios, href: '#studios' },
  { name: t.value.nav.location, href: '#location' },
  { name: t.value.nav.team, href: '#team' },
  { name: t.value.nav.impressum, href: '#impressum' },
])

const menuOpen = () => {
  open.value = !open.value
}

const smoothScroll = (href: string, event: Event) => {
  event.preventDefault()
  const targetId = href.replace('#', '')
  const targetElement = document.getElementById(targetId)

  if (targetElement) {
    const navEl = document.getElementById('main-navbar')
    const navBottom = navEl?.getBoundingClientRect().bottom ?? 80
    const targetPosition = Math.round(targetElement.getBoundingClientRect().top + window.pageYOffset - navBottom)
    window.scrollTo({ top: targetPosition + 2, behavior: 'smooth' })
  }

  if (open.value) open.value = false
}
</script>

<template>
  <!-- ── Navbar bar ── -->
  <div id="main-navbar" class="fixed top-0 left-0 w-full z-50 text-white bg-gray-900/95 backdrop-blur-md border-b border-gray-800/60">

    <!-- Mobile bar -->
    <div class="md:hidden flex items-center justify-between px-4 h-16 relative">
      <!-- Left: Language switcher -->
      <div class="flex items-center gap-1 text-sm font-semibold select-none z-10">
        <button
          @click="setLocale('de')"
          class="transition-colors duration-200"
          :class="locale === 'de' ? 'text-amber-400' : 'text-gray-400 hover:text-gray-200'"
        >DE</button>
        <span class="text-gray-600">|</span>
        <button
          @click="setLocale('en')"
          class="transition-colors duration-200"
          :class="locale === 'en' ? 'text-amber-400' : 'text-gray-400 hover:text-gray-200'"
        >EN</button>
      </div>

      <!-- Center: BIG logo -->
      <a href="#home" @click="smoothScroll('#home', $event)" class="absolute left-1/2 -translate-x-1/2">
        <img src="../assets/logos/BIG.png" alt="ShutterVerse" class="w-36 h-auto select-none">
      </a>

      <!-- Right: Burger -->
      <span
        class="text-3xl cursor-pointer z-10 transition-transform duration-300"
        :class="open ? 'rotate-90' : ''"
        @click="menuOpen"
      >
        <i :class="[open ? 'bi bi-x' : 'bi bi-list']"></i>
      </span>
    </div>

    <!-- Desktop bar -->
    <div class="hidden md:flex items-center justify-between px-10 py-8">
      <a href="#home" @click="smoothScroll('#home', $event)" class="cursor-pointer">
        <img src="../assets/logos/BIG.png" alt="ShutterVerse" class="w-60 h-auto select-none">
      </a>

      <ul class="flex gap-10 items-center">
        <li v-for="tag in tags" :key="tag.href">
          <a
            :href="tag.href"
            @click="smoothScroll(tag.href, $event)"
            class="hover:text-amber-400 duration-300 text-xl font-bold"
          >{{ tag.name }}</a>
        </li>

        <!-- Language Switcher -->
        <li class="flex items-center gap-1 text-sm font-medium border-l border-gray-700 pl-8 ml-2 select-none">
          <button
            @click="setLocale('de')"
            class="transition-colors duration-200"
            :class="locale === 'de' ? 'text-amber-400' : 'text-gray-500 hover:text-gray-300'"
          >DE</button>
          <span class="text-gray-700">|</span>
          <button
            @click="setLocale('en')"
            class="transition-colors duration-200"
            :class="locale === 'en' ? 'text-amber-400' : 'text-gray-500 hover:text-gray-300'"
          >EN</button>
        </li>
      </ul>
    </div>
  </div>

  <!-- ── Mobile burger menu — außerhalb der Navbar damit backdrop-blur den Seiteninhalt blurt ── -->
  <div
    class="fixed top-16 left-0 w-full z-40 md:hidden overflow-hidden transition-all duration-400 ease-in-out"
    :style="open ? 'max-height: 500px; opacity: 1' : 'max-height: 0; opacity: 0'"
  >
    <div class="bg-gray-900/65 border-b border-amber-500/20 text-white">
      <!-- Amber glow line -->
      <div class="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

      <ul class="px-6 py-3 pb-6">
        <li
          v-for="(tag, i) in tags"
          :key="tag.href"
          class="border-b border-white/5 last:border-0 transition-all duration-300"
          :style="{
            transitionDelay: open ? `${i * 55}ms` : '0ms',
            opacity: open ? 1 : 0,
            transform: open ? 'translateX(0)' : 'translateX(20px)'
          }"
        >
          <a
            :href="tag.href"
            @click="smoothScroll(tag.href, $event)"
            class="flex items-center justify-end gap-3 py-4 group"
          >
            <span class="group-hover:text-amber-400 duration-300 text-xl font-bold tracking-wide">{{ tag.name }}</span>
            <span class="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-125" />
          </a>
        </li>
      </ul>

      <div class="h-4 bg-gradient-to-b from-transparent to-black/20" />
    </div>
  </div>
</template>

<style scoped></style>
