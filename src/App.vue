<template>
  <main>
    <router-view name="header" />

    <div class="container mx-auto p-4 pt-7!">
      <router-view v-slot="{ Component }">
        <template v-if="Component">
          <Transition mode="out-in">
            <KeepAlive>
              <Suspense>
                <component :is="Component"></component>

                <template #fallback>
                  <app-loader />
                </template>
              </Suspense>
            </KeepAlive>
          </Transition>
        </template>
      </router-view>
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

import AppLoader from '@/components/app/AppLoader.vue'
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.15s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
