<template>
  <div>
    <table-media
      title="Film più popolari nell'ultima settimana"
      :is-fetching="isFetching"
      :error="error?.message"
      :list="getList"
    />
  </div>
</template>

<script setup lang="ts">
import { useRequest } from '@/composables/useRequest'
import { parseResponse } from '@/utils/media/parseResponse'
import { computed } from 'vue'

import TableMedia from '@/components/TableMedia.vue'

// Fetching
const { data, isFetching, error } = useRequest<PaginatedRequest<MediaResponse>>(
  '/trending/movie/week',
)
  .get()
  .json()

// Computed
const getList = computed<Media[]>(() => parseResponse(data.value?.results ?? []))
</script>
