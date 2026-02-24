<template>
  <main>
    <router-view name="header" />

    <router-view />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
