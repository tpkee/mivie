<template>
  <component
    :is="type"
    class="fab transition-all size-9 rounded-full bg-black/50 backdrop-blur-sm text-shadow-black/40 text-shadow-2xs"
    :class="{
      'cursor-pointer': type === 'button',
    }"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    type?: 'button' | 'span'
  }>(),
  {
    type: 'button',
  },
)
</script>
