<template>
  <div>
    <h1 class="text-2xl font-semibold mb-2.5">Film più popolari nell'ultima settimana</h1>
    <list-media :is-loading="isFetching" :error="error?.message" :list="getList" />
  </div>
</template>

<script setup lang="ts">
import ListMedia from '@/components/ListMedia.vue'
import { useRequest } from '@/composables/useRequest'
import { parseResponse } from '@/utils/media/parseResponse'
import { computed } from 'vue'
//api.themoviedb.org/3/trending/movie/{time_window}

const { data, isFetching, error } = useRequest<PaginatedRequest<MediaResponse>>(
  '/trending/movie/week',
  {
    initialData: () => ({
      page: 0,
      results: [],
      total_pages: 0,
      total_results: 0,
    }),
  },
)
  .get()
  .json()

const getList = computed<Media[]>(() => {
  if (!Array.isArray(data.value?.results) || !data.value.results.length) return []

  return parseResponse(data.value.results)
})
</script>
