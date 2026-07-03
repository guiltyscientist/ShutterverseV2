<script lang="ts">
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { apiClient } from '$lib/api/client'
  import { auth } from '$lib/stores/auth.svelte'
  import AdminModal from '$lib/components/admin/AdminModal.svelte'
  import ConfirmDialog from '$lib/components/admin/ConfirmDialog.svelte'
  import FormField from '$lib/components/admin/FormField.svelte'
  import FormError from '$lib/components/admin/FormError.svelte'

  const roles = [
    { value: 'admin',  label: 'Admin — Inhalte & Benutzerverwaltung' },
    { value: 'editor', label: 'Editor — nur Inhalte' },
  ]

  let items        = $state<any[]>([])
  let loading      = $state(true)
  let showModal    = $state(false)
  let editItem     = $state<any>(null)
  let deleteTarget = $state<any>(null)
  let saving       = $state(false)
  let formError    = $state('')

  const emptyForm = () => ({ username: '', email: '', role: 'editor', password: '' })
  let form = $state(emptyForm())

  // Editors have no business here — the API rejects them anyway (403)
  $effect(() => {
    if (auth.user && auth.user.role !== 'admin') goto('/admin')
  })

  async function load() {
    loading = true
    const { data } = await apiClient.get('/api/users')
    items = data
    loading = false
  }
  onMount(load)

  function openCreate() { editItem = null; form = emptyForm(); formError = ''; showModal = true }
  function openEdit(item: any) {
    editItem = item
    form = { username: item.username, email: item.email ?? '', role: item.role, password: '' }
    formError = ''; showModal = true
  }
  function closeModal() { showModal = false }

  async function deleteItem() {
    try {
      await apiClient.delete(`/api/users/${deleteTarget._id}`)
      deleteTarget = null
      await load()
    } catch (err: any) {
      formError = err.response?.data?.Error || 'Fehler beim Löschen.'
      deleteTarget = null
    }
  }

  async function submitForm(e: SubmitEvent) {
    e.preventDefault(); saving = true; formError = ''
    try {
      const payload: Record<string, string> = { email: form.email, role: form.role }
      if (form.password) payload.password = form.password
      if (editItem) {
        await apiClient.patch(`/api/users/${editItem._id}`, payload)
      } else {
        await apiClient.post('/api/users', { ...payload, username: form.username, password: form.password })
      }
      closeModal(); await load()
    } catch (err: any) { formError = err.response?.data?.Error || 'Fehler beim Speichern.'
    } finally { saving = false }
  }

  const isSelf = (item: any) => item.username === auth.user?.username
</script>

<svelte:head><title>Benutzer – Admin</title></svelte:head>

<div class="flex items-center justify-between mb-6">
  <div>
    <h1 class="admin-page-title text-2xl">Benutzer</h1>
    <p class="admin-page-sub mt-1">{items.length} Konten</p>
  </div>
  <button onclick={openCreate} class="btn-primary"><i class="bi bi-plus-lg mr-1.5"></i> Neuer Benutzer</button>
</div>

<FormError message={formError && !showModal ? formError : ''} />

<div class="space-y-3 mt-3">
  {#each items as item (item._id)}
    <div class="admin-card rounded-xl p-4 flex items-center gap-4">
      <div class="admin-thumb-fallback w-12 h-12 rounded-full shrink-0 flex items-center justify-center">
        <i class="bi {item.role === 'admin' ? 'bi-person-gear' : 'bi-person'}"></i>
      </div>
      <div class="flex-1 min-w-0">
        <div class="font-medium flex items-center gap-2" style="color: var(--ink-0)">
          {item.username}
          {#if isSelf(item)}<span class="admin-page-sub" style="letter-spacing: 0.08em;">(du)</span>{/if}
        </div>
        <div class="admin-page-sub mt-0.5 truncate" style="letter-spacing: 0.04em;">
          {item.email || 'Keine E-Mail hinterlegt'}
        </div>
      </div>
      <span class="text-xs px-2.5 py-1 rounded-full shrink-0 {item.role === 'admin' ? 'admin-badge-de' : 'admin-badge-en'}">
        {item.role === 'admin' ? 'Admin' : 'Editor'}
      </span>
      <div class="flex gap-2 shrink-0">
        <button onclick={() => openEdit(item)} class="btn-icon admin-icon-btn edit" aria-label="Bearbeiten"><i class="bi bi-pencil"></i></button>
        {#if !isSelf(item)}
          <button onclick={() => { deleteTarget = item }} class="btn-icon admin-icon-btn danger" aria-label="Löschen"><i class="bi bi-trash"></i></button>
        {/if}
      </div>
    </div>
  {/each}
  {#if !loading && items.length === 0}
    <div class="admin-empty text-center py-12">Keine Benutzer vorhanden.</div>
  {/if}
</div>

{#if showModal}
  <AdminModal title={editItem ? 'Benutzer bearbeiten' : 'Neuer Benutzer'} onclose={closeModal}>
    <form onsubmit={submitForm} class="space-y-4">
      <FormField label="Benutzername" required={true}>
        <input bind:value={form.username} type="text" class="input" disabled={!!editItem}
          pattern="[a-zA-Z0-9._\-]{'{'}3,40{'}'}" title="3–40 Zeichen: Buchstaben, Zahlen, . _ -" required />
      </FormField>
      <FormField label="E-Mail">
        <input bind:value={form.email} type="email" class="input" placeholder="name@example.com" autocomplete="off" />
      </FormField>
      <FormField label="Rolle" required={true}>
        <select bind:value={form.role} class="input" required>
          {#each roles as r}<option value={r.value}>{r.label}</option>{/each}
        </select>
      </FormField>
      <FormField label={editItem ? 'Neues Passwort' : 'Passwort'} required={!editItem}>
        <input bind:value={form.password} type="password" class="input"
          placeholder={editItem ? 'Leer lassen, um es zu behalten' : 'Mindestens 8 Zeichen'}
          minlength="8" autocomplete="new-password" required={!editItem} />
      </FormField>
      {#if editItem && (form.password || form.role !== editItem.role)}
        <p class="admin-info text-xs flex items-center gap-1.5">
          <i class="bi bi-info-circle"></i>
          Passwort- oder Rollenänderung meldet diesen Benutzer ab.
        </p>
      {/if}
      <FormError message={showModal ? formError : ''} />
      <div class="flex justify-end gap-3 pt-2">
        <button type="button" onclick={closeModal} class="btn-secondary">Abbrechen</button>
        <button type="submit" disabled={saving} class="btn-primary">{saving ? 'Wird gespeichert…' : editItem ? 'Speichern' : 'Erstellen'}</button>
      </div>
    </form>
  </AdminModal>
{/if}

{#if deleteTarget}
  <ConfirmDialog
    message={`Benutzer "${deleteTarget.username}" wirklich löschen?`}
    onconfirm={deleteItem}
    oncancel={() => { deleteTarget = null }}
  />
{/if}
