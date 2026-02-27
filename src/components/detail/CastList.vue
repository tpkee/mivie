<template>
  <section v-if="cast.length">
    <h2 class="text-xl font-semibold mb-4">Cast principale</h2>
    <div class="flex gap-2.5 flex-wrap">
      <item-cast
        v-for="actor in cast"
        :key="actor.id"
        :id="actor.id"
        :name="actor.name"
        :character="actor.character"
        :profileUrl="actor.profileUrl"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import ItemCast from './ItemCast.vue'
defineProps<{ cast: CastMember[] }>()
</script>
