<script lang="ts">
  import { modalEnter } from '$lib/animations/transitions'
  let { message, onconfirm, oncancel }: { message: string; onconfirm: () => void; oncancel: () => void } = $props()
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center p-4">
  <div class="admin-modal-overlay absolute inset-0" onclick={oncancel}></div>
  <div use:modalEnter class="admin-modal relative rounded-2xl w-full max-w-sm p-6 shadow-2xl">
    <div class="flex items-start gap-3 mb-5">
      <div class="admin-confirm-icon w-10 h-10 rounded-full flex items-center justify-center shrink-0">
        <i class="bi bi-exclamation-triangle"></i>
      </div>
      <div>
        <h3 class="admin-confirm-title mb-1">Löschen bestätigen</h3>
        <p class="admin-confirm-msg text-sm">{message}</p>
      </div>
    </div>
    <div class="flex justify-end gap-3">
      <button onclick={oncancel} class="btn-secondary">Abbrechen</button>
      <button onclick={onconfirm} class="admin-danger-btn text-sm font-medium px-4 py-2 rounded-lg transition-colors">
        Löschen
      </button>
    </div>
  </div>
</div>
