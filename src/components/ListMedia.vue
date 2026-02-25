<template>
  <section class="">
    <div class="flex flex-wrap gap-2.5">
      <template v-if="isLoading">
        <item-skeleton v-for="index in 8" :key="`skeleton-${index}`" />
      </template>

      <template v-else>
        <item-media
          v-for="(item, index) of list"
          :key="index"
          :id="item.id"
          :image-url="item.poster_path ?? ''"
          :title="(item.title ?? item.original_title)!"
          :release-year="item.release_date"
          :score="item.vote_average"
          :is-favorite="false"
          :type="item.media_type"
          :overview="item.overview"
        />
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import ItemMedia from '@/components/ItemMedia.vue'
import ItemSkeleton from '@/components/ItemSkeleton.vue'

defineProps<{
  isLoading: boolean
  list: Media[]
}>()
</script>
