<template>
  <div>
    <h1 class="text-2xl font-semibold mb-2.5">Film più popolari nell'ultima settimana</h1>
    <list-media :is-loading="true" :list="mockList" />
  </div>
</template>

<script setup lang="ts">
import ListMedia from '@/components/ListMedia.vue'
import { parseResponse } from '@/utils/media/parseResponse'

const mockList: Media[] = parseResponse([
  {
    id: 157336,
    title: 'Interstellar Echoes',
    original_title: 'Interstellar Echoes',
    overview:
      'A lone crew crosses abandoned colonies to find a signal that may reconnect humanity.',
    poster_path: 'https://image.tmdb.org/t/p/w780/uQhYBxOVFU6s9agD49FnGHwJqG5.jpg',
    media_type: 'movie',
    release_date: '2024-08-14',
    vote_average: 82,
  },
  {
    id: 948713,
    title: 'Neon District',
    original_title: 'Neon District',
    overview:
      'In a rain-soaked megacity, two detectives uncover a conspiracy hidden in synthetic memories.',
    poster_path: 'https://image.tmdb.org/t/p/w780/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
    media_type: 'tv',
    release_date: '2023-11-02',
    vote_average: 76,
  },
])
</script>
