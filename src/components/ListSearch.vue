<template>
  <div v-show="hasSearched" class="overflow-y-auto max-h-80">
    <ul v-if="list.length">
      <item-search v-for="item in list" :key="item.id" :result="item" @close="emit('close')" />
    </ul>

    <p v-else-if="error" class="px-3 py-4 text-sm text-red-500 text-center">
      {{ error }}
    </p>
    <p v-else-if="!isFetching" class="px-3 py-4 text-sm text-gray-400 text-center">
      Nessun risultato trovato.
    </p>

    <div v-if="isFetching" class="flex justify-center py-3">
      <Icon icon="line-md:loading-loop" class="w-6 h-6 text-gray-400" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import ItemSearch from './ItemSearch.vue'

defineProps<{
  list: SearchResult[]
  isFetching?: boolean
  canLoadMore?: boolean
  error?: string
  hasSearched?: boolean
}>()

const emit = defineEmits<{ close: [] }>()
</script>
