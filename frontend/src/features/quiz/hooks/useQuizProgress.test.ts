import { describe, expect, it } from 'vitest'

import { act, renderHook } from '../../../test/test-utils'
import { questions } from '../data/question'
import { useQuizProgress } from './useQuizProgress'

describe('useQuizProgress', () => {
  it('問題開始時に時間計測を開始する', () => {
    const now = () => 1_000
    const { result } = renderHook(() =>
      useQuizProgress(questions, {
        now,
      }),
    )

    expect(result.current.startedAtMs).toBe(1_000)
    expect(result.current.elapsedTimeMs).toBe(0)
  })

  it('回答確定時にミリ秒単位の経過時間を更新する', () => {
    let currentTimeMs = 1_000
    const now = () => currentTimeMs
    const { result } = renderHook(() =>
      useQuizProgress(questions, {
        now,
      }),
    )

    currentTimeMs = 1_123.6

    act(() => {
      result.current.confirmAnswer(questions[0].choices[0])
    })

    expect(result.current.elapsedTimeMs).toBe(124)
  })

  it('選択した回答を回答履歴へ保存する', () => {
    const { result } = renderHook(() => useQuizProgress(questions))
    const firstQuestion = questions[0]

    act(() => {
      result.current.confirmAnswer(firstQuestion.correctAnswer)
    })

    expect(result.current.answers).toEqual([
      {
        questionId: firstQuestion.id,
        selectedAnswer: firstQuestion.correctAnswer,
      },
    ])
  })

  it('回答確定時には正誤判定結果を保存しない', () => {
    const { result } = renderHook(() => useQuizProgress(questions))
    const firstQuestion = questions[0]
    const incorrectAnswer = firstQuestion.choices.find(
      (choice) => choice !== firstQuestion.correctAnswer,
    )

    act(() => {
      result.current.confirmAnswer(incorrectAnswer!)
    })

    expect(result.current.answers[0]).toEqual({
      questionId: firstQuestion.id,
      selectedAnswer: incorrectAnswer,
    })
    expect(result.current.answers[0]).not.toHaveProperty('isCorrect')
  })

  it('回答確定後に次の問題へ進む', () => {
    const { result } = renderHook(() => useQuizProgress(questions))

    act(() => {
      result.current.confirmAnswer(questions[0].choices[0])
    })

    expect(result.current.currentQuestionIndex).toBe(1)
    expect(result.current.currentQuestion?.id).toBe(questions[1].id)
  })

  it('同じ問題を連続して確定しても1件だけ保存する', () => {
    const { result } = renderHook(() => useQuizProgress(questions))
    const confirmFirstAnswer = result.current.confirmAnswer

    act(() => {
      confirmFirstAnswer(questions[0].choices[0])
      confirmFirstAnswer(questions[0].choices[0])
    })

    expect(result.current.answers).toHaveLength(1)
    expect(result.current.currentQuestionIndex).toBe(1)
  })

  it('10問目の回答確定後に完了状態になる', () => {
    let currentTimeMs = 1_000
    const now = () => currentTimeMs
    const { result } = renderHook(() =>
      useQuizProgress(questions, {
        now,
      }),
    )

    questions.forEach((question, index) => {
      currentTimeMs = 1_100 + index * 100

      act(() => {
        result.current.confirmAnswer(question.choices[0])
      })
    })

    expect(result.current.answers).toHaveLength(10)
    expect(result.current.status).toBe('completed')
    expect(result.current.isCompleted).toBe(true)
    expect(result.current.currentQuestion).toBeNull()
    expect(result.current.elapsedTimeMs).toBe(1_000)

    currentTimeMs = 5_000

    act(() => {
      result.current.confirmAnswer(questions[0].choices[0])
    })

    expect(result.current.elapsedTimeMs).toBe(1_000)
  })

  it('再挑戦時に進行状況と計測時間をリセットする', () => {
    let currentTimeMs = 1_000
    const now = () => currentTimeMs
    const { result } = renderHook(() =>
      useQuizProgress(questions, {
        now,
      }),
    )

    currentTimeMs = 1_250

    act(() => {
      result.current.confirmAnswer(questions[0].choices[0])
    })

    expect(result.current.elapsedTimeMs).toBe(250)

    currentTimeMs = 2_000

    act(() => {
      result.current.resetQuiz()
    })

    expect(result.current.answers).toHaveLength(0)
    expect(result.current.currentQuestionIndex).toBe(0)
    expect(result.current.status).toBe('answering')
    expect(result.current.startedAtMs).toBe(2_000)
    expect(result.current.elapsedTimeMs).toBe(0)

    currentTimeMs = 2_125

    act(() => {
      result.current.confirmAnswer(questions[0].choices[0])
    })

    expect(result.current.elapsedTimeMs).toBe(125)
  })
})
