import type { Ref } from 'vue'
import { computed, ref, shallowRef, watch } from 'vue'
import { useCustomFetch } from './useCustomFetch'
import type { UseFetchOptions } from '@vueuse/core'

export function usePaginatedFetch<T>(url: Ref<string>, options?: UseFetchOptions) {
  const currentPage = ref(0)
  const totalPages = ref(1)
  const results = shallowRef<T[]>([])
  const baseUrl = ref('')

  const canLoadMore = computed(() => {
    return currentPage.value < totalPages.value
  })

  const {
    data,
    isFetching,
    error,
    execute: refresh,
  } = useCustomFetch<PaginatedRequest<T>>(baseUrl, {
    immediate: false,
    ...options,
  })

  watch(url, (newUrl) => {
    if (!newUrl) {
      reset()
    }

    if (newUrl !== baseUrl.value) {
      const nextPage = currentPage.value + 1
      const separator = newUrl.includes('?') ? '&' : '?'
      baseUrl.value = `${newUrl}${separator}page=${nextPage}`
    }
  })

  watch(data, (newData) => {
    totalPages.value = newData?.totalPages || 1
    results.value.push(...(newData?.results ?? []))
  })

  async function loadMore() {
    if (isFetching.value) return

    currentPage.value += 1

    await refresh()
  }

  async function reset() {
    currentPage.value = 0
    totalPages.value = 1
    results.value = []
  }

  return {
    results,
    isFetching,
    error,
    loadMore,
    canLoadMore,
    reset,
  }
}
