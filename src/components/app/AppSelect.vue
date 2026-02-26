<template>
  <div :class="attrs.class ?? ''">
    <label :for="uid">
      <span
        v-if="label"
        :class="{
          'sr-only': srOnlyLabel,
        }"
        class="block mb-0.5"
      >
        {{ label }}
      </span>
      <select
        :id="uid"
        v-model="modelValue"
        class="px-1.5 py-1 bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-600 hover:border-purple-600 transition-all transition-duration-300 rounded disabled:opacity-75"
        v-bind="attrs"
      >
        <option
          v-for="(option, index) in options"
          :key="index"
          :value="option.value"
          :disabled="option.disabled"
          :selected="option.selected"
        >
          {{ option.label }}
        </option>
      </select>
    </label>
  </div>
</template>

<script lang="ts" setup>
import { useAttrs, useId } from 'vue'

interface Option {
  value: Nullable<string | number>
  label: string
  disabled?: boolean
  selected?: boolean
}

// Props
defineProps<{
  label?: string
  srOnlyLabel?: boolean
  options: Option[]
}>()

const modelValue = defineModel()

// Non-reactive state
const uid = useId()
const attrs = useAttrs()
</script>
