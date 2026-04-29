<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import axios from 'axios'
import { useLocalText } from '../composables/useLocalText'

const { lt } = useLocalText()

interface SlideImage {
  img: string
  title: { de?: string | null; en?: string | null } | null
  id?: string
}

const images = ref<SlideImage[]>([])
const currentIdx = ref(0)
const slideshowInterval = ref<number | null>(null)
const SLIDE_DURATION = 7000
const isLoading = ref(true)

const currentImage = computed(() => images.value[currentIdx.value]?.img ?? '')

const fetchStudioImages = async () => {
  try {
    isLoading.value = true
    const response = await axios.get('/api/studios/title-images')
    if (response.data?.studios?.length > 0) {
      images.value = response.data.studios.map((studio: any) => ({
        img: studio.titleImg,
        title: studio.title,
        id: studio.id
      }))
    }
  } catch (err) {
    console.error('Error fetching studio images:', err)
  } finally {
    isLoading.value = false
  }
}

const goTo = (idx: number) => {
  currentIdx.value = (idx + images.value.length) % images.value.length
  restartTimer()
}

let touchStartX = 0

const onTouchStart = (e: TouchEvent) => {
  touchStartX = e.touches[0].clientX
}

const onTouchEnd = (e: TouchEvent) => {
  const dx = e.changedTouches[0].clientX - touchStartX
  if (Math.abs(dx) < 40) return
  dx < 0 ? nextImage() : prevImage()
}

const nextImage = () => goTo(currentIdx.value + 1)
const prevImage = () => goTo(currentIdx.value - 1)

const restartTimer = () => {
  if (slideshowInterval.value) clearInterval(slideshowInterval.value)
  slideshowInterval.value = setInterval(nextImage, SLIDE_DURATION)
}

onMounted(async () => {
  await fetchStudioImages()
  restartTimer()
})

onUnmounted(() => {
  if (slideshowInterval.value) clearInterval(slideshowInterval.value)
})
</script>

<template>
  <div class="h-screen pt-19 select-none relative overflow-hidden bg-gray-950" @touchstart="onTouchStart" @touchend="onTouchEnd">

    <!-- Ken Burns slides — :key forces remount → animation restarts on each slide change -->
    <Transition name="crossfade">
      <div
        v-if="currentImage"
        :key="currentIdx"
        class="slide-bg absolute inset-0"
        :style="{ backgroundImage: `url(${currentImage})` }"
      />
    </Transition>

    <!-- Dark overlay for legibility -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/50 pointer-events-none z-10" />

    <!-- Welcome overlay -->
    <div class="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
      <p class="text-white/70 text-base md:text-xl tracking-[0.3em] uppercase font-light mb-5 animate-fadein-down">Welcome to the</p>
      <img src="../assets/logos/BIG.png" alt="Shutterverse" class="w-72 md:w-[28rem] h-auto select-none drop-shadow-2xl animate-fadein-up" />
    </div>

    <!-- Left nav -->
    <div
      class="absolute left-0 top-0 h-full w-44 z-20 hidden md:flex items-center cursor-pointer group"
      @click="prevImage"
    >
      <div class="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      <i class="bi bi-arrow-left-circle text-4xl md:text-5xl text-white/70 group-hover:text-white ml-4 relative z-10 transition-all duration-300 group-hover:scale-110" />
    </div>

    <!-- Right nav -->
    <div
      class="absolute right-0 top-0 h-full w-44 z-20 hidden md:flex items-center justify-end cursor-pointer group"
      @click="nextImage"
    >
      <div class="absolute inset-0 bg-gradient-to-l from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      <i class="bi bi-arrow-right-circle text-4xl md:text-5xl text-white/70 group-hover:text-white mr-4 relative z-10 transition-all duration-300 group-hover:scale-110" />
    </div>

    <!-- Dot indicators -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
      <button
        v-for="(_, i) in images"
        :key="i"
        @click="goTo(i)"
        class="rounded-full transition-all duration-300"
        :class="i === currentIdx
          ? 'w-6 h-2 bg-white'
          : 'w-2 h-2 bg-white/40 hover:bg-white/70'"
      />
    </div>
  </div>
</template>

<style scoped>
/* Ken Burns: zoom in while panning left → right */
@keyframes pan-lr {
  from { transform: translateX(0%); }
  to   { transform: translateX(-6%); }
}

.slide-bg {
  width: 110%;
  background-size: cover;
  background-position: center top;
  will-change: transform;
  animation: pan-lr 7s ease-in-out forwards;
}

/* Crossfade: incoming fades in over outgoing */
.crossfade-enter-active {
  transition: opacity 1.2s ease;
  z-index: 2;
}
.crossfade-leave-active {
  transition: opacity 1.2s ease;
  z-index: 1;
}
.crossfade-enter-from { opacity: 0; }
.crossfade-leave-to  { opacity: 0; }
</style>
