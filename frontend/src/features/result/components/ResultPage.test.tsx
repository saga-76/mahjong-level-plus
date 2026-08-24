import { describe, expect, it } from 'vitest'

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
}

const rankCriterion: RankCriterion = {
  rank: 'S',
  minScore: 1_401,
  maxScore: 1_600,
  scoreLabel: '1401〜1600',
  description: 'Sランクの習熟度説明です。',
}

describe('ResultPage', () => {
  it('スコア・ランク・習熟度・正解数・回答時間を表示する', () => {
    render(<ResultPage result={result} rankCriterion={rankCriterion} />)

    expect(screen.getByRole('heading', { name: '結果' })).toBeInTheDocument()
    expect(screen.getByLabelText('ランク')).toHaveTextContent('S')
    expect(screen.getByText('Sランクの習熟度説明です。')).toBeInTheDocument()
    expect(screen.getByText('1,500点')).toBeInTheDocument()
    expect(screen.getByText('8 / 10問')).toBeInTheDocument()
    expect(screen.getByText('45.678秒')).toBeInTheDocument()
  })
})
