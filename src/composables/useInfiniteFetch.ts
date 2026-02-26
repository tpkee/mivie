import type { Ref, ShallowRef } from 'vue'
import { computed } from 'vue'
import { useInfiniteQuery } from '@tanstack/vue-query'
import { useInfiniteScroll } from '@vueuse/core'
import { parsePaginatedRequest } from '@/utils/common/paginatedRequest'
import { useCustomFetch } from './useCustomFetch'

interface Options {
  parser?: (items: unknown[]) => unknown[]
  key?: string
}

export function useInfiniteFetch<T>(
  url: Ref<string>,
  scrollContainer: ShallowRef<Nullable<HTMLElement>>,
  options: Options = {
    key: 'infinite-search',
  },
) {
  const queryKey = computed(() => [options.key, url.value])

  const { data, isFetching, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam }) => {
      const separator = url.value.includes('?') ? '&' : '?'
      const raw = await useCustomFetch<PaginatedRequestResponse<unknown>>(
        `${url.value}${separator}page=${pageParam}`,
      )
      return parsePaginatedRequest(raw)
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    enabled: computed(() => !!url.value),
  })

  const results = computed<T[]>(() => {
    const allItems = data.value?.pages.flatMap((page) => page.results) ?? []
    return options.parser ? (options.parser(allItems) as T[]) : (allItems as T[])
  })

  const canLoadMore = computed(() => hasNextPage.value)

  const { reset: resetScrollbox } = useInfiniteScroll(
    scrollContainer,
    () => {
      if (hasNextPage.value && !isFetching.value) {
        fetchNextPage()
      }
    },
    {
      distance: 10,
      canLoadMore: () => {
        return hasNextPage.value && !isFetching.value
      },
    },
  )

  return {
    results,
    canLoadMore,
    error,
    isFetching,
    resetScrollbox,
  }
}
