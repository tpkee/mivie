import type { Ref, ShallowRef } from 'vue'
import { watch } from 'vue'
import { usePaginatedFetch } from './usePaginatedFetch'
import { useInfiniteScroll } from '@vueuse/core'

export function useInfiniteFetch<T>(
  url: Ref<string>,
  scrollContainer: ShallowRef<Nullable<HTMLElement>>,
  parser?: (x: T[]) => unknown,
) {
  const {
    results,
    canLoadMore,
    loadMore,
    error,
    isFetching,
    reset: resetResults,
  } = usePaginatedFetch<T>(url, {
    afterFetch: (ctx) => {
      if (parser) {
        ctx.data = parser(ctx.data.results)
        console.log('Parsed results:', ctx.data)
      }

      return ctx
    },
    immediate: false,
  })

  watch(url, () => {
    resetResults()
  })

  const { reset: resetScrollbox } = useInfiniteScroll(
    scrollContainer,
    () => {
      if (url.value) {
        loadMore()
      }
    },
    {
      distance: 10,
      canLoadMore: () => canLoadMore.value,
    },
  )

  return {
    results,
    canLoadMore,
    error,
    isFetching,
    resetResults,
    resetScrollbox,
  }
}
