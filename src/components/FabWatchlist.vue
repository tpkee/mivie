<template>
  <app-fab
    class="group/icon"
    :class="{
      'hover:text-red-400 text-ghost-white': !inWatchlist,
      'hover:text-ghost-white text-red-400': inWatchlist,
    }"
    :background="background"
    aria-label="Aggiungi alla watchlist"
    @click.prevent="watchlistStore.toggle(media)"
  >
    <Icon
      :icon="inWatchlist ? 'line-md:heart-filled' : 'line-md:heart'"
      class="size-6 m-auto group-hover/icon:scale-120 group-active/icon:scale-125 transition-all duration-250 ease-in-out"
    />
  </app-fab>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

import AppFab from './app/AppFab.vue'
import { useWatchlist } from '@/stores/watchlist'

const watchlistStore = useWatchlist()

const props = defineProps<{
  media: Media
  background?: 'black' | 'white'
}>()

const inWatchlist = computed(() => watchlistStore.watchlist.has(props.media.id))
</script>
