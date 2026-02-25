<template>
  <header class="w-full p-4 border-b border-gray-800 mb-7">
    <div class="container mx-auto flex items-center gap-4">
      <button class="cursor-pointer" @click="toggleMenu">
        <Icon icon="line-md:menu" class="w-6 h-fit" />
      </button>

      <div class="w-full">
        <app-input placeholder="Cerca film, serie TV, attori...">
          <template #left>
            <Icon icon="mi:search" class="w-6" />
          </template>
        </app-input>
      </div>
    </div>
  </header>

  <app-nav :is-open="isMenuOpen" @close="closeMenu" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

import AppInput from '@/components/app/AppInput.vue'
import AppNav from '@/components/app/AppNav.vue'

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
