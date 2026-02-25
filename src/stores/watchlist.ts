import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useWatchlist = defineStore('watchlist', () => {
  const mediaIds = useLocalStorage('watchlistMediaIds', new Set<number>())

  function toggle(id: number) {
    console.log(`Toggling media ID ${id} in watchlist.`)
    if (mediaIds.value.has(id)) {
      mediaIds.value.delete(id)
    } else {
      mediaIds.value.add(id)
    }
  }

  return { mediaIds, toggle }
})
