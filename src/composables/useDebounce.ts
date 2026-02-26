import { onBeforeUnmount, ref, watch, type Ref } from 'vue'

export function useDebounce<T>(source: Ref<T>, target: Ref<T>, ms = 350) {
  const isDebouncing = ref(false)

  let handler: Nullable<number> = null

  watch(
    source,
    (newValue) => {
      isDebouncing.value = true
      if (handler) {
        clearTimeout(handler)
      }

      handler = setTimeout(() => {
        target.value = shallowCopy(newValue)
        isDebouncing.value = false
      }, ms)
    },
    {
      deep: true,
    },
  )

  onBeforeUnmount(() => {
    if (handler) {
      clearTimeout(handler)
    }
  })

  return {
    isDebouncing,
  }
}

function shallowCopy<T>(value: T): T {
  if (!value) return value

  if (typeof value === 'object') {
    return { ...value }
  }

  return value
}
