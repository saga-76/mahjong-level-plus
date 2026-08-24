export type Rank = 'G' | 'F' | 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'SS' | 'SSS'

export type RankCriterion = {
  readonly rank: Rank
  readonly minScore: number
  readonly maxScore: number | null
  readonly scoreLabel: string
  readonly description: string
}
