<template>
  <header class="w-full p-4 border-b border-gray-800">
    <div class="container mx-auto flex items-center gap-4">
      <button class="cursor-pointer" @click="toggleMenu">
        <Icon icon="line-md:menu" class="w-6 h-fit" />
      </button>

      <div class="w-full">
        <header-search />
      </div>
    </div>
  </header>

  <app-nav :is-open="isMenuOpen" @close="closeMenu" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

import AppNav from '@/components/app/AppNav.vue'
import HeaderSearch from '@/components/HeaderSearch.vue'

// Reactive state
const isMenuOpen = ref(false)

// Functions
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}
</script>
