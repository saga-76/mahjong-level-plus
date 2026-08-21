import { describe, expect, it } from 'vitest'

import { render, screen, within } from '../../../test/test-utils'
import { questions } from '../data/question'
import { WinningHand } from './WinningHand'

describe('WinningHand', () => {
  it('手牌とアガリ牌を分けて表示する', () => {
    render(<WinningHand hand={questions[0].hand} />)

    const concealedTiles = screen.getByRole('group', { name: '手牌' })
    const winningTile = screen.getByRole('group', { name: 'アガリ牌' })

    expect(within(concealedTiles).getAllByRole('img')).toHaveLength(13)
    expect(within(winningTile).getAllByRole('img')).toHaveLength(1)
  })

  it('副露の種類と牌を表示する', () => {
    render(<WinningHand hand={questions[5].hand} />)

    const meld = screen.getByRole('group', { name: '副露（ポン）' })

    expect(within(meld).getAllByRole('img')).toHaveLength(3)
    expect(screen.getByText('副露（ポン）')).toBeInTheDocument()
  })
})
