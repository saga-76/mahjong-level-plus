import { describe, expect, it, vi } from 'vitest'

import { render, screen, within } from '../../../test/test-utils'
import { questions } from '../../quiz'
import type { ReviewedQuestion } from '../types/review'
import { AnswerReviewPage } from './AnswerReviewPage'

const reviewedQuestions: ReviewedQuestion[] = questions
  .slice(0, 10)
  .map((question, index) => ({
    question,
    selectedAnswer: index === 0 ? question.correctAnswer : question.choices[0],
    isCorrect:
      (index === 0 ? question.correctAnswer : question.choices[0]) ===
      question.correctAnswer,
  }))

describe('AnswerReviewPage', () => {
  it('10問分の正誤・回答・ドラを含む役・翻・符・解説を表示する', () => {
    render(
      <AnswerReviewPage
        reviewedQuestions={reviewedQuestions}
        onBack={vi.fn()}
        onRetry={vi.fn()}
        onTop={vi.fn()}
      />,
    )

    expect(
      screen.getByRole('heading', { name: '解説', level: 1 }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(10)

    const firstQuestion = screen.getAllByRole('article')[0]

    expect(
      within(firstQuestion).getByLabelText('問題1の判定'),
    ).toHaveTextContent('正解')
    expect(
      within(firstQuestion).getAllByText(questions[0].correctAnswer),
    ).toHaveLength(2)
    expect(firstQuestion.children[1]).toContainElement(
      within(firstQuestion).getByText('選択した回答'),
    )
    expect(firstQuestion.children[2]).toContainElement(
      within(firstQuestion).getByLabelText('アガリ役'),
    )
    expect(
      within(firstQuestion).getByText(
        '断么九（タンヤオ）1翻、平和（ピンフ）1翻、一盃口（イーペーコー）1翻、リーチ1翻、ドラ1翻',
      ),
    ).toBeInTheDocument()
    expect(within(firstQuestion).getByText('役')).toBeInTheDocument()
    expect(within(firstQuestion).getByLabelText('自家 南家')).toHaveClass(
      'text-xs',
      'sm:text-base',
    )
    expect(within(firstQuestion).getByText('ドラ')).toBeInTheDocument()
    expect(
      within(
        within(firstQuestion).getByRole('group', { name: 'ドラ牌' }),
      ).getAllByRole('img'),
    ).toHaveLength(1)
    expect(screen.getAllByText(/門前清自摸和（メンゼンツモ）1翻/)).toHaveLength(
      2,
    )
    expect(within(firstQuestion).getByText('5翻')).toBeInTheDocument()
    expect(
      within(firstQuestion).getByText('計算不要（満貫以上）'),
    ).toBeInTheDocument()
    expect(within(firstQuestion).queryByText('ドラ牌')).not.toBeInTheDocument()
    expect(
      within(firstQuestion).queryByText('ドラ枚数'),
    ).not.toBeInTheDocument()
    expect(
      within(firstQuestion).getByText(questions[0].explanation),
    ).toBeInTheDocument()

    const secondQuestion = screen.getAllByRole('article')[1]

    expect(
      within(secondQuestion).getByLabelText('自家 東家'),
    ).toBeInTheDocument()
    expect(
      within(secondQuestion).queryByText(/ドラ\d+翻/),
    ).not.toBeInTheDocument()
    expect(
      within(
        within(secondQuestion).getByRole('group', { name: 'ドラ牌' }),
      ).getByText('なし'),
    ).toBeInTheDocument()

    expect(
      screen
        .getAllByRole('button')
        .slice(0, 3)
        .map((button) => button.textContent),
    ).toEqual(['もう一度挑戦', '結果に戻る', 'トップ画面'])
    const header = screen.getByRole('heading', {
      name: '解説',
      level: 1,
    }).parentElement!.parentElement!

    expect(header.children[0]).toHaveClass('order-1', 'sm:order-2')
    expect(header.children[1]).toContainElement(
      screen.getByRole('heading', { name: '解説', level: 1 }),
    )
    for (const button of screen.getAllByRole('button')) {
      expect(button).not.toHaveClass('border-[#c6a160]')
    }
  })

  it('結果に戻る操作を通知する', async () => {
    const onBack = vi.fn()
    const { user } = render(
      <AnswerReviewPage
        reviewedQuestions={reviewedQuestions}
        onBack={onBack}
        onRetry={vi.fn()}
        onTop={vi.fn()}
      />,
    )

    await user.click(screen.getAllByRole('button', { name: '結果に戻る' })[0])

    expect(onBack).toHaveBeenCalledOnce()
  })

  it('再挑戦とトップ画面への移動を通知する', async () => {
    const onRetry = vi.fn()
    const onTop = vi.fn()
    const { user } = render(
      <AnswerReviewPage
        reviewedQuestions={reviewedQuestions}
        onBack={vi.fn()}
        onRetry={onRetry}
        onTop={onTop}
      />,
    )

    await user.click(screen.getAllByRole('button', { name: 'もう一度挑戦' })[0])
    await user.click(screen.getAllByRole('button', { name: 'トップ画面' })[0])

    expect(onRetry).toHaveBeenCalledOnce()
    expect(onTop).toHaveBeenCalledOnce()
  })
})
