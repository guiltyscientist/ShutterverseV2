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
    const navbarHeight = 80
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    })
  }

  if (open.value) {
    open.value = false
  }
}
</script>

<template>
  <div class="fixed top-0 left-0 w-full z-50 text-white bg-gray-900 py-8 md:flex md:items-center justify-between px-10">
    <div class="logo cursor-pointer">
      <a href="#home" @click="smoothScroll('#home', $event)" class="block">
        <img src="../assets/logos/ICON.png" alt="Studio Logo" class="block md:hidden w-12 h-auto select-none">
        <img src="../assets/logos/BIG.png" alt="Studio Logo" class="hidden md:block w-60 h-auto select-none">
      </a>
    </div>
    <span class="text-3xl absolute right-6 top-6 cursor-pointer md:hidden" @click="menuOpen">
      <i :class="[open ? 'bi bi-x' : 'bi bi-list']"></i>
    </span>
    <ul class="md:flex gap-10 items-center absolute md:static bg-gray-900 w-full md:w-auto md:pb-0 px-10 md:px-15 top-20 duration-500" :class="[open ? 'left-0' : 'left-[-100%]']">
      <li v-for="tag in tags" :key="tag.href" class="py-4 md:py-0">
        <a :href="tag.href" @click="smoothScroll(tag.href, $event)" class="hover:text-blue-600 duration-300 text-xl font-bold">{{ tag.name }}</a>
      </li>

      <!-- Language Switcher -->
      <li class="py-4 md:py-0 flex items-center gap-1 text-sm font-medium border-l border-gray-700 pl-8 ml-2 select-none">
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
</template>

<style scoped></style>
