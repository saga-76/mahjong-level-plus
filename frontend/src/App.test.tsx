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

    expect(
      screen.getByRole('heading', { name: '10問出題' }),
    ).toBeInTheDocument()
  })

  it('フッターから利用規約ページへ移動し、トップ画面へ戻れる', async () => {
    const { user } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('link', { name: '利用規約' }))

    expect(
      screen.getByRole('heading', { name: '利用規約' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '第3条（禁止事項）' }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: 'トップ画面へ戻る' }))

    expect(screen.getByRole('button', { name: 'スタート' })).toBeInTheDocument()
  })

  it('フッターからプライバシーポリシーページへ移動し、トップ画面へ戻れる', async () => {
    const { user } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('link', { name: 'プライバシーポリシー' }))

    expect(
      screen.getByRole('heading', { name: 'プライバシーポリシー' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '2. 回答データの取り扱い' }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: 'トップ画面へ戻る' }))

    expect(screen.getByRole('button', { name: 'スタート' })).toBeInTheDocument()
  })

  it('/quizを直接開いて問題画面を表示できる', () => {
    render(
      <MemoryRouter initialEntries={['/quiz']}>
        <App />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: '10問出題' }),
    ).toBeInTheDocument()
  })

  it('選択肢から回答すると次の問題へ進む', async () => {
    const { user } = render(
      <MemoryRouter initialEntries={['/quiz']}>
        <App />
      </MemoryRouter>,
    )

    const answerChoices = screen.getByRole('group', {
      name: '点数の選択肢',
    })

    await user.click(answerChoices.querySelector('button')!)

    expect(
      screen.getByRole('progressbar', { name: '問題の進捗' }),
    ).toHaveAttribute('aria-valuenow', '1')
  })

  it('問題画面の中断するボタンから確認なしでトップ画面へ戻る', async () => {
    const { user } = render(
      <MemoryRouter initialEntries={['/quiz']}>
        <App />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: '中断する' }))

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
      await screen.findByRole('heading', { name: 'スコア', level: 1 }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('ランク')).toBeInTheDocument()
    expect(screen.getAllByText('スコア')).toHaveLength(2)
    expect(screen.getByText('正解数')).toBeInTheDocument()
    expect(screen.getByText('回答時間')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '解説を見る' }))

    expect(
      await screen.findByRole('heading', { name: '解説', level: 1 }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(10)

    await user.click(screen.getAllByRole('button', { name: '結果に戻る' })[0])

    expect(
      await screen.findByRole('heading', { name: 'スコア', level: 1 }),
    ).toBeInTheDocument()
  })

  it('再挑戦と途中終了で状態を初期化して第1問から開始できる', async () => {
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
      await screen.findByRole('heading', { name: 'スコア', level: 1 }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'もう一度挑戦' }))

    expect(
      await screen.findByRole('heading', { name: '10問出題' }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: 'スコア', level: 1 }),
    ).not.toBeInTheDocument()

    await user.click(
      screen
        .getByRole('group', { name: '点数の選択肢' })
        .querySelector('button')!,
    )

    expect(
      screen.getByRole('progressbar', { name: '問題の進捗' }),
    ).toHaveAttribute('aria-valuenow', '1')

    await user.click(screen.getByRole('button', { name: '中断する' }))

    expect(screen.getByRole('button', { name: 'スタート' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'スタート' }))

    expect(
      screen.getByRole('heading', { name: '10問出題' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('progressbar', { name: '問題の進捗' }),
    ).toHaveAttribute('aria-valuenow', '0')
  })

  it('結果画面からトップ画面へ戻れる', async () => {
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
      await screen.findByRole('heading', { name: 'スコア', level: 1 }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'トップ画面' }))

    expect(
      await screen.findByRole('button', { name: 'スタート' }),
    ).toBeInTheDocument()
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
