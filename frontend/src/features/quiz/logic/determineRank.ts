import { rankCriteria } from '../data/rankCriteria'
import type { RankCriterion } from '../types/rank'

type DetermineRankArguments = {
  readonly score: number
  readonly correctCount: number
  readonly totalQuestions: number
}

export function determineRank({
  score,
  correctCount,
  totalQuestions,
}: DetermineRankArguments): RankCriterion {
  if (Number.isNaN(score) || score < 0) {
    return rankCriteria[0]
  }

  const isPerfectScore = totalQuestions > 0 && correctCount === totalQuestions

  for (let index = rankCriteria.length - 1; index >= 0; index -= 1) {
    const criterion = rankCriteria[index]

    if (criterion.rank === 'SSS' && !isPerfectScore) {
      continue
    }

    if (score >= criterion.minScore) {
      return criterion
    }
  }

  return rankCriteria[0]
}
