<template>
  <div>
    <div v-if="currentPreview" class="mb-2 relative inline-block">
      <img :src="currentPreview" class="h-24 w-24 object-cover rounded-lg border border-gray-700" />
    </div>
    <input
      type="file"
      accept="image/jpeg,image/png,image/webp"
      class="block w-full text-sm text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-gray-800 file:text-gray-300 file:text-sm hover:file:bg-gray-700 transition-colors cursor-pointer"
      :disabled="compressing"
      @change="onFileChange"
    />
    <p v-if="compressing" class="mt-1.5 text-xs text-amber-400 flex items-center gap-1.5">
      <i class="bi bi-arrow-clockwise animate-spin"></i> Wird komprimiert…
    </p>
    <p v-else-if="info" class="mt-1.5 text-xs flex items-center gap-1" :class="error ? 'text-red-400' : 'text-green-400'">
      <i :class="error ? 'bi bi-exclamation-circle' : 'bi bi-check-circle'"></i> {{ info }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { compressImage, fmt } from '../../composables/useImageCompressor'

const MAX_BYTES = 10 * 1024 * 1024

const props = defineProps<{
  modelValue: File | null
  preview?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [File | null]
}>()

const localPreview = ref<string | null>(null)
const compressing = ref(false)
const info = ref('')
const error = ref(false)

const currentPreview = computed(() => localPreview.value || props.preview || null)

watch(() => props.modelValue, val => {
  if (!val) {
    localPreview.value = null
    info.value = ''
    error.value = false
  }
})

async function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0] ?? null
  info.value = ''
  error.value = false

  if (!file) {
    emit('update:modelValue', null)
    localPreview.value = null
    return
  }

  if (file.size <= MAX_BYTES) {
    emit('update:modelValue', file)
    localPreview.value = URL.createObjectURL(file)
    return
  }

  // Datei zu groß → automatisch komprimieren
  compressing.value = true
  try {
    const result = await compressImage(file, MAX_BYTES)
    emit('update:modelValue', result.file)
    localPreview.value = URL.createObjectURL(result.file)
    info.value = `Komprimiert: ${fmt(result.originalSize)} → ${fmt(result.compressedSize)}`
  } catch (err: any) {
    info.value = err.message ?? 'Komprimierung fehlgeschlagen.'
    error.value = true
    input.value = ''
    emit('update:modelValue', null)
    localPreview.value = null
  } finally {
    compressing.value = false
  }
}
</script>
