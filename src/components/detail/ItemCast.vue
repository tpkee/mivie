<template>
  <router-link class="w-24" :to="getPath">
    <div class="w-full h-32 rounded-lg overflow-hidden bg-gray-800 mb-2">
      <img v-if="profileUrl" :src="profileUrl" loading="lazy" class="w-full h-full object-cover" />
      <div v-else class="w-full h-full flex items-center justify-center">
        <Icon icon="mdi:account" class="w-8 h-8 text-gray-600" />
      </div>
    </div>
    <p class="text-xs font-medium text-white truncate" :title="name">
      {{ name }}
    </p>
    <p class="text-xs text-gray-400 truncate" :title="character">
      {{ character }}
    </p>
  </router-link>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  id: number
  name: string
  character: string
  profileUrl: string
}>()
const getPath = computed(() => {
  return `/details/person/${props.id}`
})
</script>
