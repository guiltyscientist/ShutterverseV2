<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="$emit('close')"></div>
    <div class="relative bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl">
      <div class="flex items-center justify-between px-6 py-4 border-b border-gray-800 shrink-0">
        <h2 class="text-white font-semibold">{{ title }}</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-white transition-colors">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
      <div class="overflow-y-auto p-6">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
defineEmits<{ close: [] }>()
</script>
