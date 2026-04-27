<template>
  <div
    v-if="message"
    class="flex items-start gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5"
  >
    <i class="bi bi-exclamation-triangle-fill mt-0.5 shrink-0"></i>
    <span>{{ message }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ message: string }>()
</script>
