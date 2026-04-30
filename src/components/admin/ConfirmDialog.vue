<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="$emit('cancel')"></div>
    <div class="relative bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-sm p-6 shadow-2xl">
      <div class="flex items-start gap-3 mb-5">
        <div class="w-10 h-10 rounded-full bg-red-500/15 flex items-center justify-center shrink-0">
          <i class="bi bi-exclamation-triangle text-red-400"></i>
        </div>
        <div>
          <h3 class="text-white font-semibold mb-1">Löschen bestätigen</h3>
          <p class="text-gray-400 text-sm">{{ message }}</p>
        </div>
      </div>
      <div class="flex justify-end gap-3">
        <button @click="$emit('cancel')" class="btn-secondary">Abbrechen</button>
        <button @click="$emit('confirm')" class="bg-red-600 hover:bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          Löschen
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ message: string }>()
defineEmits<{ confirm: []; cancel: [] }>()
</script>
