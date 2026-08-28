import { describe, expect, it } from 'vitest'

import { questions } from '../data/question'
import { createQuizResult } from './createQuizResult'

describe('createQuizResult', () => {
  it('採点結果と問題・回答・経過時間を1つの結果にまとめる', () => {
    const selectedQuestions = questions.slice(0, 2)
    const answers = selectedQuestions.map((question) => ({
      questionId: question.id,
      selectedAnswer: question.correctAnswer,
    }))

    const result = createQuizResult({
      questions: selectedQuestions,
      answers,
      elapsedTimeMs: 60_000,
    })

    expect(result.correctCount).toBe(2)
    expect(result.totalQuestions).toBe(2)
    expect(result.elapsedTimeMs).toBe(60_000)
    expect(result.questions).toBe(selectedQuestions)
    expect(result.answers).toBe(answers)
  })
})
