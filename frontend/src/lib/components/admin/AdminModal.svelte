<script lang="ts">
  import { modalEnter } from '$lib/animations/transitions'
  let { title, onclose, children }: { title: string; onclose: () => void; children: any } = $props()
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center p-4">
  <div class="admin-modal-overlay absolute inset-0" onclick={onclose}></div>
  <div
    use:modalEnter
    class="admin-modal relative rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl"
  >
    <div class="admin-modal-header flex items-center justify-between px-6 py-4 shrink-0">
      <h2 class="admin-modal-title">{title}</h2>
      <button onclick={onclose} class="admin-modal-close" aria-label="Schließen">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>
    <div class="overflow-y-auto min-h-0 p-6">
      {@render children()}
    </div>
  </div>
</div>
