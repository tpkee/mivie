<template>
  <div class="w-40 md:w-48 h-66">
    <router-link :to="getPath" class="group">
      <div
        class="relative size-full bg-gray-700 rounded overflow-hidden cursor-pointer flex flex-col justify-between"
      >
        <img
          v-if="media.posterUrl"
          :src="media.posterUrl"
          fetchpriority="high"
          loading="lazy"
          class="size-full object-cover object-center rounded absolute inset-0"
        />
        <div class="flex items-center justify-between p-2.5">
          <app-fab
            class="group/icon"
            :class="{
              'hover:text-red-400 text-ghost-white': !inWatchlist,
              'hover:text-ghost-white text-red-400': inWatchlist,
            }"
            aria-label="Aggiungi alla watchlist"
            @click.prevent="watchlistStore.toggle(media)"
          >
            <Icon
              :icon="inWatchlist ? 'line-md:heart-filled' : 'line-md:heart'"
              class="size-6 m-auto group-hover/icon:scale-120 group-active/icon:scale-125 transition-all duration-250 ease-in-out"
            />
          </app-fab>

          <app-fab
            class="fab flex items-center justify-center text-sm font-semibold"
            :class="[getScoreColor]"
          >
            {{ media.voteAverage.toFixed(1) }}
          </app-fab>
        </div>

        <div class="text-ghost-white bg-black/50 backdrop-blur-sm p-2.5 max-h-fit">
          <i class="text-xs text-gray-400 leading-tight block">{{
            new Date(media.releaseDate).getFullYear()
          }}</i>
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
import { Icon } from '@iconify/vue'
import { ScoreTreshold } from '@/utils/media/misc'
import { useWatchlist } from '@/stores/watchlist'

import AppFab from '@/components/app/AppFab.vue'

// Stores
const watchlistStore = useWatchlist()

// Props
const props = defineProps<{
  media: Media
}>()

// Computed
const inWatchlist = computed(() => watchlistStore.watchlist.has(props.media.id))
const getScoreColor = computed(() => {
  if (props.media.voteAverage >= ScoreTreshold.GOOD) return 'text-green-500'

  if (props.media.voteAverage >= ScoreTreshold.AVERAGE) return 'text-yellow-500'

  return 'text-red-500'
})
const getPath = computed(() => `/${props.media.mediaType}/${props.media.id}`)
</script>
