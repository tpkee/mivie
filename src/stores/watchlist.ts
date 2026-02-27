import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { watch } from 'vue'

export const useWatchlist = defineStore('watchlist', () => {
  // since we may (will) have to check quite a lot of elements to see if they are in the watchlist and perform add/removal ops,
  // a hashmap will provide a better DX and performance (right?) compared to lists
  const watchlist = useLocalStorage('watchlist', new Map<number, Media>())

  function toggle(el: Media) {
    if (watchlist.value.has(el.id)) {
      watchlist.value.delete(el.id)
    } else {
      watchlist.value.set(el.id, el)
    }
  }

  watch(
    watchlist,
    () => {
      watchlist.value.forEach((value, key) => {
        if (!value.id || value.id !== key || !value.title || !value.mediaType) {
          watchlist.value.delete(key)
        }
      })
    },
    { immediate: true, deep: true },
  )

  return { watchlist, toggle }
})
