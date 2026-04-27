<template>
  <div>
    <label class="block text-sm font-medium text-gray-400 mb-1.5">
      {{ label }}<span v-if="required" class="text-amber-500 ml-0.5">*</span>
    </label>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string; required?: boolean }>()
</script>
