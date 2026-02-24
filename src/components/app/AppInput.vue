<template>
  <div :class="attrs.class as Nullable<string>">
    <label :for="uid">
      <span
        v-if="label"
        :class="{
          'sr-only': srOnlyLabel,
        }"
        class="block mb-0.5 relative"
      >
        {{ label }}
      </span>

      <span
        class="cursor-text flex items-center px-1.5 py-1 bg-gray-800 appearance-none border placeholder:italic placeholder:text-gray-500 border-gray-700 focus:outline-none focus-within:border-purple-600 hover:border-purple-600 transition-all transition-duration-300 rounded disabled:opacity-75"
      >
        <span v-show="slots.left" aria-hidden>
          <slot name="left" />
        </span>

        <input :id="uid" v-bind="attrs" v-model="modelValue" class="focus:outline-none w-full" />

        <span v-show="slots.right" aria-hidden>
          <slot name="right" />
        </span>
      </span>
    </label>
  </div>
</template>

<script lang="ts" setup>
import { useAttrs, useId, useSlots } from 'vue'

defineOptions({
  inheritAttrs: false,
})

// Props
defineProps<{
  label?: string
  srOnlyLabel?: boolean
}>()

// V-Model(s)
const modelValue = defineModel()

// Non-reactive state
const uid = useId()
const attrs = useAttrs()
const slots = useSlots()
</script>
