import { createFetch, type UseFetchOptions } from "@vueuse/core"
import type { MaybeRefOrGetter } from "vue"

 const customFetch = createFetch({
  baseUrl: import.meta.env.VITE_BASE_URL,
  options: {
    async beforeFetch({ options }) {
      options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
      }

      return { options }
    },
  },
  fetchOptions: {
    mode: 'cors',
  },
})

export function useCustomFetch<T>(url: MaybeRefOrGetter<string>, opts: UseFetchOptions = {}) {
  return customFetch(url, opts).get().json<T>()
}
