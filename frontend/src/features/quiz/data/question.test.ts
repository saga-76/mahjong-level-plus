import { describe, expect, it } from 'vitest'

import { questions, selectQuestions } from '..'

describe('questions', () => {
  it('問題データを読み込める', () => {
    expect(questions).toHaveLength(10)
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

  it('パターンAとパターンBを識別できる', () => {
    const patternAQuestion = questions.find(
      (question) => question.pattern === 'A',
    )
    const patternBQuestion = questions.find(
      (question) => question.pattern === 'B',
    )

    expect(patternAQuestion?.fu).toBeNull()
    expect(patternBQuestion?.fu).toBeTypeOf('number')
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
