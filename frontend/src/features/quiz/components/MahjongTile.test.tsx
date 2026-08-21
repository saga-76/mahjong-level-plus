import { describe, expect, it } from 'vitest'

import { render, screen } from '../../../test/test-utils'
import type { TileCode } from '../types/question'
import { MahjongTile } from './MahjongTile'

describe('MahjongTile', () => {
  it.each([
    ['1m', '/assets/mahjong/Man1.svg'],
    ['0p', '/assets/mahjong/Pin5-Dora.svg'],
    ['7z', '/assets/mahjong/Chun.svg'],
  ] as const)('%sに対応する牌画像を表示する', (tile, expectedPath) => {
    render(<MahjongTile tile={tile satisfies TileCode} />)

    expect(
      screen.getByRole('img', { name: `${tile}の麻雀牌` }),
    ).toHaveAttribute('src', expectedPath)
  })
})
