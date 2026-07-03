<script lang="ts">
  import { onMount } from 'svelte'
  import { apiClient } from '$lib/api/client'
  import { auth } from '$lib/stores/auth.svelte'

  const statCards = $state([
    { label: 'Hero',    to: '/admin/hero',    icon: 'bi-film',      count: 0, loading: true },
    { label: 'Studios', to: '/admin/studios', icon: 'bi-camera',    count: 0, loading: true },
    { label: 'News',    to: '/admin/news',    icon: 'bi-newspaper', count: 0, loading: true },
    { label: 'Team',    to: '/admin/team',    icon: 'bi-people',    count: 0, loading: true },
  ])

  let userCard = $state({ count: 0, loading: true })
  let usersRequested = false

  onMount(async () => {
    const [hero, studios, news, team] = await Promise.allSettled([
      apiClient.get('/api/hero'),
      apiClient.get('/api/studios'),
      apiClient.get('/api/news'),
      apiClient.get('/api/team'),
    ])
    if (hero.status    === 'fulfilled') statCards[0].count = hero.value.data.length
    if (studios.status === 'fulfilled') statCards[1].count = studios.value.data.length
    if (news.status    === 'fulfilled') statCards[2].count = news.value.data.length
    if (team.status    === 'fulfilled') statCards[3].count = team.value.data.length
    statCards.forEach(c => { c.loading = false })
  })

  // The role is only known once the token refresh completes — fetch lazily
  $effect(() => {
    if (auth.user?.role === 'admin' && !usersRequested) {
      usersRequested = true
      apiClient.get('/api/users')
        .then(({ data }) => { userCard.count = data.length })
        .finally(() => { userCard.loading = false })
    }
  })
</script>

<svelte:head><title>Dashboard – Admin</title></svelte:head>

<div class="mb-8">
  <h1 class="admin-page-title text-2xl">Dashboard</h1>
  <p class="admin-page-sub mt-1">Übersicht über alle Inhalte</p>
</div>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" class:xl:grid-cols-5={auth.user?.role === 'admin'}>
  {#each statCards as card}
    <a
      href={card.to}
      class="admin-card admin-stat-card rounded-xl p-6 transition-colors group block"
    >
      <div class="flex items-center justify-between mb-3">
        <span class="admin-page-sub" style="font-size: 13px; letter-spacing: 0.04em;">{card.label}</span>
        <i class="bi {card.icon} text-lg" style="color: var(--neon-cyan)"></i>
      </div>
      <div class="admin-page-title text-3xl">
        {#if card.loading}
          <span style="color: var(--ink-2)" class="text-xl">…</span>
        {:else}
          {card.count}
        {/if}
      </div>
      <div class="admin-empty mt-2 group-hover:transition-colors" style="font-size: 11px;">
        <span class="group-hover:opacity-80" style="color: var(--neon-cyan)">Verwalten →</span>
      </div>
    </a>
  {/each}

  {#if auth.user?.role === 'admin'}
    <a href="/admin/users" class="admin-card admin-stat-card rounded-xl p-6 transition-colors group block">
      <div class="flex items-center justify-between mb-3">
        <span class="admin-page-sub" style="font-size: 13px; letter-spacing: 0.04em;">Benutzer</span>
        <i class="bi bi-person-gear text-lg" style="color: var(--neon-cyan)"></i>
      </div>
      <div class="admin-page-title text-3xl">
        {#if userCard.loading}
          <span style="color: var(--ink-2)" class="text-xl">…</span>
        {:else}
          {userCard.count}
        {/if}
      </div>
      <div class="admin-empty mt-2 group-hover:transition-colors" style="font-size: 11px;">
        <span class="group-hover:opacity-80" style="color: var(--neon-cyan)">Verwalten →</span>
      </div>
    </a>
  {/if}
</div>
