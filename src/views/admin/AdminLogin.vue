<template>
  <div class="min-h-screen bg-gray-950 flex items-center justify-center px-4">
    <div class="w-full max-w-sm">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-amber-400 tracking-wide">Shutterverse</h1>
        <p class="text-gray-500 text-sm mt-1">Admin Panel</p>
      </div>

      <div class="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
        <h2 class="text-white font-semibold text-lg mb-6">Anmelden</h2>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1.5">Benutzername</label>
            <input
              v-model="username"
              type="text"
              autocomplete="username"
              required
              class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-colors"
              placeholder="admin"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1.5">Passwort</label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                required
                class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 pr-10 text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                tabindex="-1"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              </button>
            </div>
          </div>

          <div v-if="errorMessage" class="flex items-start gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5">
            <i class="bi bi-exclamation-triangle-fill mt-0.5 shrink-0"></i>
            <span>{{ errorMessage }}</span>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-2.5 rounded-lg font-semibold text-sm transition-all mt-2"
            :class="loading
              ? 'bg-amber-600/50 text-amber-300 cursor-not-allowed'
              : 'bg-amber-500 hover:bg-amber-400 text-gray-950 cursor-pointer'"
          >
            <span v-if="loading" class="flex items-center justify-center gap-2">
              <i class="bi bi-arrow-clockwise animate-spin"></i>
              Wird angemeldet…
            </span>
            <span v-else>Anmelden</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth'

const router = useRouter()
const { login } = useAuth()

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')

async function handleLogin() {
  loading.value = true
  errorMessage.value = ''
  try {
    await login(username.value, password.value)
    router.push('/admin')
  } catch (err: any) {
    if (err.response?.status === 429) {
      errorMessage.value = 'Zu viele Versuche. Bitte warte 15 Minuten.'
    } else if (err.response?.status === 401) {
      errorMessage.value = 'Ungültige Anmeldedaten.'
    } else {
      errorMessage.value = 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.'
    }
  } finally {
    loading.value = false
  }
}
</script>
