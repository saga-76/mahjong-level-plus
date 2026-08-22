import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { render, screen } from './test/test-utils'
import App from './App'

describe('App routing', () => {
  it('トップ画面のスタートから問題画面へ遷移する', async () => {
    const { user } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: 'スタート' }))

    expect(screen.getByRole('heading', { name: '1 / 10' })).toBeInTheDocument()
  })

  it('/quizを直接開いて問題画面を表示できる', () => {
    render(
      <MemoryRouter initialEntries={['/quiz']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: '1 / 10' })).toBeInTheDocument()
  })
})
