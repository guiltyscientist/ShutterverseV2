<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useLocale } from '../composables/useLocale'
import { useLocalText } from '../composables/useLocalText'
import type { LocaleText } from '../composables/useLocalText'

const { t } = useLocale()
const { lt } = useLocalText()

interface Studio {
  id: string
  title: LocaleText
  description: LocaleText
  equipment: LocaleText
  titleImg?: { url: string, publicId: string }
  images?: { url: string, publicId: string }[]
}

const studios = ref<Studio[]>([])
const activeCarouselIndex = ref<Record<string, number>>({})
const isLoading = ref(true)

const fetchStudios = async () => {
  try {
    const response = await axios.get('/api/studios')
    studios.value = Array.isArray(response.data) ? response.data : []
    studios.value.forEach(studio => {
      activeCarouselIndex.value[studio.id] = 0
    })
  } catch (err) {
    console.error('Error fetching studios:', err)
    studios.value = []
  } finally {
    isLoading.value = false
  }
}

const scrollToGrid = () => {
  const element = document.getElementById('studios-grid')
  if (element) element.scrollIntoView({ behavior: 'smooth' })
}

const scrollToStudioDetails = (studioId: string) => {
  const element = document.getElementById(`studio-details-${studioId}`)
  if (element) element.scrollIntoView({ behavior: 'smooth' })
}

const setActiveCarouselImage = (studioId: string, index: number) => {
  activeCarouselIndex.value[studioId] = index
}

const nextCarouselImage = (studioId: string) => {
  const studio = studios.value.find(s => s.id === studioId)
  if (!studio) return
  const images = getCarouselImages(studio)
  if (!images.length) return
  const current = activeCarouselIndex.value[studioId] || 0
  activeCarouselIndex.value[studioId] = (current + 1) % images.length
}

const prevCarouselImage = (studioId: string) => {
  const studio = studios.value.find(s => s.id === studioId)
  if (!studio) return
  const images = getCarouselImages(studio)
  if (!images.length) return
  const current = activeCarouselIndex.value[studioId] || 0
  activeCarouselIndex.value[studioId] = current === 0 ? images.length - 1 : current - 1
}

// Touch swipe support for mobile carousel
let carouselTouchStartX = 0
let carouselTouchStartY = 0

const onCarouselTouchStart = (e: TouchEvent) => {
  carouselTouchStartX = e.touches[0].clientX
  carouselTouchStartY = e.touches[0].clientY
}

const onCarouselTouchEnd = (studioId: string, e: TouchEvent) => {
  const dx = e.changedTouches[0].clientX - carouselTouchStartX
  const dy = e.changedTouches[0].clientY - carouselTouchStartY
  // Only trigger horizontal swipe when it clearly dominates vertical scroll
  if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return
  dx < 0 ? nextCarouselImage(studioId) : prevCarouselImage(studioId)
}

const getCarouselImages = (studio: Studio): string[] => {
  const imgs = studio.images?.map(i => i.url) || []
  if (studio.titleImg?.url && !imgs.includes(studio.titleImg.url)) {
    return [studio.titleImg.url, ...imgs]
  }
  return imgs.length > 0 ? imgs : (studio.titleImg?.url ? [studio.titleImg.url] : [])
}

onMounted(() => { fetchStudios() })
</script>

<template>
  <div class="select-none text-white overflow-hidden">

    <!-- Loading State -->
    <div v-if="isLoading" class="min-h-screen bg-gray-900 flex items-center justify-center">
      <p class="text-gray-400 text-xl">{{ t.loading }}</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="studios.length === 0" class="min-h-screen bg-gray-900 flex items-center justify-center">
      <p class="text-gray-400 text-xl">{{ t.studios.empty }}</p>
    </div>

    <!-- Studio Grid Section - Desktop only -->
    <div v-else-if="studios.length > 0" id="studios-grid" class="min-h-[calc(100vh-4rem)] bg-gray-900 relative hidden lg:block">
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/5 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500/5 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div class="relative z-10 h-[calc(100vh-4rem)]">
        <div class="grid h-full" :style="`grid-template-columns: repeat(${studios.length}, 1fr)`">
          <div v-for="(studio, index) in studios" :key="studio.id" class="relative overflow-hidden group">
            <div class="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:brightness-110" :style="{ backgroundImage: `url(${studio.titleImg?.url})` }">
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <!-- Dark overlay that fades on hover -->
              <div class="absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:opacity-0"></div>
            </div>
            <div class="absolute inset-0 flex flex-col items-center justify-center p-8">
              <h3
                v-reveal="{ direction: 'down', delay: index * 120, duration: 700 }"
                class="text-3xl font-bold text-white mb-4 text-center"
              >{{ lt(studio.title) }}</h3>
              <button
                v-reveal="{ direction: 'up', delay: index * 120 + 150, duration: 700 }"
                @click="scrollToStudioDetails(studio.id)"
                class="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 w-full max-w-xs"
              >
                <span class="mr-2">{{ t.studios.viewDetails }}</span>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
            <div class="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Studio Details -->
    <div v-if="studios.length > 0" class="relative">
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-20 -left-20 w-64 h-64 bg-amber-500/5 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div class="absolute -bottom-20 -right-20 w-64 h-64 bg-amber-500/5 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <!-- Mobile section title -->
      <div class="lg:hidden px-6 pt-16 pb-6 bg-gray-900 text-center">
        <h1 v-reveal class="font-bold text-5xl md:text-6xl text-white">{{ t.studios.header }}</h1>
      </div>

      <div
        v-for="(studio, index) in studios"
        :key="'details-' + studio.id"
        :id="`studio-details-${studio.id}`"
        class="min-h-[calc(100vh-4rem)] lg:h-screen flex flex-col lg:flex-row"
        :class="index % 2 === 1 ? 'bg-gray-800' : 'bg-gray-900'"
      >
        <!-- Image Carousel -->
        <div
          class="lg:w-1/2 w-full h-[50vh] lg:h-full relative select-none"
          :class="{ 'lg:order-2': index % 2 === 1 }"
          @touchstart="onCarouselTouchStart"
          @touchend="onCarouselTouchEnd(studio.id, $event)"
        >
          <div class="absolute inset-0 overflow-hidden">
            <img
              :src="getCarouselImages(studio)[activeCarouselIndex[studio.id] || 0]"
              :alt="lt(studio.title)"
              class="w-full h-full object-cover transition-all duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

            <!-- Mobile: prev/next arrows -->
            <template v-if="getCarouselImages(studio).length > 1">
              <button
                @click="prevCarouselImage(studio.id)"
                class="lg:hidden absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white transition-all duration-200 active:scale-90"
              >
                <i class="bi bi-chevron-left text-lg leading-none"></i>
              </button>
              <button
                @click="nextCarouselImage(studio.id)"
                class="lg:hidden absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white transition-all duration-200 active:scale-90"
              >
                <i class="bi bi-chevron-right text-lg leading-none"></i>
              </button>
            </template>

            <!-- Mobile: dot indicators -->
            <div v-if="getCarouselImages(studio).length > 1" class="lg:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              <button
                v-for="(_, dotIdx) in getCarouselImages(studio)"
                :key="dotIdx"
                @click="setActiveCarouselImage(studio.id, dotIdx)"
                class="rounded-full transition-all duration-300"
                :class="(activeCarouselIndex[studio.id] || 0) === dotIdx
                  ? 'w-5 h-2 bg-amber-400'
                  : 'w-2 h-2 bg-white/50 hover:bg-white/80'"
              />
            </div>

            <!-- Desktop: thumbnails -->
            <div v-if="getCarouselImages(studio).length > 1" class="hidden lg:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 space-x-3">
              <button
                v-for="(image, imgIndex) in getCarouselImages(studio)"
                :key="imgIndex"
                @click="setActiveCarouselImage(studio.id, imgIndex)"
                class="flex-shrink-0"
              >
                <img
                  :src="image"
                  :alt="`${lt(studio.title)} - Image ${imgIndex + 1}`"
                  class="w-16 h-16 object-cover rounded-lg transition-all duration-300 hover:scale-110 border-2"
                  :class="(activeCarouselIndex[studio.id] || 0) === imgIndex ? 'border-amber-400' : 'border-transparent opacity-70 hover:opacity-100'"
                />
              </button>
            </div>
          </div>
        </div>

        <!-- Studio Info -->
        <div class="lg:w-1/2 w-full flex items-center justify-center py-8 px-4 md:px-8 lg:px-16" :class="{ 'lg:order-1': index % 2 === 1 }">
          <div class="max-w-2xl w-full">
            <div v-reveal="{ delay: 100 }" class="flex flex-col gap-3 mb-6">
              <button
                @click="scrollToGrid"
                class="hidden lg:inline-flex items-center self-start px-3 py-1.5 bg-gray-800/50 hover:bg-gray-700/60 backdrop-blur-sm text-white text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105 group border border-gray-700"
              >
                <svg class="w-4 h-4 mr-1.5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {{ t.studios.viewAll }}
              </button>
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white">{{ lt(studio.title) }}</h2>
            </div>

            <div v-reveal="{ delay: 200 }" class="mb-8">
              <h3 class="text-xl lg:text-2xl font-semibold text-amber-400 mb-3 lg:mb-4">{{ t.studios.about }}</h3>
              <p class="text-gray-300 text-base lg:text-lg leading-relaxed">{{ lt(studio.description) }}</p>
            </div>

            <div v-if="lt(studio.equipment)" v-reveal="{ delay: 300 }" class="mb-8">
              <h3 class="text-xl lg:text-2xl font-semibold text-amber-400 mb-3 lg:mb-4">{{ t.studios.equipment }}</h3>
              <div class="text-gray-200 space-y-2">
                <div v-for="(item, idx) in lt(studio.equipment).split(',')" :key="idx" class="flex items-center">
                  <svg class="w-4 h-4 lg:w-5 lg:h-5 text-amber-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-base lg:text-lg">{{ item.trim() }}</span>
                </div>
              </div>
            </div>

            <div class="mt-8 space-y-4">
              <button class="px-6 py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 text-base lg:text-lg w-full">
                {{ t.studios.book }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
[id] { scroll-margin-top: 5rem; }
::-webkit-scrollbar { height: 6px; }
::-webkit-scrollbar-track { background: rgba(255,255,255,0.1); border-radius: 3px; }
::-webkit-scrollbar-thumb { background: rgba(251,191,36,0.5); border-radius: 3px; }
.backdrop-blur-sm { backdrop-filter: blur(8px); }
</style>
