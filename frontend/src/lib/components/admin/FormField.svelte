<script lang="ts">
  let { label, required = false, children }: { label: string; required?: boolean; children: any } = $props()
</script>

<div>
  <label class="admin-label block mb-1.5">
    {label}{#if required}<span class="admin-required ml-0.5">*</span>{/if}
  </label>
  {@render children()}
</div>
