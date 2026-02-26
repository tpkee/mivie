<template>
  <div>
    <table-media title="La tua Watchlist" :is-fetching="isPending" :list="entries" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useWatchlist } from '@/stores/watchlist'
import { useCustomFetch } from '@/composables/useCustomFetch'
import { parseMedia } from '@/utils/media/parseResponse'

import TableMedia from '@/components/TableMedia.vue'
import { BASE_TMDB_LANGUAGE } from '@/utils/media/misc'

// Stores
const watchlistStore = useWatchlist()

// Reactive state
const isPending = ref(false)
const entries = computed<Media[]>(() => Array.from(watchlistStore.watchlist.values()))

// Non reactive state
const cacheLifetime = 1000 * 3600 * 12

// Watchers
watch(() => watchlistStore.watchlist.size, refreshStaleEntries)

// Functions
async function refreshStaleEntries() {
  const staleMedia = []

  for (const media of watchlistStore.watchlist.values()) {
    // since we save the entire media object there is a chance the data will actually go stale (es: a movie gets postponed etc.)
    // scores are even worse since they are likely to change, so we need to refresh the data. Unfortunately, there isn't a bulk fetch endpoint so we have to quietly update the stale data while showing the user the old one

    if (!media.fetchedAt || Date.now() - media.fetchedAt > cacheLifetime) {
      staleMedia.push(media)
    }
  }

  if (staleMedia.length === 0) return

  isPending.value = true

  try {
    await Promise.all(
      staleMedia.map(async (media: Media) => {
        const { data, error } = await useCustomFetch<MediaResponse>(
          `/${media.mediaType}/${media.id}?language=${BASE_TMDB_LANGUAGE}`,
        )

        if (error.value || !data.value) return

        const parsed = parseMedia(data.value, media.mediaType)

        if (parsed) {
          watchlistStore.watchlist.set(media.id, parsed)
        }
      }),
    )
  } catch (e) {
    console.error('Error refreshing watchlist entries:', e)
  } finally {
    isPending.value = false
  }
}

// Lifecycle
onMounted(refreshStaleEntries)
</script>
