import { describe, expect, it, vi } from 'vitest'

import { render, screen, waitFor, within } from '../../../test/test-utils'
import { QuizPageContainer } from './QuizPageContainer'

describe('QuizPageContainer', () => {
  it('中断すると回答状況を初期化してonQuitを通知する', async () => {
    const onQuit = vi.fn()
    const { user } = render(
      <QuizPageContainer onQuit={onQuit} onComplete={vi.fn()} />,
    )
    const answerChoices = screen.getByRole('group', {
      name: '点数の選択肢',
    })

    await user.click(within(answerChoices).getAllByRole('button')[0])

    expect(
      screen.getByRole('progressbar', { name: '問題の進捗' }),
    ).toHaveAttribute('aria-valuenow', '1')
    expect(screen.getByRole('heading', { name: '2問目' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '中断する' }))

    expect(onQuit).toHaveBeenCalledOnce()
    expect(screen.getByRole('heading', { name: '1問目' })).toBeInTheDocument()
    expect(
      screen.getByRole('progressbar', { name: '問題の進捗' }),
    ).toHaveAttribute('aria-valuenow', '0')
  })

  it('10問完了時にスコア・正解数・回答時間をonCompleteで通知する', async () => {
    const onComplete = vi.fn()
    const { user } = render(
      <QuizPageContainer onQuit={vi.fn()} onComplete={onComplete} />,
    )

    for (let index = 0; index < 10; index += 1) {
      const answerChoices = screen.getByRole('group', {
        name: '点数の選択肢',
      })

      await user.click(within(answerChoices).getAllByRole('button')[0])
    }

    await waitFor(() => {
      expect(onComplete).toHaveBeenCalledOnce()
    })
    expect(onComplete).toHaveBeenCalledWith(
      expect.objectContaining({
        correctCount: expect.any(Number),
        totalScore: expect.any(Number),
        totalQuestions: 10,
        elapsedTimeMs: expect.any(Number),
      }),
    )
  })
})
