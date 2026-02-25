<template>
  <main>
    <router-view name="header" />

    <div class="container mx-auto p-4 pt-7!">
      <router-view />
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
