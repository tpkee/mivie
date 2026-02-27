<template>
  <div class="w-full h-full">
    <router-link :to="getPath" class="group">
      <div
        class="relative w-full h-full aspect-2/3 bg-gray-700 rounded overflow-hidden cursor-pointer flex flex-col justify-between"
      >
        <img
          v-if="media.posterUrl"
          :src="media.posterUrl"
          fetchpriority="high"
          loading="lazy"
          class="w-full h-full object-cover object-center rounded absolute inset-0"
        />
        <div class="flex items-center justify-between p-2.5">
          <fab-watchlist :media="media" />

          <app-fab
            v-if="getReleaseDate && Date.now() > getReleaseDate.getTime() && media.voteAverage"
            class="fab flex items-center justify-center text-sm font-semibold"
            :class="[getScoreColor]"
          >
            {{ media.voteAverage.toFixed(1) }}
          </app-fab>
        </div>
        <div class="text-ghost-white bg-black/50 backdrop-blur-sm p-2.5 max-h-fit">
          <i class="text-xs text-gray-400 leading-tight block">{{ getDateLabel }}</i>
          <h3 class="text-base font-medium leading-tight line-clamp-2" :title="props.media.title">
            {{ media.title }}
          </h3>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import AppFab from '@/components/app/AppFab.vue'
import FabWatchlist from '@/components/FabWatchlist.vue'

import { useScoreAverage } from '@/composables/useScoreAverage'

// Props
const props = defineProps<{
  media: Media
}>()

// Computed
const getReleaseDate = computed(() =>
  props.media.releaseDate ? new Date(props.media.releaseDate) : null,
)
const getDateLabel = computed(() => {
  if (!getReleaseDate.value) {
    return 'TBA '
  }
  if (getReleaseDate.value.getTime() > Date.now()) {
    return `In uscita - ${new Intl.DateTimeFormat('it-IT', { year: 'numeric' }).format(getReleaseDate.value)}`
  }

  return new Intl.DateTimeFormat('it-IT', { year: 'numeric' }).format(getReleaseDate.value)
})
const getScoreColor = useScoreAverage(props.media.voteAverage)
const getPath = computed(() => `/details/${props.media.mediaType}/${props.media.id}`)
</script>
