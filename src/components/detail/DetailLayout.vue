<template>
  <div class="space-y-4">
    <div class="space-y-4 md:flex gap-x-4">
      <div
        class="relative w-full h-64 sm:h-full sm:w-44 rounded-md overflow-hidden bg-gray-800 mx-auto sm:mx-0"
      >
        <app-fab
          v-if="score != null"
          type="span"
          class="absolute top-2.5 left-2.5 z-10 flex items-center justify-center text-sm font-semibold"
          :class="[scoreColorClass]"
        >
          {{ score.toFixed(1) }}
        </app-fab>
        <img v-if="posterUrl" :src="posterUrl" class="w-full h-full object-cover object-center" />
      </div>

      <div class="space-y-2.5">
        <div class="flex items-start gap-2.5">
          <h1 class="text-3xl font-bold">{{ title }}</h1>
          <slot name="actions" />
        </div>

        <p v-if="tagline" class="text-gray-400 italic">{{ tagline }}</p>

        <div v-if="genres && genres.length" class="flex flex-wrap gap-2">
          <app-chip v-for="genre in genres" :key="genre.id">
            {{ genre.name }}
          </app-chip>
        </div>

        <div class="grid grid-cols-2 gap-2.5 w-fit">
          <slot name="stats" />
        </div>
      </div>
    </div>

    <section v-if="overview" class="max-w-3xl">
      <p class="text-gray-300 leading-relaxed whitespace-pre-line">{{ overview }}</p>
    </section>

    <slot name="extra" />
  </div>
</template>

<script setup lang="ts">
import AppChip from '../app/AppChip.vue'
import AppFab from '../app/AppFab.vue'

defineProps<{
  title: string
  overview: string
  posterUrl: string
  tagline?: string
  genres?: Genre[]
  score?: number | null
  scoreColorClass?: string
}>()
</script>
