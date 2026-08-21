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

  it('本番データから10問を重複なく選出できる', () => {
    const selectedQuestions = selectQuestions(questions, () => 0.5)
    const selectedQuestionIds = selectedQuestions.map((question) => question.id)

    expect(selectedQuestions).toHaveLength(10)
    expect(new Set(selectedQuestionIds).size).toBe(10)
  })
})
