import { describe, expect, it } from 'vitest'

import {
  createQuizProgressState,
  quizProgressReducer,
} from './quizProgressReducer'

describe('quizProgressReducer', () => {
  it('回答を保存して次の問題へ進み、経過時間を更新する', () => {
    const initialState = createQuizProgressState({
      totalQuestions: 2,
      startedAtMs: 100,
    })

    const state = quizProgressReducer(initialState, {
      type: 'confirmAnswer',
      questionId: 'question-1',
      selectedAnswer: '8,000点',
      totalQuestions: 2,
      confirmedAtMs: 250,
    })

    expect(state.currentQuestionIndex).toBe(1)
    expect(state.answers).toEqual([
      { questionId: 'question-1', selectedAnswer: '8,000点' },
    ])
    expect(state.status).toBe('answering')
    expect(state.elapsedTimeMs).toBe(150)
  })

  it('同じ問題への重複回答を保存しない', () => {
    const answeredState = quizProgressReducer(
      createQuizProgressState({ totalQuestions: 2, startedAtMs: 100 }),
      {
        type: 'confirmAnswer',
        questionId: 'question-1',
        selectedAnswer: '8,000点',
        totalQuestions: 2,
        confirmedAtMs: 250,
      },
    )

    const state = quizProgressReducer(answeredState, {
      type: 'confirmAnswer',
      questionId: 'question-1',
      selectedAnswer: '12,000点',
      totalQuestions: 2,
      confirmedAtMs: 300,
    })

    expect(state).toBe(answeredState)
  })

  it('最終回答で完了し、リセットで初期状態へ戻る', () => {
    const firstAnsweredState = quizProgressReducer(
      createQuizProgressState({ totalQuestions: 2, startedAtMs: 100 }),
      {
        type: 'confirmAnswer',
        questionId: 'question-1',
        selectedAnswer: '8,000点',
        totalQuestions: 2,
        confirmedAtMs: 250,
      },
    )
    const completedState = quizProgressReducer(firstAnsweredState, {
      type: 'confirmAnswer',
      questionId: 'question-2',
      selectedAnswer: '12,000点',
      totalQuestions: 2,
      confirmedAtMs: 400,
    })

    expect(completedState.status).toBe('completed')
    expect(completedState.elapsedTimeMs).toBe(300)

    expect(
      quizProgressReducer(completedState, {
        type: 'resetQuiz',
        totalQuestions: 2,
        startedAtMs: 500,
      }),
    ).toEqual(createQuizProgressState({ totalQuestions: 2, startedAtMs: 500 }))
  })
})
