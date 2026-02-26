<template>
  <div>
    <table-media
      title="Film più popolari nell'ultima settimana"
      :is-fetching="isFetching"
      :error="error?.message"
      :list="data ?? []"
    />
  </div>
</template>

<script setup lang="ts">
import { useCustomFetch } from '@/composables/useCustomFetch'
import { parseResponse } from '@/utils/media/parseResponse'
import { computed } from 'vue'

import TableMedia from '@/components/TableMedia.vue'
import { BASE_TMDB_LANGUAGE } from '@/utils/media/misc'

// Computed
const getUrl = computed(() => {
  return `/trending/movie/week?language=${BASE_TMDB_LANGUAGE}`
})

// Fetching
const { data, isFetching, error } = useCustomFetch<Media[]>(getUrl, {
  afterFetch: (ctx) => {
    ctx.data = parseResponse(ctx.data.results)

    return ctx
  },
  initialData: [],
})
</script>
