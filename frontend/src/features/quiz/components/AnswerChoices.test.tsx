import { describe, expect, it, vi } from 'vitest'

import { render, screen } from '../../../test/test-utils'
import { AnswerChoices } from './AnswerChoices'

const ronChoices = ['3,900点', '5,200点', '8,000点'] as const

describe('AnswerChoices', () => {
  it('3つの点数選択肢をボタンとして表示する', () => {
    render(
      <AnswerChoices
        choices={ronChoices}
        selectedAnswer={null}
        onSelect={vi.fn()}
      />,
    )

    expect(screen.getAllByRole('button')).toHaveLength(3)

    for (const choice of ronChoices) {
      expect(screen.getByRole('button', { name: choice })).toHaveClass(
        'min-h-28',
        'sm:min-h-40',
        'text-2xl',
        'sm:text-3xl',
      )
    }
  })

  it('選択した回答をonSelectで通知する', async () => {
    const onSelect = vi.fn()
    const { user } = render(
      <AnswerChoices
        choices={ronChoices}
        selectedAnswer={null}
        onSelect={onSelect}
      />,
    )

    await user.click(screen.getByRole('button', { name: '5,200点' }))

    expect(onSelect).toHaveBeenCalledOnce()
    expect(onSelect).toHaveBeenCalledWith('5,200点')
  })

  it('選択中の回答を押下状態で表示する', () => {
    render(
      <AnswerChoices
        choices={ronChoices}
        selectedAnswer="5,200点"
        onSelect={vi.fn()}
      />,
    )

    expect(screen.getByRole('button', { name: '5,200点' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('button', { name: '3,900点' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
  })

  it('ツモの点数表記を表示できる', () => {
    const tsumoChoices = [
      '1,000点 / 2,000点',
      '2,000点 / 4,000点',
      '3,000点 / 6,000点',
    ] as const

    render(
      <AnswerChoices
        choices={tsumoChoices}
        selectedAnswer={null}
        onSelect={vi.fn()}
      />,
    )

    expect(
      screen.getByRole('button', { name: '2,000点 / 4,000点' }),
    ).toBeInTheDocument()
  })
})
