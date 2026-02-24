<template>
  <div class="min-h-screen text-white flex flex-col items-center justify-center px-6">
    <div class="max-w-xl text-center">
      <h1 class="text-3xl md:text-5xl font-bold text-purple-100 leading-relaxed block">
        Pagina non trovata
      </h1>
      <p class="max-w-sm leading-relaxed mx-auto">
        La pagina che stai cercando non esiste. Controlla l'URL o torna alla homepage.
      </p>

      <div class="block mt-5">
        <app-button to="/" class="w-fit">Torna alla homepage</app-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppButton from '@/components/app/AppButton.vue'
</script>
