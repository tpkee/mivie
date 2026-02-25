<template>
  <transition name="nav-overlay">
    <div v-if="isOpen" class="fixed inset-0 z-40" @click="emit('close')">
      <aside class="h-full md:w-72 bg-gray-900 border-r border-gray-700 p-4" @click.stop>
        <div class="flex justify-between items-center gap-3 border-b border-gray-700 pb-3 mb-4">
          <h2 class="text-lg font-semibold text-left">Mini Movie Explorer</h2>

          <button
            @click="emit('close')"
            aria-label="Chiudi"
            class="button hover:text-purple-600 cursor-pointer transition-colors duration-100"
          >
            <Icon icon="mi:close" class="size-6" />
          </button>
        </div>

        <nav class="space-y-1.5">
          <router-link
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center justify-between px-3 py-2 rounded border transition-colors border-gray-700 bg-gray-800 hover:border-purple-600 hover:bg-gray-700"
            exact-active-class="border-purple-600 bg-purple-700/30 text-ghost-white"
          >
            <span>{{ item.label }}</span>
          </router-link>
        </nav>
      </aside>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const navItems = [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'Watchlist',
    to: '/watchlist',
  },
]
</script>

<style scoped>
.nav-overlay-enter-active,
.nav-overlay-leave-active {
  transition: opacity 0.2s ease;
}

.nav-overlay-enter-from,
.nav-overlay-leave-to {
  opacity: 0;
}
</style>
