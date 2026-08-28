import { describe, expect, it, vi } from 'vitest'

import { render, screen } from '../../../test/test-utils'
import { questions, type QuizResult } from '../../quiz'
import { AnswerReviewPageContainer } from './AnswerReviewPageContainer'

const result: QuizResult = {
  correctCount: 1,
  correctScore: 100,
  timeBonus: 0,
  totalScore: 100,
  totalQuestions: 2,
  elapsedTimeMs: 60_000,
  questions: questions.slice(0, 2),
  answers: [
    {
      questionId: questions[0].id,
      selectedAnswer: questions[0].correctAnswer,
    },
    {
      questionId: questions[1].id,
      selectedAnswer: questions[1].choices.find(
        (choice) => choice !== questions[1].correctAnswer,
      )!,
    },
  ],
}

describe('AnswerReviewPageContainer', () => {
  it('選択した回答と正解を比較して問題ごとの正誤を判定する', () => {
    render(
      <AnswerReviewPageContainer
        result={result}
        onBack={vi.fn()}
        onRetry={vi.fn()}
        onTop={vi.fn()}
      />,
    )

    expect(screen.getByLabelText('問題1の判定')).toHaveTextContent('正解')
    expect(screen.getByLabelText('問題2の判定')).toHaveTextContent('不正解')
  })
})
