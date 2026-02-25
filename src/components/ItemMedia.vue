<template>
  <div class="w-48 h-66">
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
            {{ score.toFixed(1) }}
          </p>
        </div>

        <div
          class="absolute opacity-0 text-ghost-white bg-black/60 backdrop-blur-lg p-2.5 group-hover:opacity-100 group-focus:opacity-100 size-full inset-0 transition-all duration-100 ease-linear z-10"
        >
          <p v-if="overview" class="text-sm mt-4 line-clamp-8">{{ overview }}</p>
        </div>

        <div class="text-ghost-white bg-black/50 backdrop-blur-sm p-2.5 max-h-fit">
          <i class="text-xs text-gray-400 leading-tight block">{{
            new Date(props.releaseYear).getFullYear()
          }}</i>
          <h3 class="text-base font-medium leading-tight line-clamp-2" :title="title">
            {{ title }}
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
import { ScoreTreshold } from '@/utils/media/scoreTreshold'

// Events
const emit = defineEmits<{
  toggleFavorite: []
  toggle: []
}>()

// Props
const props = defineProps<{
  id: number
  imageUrl: string
  title: string
  releaseYear: number | string
  score: number
  isFavorite: boolean
  type: MediaType
  overview?: Nullable<string>
}>()

// Computed
const getScoreColor = computed(() => {
  if (props.score >= ScoreTreshold.GOOD) return 'text-green-500'

  if (props.score >= ScoreTreshold.AVERAGE) return 'text-yellow-500'

  return 'text-red-500'
})
const getPath = computed(() => {
  switch (props.type) {
    case 'movie':
      return `/movie/${props.id}`
    case 'tv':
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
  @apply size-8 rounded-full bg-black/50 backdrop-blur-sm text-shadow-black/40 text-shadow-2xs;
}
</style>
