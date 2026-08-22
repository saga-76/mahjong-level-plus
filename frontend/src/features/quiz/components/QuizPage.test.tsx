import { describe, expect, it, vi } from 'vitest'

import { render, screen } from '../../../test/test-utils'
import { questions } from '../data/question'
import { QuizPage } from './QuizPage'

describe('QuizPage', () => {
  it('現在の問題番号・条件・アガリ形・3つの選択肢を表示する', () => {
    render(
      <QuizPage
        question={questions[0]}
        currentQuestionNumber={1}
        totalQuestions={10}
        onAnswer={vi.fn()}
      />,
    )

    expect(screen.getByRole('heading', { name: '1 / 10' })).toBeInTheDocument()
    expect(
      screen.getByRole('progressbar', { name: '問題の進捗' }),
    ).toHaveAttribute('value', '1')
    expect(screen.getByText('子')).toBeInTheDocument()
    expect(screen.getByText('ロン')).toBeInTheDocument()
    expect(screen.getByText('5翻')).toBeInTheDocument()
    expect(screen.getAllByRole('button')).toHaveLength(3)
  })

  it('選択した回答をonAnswerで通知する', async () => {
    const onAnswer = vi.fn()
    const { user } = render(
      <QuizPage
        question={questions[0]}
        currentQuestionNumber={1}
        totalQuestions={10}
        onAnswer={onAnswer}
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
        question={questions[5]}
        currentQuestionNumber={6}
        totalQuestions={10}
        onAnswer={vi.fn()}
      />,
    )

    expect(
      screen.getByRole('group', { name: '副露（ポン）' }),
    ).toBeInTheDocument()
  })
})
