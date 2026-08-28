import { describe, expect, it } from 'vitest'

import { render, screen, within } from '../../../test/test-utils'
import { DoraTiles } from './DoraTiles'

describe('DoraTiles', () => {
  it('登録されたドラ牌をすべて表示する', () => {
    render(<DoraTiles tiles={['5p', '7s']} />)

    const group = screen.getByRole('group', { name: 'ドラ牌' })

    expect(within(group).getAllByRole('img')).toHaveLength(2)
    expect(within(group).getByAltText('5pの麻雀牌')).toBeInTheDocument()
    expect(within(group).getByAltText('7sの麻雀牌')).toBeInTheDocument()
  })

  it('ドラ牌がない場合は「なし」と表示する', () => {
    render(<DoraTiles tiles={[]} />)

    expect(
      within(screen.getByRole('group', { name: 'ドラ牌' })).getByText('なし'),
    ).toBeInTheDocument()
  })
})
