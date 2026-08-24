import { rankCriteria } from '../data/rankCriteria'
import type { RankCriterion } from '../types/rank'

export function determineRank(score: number): RankCriterion {
  if (Number.isNaN(score) || score < 0) {
    return rankCriteria[0]
  }

  for (let index = rankCriteria.length - 1; index >= 0; index -= 1) {
    const criterion = rankCriteria[index]

    if (score >= criterion.minScore) {
      return criterion
    }
  }

  return rankCriteria[0]
}
