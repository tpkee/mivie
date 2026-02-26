<template>
  <span
    class="inline-flex items-center gap-1 px-2 py-2 rounded-full border transition-all transition-duration-300"
    :class="{
      'border-gray-700 bg-gray-900 hover:border-purple-600 hover:bg-gray-800': !active,
      'border-purple-600 bg-purple-700 hover:bg-purple-800': active,
    }"
  >
    <span v-if="slots.icon" class="shrink-0" aria-hidden>
      <slot name="icon" />
    </span>

    <span v-if="text || slots.default" class="text-xs">
      <slot>{{ text }}</slot>
    </span>
  </span>
</template>

<script lang="ts" setup>
import { useSlots } from 'vue'

withDefaults(
  defineProps<{
    text?: string
    active?: boolean
  }>(),
  {
    active: false,
  },
)

const slots = useSlots()
</script>
