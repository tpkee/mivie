<template>
  <li class="flex items-center gap-3 px-3 py-2 hover:bg-gray-800 cursor-pointer transition-colors">
    <img
      v-if="result.posterUrl"
      :src="result.posterUrl"
      class="w-8 h-12 object-cover rounded shrink-0"
    />
    <div v-else class="w-8 h-12 bg-gray-700 rounded shrink-0 flex items-center justify-center">
      <Icon icon="mdi:image-off" class="text-gray-500 w-4 h-4" />
    </div>
    xxx{{ result }}

    <div class="min-w-0">
      <p class="text-sm font-medium text-white truncate">{{ result.name }}</p>
      <p class="text-xs text-gray-400">
        {{ getMediaLabel }}
      </p>
    </div>
  </li>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

const props = defineProps<{
  result: SearchResult
}>()

const getMediaLabel = computed(() => {
  switch (props.result.mediaType) {
    case 'movie':
      return 'Film'
    case 'tv':
      return 'Serie TV'
    default:
      return 'Attore'
  }
})
</script>
