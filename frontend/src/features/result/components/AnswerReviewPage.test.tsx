import { describe, expect, it, vi } from 'vitest'

import { render, screen, within } from '../../../test/test-utils'
import { questions } from '../../quiz'
import type { ReviewedQuestion } from '../types/review'
import { AnswerReviewPage } from './AnswerReviewPage'

const reviewedQuestions: ReviewedQuestion[] = questions.map(
  (question, index) => ({
    question,
    selectedAnswer: index === 0 ? question.correctAnswer : question.choices[0],
    isCorrect:
      (index === 0 ? question.correctAnswer : question.choices[0]) ===
      question.correctAnswer,
  }),
)

describe('AnswerReviewPage', () => {
  it('10問分の正誤・回答・役・翻・符・ドラ・解説を表示する', () => {
    render(
      <AnswerReviewPage
        reviewedQuestions={reviewedQuestions}
        onBack={vi.fn()}
      />,
    )

    expect(
      screen.getByRole('heading', { name: '10問の解説' }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(10)

    const firstQuestion = screen.getAllByRole('article')[0]

    expect(
      within(firstQuestion).getByLabelText('問題1の判定'),
    ).toHaveTextContent('正解')
    expect(
      within(firstQuestion).getAllByText(questions[0].correctAnswer),
    ).toHaveLength(2)
    expect(within(firstQuestion).getByText('リーチ（1翻）')).toBeInTheDocument()
    expect(within(firstQuestion).getByText('5翻')).toBeInTheDocument()
    expect(
      within(firstQuestion).getByText('計算不要（満貫以上）'),
    ).toBeInTheDocument()
    expect(within(firstQuestion).getByText('4枚')).toBeInTheDocument()
    expect(
      within(firstQuestion).getByText(questions[0].explanation),
    ).toBeInTheDocument()
  })

  it('結果に戻る操作を通知する', async () => {
    const onBack = vi.fn()
    const { user } = render(
      <AnswerReviewPage
        reviewedQuestions={reviewedQuestions}
        onBack={onBack}
      />,
    )

    await user.click(screen.getAllByRole('button', { name: '結果に戻る' })[0])

    expect(onBack).toHaveBeenCalledOnce()
  })
})
