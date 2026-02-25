<template>
  <div class="max-w-48 h-66">
    <router-link :to="getPath" class="group">
      <div
        class="relative size-full bg-gray-700 bg-cover bg-center rounded overflow-hidden cursor-pointer flex flex-col justify-between"
        :style="{
          backgroundImage: `url(${props.imageUrl})`,
        }"
      >
        <div class="flex items-center justify-between default-padding">
          <button
            class="fab transition-all cursor-pointer group/icon"
            :class="{
              'hover:text-red-400': isFavorite,
              'hover:text-ghost-white': !isFavorite,
            }"
            aria-label="Toggle favorite"
            @click.stop.prevent="emit('toggle')"
          >
            <Icon
              :icon="isFavorite ? 'line-md:heart-filled' : 'line-md:heart'"
              class="w-5 h-5 m-auto group-hover/icon:scale-120 transition-all duration-250 ease-in-out"
            />
          </button>

          <p
            class="fab flex items-center justify-center text-sm font-semibold"
            :class="[getScoreColor]"
          >
            {{ getScore }}
          </p>
        </div>

        <div
          class="text-ghost-white bg-black/50 backdrop-blur-sm p-2.5 h-14 group-hover:h-66 group-focus:h-66 transition-all duration-300 ease-linear"
        >
          <p class="text-xs text-gray-200">{{ releaseYear }}</p>
          <h3 class="text-lg font-medium leading-tight line-clamp-2">{{ title }}</h3>
          <p class="text-sm mt-4 line-clamp-7">{{ overview }}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'

// Types
type MediaType = 'movie' | 'series'

interface Props {
  id: number
  imageUrl: string
  title: string
  releaseYear: number | string
  score: number
  isFavorite: boolean
  type: MediaType
  overview: string
}

// Events
const emit = defineEmits<{
  toggleFavorite: []
  toggle: []
}>()

// Props
const props = defineProps<Props>()

// Computed
const getScore = computed(() => (Number.isNaN(props.score) ? 0 : props.score))
const getScoreColor = computed(() => {
  if (getScore.value >= 70) return 'text-green-500'

  if (getScore.value >= 40) return 'text-yellow-500'

  return 'text-red-500'
})
const getPath = computed(() => {
  switch (props.type) {
    case 'movie':
      return `/movie/${props.id}`
    case 'series':
      return `/series/${props.id}`
    default:
      return '#'
  }
})
</script>

<style scoped>
@reference "#tailwindcss";

.default-padding {
  @apply p-2.5;
}

.fab {
  @apply size-8 rounded-full bg-black/40 backdrop-blur-sm;
}
</style>
