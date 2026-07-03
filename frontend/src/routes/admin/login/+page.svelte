<script lang="ts">
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { auth } from '$lib/stores/auth.svelte'
  import { clickBounce } from '$lib/animations/transitions'

  let username = $state('')
  let password = $state('')
  let error    = $state('')
  let loading  = $state(false)

  onMount(async () => {
    if (auth.isAuthenticated) { goto('/admin'); return }
    const ok = await auth.refreshToken()
    if (ok) goto('/admin')
  })

  async function submit(e: SubmitEvent) {
    e.preventDefault()
    error = ''
    loading = true
    try {
      await auth.login(username, password)
      goto('/admin')
    } catch (err: any) {
      error = err.response?.data?.Error ?? 'Anmeldung fehlgeschlagen.'
    } finally {
      loading = false
    }
  }
</script>

<svelte:head><title>Admin Login – Shutterverse</title></svelte:head>

<div class="admin-shell flex items-center justify-center p-4">
  <div class="w-full max-w-sm">
    <div class="text-center mb-8">
      <div class="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style="background: rgba(0,240,255,0.12)">
        <i class="bi bi-camera text-2xl" style="color: var(--neon-cyan)"></i>
      </div>
      <h1 class="admin-page-title text-2xl">Admin Login</h1>
      <p class="admin-page-sub mt-1">Shutterverse Backend</p>
    </div>

    <form onsubmit={submit} class="admin-card rounded-2xl p-6 space-y-4">
      <div>
        <label class="admin-label block mb-1.5">Benutzername</label>
        <input
          bind:value={username}
          type="text"
          class="input"
          placeholder="admin"
          autocomplete="username"
          required
        />
      </div>
      <div>
        <label class="admin-label block mb-1.5">Passwort</label>
        <input
          bind:value={password}
          type="password"
          class="input"
          placeholder="••••••••"
          autocomplete="current-password"
          required
        />
      </div>

      {#if error}
        <div class="admin-error flex items-center gap-2 text-sm rounded-lg px-3 py-2.5">
          <i class="bi bi-exclamation-triangle-fill shrink-0"></i>
          <span>{error}</span>
        </div>
      {/if}

      <button type="submit" use:clickBounce disabled={loading} class="btn-primary w-full justify-center py-2.5">
        {#if loading}
          <i class="bi bi-arrow-clockwise animate-spin mr-2"></i>
        {/if}
        Anmelden
      </button>
    </form>
  </div>
</div>
