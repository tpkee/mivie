<template>
  <main>
    <router-view name="header" />

    <div class="container mx-auto">
      <router-view />
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
