<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useLocale } from '../composables/useLocale'

const { t, locale } = useLocale()

interface NewsItem {
  id: string
  created: string
  title: string
  text: string
  image: string
  publicId: string
}

const newsData = ref<NewsItem[]>([])
const currentIndex = ref(0)
const itemsPerPage = 3

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

const truncateTitle = (title: string, maxLength: number): string => {
  if (title.length <= maxLength) return title
  return title.substring(0, maxLength) + '...'
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString(locale.value === 'de' ? 'de-DE' : 'en-US', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
}

const fetchNews = async () => {
  try {
    const response = await axios.get('/api/news')
    newsData.value = response.data.map((item: any) => ({
      id: item.id,
      created: item.created,
      title: item.title,
      text: item.description,
      image: item.titleImg?.url || '',
      publicId: item.titleImg?.publicId || ''
    }))
  } catch (err) {
    console.error('Error fetching news:', err)
  }
}

const currentNewsSet = computed(() => {
  return newsData.value.slice(currentIndex.value, currentIndex.value + itemsPerPage)
})

const hasNext = computed(() => currentIndex.value + itemsPerPage < newsData.value.length)
const hasPrevious = computed(() => currentIndex.value > 0)

const nextNews = () => { if (hasNext.value) currentIndex.value += itemsPerPage }
const previousNews = () => { if (hasPrevious.value) currentIndex.value = Math.max(0, currentIndex.value - itemsPerPage) }
const goToLatest = () => { currentIndex.value = 0 }

onMounted(() => { fetchNews() })
</script>

<template>
  <div class="min-h-screen select-none relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-white">
    <div class="relative z-10 container mx-auto px-4 py-8 md:py-30">
      <h1 class="font-bold text-8xl md:text-6xl lg:text-8xl px-0 py-0 text-white mb-6 md:mb-12">
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-pink-500">NEWS</span>
      </h1>

      <!-- Empty State -->
      <div v-if="newsData.length === 0" class="text-center py-16">
        <p class="text-gray-400 text-xl">{{ t.news.empty }}</p>
      </div>

      <!-- DESKTOP VERSION -->
      <div v-else class="hidden md:block relative max-w-7xl mx-auto mb-12">
        <div class="relative h-[550px]">
          <button
            @click="previousNews"
            class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 md:-translate-x-16 z-20 p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 group"
            :class="hasPrevious ? 'bg-gray-800/80 hover:bg-gray-700/90 cursor-pointer' : 'bg-gray-800/30 cursor-not-allowed opacity-40'"
            :disabled="!hasPrevious"
          >
            <svg class="w-8 h-8 transition-colors" :class="hasPrevious ? 'text-amber-400 group-hover:text-amber-300' : 'text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            @click="nextNews"
            class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 md:translate-x-16 z-20 p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 group"
            :class="hasNext ? 'bg-gray-800/80 hover:bg-gray-700/90 cursor-pointer' : 'bg-gray-800/30 cursor-not-allowed opacity-40'"
            :disabled="!hasNext"
          >
            <svg class="w-8 h-8 transition-colors" :class="hasNext ? 'text-amber-400 group-hover:text-amber-300' : 'text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div class="absolute inset-0 flex items-center justify-center">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full h-[550px]">
              <div
                v-for="news in currentNewsSet"
                :key="news.id"
                class="flex flex-col bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 transition-all duration-500 shadow-2xl hover:shadow-amber-500/10 group cursor-default h-full"
              >
                <div class="relative h-64 overflow-hidden flex-shrink-0">
                  <img :src="news.image" :alt="news.title" class="w-full h-full object-cover transition-transform duration-700" />
                  <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent"></div>
                </div>
                <div class="p-6 flex flex-col flex-1 min-h-0">
                  <div class="flex items-center text-amber-400 mb-3">
                    <i class="bi bi-calendar3 text-sm mr-2"></i>
                    <span class="font-medium">{{ formatDate(news.created) }}</span>
                  </div>
                  <h3 class="text-xl font-bold mb-3 line-clamp-2 h-[56px]">{{ truncateTitle(news.title, 60) }}</h3>
                  <div class="flex-1 min-h-0 overflow-hidden">
                    <p class="text-gray-300 text-sm leading-relaxed line-clamp-4">{{ truncateText(news.text, 240) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- MOBILE VERSION -->
      <div v-if="newsData.length > 0" class="md:hidden">
        <div class="max-h-[70vh] overflow-y-auto pr-2 space-y-4">
          <div v-for="news in newsData" :key="news.id" class="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
            <div class="flex items-center text-amber-400 mb-3">
              <i class="bi bi-calendar3 text-sm mr-2"></i>
              <span class="font-medium">{{ formatDate(news.created) }}</span>
            </div>
            <h3 class="text-xl font-bold mb-3">{{ truncateTitle(news.title, 50) }}</h3>
            <p class="text-gray-300 text-sm leading-relaxed">{{ truncateText(news.text, 150) }}</p>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto">
        <div v-if="currentIndex > 0" class="hidden md:flex justify-center mb-8">
          <button @click="goToLatest" class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {{ t.news.backToLatest }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.line-clamp-4 { display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
.backdrop-blur-sm { backdrop-filter: blur(4px); }
.min-h-0 { min-height: 0; }
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: rgba(75, 85, 99, 0.3); border-radius: 3px; }
::-webkit-scrollbar-thumb { background: rgba(251, 191, 36, 0.6); border-radius: 3px; }
</style>
