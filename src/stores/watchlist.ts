import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useWatchlist = defineStore('watchlist', () => {
   // since we may (will) have to check quite a lot of elements to see if they are in the watchlist and perform add/removal ops,
   // maps will prrovide a better DX and performances (right?) compared to lists
  const watchlist = useLocalStorage('watchlist', new Map<number, Media>())

  function toggle(el: Media) {
    if (watchlist.value.has(el.id)) {
      watchlist.value.delete(el.id)
    } else {
      watchlist.value.set(el.id, el)
    }
  }

  return { watchlist, toggle }
})
