<template>
  <detail-layout
    v-if="data"
    :title="data.name"
    :overview="data.biography"
    :poster-url="data.profileUrl"
  >
    <template #stats>
      <div v-if="data.birthday">
        <span class="text-gray-500 block">Data di nascita</span>
        <span class="font-medium text-white">{{ formatDate(data.birthday) }}</span>
      </div>
      <div v-if="data.placeOfBirth">
        <span class="text-gray-500 block">Luogo di nascita</span>
        <span class="font-medium text-white">{{ data.placeOfBirth }}</span>
      </div>
      <div v-if="data.knownForDepartment">
        <span class="text-gray-500 block">Noto/a per</span>
        <span class="font-medium text-white">{{ data.knownForDepartment }}</span>
      </div>
    </template>
  </detail-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'

import { parsePersonDetail } from '@/utils/detail/person'
import { BASE_TMDB_LANGUAGE } from '@/utils/media/misc'
import { useCustomFetch } from '@/composables/useCustomFetch'

import DetailLayout from '@/components/detail/DetailLayout.vue'

// route parameters
const route = useRoute()
const getId = computed(() => Number(route.params.id))

// build TMDB path
const getUrl = computed(() => {
  const id = getId.value
  const lang = `language=${BASE_TMDB_LANGUAGE}`
  return `/person/${id}?${lang}`
})

const getQueryKeys = computed(() => ['person', getId.value])

// fetch and parse
const { data } = useQuery({
  queryKey: getQueryKeys,
  queryFn: () => useCustomFetch<PersonDetailResponse>(getUrl.value),
  select: (raw: PersonDetailResponse) => parsePersonDetail(raw),
})

function formatDate(d: string) {
  return d ? new Date(d).toLocaleDateString('it-IT') : ''
}
</script>
