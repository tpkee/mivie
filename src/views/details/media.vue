<template>
  <detail-layout
    v-if="data"
    :title="data.title"
    :overview="data.overview"
    :poster-url="data.posterUrl"
    :tagline="data.tagline"
    :genres="data.genres"
    :score="scoreToShow"
    :score-color-class="scoreColorClass"
  >
    <template #actions>
      <fab-watchlist :media="detailToMedia(data)" background="white" />
    </template>

    <template #stats>
      <div v-if="'releaseDate' in data">
        <span class="text-gray-500 block">Uscita</span>
        <span class="font-medium text-white">{{ formatDate(data.releaseDate) }}</span>
      </div>
      <div v-if="'firstAirDate' in data">
        <span class="text-gray-500 block">Prima puntata</span>
        <span class="font-medium text-white">{{ formatDate(data.firstAirDate) }}</span>
      </div>
      <div v-if="'lastAirDate' in data && data.lastAirDate !== data.firstAirDate">
        <span class="text-gray-500 block">Ultima puntata</span>
        <span class="font-medium text-white">{{ formatDate(data.lastAirDate) }}</span>
      </div>
      <div v-if="'seasons' in data">
        <span class="text-gray-500 block">Stagioni</span>
        <span class="font-medium text-white">{{ data.seasons }}</span>
      </div>
      <div v-if="'episodes' in data">
        <span class="text-gray-500 block">Episodi</span>
        <span class="font-medium text-white">{{ data.episodes }}</span>
      </div>
      <div v-if="data.status">
        <span class="text-gray-500 block">Stato</span>
        <span class="font-medium text-white">{{ data.status }}</span>
      </div>
    </template>

    <template #extra>
      <cast-list :cast="data.cast" />
    </template>
  </detail-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'

import { useScoreAverage } from '@/composables/useScoreAverage'
import { parseMovieDetail } from '@/utils/detail/movie'
import { parseTvDetail } from '@/utils/detail/tv'
import { BASE_TMDB_LANGUAGE } from '@/utils/media/misc'
import { useCustomFetch } from '@/composables/useCustomFetch'

import FabWatchlist from '@/components/FabWatchlist.vue'
import DetailLayout from '@/components/detail/DetailLayout.vue'
import CastList from '@/components/detail/CastList.vue'

const route = useRoute()
const getType = computed(() => route.params.type as MediaType)
const getId = computed(() => Number(route.params.id))
const getUrl = computed(() => {
  const id = getId.value
  const lang = `language=${BASE_TMDB_LANGUAGE}`

  return `/${getType.value}/${id}?&append_to_response=credits&${lang}`
})
const getQueryKeys = computed(() => [getType.value, getId.value])

const { data } = useQuery({
  queryKey: getQueryKeys,
  queryFn: () => useCustomFetch<MovieDetailResponse | TvDetailResponse>(getUrl.value),
  select: (raw: MovieDetailResponse | TvDetailResponse) => {
    if (getType.value === 'movie') return parseMovieDetail(raw as MovieDetailResponse)
    if (getType.value === 'tv') return parseTvDetail(raw as TvDetailResponse)
    return null
  },
})

const scoreColorClass = useScoreAverage(() => data.value?.voteAverage)

const getReleaseDate = computed(() => {
  if (!data.value) return null

  const date = 'releaseDate' in data.value ? data.value.releaseDate : data.value.firstAirDate
  return date ? new Date(date) : null
})

const showScore = computed(() => {
  if (!getReleaseDate.value) return false
  return Date.now() > getReleaseDate.value.getTime()
})

const scoreToShow = computed(() => {
  if (!showScore.value || !data.value || !data.value.voteAverage) return null
  return data.value.voteAverage
})

function formatDate(d: string) {
  if (!d) {
    return 'TBA'
  }

  const date = new Date(d)
  if (date.getTime() > Date.now()) {
    return `In uscita - ${new Intl.DateTimeFormat('it-IT', { year: 'numeric' }).format(date)}`
  }

  return date.toLocaleDateString('it-IT')
}

function detailToMedia(data: MovieDetail | TvDetail): Media {
  return {
    id: data.id,
    mediaType: getType.value,
    title: data.title,
    posterUrl: data.posterUrl,
    overview: data.overview,
    releaseDate: 'releaseDate' in data ? data.releaseDate : data.firstAirDate,
    voteAverage: data.voteAverage,
    fetchedAt: Date.now(),
  }
}
</script>
