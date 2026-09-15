import { describe, expect, it } from 'vitest'

import { questions } from '../data/question'
import {
  calculateMahjongPoints,
  formatMahjongPointAnswer,
} from './calculateMahjongPoints'

describe('calculateMahjongPoints', () => {
  it.each([
    {
      name: '子の30符3翻ロン',
      input: { fu: 30, han: 3, player: 'nonDealer', winType: 'ron' },
      expected: { basePoints: 960, ronPoints: 3_900 },
    },
    {
      name: '子の30符4翻ロンは切り上げ満貫にしない',
      input: { fu: 30, han: 4, player: 'nonDealer', winType: 'ron' },
      expected: { basePoints: 1_920, ronPoints: 7_700 },
    },
    {
      name: '子の20符3翻ツモ',
      input: { fu: 20, han: 3, player: 'nonDealer', winType: 'tsumo' },
      expected: {
        basePoints: 640,
        dealerPayment: 1_300,
        nonDealerPayment: 700,
      },
    },
    {
      name: '親の40符3翻ロン',
      input: { fu: 40, han: 3, player: 'dealer', winType: 'ron' },
      expected: { basePoints: 1_280, ronPoints: 7_700 },
    },
    {
      name: '子の5翻ロン',
      input: { fu: null, han: 5, player: 'nonDealer', winType: 'ron' },
      expected: { basePoints: 2_000, ronPoints: 8_000 },
    },
    {
      name: '親の11翻ロン',
      input: { fu: null, han: 11, player: 'dealer', winType: 'ron' },
      expected: { basePoints: 6_000, ronPoints: 36_000 },
    },
    {
      name: '子の役満ロン',
      input: {
        fu: null,
        han: 13,
        player: 'nonDealer',
        winType: 'ron',
        yakumanCount: 1,
      },
      expected: { basePoints: 8_000, ronPoints: 32_000 },
    },
  ] as const)('$nameを計算できる', ({ input, expected }) => {
    expect(calculateMahjongPoints(input)).toMatchObject(expected)
  })

  it.each([
    {
      input: { fu: 30, han: 3, player: 'nonDealer', winType: 'ron' },
      expected: '3,900点',
    },
    {
      input: { fu: 20, han: 3, player: 'nonDealer', winType: 'tsumo' },
      expected: '700点 / 1,300点',
    },
    {
      input: { fu: 30, han: 2, player: 'dealer', winType: 'tsumo' },
      expected: '1,000点 オール',
    },
  ] as const)('回答用の点数を$expectedと表示する', ({ input, expected }) => {
    expect(formatMahjongPointAnswer(calculateMahjongPoints(input))).toBe(
      expected,
    )
  })

  it('全30問で自動計算した正解点が選択肢に含まれる', () => {
    for (const question of questions) {
      expect(question.choices, question.id).toContain(question.correctAnswer)
    }
  })
})
