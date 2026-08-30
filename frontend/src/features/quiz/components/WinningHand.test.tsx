import { describe, expect, it } from 'vitest'

import { render, screen, within } from '../../../test/test-utils'
import { questions } from '../data/question'
import { WinningHand } from './WinningHand'

describe('WinningHand', () => {
  it('手牌とアガリ牌を分けて表示する', () => {
    render(<WinningHand hand={questions[2].hand} />)

    const concealedTiles = screen.getByRole('group', { name: '手牌' })
    const winningTile = screen.getByRole('group', { name: 'アガリ牌' })

    expect(screen.queryByText('手牌')).not.toBeInTheDocument()
    expect(within(concealedTiles).getAllByRole('img')).toHaveLength(13)
    expect(within(concealedTiles).getAllByRole('img')[0]).toHaveClass(
      'w-[clamp(0.875rem,4.8vw,2rem)]',
    )
    expect(within(winningTile).getAllByRole('img')).toHaveLength(1)
  })

  it('副露の種類と牌を表示する', () => {
    render(<WinningHand hand={questions[7].hand} />)

    const meld = screen.getByRole('group', { name: 'ポン' })

    expect(within(meld).getAllByRole('img')).toHaveLength(3)
    expect(screen.getByText('ポン')).toBeInTheDocument()
  })

  it('手牌を種類と数字の順に並べて表示する', () => {
    render(
      <WinningHand
        hand={{
          concealedTiles: ['1m', '2m', '3m', '2m', '3m', '4m'],
          winningTile: '5m',
          melds: [],
        }}
      />,
    )

    const concealedTiles = screen.getByRole('group', { name: '手牌' })
    const tileLabels = within(concealedTiles)
      .getAllByRole('img')
      .map((tile) => tile.getAttribute('alt'))

    expect(tileLabels).toEqual([
      '1mの麻雀牌',
      '2mの麻雀牌',
      '2mの麻雀牌',
      '3mの麻雀牌',
      '3mの麻雀牌',
      '4mの麻雀牌',
    ])
  })
})
