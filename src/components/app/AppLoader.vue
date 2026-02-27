<template>
  <div
    class="fixed inset-0 w-screen bg-purple-600 z-999 h-px animate-pulse pointer-events-none"
    :style="{
      width: `${width}vw`,
      transition: 'width 0.2s ease-out',
    }"
  ></div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, ref } from 'vue'

const width = ref(5)

let rafId: number | null = null
const target = ref(0)

function animate() {
  // increment target slowly and randomly
  if (target.value < 100) {
    target.value = Math.min(100, target.value + Math.random() * 0.3 + 0.05)
  }

  // smooth the actual width toward the target using linear interpolation
  width.value += (target.value - width.value) * 0.1

  if (width.value < 100) {
    rafId = requestAnimationFrame(animate)
  } else {
    rafId = null
  }
}

animate()

onBeforeUnmount(() => {
  if (rafId !== null) cancelAnimationFrame(rafId)
})
</script>
