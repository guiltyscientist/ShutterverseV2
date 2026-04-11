<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'

const images = ref<Array<{img: string, title?: string, id?: string}>>([])
const currentIdx = ref(0)
const slideshowInterval = ref<number | null>(null)
const slideshowDelay = 7000
const isLoading = ref(true)
const error = ref<string | null>(null)

const fetchStudioImages = async () => {
  try {
    isLoading.value = true
    error.value = null
    const response = await axios.get('/api/studios/title-images')
    if (response.data && response.data.studios && response.data.studios.length > 0) {
      images.value = response.data.studios.map((studio: any) => ({
        img: studio.titleImg,
        title: studio.title,
        id: studio.id
      }))
    }
  } catch (err: any) {
    console.error('Error fetching studio images:', err)
    error.value = 'Failed to load studio images. Please try again later.'
  } finally {
    isLoading.value = false
  }
}

const nextImage = () => {
  currentIdx.value = (currentIdx.value + 1) % images.value.length
  resetSlideshow()
}

const prevImage = () => {
  currentIdx.value = (currentIdx.value - 1 + images.value.length) % images.value.length
  resetSlideshow()
}

const startSlideshow = () => {
  if (slideshowInterval.value) clearInterval(slideshowInterval.value)
  slideshowInterval.value = setInterval(() => { nextImage() }, slideshowDelay)
}

const resetSlideshow = () => { startSlideshow() }

const stopSlideshow = () => {
  if (slideshowInterval.value) {
    clearInterval(slideshowInterval.value)
    slideshowInterval.value = null
  }
}

onMounted(() => {
  fetchStudioImages()
  startSlideshow()
})

onUnmounted(() => { stopSlideshow() })
</script>

<template>
  <div class="h-screen pt-19 md:pt-19 select-none relative overflow-hidden">
    <img :src="images[currentIdx]?.img" class="w-full h-full object-cover object-top" draggable="false"/>

    <div class="absolute left-0 top-0 h-full w-44 hover:bg-gradient-to-r from-black/50 duration-500 cursor-pointer" @click="prevImage">
      <i class="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 text-white p-4 bi bi-arrow-left-circle text-4xl md:text-5xl"/>
    </div>

    <div class="absolute right-0 top-0 h-full w-44 hover:bg-gradient-to-l from-black/50 duration-500 cursor-pointer" @click="nextImage">
      <i class="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 text-white p-4 bi bi-arrow-right-circle text-4xl md:text-5xl"/>
    </div>

    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 mt-8">
      <div
        v-for="(_, index) in images"
        :key="index"
        @click="currentIdx = index; resetSlideshow()"
        class="w-2 h-2 rounded-full cursor-pointer transition-all duration-300"
        :class="currentIdx === index ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'"
      />
    </div>
  </div>
</template>

<style scoped>
i { z-index: 20; }
.absolute.left-0, .absolute.right-0 { z-index: 10; }
.hover\:bg-gradient-to-r:hover { background: linear-gradient(to right, rgba(0,0,0,0.5), transparent); }
.hover\:bg-gradient-to-l:hover { background: linear-gradient(to left, rgba(0,0,0,0.5), transparent); }
.absolute.left-0 i, .absolute.right-0 i { opacity: 0.7; transition: opacity 0.3s ease; }
.absolute.left-0:hover i, .absolute.right-0:hover i { opacity: 1; }
</style>
