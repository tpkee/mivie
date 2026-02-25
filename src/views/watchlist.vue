<template>
  <div>
    <table-media title="La tua Watchlist" :is-fetching="isPending" :list="entries" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useWatchlist } from '@/stores/watchlist'
import { useRequest } from '@/composables/useRequest'
import { parseMedia } from '@/utils/media/parseResponse'

import TableMedia from '@/components/TableMedia.vue'

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
    if (!media.fetchedAt || Date.now() - media.fetchedAt > cacheLifetime) {
      staleMedia.push(media)
    }
  }

  if (staleMedia.length === 0) return

  isPending.value = true

  try {
    await Promise.all(
      staleMedia.map(async (media: Media) => {
        const { data, error } = await useRequest(`/${media.mediaType}/${media.id}`)
          .get()
          .json<MediaResponse>()

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
