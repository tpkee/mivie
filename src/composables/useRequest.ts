import { createFetch } from "@vueuse/core"
import type { MaybeRefOrGetter } from "vue"

export const useRequest = createFetch({
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

export function useCustomFetch<T>(url: MaybeRefOrGetter<string>) {
  return useRequest<T>(url).get().json()
}
