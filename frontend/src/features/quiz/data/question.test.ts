import { describe, expect, it } from 'vitest'

import { questions, selectQuestions, type TileCode } from '..'

function normalizeRedFive(tile: TileCode): TileCode {
  return tile.startsWith('0') ? (`5${tile.at(-1)}` as TileCode) : tile
}

describe('questions', () => {
  it('問題データを読み込める', () => {
    expect(questions).toHaveLength(10)
  })

  it('すべての問題に必須項目が正しく登録されている', () => {
    const questionIds = questions.map((question) => question.id)

    expect(new Set(questionIds).size).toBe(questions.length)

    for (const question of questions) {
      expect(question.id.trim()).not.toBe('')
      expect(['A', 'B']).toContain(question.pattern)
      expect(question.hand.concealedTiles.length).toBeGreaterThan(0)
      expect(question.hand.winningTile).toBeTruthy()
      expect(['dealer', 'nonDealer']).toContain(question.condition.player)
      expect(['ron', 'tsumo']).toContain(question.condition.winType)
      expect(['east', 'south', 'west', 'north']).toContain(
        question.condition.roundWind,
      )
      expect(['east', 'south', 'west', 'north']).toContain(
        question.condition.seatWind,
      )
      expect(question.condition.player === 'dealer').toBe(
        question.condition.seatWind === 'east',
      )
      expect(question.choices).toHaveLength(3)
      expect(new Set(question.choices).size).toBe(3)
      expect(question.choices.every((choice) => choice.trim().length > 0)).toBe(
        true,
      )
      expect(question.choices).toContain(question.correctAnswer)
      expect(question.yaku.length).toBeGreaterThan(0)
      expect(
        question.yaku.every(
          (yaku) =>
            yaku.name.trim().length > 0 &&
            Number.isInteger(yaku.han) &&
            yaku.han > 0,
        ),
      ).toBe(true)
      expect(Number.isInteger(question.han)).toBe(true)
      expect(question.han).toBeGreaterThan(0)
      expect(Number.isInteger(question.dora)).toBe(true)
      expect(question.dora).toBeGreaterThanOrEqual(0)
      expect(question.explanation.trim()).not.toBe('')

      if (question.pattern === 'A') {
        expect(question.fu).toBeNull()
      } else {
        expect(Number.isInteger(question.fu)).toBe(true)
        expect(question.fu).toBeGreaterThan(0)
      }
    }
  })

  it('パターンA・Bが5問ずつ登録されている', () => {
    expect(
      questions.filter((question) => question.pattern === 'A'),
    ).toHaveLength(5)
    expect(
      questions.filter((question) => question.pattern === 'B'),
    ).toHaveLength(5)
  })

  it('正解が3つの選択肢に含まれている', () => {
    for (const question of questions) {
      expect(question.choices).toHaveLength(3)
      expect(question.choices).toContain(question.correctAnswer)
    }
  })

  it('役・翻・符・ドラ・解説を管理できる', () => {
    for (const question of questions) {
      const yakuHan = question.yaku.reduce((total, yaku) => total + yaku.han, 0)

      expect(question.yaku.length).toBeGreaterThan(0)
      expect(yakuHan + question.dora).toBe(question.han)
      expect(question.dora).toBeGreaterThanOrEqual(0)
      expect(question.explanation.length).toBeGreaterThan(0)
    }
  })

  it('さまざまな役を問題データに含めている', () => {
    const yakuNames = questions.flatMap((question) =>
      question.yaku.map((yaku) => yaku.name),
    )

    expect(yakuNames).toEqual(
      expect.arrayContaining([
        '断么九',
        '平和',
        '一盃口',
        '混一色',
        '清一色',
        '七対子',
        '対々和',
        '門前清自摸和',
      ]),
    )
  })

  it('ドラ牌から手牌のドラ枚数を確認できる', () => {
    for (const question of questions) {
      const handTiles = [
        ...question.hand.concealedTiles,
        question.hand.winningTile,
        ...question.hand.melds.flatMap((meld) => meld.tiles),
      ]
      const redDoraCount = handTiles.filter((tile) =>
        tile.startsWith('0'),
      ).length
      const normalDoraCount = question.doraTiles.reduce((total, doraTile) => {
        const matchingTileCount = handTiles.filter(
          (tile) => normalizeRedFive(tile) === normalizeRedFive(doraTile),
        ).length

        return total + matchingTileCount
      }, 0)

      expect(question.dora).toBeLessThanOrEqual(1)
      expect(question.doraTiles).toHaveLength(question.dora)
      expect(new Set(question.doraTiles).size).toBe(question.doraTiles.length)
      expect(redDoraCount + normalDoraCount).toBe(question.dora)
    }
  })

  it('ドラなしを基本とし、ドラを含む問題も1枚までにする', () => {
    expect(questions.filter((question) => question.dora === 0)).toHaveLength(8)
    expect(questions.filter((question) => question.dora === 1)).toHaveLength(2)
    expect(questions.every((question) => question.dora <= 1)).toBe(true)
  })

  it('パターンAとパターンBを符の有無で識別できる', () => {
    for (const question of questions) {
      if (question.pattern === 'A') {
        expect(question.fu).toBeNull()
      } else {
        expect(question.fu).toBeTypeOf('number')
      }
    }
  })

  it('手牌・アガリ牌・副露を区別して管理できる', () => {
    for (const question of questions) {
      const meldTileCount = question.hand.melds.reduce(
        (total, meld) => total + meld.tiles.length,
        0,
      )
      const handTileCount =
        question.hand.concealedTiles.length + 1 + meldTileCount

      expect(handTileCount).toBe(14)
    }

    expect(questions.some((question) => question.hand.melds.length > 0)).toBe(
      true,
    )
  })

  it('本番データから10問を重複なく選出できる', () => {
    const selectedQuestions = selectQuestions(questions, () => 0.5)
    const selectedQuestionIds = selectedQuestions.map((question) => question.id)

    expect(selectedQuestions).toHaveLength(10)
    expect(new Set(selectedQuestionIds).size).toBe(10)
  })
})
