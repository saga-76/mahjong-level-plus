import { describe, expect, it } from 'vitest'

import { questions } from '..'

describe('questions', () => {
  it('問題データを読み込める', () => {
    expect(questions).toHaveLength(2)
  })

  it('正解が3つの選択肢に含まれている', () => {
    for (const question of questions) {
      expect(question.choices).toHaveLength(3)
      expect(question.choices).toContain(question.correctAnswer)
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
})
