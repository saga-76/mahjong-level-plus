import { useCallback, useReducer } from 'react'

import {
  createQuizProgressState,
  quizProgressReducer,
} from '../logic/quizProgressReducer'
import type { Question } from '../types/question'

type UseQuizProgressOptions = {
  readonly now?: () => number
}

type InitialStateArguments = {
  readonly totalQuestions: number
  readonly now: () => number
}

const getCurrentTimeMs = () => performance.now()

function initializeQuizProgress({
  totalQuestions,
  now,
}: InitialStateArguments) {
  return createQuizProgressState({
    totalQuestions,
    startedAtMs: totalQuestions > 0 ? now() : null,
  })
}

export function useQuizProgress(
  questions: readonly Question[],
  options: UseQuizProgressOptions = {},
) {
  const now = options.now ?? getCurrentTimeMs
  const [state, dispatch] = useReducer(
    quizProgressReducer,
    {
      totalQuestions: questions.length,
      now,
    },
    initializeQuizProgress,
  )

  const currentQuestion =
    state.status === 'answering'
      ? (questions[state.currentQuestionIndex] ?? null)
      : null

  const confirmAnswer = useCallback(
    (selectedAnswer: string) => {
      if (currentQuestion === null) {
        return
      }

      dispatch({
        type: 'confirmAnswer',
        questionId: currentQuestion.id,
        selectedAnswer,
        totalQuestions: questions.length,
        confirmedAtMs: now(),
      })
    },
    [currentQuestion, now, questions.length],
  )

  const resetQuiz = useCallback(() => {
    dispatch({
      type: 'resetQuiz',
      totalQuestions: questions.length,
      startedAtMs: now(),
    })
  }, [now, questions.length])

  return {
    ...state,
    currentQuestion,
    isCompleted: state.status === 'completed',
    confirmAnswer,
    resetQuiz,
  }
}
