<template>
  <div
    class="max-w-48 h-66 rounded overflow-hidden bg-gray-700 relative flex flex-col justify-end animate-pulse"
  >
    <div class="bg-black/40 backdrop-blur-sm p-2.5 space-y-2.5">
      <div class="h-3 w-12 rounded bg-gray-500/80" aria-hidden="true" />
      <div class="h-5 w-36 rounded bg-gray-400/80" aria-hidden="true" />
    </div>
  </div>
</template>

<style scoped>
@reference "#tailwindcss";

.default-padding {
  @apply p-2.5;
}

.fab {
  @apply size-8 rounded-full backdrop-blur-sm;
}
</style>
