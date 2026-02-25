<template>
  <div>
    <h2 class="text-2xl font-semibold mb-2.5">{{ title }}</h2>
    <list-media :is-loading="isFetching" :error="error" :list="list" />
  </div>
</template>

<script setup lang="ts">
import ListMedia from '@/components/ListMedia.vue'

defineProps<{
  title: string
  list: Media[]
  isFetching?: boolean
  error?: string
}>()
</script>
