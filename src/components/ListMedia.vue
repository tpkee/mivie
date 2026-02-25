<template>
  <section class="">
    <div class="flex flex-wrap gap-2.5">
      <template v-if="isLoading">
        <item-skeleton v-for="index in 8" :key="index" />
      </template>

      <template v-else-if="error">
        <p class="text-red-500">{{ error }}</p>
      </template>

      <template v-else-if="list.length === 0">
        <p class="text-gray-500">Nessun risultato trovato.</p>
      </template>

      <template v-else>
        <item-media v-for="(item, index) of list" :key="index" :media="item" />
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import ItemMedia from '@/components/ItemMedia.vue'
import ItemSkeleton from '@/components/ItemSkeleton.vue'

defineProps<{
  isLoading?: boolean
  list: Media[]
  error?: string
}>()
</script>
