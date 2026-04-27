<template>
  <div class="min-h-screen bg-gray-950 flex">
    <!-- Sidebar -->
    <aside
      class="fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 border-r border-gray-800 flex flex-col transition-transform duration-300"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'"
    >
      <div class="flex items-center gap-3 px-6 py-5 border-b border-gray-800">
        <span class="text-amber-400 text-xl font-bold tracking-wide">Shutterverse</span>
        <span class="text-gray-500 text-sm font-medium">Admin</span>
      </div>

      <nav class="flex-1 py-6 px-3 space-y-1">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
          :class="isActive(item.to)
            ? 'bg-amber-500/15 text-amber-400'
            : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800'"
          @click="sidebarOpen = false"
        >
          <i :class="item.icon" class="text-base w-5 text-center"></i>
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="px-3 pb-6">
        <button
          @click="handleLogout"
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <i class="bi bi-box-arrow-left text-base w-5 text-center"></i>
          Abmelden
        </button>
      </div>
    </aside>

    <!-- Mobile overlay -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-30 bg-black/50 md:hidden"
      @click="sidebarOpen = false"
    ></div>

    <!-- Main content -->
    <div class="flex-1 md:ml-64 flex flex-col min-h-screen">
      <header class="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center gap-4 md:hidden">
        <button @click="sidebarOpen = !sidebarOpen" class="text-gray-400 hover:text-white">
          <i class="bi bi-list text-2xl"></i>
        </button>
        <span class="text-amber-400 font-bold">Admin Panel</span>
      </header>

      <main class="flex-1 p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const route = useRoute()
const router = useRouter()
const { logout } = useAuth()

const sidebarOpen = ref(false)

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: 'bi bi-grid' },
  { to: '/admin/studios', label: 'Studios', icon: 'bi bi-camera' },
  { to: '/admin/news', label: 'News', icon: 'bi bi-newspaper' },
  { to: '/admin/team', label: 'Team', icon: 'bi bi-people' },
]

function isActive(path: string) {
  if (path === '/admin') return route.path === '/admin'
  return route.path.startsWith(path)
}

async function handleLogout() {
  await logout()
  router.push('/admin/login')
}
</script>
