<template>
  <component
    :is="type"
    class="fab transition-all size-9 rounded-full backdrop-blur-sm text-shadow-black/40 text-shadow-2xs"
    :class="{
      'cursor-pointer': type === 'button',
      'bg-ghost-white/20': background === 'white',
      'bg-black/50': background === 'black',
    }"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    type?: 'button' | 'span'
    background?: 'black' | 'white'
  }>(),
  {
    type: 'button',
    background: 'black',
  },
)
</script>
