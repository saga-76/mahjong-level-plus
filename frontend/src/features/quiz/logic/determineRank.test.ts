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
    [999, 'G'],
    [1_000, 'F'],
    [1_999, 'F'],
    [2_000, 'E'],
    [2_999, 'E'],
    [3_000, 'D'],
    [3_999, 'D'],
    [4_000, 'C'],
    [4_999, 'C'],
    [5_000, 'B'],
    [5_999, 'B'],
    [6_000, 'A'],
    [6_999, 'A'],
    [7_000, 'S'],
    [8_499, 'S'],
    [8_500, 'SS'],
    [9_999, 'SS'],
    [10_000, 'SSS'],
    [10_500, 'SSS'],
  ] as const)('スコア%sをランク%sと判定する', (score, expectedRank) => {
    expect(
      determineRank({ score, correctCount: 10, totalQuestions: 10 }).rank,
    ).toBe(expectedRank)
  })

  it('10,000点以上でも全問正解でなければSSランクと判定する', () => {
    expect(
      determineRank({
        score: 10_000,
        correctCount: 9,
        totalQuestions: 10,
      }).rank,
    ).toBe('SS')
  })

  it('負のスコアとNaNはランクGと判定する', () => {
    expect(
      determineRank({ score: -1, correctCount: 0, totalQuestions: 10 }).rank,
    ).toBe('G')
    expect(
      determineRank({
        score: Number.NaN,
        correctCount: 0,
        totalQuestions: 10,
      }).rank,
    ).toBe('G')
  })
})
