import { describe, expect, it, vi } from 'vitest'

import { render, screen } from '../../../test/test-utils'
import { ScoreRankDialog } from './ScoreRankDialog'

describe('ScoreRankDialog', () => {
  it('見直した配点とランク基準を表示する', () => {
    render(<ScoreRankDialog isOpen={false} onClose={vi.fn()} />)

    expect(
      screen.getByText(
        '正解1問につき1,000点、回答時間に応じて最大500点が加算されます。',
      ),
    ).toBeInTheDocument()
    expect(screen.getByText('10,000〜（10問全問正解）')).toBeInTheDocument()
    expect(
      screen.getByText(/SSSランクは、10問全問正解かつ10,000点以上/),
    ).toBeInTheDocument()
  })
})
