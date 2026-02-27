import type { MaybeRefOrGetter } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { useCustomFetch } from './useCustomFetch'
import { toValue } from 'vue'

interface Options<TRaw, TData = TRaw> {
  key?: MaybeRefOrGetter<string | number>[]
  parser?: (raw: TRaw) => TData
  initialData?: TRaw
  staleTime?: number
}

export function useCustomQuery<TRaw, TData = TRaw>(
  url: MaybeRefOrGetter<string>,
  options: Options<TRaw, TData> = {},
) {
  const queryKey = options.key ?? [url]
  return useQuery<TRaw, Error, TData>({
    queryKey,
    queryFn: () => useCustomFetch<TRaw>(toValue(url)),
    select: options.parser,
    initialData: () => options.initialData,
    staleTime: options.staleTime,
  })
}
