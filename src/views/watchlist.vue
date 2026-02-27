<template>
  <div>
    <table-media title="La tua Watchlist" :is-fetching="isPending" :list="getList" />
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useQueries } from '@tanstack/vue-query'
import { useWatchlist } from '@/stores/watchlist'
import { parseMedia } from '@/utils/media/parseResponse'

import TableMedia from '@/components/TableMedia.vue'
import { BASE_TMDB_LANGUAGE } from '@/utils/media/misc'
import { useCustomFetch } from '@/composables/useCustomFetch'
import { hToMs } from '@/utils/common/hToMs'

// Stores
const watchlistStore = useWatchlist()

// Non reactive state
const cacheLifetime = hToMs(24)

// Reactive state
const getQueries = computed(() =>
  Array.from(watchlistStore.watchlist.values()).map((media) => ({
    queryKey: ['watchlist', media.mediaType, media.id],
    queryFn: () =>
      useCustomFetch<MediaResponse>(
        `/${media.mediaType}/${media.id}?language=${BASE_TMDB_LANGUAGE}`,
      ),
    select: (raw: MediaResponse | Media) => {
      if ('fetchedAt' in raw) {
        return raw as Media
      }

      return parseMedia(raw, media.mediaType)
    },
    initialData: media,
    initialDataUpdatedAt: media.fetchedAt ?? 0,
    enabled: true,
    staleTime: cacheLifetime,
  })),
)

// Fetching
const combinedQueries = useQueries({
  queries: getQueries,
  combine: (results) => ({
    data: results.map((result) => result.data),
    pending: results.some((result) => result.isFetching),
  }),
})

// Computed
const isPending = computed(() => combinedQueries.value.pending)
const getList = computed(() => combinedQueries.value.data as Media[])

// Watchers
watch(
  getList,
  (list) => {
    list.forEach((media) => {
      if (media.fetchedAt !== watchlistStore.watchlist.get(media.id)?.fetchedAt) {
        watchlistStore.watchlist.set(media.id, media)
      }
    })
  },
  { immediate: true, deep: true },
)
</script>
