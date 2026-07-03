<script lang="ts">
  let { message }: { message: string } = $props()
</script>

{#if message}
  <div class="admin-error flex items-start gap-2 text-sm rounded-lg px-3 py-2.5">
    <i class="bi bi-exclamation-triangle-fill mt-0.5 shrink-0"></i>
    <span>{message}</span>
  </div>
{/if}
