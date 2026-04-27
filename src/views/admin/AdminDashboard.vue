<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-white">Dashboard</h1>
      <p class="text-gray-500 text-sm mt-1">Übersicht über alle Inhalte</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <RouterLink
        v-for="card in statCards"
        :key="card.to"
        :to="card.to"
        class="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-amber-500/50 transition-colors group"
      >
        <div class="flex items-center justify-between mb-3">
          <span class="text-gray-400 text-sm font-medium">{{ card.label }}</span>
          <i :class="card.icon" class="text-amber-400 text-lg"></i>
        </div>
        <div class="text-3xl font-bold text-white">
          <span v-if="card.loading" class="text-gray-600 text-xl">…</span>
          <span v-else>{{ card.count }}</span>
        </div>
        <div class="text-xs text-gray-600 mt-2 group-hover:text-amber-500 transition-colors">
          Verwalten →
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useApiClient } from '../../composables/useApiClient'

const { apiClient } = useApiClient()

const statCards = ref([
  { label: 'Studios', to: '/admin/studios', icon: 'bi bi-camera', count: 0, loading: true },
  { label: 'News', to: '/admin/news', icon: 'bi bi-newspaper', count: 0, loading: true },
  { label: 'Team', to: '/admin/team', icon: 'bi bi-people', count: 0, loading: true },
])

onMounted(async () => {
  const [studios, news, team] = await Promise.allSettled([
    apiClient.get('/api/studios'),
    apiClient.get('/api/news'),
    apiClient.get('/api/team'),
  ])

  if (studios.status === 'fulfilled') {
    statCards.value[0]!.count = studios.value.data.length
  }
  if (news.status === 'fulfilled') {
    statCards.value[1]!.count = news.value.data.length
  }
  if (team.status === 'fulfilled') {
    statCards.value[2]!.count = team.value.data.length
  }

  statCards.value.forEach(c => { if (c) c.loading = false })
})
</script>
