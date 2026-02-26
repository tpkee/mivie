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
import { parseResponse } from '@/utils/media/parseResponse'

import TableMedia from '@/components/TableMedia.vue'
import { BASE_TMDB_LANGUAGE } from '@/utils/media/misc'
import { useCustomQuery } from '@/composables/useCustomQuery'

// Fetching
const { data, isFetching, error } = useCustomQuery<
  PaginatedRequestResponse<MediaResponse>,
  Media[]
>(`/trending/movie/week?language=${BASE_TMDB_LANGUAGE}`, {
  parser: (raw) => parseResponse(raw.results),
})
</script>
