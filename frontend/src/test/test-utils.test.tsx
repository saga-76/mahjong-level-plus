import { useState } from 'react'
import { describe, expect, it } from 'vitest'

import { render, screen } from './test-utils'

function TestButton() {
  const [message, setMessage] = useState('クリック前')

  return (
    <button type="button" onClick={() => setMessage('クリック後')}>
      {message}
    </button>
  )
}

describe('共通テストヘルパー', () => {
  it('コンポーネントを描画してユーザー操作を実行できる', async () => {
    const { user } = render(<TestButton />)

    const button = screen.getByRole('button', { name: 'クリック前' })
    await user.click(button)

    expect(
      screen.getByRole('button', { name: 'クリック後' }),
    ).toBeInTheDocument()
  })
})
