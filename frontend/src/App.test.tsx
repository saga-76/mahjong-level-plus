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

  it('問題画面のやめるボタンから確認なしでトップ画面へ戻る', async () => {
    const { user } = render(
      <MemoryRouter initialEntries={['/quiz']}>
        <App />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: 'やめる' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'スタート' })).toBeInTheDocument()
  })

  it('10問完了後に結果画面へ遷移する', async () => {
    const { user } = render(
      <MemoryRouter initialEntries={['/quiz']}>
        <App />
      </MemoryRouter>,
    )

    for (let index = 0; index < 10; index += 1) {
      await user.click(
        screen
          .getByRole('group', { name: '点数の選択肢' })
          .querySelector('button')!,
      )
    }

    expect(
      await screen.findByRole('heading', { name: '結果' }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('ランク')).toBeInTheDocument()
    expect(screen.getByText('スコア')).toBeInTheDocument()
    expect(screen.getByText('正解数')).toBeInTheDocument()
    expect(screen.getByText('回答時間')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '10問の解説を見る' }))

    expect(
      await screen.findByRole('heading', { name: '10問の解説' }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(10)

    await user.click(screen.getAllByRole('button', { name: '結果に戻る' })[0])

    expect(
      await screen.findByRole('heading', { name: '結果' }),
    ).toBeInTheDocument()
  })

  it('結果画面から状態を初期化して第1問へ再挑戦できる', async () => {
    const { user } = render(
      <MemoryRouter initialEntries={['/quiz']}>
        <App />
      </MemoryRouter>,
    )

    for (let index = 0; index < 10; index += 1) {
      await user.click(
        screen
          .getByRole('group', { name: '点数の選択肢' })
          .querySelector('button')!,
      )
    }

    expect(
      await screen.findByRole('heading', { name: '結果' }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'もう一度挑戦' }))

    expect(
      await screen.findByRole('heading', { name: '1 / 10' }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: '結果' }),
    ).not.toBeInTheDocument()
  })

  it.each(['/result', '/review'])(
    '結果データなしで%sを開くとトップ画面へ戻る',
    (path) => {
      render(
        <MemoryRouter initialEntries={[path]}>
          <App />
        </MemoryRouter>,
      )

      expect(
        screen.getByRole('button', { name: 'スタート' }),
      ).toBeInTheDocument()
    },
  )
})
