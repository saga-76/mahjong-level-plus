import { describe, expect, it } from 'vitest'

import { questions } from '../../quiz'
import { createReviewedQuestions } from './createReviewedQuestions'

describe('createReviewedQuestions', () => {
  it('回答履歴を問題と突合して選択回答と正誤を生成する', () => {
    const selectedQuestions = questions.slice(0, 3)
    const reviewedQuestions = createReviewedQuestions({
      questions: selectedQuestions,
      answers: [
        {
          questionId: selectedQuestions[0].id,
          selectedAnswer: selectedQuestions[0].correctAnswer,
        },
        {
          questionId: selectedQuestions[1].id,
          selectedAnswer: selectedQuestions[1].choices[0],
        },
      ],
    })

    expect(reviewedQuestions[0]).toMatchObject({ isCorrect: true })
    expect(reviewedQuestions[1]).toMatchObject({
      selectedAnswer: selectedQuestions[1].choices[0],
      isCorrect:
        selectedQuestions[1].choices[0] === selectedQuestions[1].correctAnswer,
    })
    expect(reviewedQuestions[2]).toMatchObject({
      selectedAnswer: null,
      isCorrect: false,
    })
  })
})
