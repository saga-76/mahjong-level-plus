import { describe, expect, it, vi } from 'vitest'

import { render, screen } from '../../../test/test-utils'
import type { QuizResult, RankCriterion } from '../../quiz'
import { ResultPage } from './ResultPage'

const result: QuizResult = {
  correctCount: 8,
  correctScore: 800,
  timeBonus: 700,
  totalScore: 1_500,
  totalQuestions: 10,
  elapsedTimeMs: 45_678,
  questions: [],
  answers: [],
}

const rankCriterion: RankCriterion = {
  rank: 'S',
  minScore: 1_401,
  maxScore: 1_600,
  scoreLabel: '1401〜1600',
  description: 'Sランクの習熟度説明です。',
}

describe('ResultPage', () => {
  it('スコア・ランク・習熟度・正解数・回答時間を表示する', async () => {
    const onReview = vi.fn()
    const onRetry = vi.fn()
    const { user } = render(
      <ResultPage
        result={result}
        rankCriterion={rankCriterion}
        onReview={onReview}
        onRetry={onRetry}
      />,
    )

    expect(screen.getByRole('heading', { name: '結果' })).toBeInTheDocument()
    expect(screen.getByLabelText('ランク')).toHaveTextContent('S')
    expect(screen.getByText('Sランクの習熟度説明です。')).toBeInTheDocument()
    expect(screen.getByText('1,500点')).toBeInTheDocument()
    expect(screen.getByText('8 / 10問')).toBeInTheDocument()
    expect(screen.getByText('45.678秒')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '10問の解説を見る' }))

    expect(onReview).toHaveBeenCalledOnce()
  })

  it('もう一度挑戦ボタンから再挑戦を通知する', async () => {
    const onRetry = vi.fn()
    const { user } = render(
      <ResultPage
        result={result}
        rankCriterion={rankCriterion}
        onReview={vi.fn()}
        onRetry={onRetry}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'もう一度挑戦' }))

    expect(onRetry).toHaveBeenCalledOnce()
  })
})
