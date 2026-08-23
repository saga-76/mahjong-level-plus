import { describe, expect, it, vi } from 'vitest'

import { render, screen, within } from '../../../test/test-utils'
import { QuizPageContainer } from './QuizPageContainer'

describe('QuizPageContainer', () => {
  it('やめると回答状況を初期化してonQuitを通知する', async () => {
    const onQuit = vi.fn()
    const { user } = render(<QuizPageContainer onQuit={onQuit} />)
    const answerChoices = screen.getByRole('group', {
      name: '点数の選択肢',
    })

    await user.click(within(answerChoices).getAllByRole('button')[0])

    expect(screen.getByRole('heading', { name: '2 / 10' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'やめる' }))

    expect(onQuit).toHaveBeenCalledOnce()
    expect(screen.getByRole('heading', { name: '1 / 10' })).toBeInTheDocument()
  })
})
