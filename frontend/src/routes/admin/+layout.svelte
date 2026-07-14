<script lang="ts">
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import { auth } from '$lib/stores/auth.svelte'
  import { pageEnter } from '$lib/animations/transitions'

  let { children } = $props()
  let sidebarOpen = $state(false)

  const navItems = $derived([
    { to: '/admin', label: 'Dashboard', icon: 'bi-grid' },
    { to: '/admin/hero', label: 'Hero', icon: 'bi-film' },
    { to: '/admin/studios', label: 'Studios', icon: 'bi-camera' },
    { to: '/admin/news', label: 'News', icon: 'bi-newspaper' },
    { to: '/admin/team', label: 'Team', icon: 'bi-people' },
    ...(auth.user?.role === 'admin'
      ? [{ to: '/admin/users', label: 'Benutzer', icon: 'bi-person-gear' }]
      : []),
  ])

  function isActive(path: string) {
    if (path === '/admin') return $page.url.pathname === '/admin'
    return $page.url.pathname.startsWith(path)
  }

  async function handleLogout() {
    await auth.logout()
    goto('/admin/login')
  }

  onMount(async () => {
    if ($page.url.pathname === '/admin/login') return
    if (!auth.isAuthenticated) {
      const ok = await auth.refreshToken()
      if (!ok) goto('/admin/login')
    }
  })
</script>

{#if $page.url.pathname === '/admin/login'}
  {@render children()}
{:else}
  <div class="admin-shell flex">
    <!-- Sidebar -->
    <aside
      class="admin-sidebar fixed inset-y-0 left-0 z-40 w-64 flex flex-col transition-transform duration-300 md:translate-x-0"
      class:-translate-x-full={!sidebarOpen}
      class:translate-x-0={sidebarOpen}
    >
      <div class="flex items-center gap-3 px-6 py-5" style="border-bottom: 1px solid rgba(255,255,255,0.08)">
        <span class="admin-sidebar-brand text-xl">Shutterverse</span>
        <span class="admin-sidebar-tag">Admin</span>
      </div>

      <nav class="flex-1 py-6 px-3 space-y-1">
        {#each navItems as item}
          <a
            href={item.to}
            onclick={() => { sidebarOpen = false }}
            class="admin-nav-link flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors"
            class:active={isActive(item.to)}
          >
            <i class="bi {item.icon} text-base w-5 text-center"></i>
            {item.label}
          </a>
        {/each}
      </nav>

      <div class="px-3 pb-6">
        <button
          onclick={handleLogout}
          class="admin-logout-btn w-full flex items-center gap-3 px-3 py-2.5 rounded-lg"
        >
          <i class="bi bi-box-arrow-left text-base w-5 text-center"></i>
          Abmelden
        </button>
      </div>
    </aside>

    <!-- Mobile overlay -->
    {#if sidebarOpen}
      <div class="admin-modal-overlay fixed inset-0 z-30 md:hidden" onclick={() => { sidebarOpen = false }}></div>
    {/if}

    <!-- Main content -->
    <div class="flex-1 md:ml-64 flex flex-col min-h-screen">
      <header class="admin-topbar px-6 py-4 flex items-center gap-4 md:hidden">
        <button onclick={() => { sidebarOpen = !sidebarOpen }} class="admin-icon-btn" aria-label="Menü umschalten">
          <i class="bi bi-list text-2xl"></i>
        </button>
        <span class="admin-sidebar-brand">Admin Panel</span>
      </header>

      <main class="flex-1 p-6" use:pageEnter>
        {#key $page.url.pathname}
          <div use:pageEnter>
            {@render children()}
          </div>
        {/key}
      </main>
    </div>
  </div>
{/if}
