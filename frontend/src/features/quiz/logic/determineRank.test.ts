import { describe, expect, it } from 'vitest'

import { rankCriteria } from '../data/rankCriteria'
import { determineRank } from './determineRank'

describe('rankCriteria', () => {
  it('GからSSSまで境界値が途切れずに定義されている', () => {
    expect(rankCriteria.map(({ rank }) => rank)).toEqual([
      'G',
      'F',
      'E',
      'D',
      'C',
      'B',
      'A',
      'S',
      'SS',
      'SSS',
    ])

    rankCriteria.slice(1).forEach((criterion, index) => {
      expect(criterion.minScore).toBe(rankCriteria[index].maxScore! + 1)
    })

    expect(rankCriteria.at(-1)?.maxScore).toBeNull()
  })
})

describe('determineRank', () => {
  it.each([
    [0, 'G'],
    [200, 'G'],
    [201, 'F'],
    [400, 'F'],
    [401, 'E'],
    [600, 'E'],
    [601, 'D'],
    [800, 'D'],
    [801, 'C'],
    [1_000, 'C'],
    [1_001, 'B'],
    [1_200, 'B'],
    [1_201, 'A'],
    [1_400, 'A'],
    [1_401, 'S'],
    [1_600, 'S'],
    [1_601, 'SS'],
    [1_800, 'SS'],
    [1_801, 'SSS'],
    [100_000, 'SSS'],
  ] as const)('スコア%sをランク%sと判定する', (score, expectedRank) => {
    expect(determineRank(score).rank).toBe(expectedRank)
  })

  it('負のスコアとNaNはランクGと判定する', () => {
    expect(determineRank(-1).rank).toBe('G')
    expect(determineRank(Number.NaN).rank).toBe('G')
  })
})
