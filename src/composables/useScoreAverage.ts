import { computed, toValue, type MaybeRefOrGetter } from 'vue'

import { ScoreTreshold } from '@/utils/media/misc'

export function useScoreAverage(score: MaybeRefOrGetter<number>) {
  return computed(() => {
    const scoreValue = toValue(score)
    if (scoreValue >= ScoreTreshold.GOOD) return 'text-green-500'

    if (scoreValue >= ScoreTreshold.AVERAGE) return 'text-yellow-500'

    return 'text-red-500'
  })
}
