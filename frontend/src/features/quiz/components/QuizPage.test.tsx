import { describe, expect, it, vi } from 'vitest'

import { render, screen, within } from '../../../test/test-utils'
import { questions } from '../data/question'
import { QuizPage } from './QuizPage'

describe('QuizPage', () => {
  it('現在の問題番号・場風・自家・アガリ方・ドラ・アガリ役・3つの選択肢を表示する', () => {
    render(
      <QuizPage
        question={questions[0]}
        currentQuestionNumber={1}
        totalQuestions={10}
        onAnswer={vi.fn()}
        onQuit={vi.fn()}
      />,
    )

    expect(screen.getByRole('heading', { name: '1問目' })).toBeInTheDocument()
    const progressbar = screen.getByRole('progressbar', { name: '問題の進捗' })

    expect(progressbar).toHaveAttribute('aria-valuenow', '0')
    expect(progressbar.querySelectorAll('span')).toHaveLength(10)
    expect(
      progressbar.querySelectorAll('[data-state="completed"]'),
    ).toHaveLength(0)
    expect(
      screen.queryByRole('heading', { name: '問題の条件' }),
    ).not.toBeInTheDocument()
    expect(screen.getByText('場風')).toBeInTheDocument()
    expect(screen.getByText('東')).toBeInTheDocument()
    expect(screen.getByText('自家')).toBeInTheDocument()
    expect(screen.getByText('南家')).toBeInTheDocument()
    expect(screen.getByText('ロン')).toBeInTheDocument()
    expect(screen.getByText('リーチ')).toHaveClass('text-lg', 'sm:text-2xl')
    expect(screen.getByText('ドラ')).toBeInTheDocument()
    expect(screen.queryByText('家')).not.toBeInTheDocument()
    expect(screen.queryByText('翻数')).not.toBeInTheDocument()
    expect(screen.queryByText('5翻')).not.toBeInTheDocument()
    expect(
      within(screen.getByRole('group', { name: 'ドラ牌' })).getAllByRole('img'),
    ).toHaveLength(1)
    expect(screen.getAllByRole('button')).toHaveLength(4)
    expect(screen.getByRole('button', { name: '中断する' })).toBeInTheDocument()
  })

  it('ドラを含まない問題では「なし」と表示する', () => {
    render(
      <QuizPage
        question={questions[1]}
        currentQuestionNumber={2}
        totalQuestions={10}
        onAnswer={vi.fn()}
        onQuit={vi.fn()}
      />,
    )

    expect(
      within(screen.getByRole('group', { name: 'ドラ牌' })).getByText('なし'),
    ).toBeInTheDocument()
    expect(screen.queryByText('リーチ')).not.toBeInTheDocument()
    const progressbar = screen.getByRole('progressbar', { name: '問題の進捗' })

    expect(progressbar).toHaveAttribute('aria-valuenow', '1')
    expect(screen.getByRole('heading', { name: '2問目' })).toBeInTheDocument()
    expect(
      progressbar.querySelectorAll('[data-state="completed"]'),
    ).toHaveLength(1)
    expect(progressbar.querySelector('span')).toHaveStyle({
      backgroundColor: 'hsl(210 95% 78%)',
    })
  })

  it('選択した回答をonAnswerで通知する', async () => {
    const onAnswer = vi.fn()
    const { user } = render(
      <QuizPage
        question={questions[0]}
        currentQuestionNumber={1}
        totalQuestions={10}
        onAnswer={onAnswer}
        onQuit={vi.fn()}
      />,
    )

    await user.click(
      screen.getByRole('button', { name: questions[0].choices[0] }),
    )

    expect(onAnswer).toHaveBeenCalledOnce()
    expect(onAnswer).toHaveBeenCalledWith(questions[0].choices[0])
  })

  it('問題に副露がある場合は副露牌を表示する', () => {
    render(
      <QuizPage
        question={questions[7]}
        currentQuestionNumber={8}
        totalQuestions={10}
        onAnswer={vi.fn()}
        onQuit={vi.fn()}
      />,
    )

    expect(screen.getByRole('group', { name: 'ポン' })).toBeInTheDocument()
  })

  it('中断するボタンからonQuitを通知する', async () => {
    const onQuit = vi.fn()
    const { user } = render(
      <QuizPage
        question={questions[0]}
        currentQuestionNumber={1}
        totalQuestions={10}
        onAnswer={vi.fn()}
        onQuit={onQuit}
      />,
    )

    await user.click(screen.getByRole('button', { name: '中断する' }))

    expect(onQuit).toHaveBeenCalledOnce()
  })
})
