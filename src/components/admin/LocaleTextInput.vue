<template>
  <FormField :label="label" :required="required">
    <div class="space-y-2">
      <div class="flex items-center gap-2">
        <span class="text-xs font-semibold text-amber-400 w-6 shrink-0">DE</span>
        <component
          :is="multiline ? 'textarea' : 'input'"
          :value="modelValue.de ?? ''"
          @input="emit('update:modelValue', { ...modelValue, de: ($event.target as HTMLInputElement).value })"
          :class="['input flex-1', multiline ? 'min-h-20' : '']"
          :placeholder="placeholder ? `${placeholder} (Deutsch)` : 'Deutsch'"
          :required="required"
        />
      </div>
      <div class="flex items-center gap-2">
        <span class="text-xs font-semibold text-blue-400 w-6 shrink-0">EN</span>
        <component
          :is="multiline ? 'textarea' : 'input'"
          :value="modelValue.en ?? ''"
          @input="emit('update:modelValue', { ...modelValue, en: ($event.target as HTMLInputElement).value })"
          :class="['input flex-1', multiline ? 'min-h-20' : '']"
          :placeholder="placeholder ? `${placeholder} (English)` : 'English'"
        />
      </div>
    </div>
  </FormField>
</template>

<script setup lang="ts">
import FormField from './FormField.vue'

interface LocaleValue {
  de: string | null
  en: string | null
}

const props = defineProps<{
  label: string
  modelValue: LocaleValue
  required?: boolean
  multiline?: boolean
  placeholder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [LocaleValue]
}>()
</script>
