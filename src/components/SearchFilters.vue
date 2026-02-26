<template>
  <div>
    <div class="p-2 border-b border-gray-700 bg-gray-800">
      <div class="flex items-center gap-2.5" role="radiogroup" aria-label="Filtra per">
        <h3 class="text-sm">Filtra per</h3>

        <label
          v-for="(item, index) in filterTypes"
          :key="index"
          class="inline-flex cursor-pointer select-none"
        >
          <input v-model="selectedMedia" type="radio" :value="item.type" class="hidden" />

          <app-chip :active="selectedMedia === item.type">
            <template v-if="item.icon" #icon>
              <Icon :icon="item.icon" class="w-4 h-4 text-white" />
            </template>
            {{ item.label }}
          </app-chip>
        </label>
      </div>

      <transition name="slide-fade">
        <div
          v-if="selectedMedia !== 'all'"
          class="mt-2 items-center gap-2.5 text-sm text-gray-300 grid grid-cols-2 max-w-xs"
        >
          <app-input
            label="Anno di uscita"
            v-model.number="filters.year"
            type="number"
            inputmode="numeric"
            step="1"
            :min="1000"
            :max="9999"
            :placeholder="new Date().getFullYear()"
            class="w-full"
            @keydown.enter="setCurrentYear"
            @keydown.up="setCurrentYear"
            @keydown.down="setCurrentYear"
          />
          <app-select
            v-if="getGenres.length"
            v-model="filters.genre"
            label="Genere"
            :options="getGenres"
            class="w-full"
          ></app-select>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue'
import AppChip from '@/components/app/AppChip.vue'
import AppInput from '@/components/app/AppInput.vue'
import AppSelect from '@/components/app/AppSelect.vue'
import { Icon } from '@iconify/vue'
import { MediaIcon } from '@/utils/media/misc'

interface Genre {
  id: number
  name: string
}

type SelectOption = InstanceType<typeof AppSelect>['options']

// Props
const props = defineProps<{
  tvGenres: Nullable<Genre[]>
  movieGenres: Nullable<Genre[]>
}>()

const selectedMedia = defineModel<SearchType>('type', {
  required: true,
})

const filters = defineModel<SearchFilters>('filters', {
  required: true,
}) // TODO: add typing and shit

// Non reactive state
const selectAllOption = {
  value: null,
  label: 'Tutti',
} as const

const filterTypes = [
  {
    type: 'all',
    label: 'Tutti',
    icon: null,
  },
  {
    type: 'movie',
    label: 'Film',
    icon: MediaIcon.MOVIE,
  },
  {
    type: 'tv',
    label: 'Serie TV',
    icon: MediaIcon.TV,
  },
] as const

// Computed
const getGenres = computed(() => {
  const genres = {
    movie: props.movieGenres,
    tv: props.tvGenres,
    all: [],
  }[selectedMedia.value]

  const options: SelectOption = genres?.map(mapGenreToOption) ?? []

  if (options.length > 0) {
    options.unshift(selectAllOption)
  }

  return options
})

// Watchers
watch(selectedMedia, () => {
  filters.value.genre = null // they have diff genres while the year is whatever
  if (!['movie', 'tv'].includes(selectedMedia.value)) {
    filters.value.year = null
  }
})

// Functions
function mapGenreToOption(genre: Genre) {
  return {
    value: genre.id,
    label: genre.name,
  }
}

function setCurrentYear() {
  // just a shortcut to prefill the year without going insane scrolling up/down
  if (!filters.value.year) {
    filters.value.year = new Date().getFullYear()
  }
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
