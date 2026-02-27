<template>
  <main>
    <router-view name="header" />

    <div class="container mx-auto p-4 pt-7!">
      <router-view v-slot="{ Component, route }">
        <transition name="fade">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
