<template>
  <div ref="container" class="relative w-full" @keydown.esc="closeDropdown">
    {{ results }}
    <app-input
      v-model="filters.query"
      placeholder="Cerca film, serie TV, attori..."
      autocomplete="off"
      @focus="openDropdown"
    >
      <template #left>
        <Icon icon="mi:search" class="w-6" />
      </template>
      <template #right v-if="isDebouncing">
        <Icon icon="line-md:loading-loop" class="w-6 h-6 text-gray-400" />
      </template>
    </app-input>

    <transition>
      <div
        v-if="isDropdownOpen"
        class="absolute z-40 mt-1 w-full rounded border border-gray-700 bg-gray-900 shadow-lg overflow-hidden"
      >
        <search-filters
          v-model:filters="filters"
          v-model:type="selectedMedia"
          :tv-genres="tvGenres"
          :movie-genres="movieGenres"
        />

        <div v-show="hasSearched" ref="scrollContainer">
          <list-search
            :list="results"
            :is-fetching="isFetching"
            :can-load-more="canLoadMore"
            :error="error"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { computed, ref, shallowRef, useTemplateRef, watch } from 'vue'
import { Icon } from '@iconify/vue'

import { useCustomFetch } from '@/composables/useCustomFetch'
import { useDebounce } from '@/composables/useDebounce'
import { parseResponse as parseGenreResponse } from '@/utils/genre/parseResponse'
import { parseResponse as parseSearchResponse } from '@/utils/search/parseResponse'
import { BASE_TMDB_LANGUAGE } from '@/utils/media/misc'
import { useInfiniteFetch } from '@/composables/useInfiniteFetch'

import SearchFilters from './SearchFilters.vue'
import ListSearch from './ListSearch.vue'
import AppInput from './app/AppInput.vue'

// Template refs
const refContainer = useTemplateRef('container')
const refScrollContainer = useTemplateRef('scrollContainer')

// Reactive state
const selectedMedia = ref<SearchType>('all')
const filters = ref<SearchFilters>({
  query: '',
  genre: null,
  year: null,
})
const filtersDebounced = shallowRef<RecursivePartial<SearchFilters>>({})
const { isDebouncing } = useDebounce(filters, filtersDebounced, 350)
const isDropdownOpen = ref(false)

// Computed
const hasSearched = computed(() => {
  return (
    filtersDebounced.value.query ||
    filtersDebounced.value.genre ||
    filtersDebounced.value.year != null
  )
})
const getSearchUrl = computed(() => {
  const query = filtersDebounced.value?.query
  const year = filtersDebounced.value?.year
  const genre = filtersDebounced.value?.genre

  if (!hasSearched.value) return ''

  const searchUrl = {
    all: '/search/multi',
    movie: '/discover/movie',
    tv: '/discover/tv',
  }[selectedMedia.value]

  const params = new URLSearchParams({
    query: query?.trim() ?? '',
    language: BASE_TMDB_LANGUAGE,
  })

  if (genre) {
    params.append('with_genres', genre.toString())
  }

  if (year) {
    params.append('year', year.toString())
  }

  return `${searchUrl}?${params.toString()}`
})

// Fetching
const { results, canLoadMore, error, isFetching, resetResults, resetScrollbox } =
  useInfiniteFetch<SearchResult>(getSearchUrl, refScrollContainer, (arr) => {
    const type = selectedMedia.value === 'all' ? undefined : selectedMedia.value
    return parseSearchResponse(arr, type)
  })

const { data: movieGenres } = useCustomFetch<Genre[]>(
  `/genre/movie/list?language=${BASE_TMDB_LANGUAGE}`,
  {
    afterFetch(ctx) {
      ctx.data = parseGenreResponse(ctx.data)

      return ctx
    },
    initialData: [],
  },
)

const { data: tvGenres } = useCustomFetch<Genre[]>(
  `/genre/tv/list?language=${BASE_TMDB_LANGUAGE}`,
  {
    afterFetch(ctx) {
      ctx.data = parseGenreResponse(ctx.data)

      return ctx
    },
    initialData: [],
  },
)

// Watchers
watch(selectedMedia, () => {
  resetScrollbox()
  resetResults()
})

// Functions
function openDropdown() {
  isDropdownOpen.value = true
}

function closeDropdown() {
  isDropdownOpen.value = false
}

// Misc
onClickOutside(refContainer, () => {
  resetScrollbox()
  isDropdownOpen.value = false
})
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
