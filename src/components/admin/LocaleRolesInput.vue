<template>
  <FormField label="Rollen">
    <div class="space-y-3">
      <div v-for="lang in (['de', 'en'] as const)" :key="lang">
        <div class="flex items-center gap-1 mb-1.5">
          <span :class="lang === 'de' ? 'text-amber-400' : 'text-blue-400'" class="text-xs font-semibold uppercase w-6">{{ lang }}</span>
        </div>
        <div class="flex flex-wrap gap-2 mb-2">
          <span
            v-for="(role, i) in modelValue[lang]"
            :key="i"
            :class="lang === 'de' ? 'bg-amber-500/15 text-amber-400' : 'bg-blue-500/15 text-blue-400'"
            class="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full"
          >
            {{ role }}
            <button type="button" @click="removeRole(lang, i)" class="hover:opacity-70 ml-0.5">
              <i class="bi bi-x"></i>
            </button>
          </span>
        </div>
        <div class="flex gap-2">
          <input
            v-model="newRole[lang]"
            type="text"
            class="input flex-1 text-sm"
            :placeholder="lang === 'de' ? 'Rolle auf Deutsch…' : 'Role in English…'"
            @keydown.enter.prevent="addRole(lang)"
          />
          <button type="button" @click="addRole(lang)" class="btn-secondary px-3">
            <i class="bi bi-plus"></i>
          </button>
        </div>
      </div>
    </div>
  </FormField>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FormField from './FormField.vue'

interface RolesValue {
  de: string[]
  en: string[]
}

const props = defineProps<{ modelValue: RolesValue }>()
const emit = defineEmits<{ 'update:modelValue': [RolesValue] }>()

const newRole = ref({ de: '', en: '' })

function addRole(lang: 'de' | 'en') {
  const r = newRole.value[lang].trim()
  if (r && !props.modelValue[lang].includes(r)) {
    emit('update:modelValue', { ...props.modelValue, [lang]: [...props.modelValue[lang], r] })
  }
  newRole.value[lang] = ''
}

function removeRole(lang: 'de' | 'en', i: number) {
  const updated = [...props.modelValue[lang]]
  updated.splice(i, 1)
  emit('update:modelValue', { ...props.modelValue, [lang]: updated })
}
</script>
