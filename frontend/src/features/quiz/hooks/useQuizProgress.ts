import { useCallback, useReducer } from 'react'

import type { QuizProgressState } from '../types/answer'
import type { Question } from '../types/question'

type ConfirmAnswerAction = {
  readonly type: 'confirmAnswer'
  readonly question: Question
  readonly selectedAnswer: string
  readonly totalQuestions: number
  readonly confirmedAtMs: number
}

type ResetQuizAction = {
  readonly type: 'resetQuiz'
  readonly totalQuestions: number
  readonly startedAtMs: number
}

type QuizProgressAction = ConfirmAnswerAction | ResetQuizAction

type InitialStateArguments = {
  readonly totalQuestions: number
  readonly now: () => number
}

type UseQuizProgressOptions = {
  readonly now?: () => number
}

const getCurrentTimeMs = () => performance.now()

function createInitialState({
  totalQuestions,
  now,
}: InitialStateArguments): QuizProgressState {
  const hasQuestions = totalQuestions > 0

  return {
    currentQuestionIndex: 0,
    answers: [],
    status: hasQuestions ? 'answering' : 'completed',
    startedAtMs: hasQuestions ? now() : null,
    elapsedTimeMs: 0,
  }
}

function quizProgressReducer(
  state: QuizProgressState,
  action: QuizProgressAction,
): QuizProgressState {
  if (action.type === 'resetQuiz') {
    const hasQuestions = action.totalQuestions > 0

    return {
      currentQuestionIndex: 0,
      answers: [],
      status: hasQuestions ? 'answering' : 'completed',
      startedAtMs: hasQuestions ? action.startedAtMs : null,
      elapsedTimeMs: 0,
    }
  }

  if (state.status === 'completed') {
    return state
  }

  const isAlreadyAnswered = state.answers.some(
    (answer) => answer.questionId === action.question.id,
  )

  if (isAlreadyAnswered) {
    return state
  }

  const answers = [
    ...state.answers,
    {
      questionId: action.question.id,
      selectedAnswer: action.selectedAnswer,
    },
  ]
  const isLastQuestion = state.currentQuestionIndex >= action.totalQuestions - 1
  const elapsedTimeMs =
    state.startedAtMs === null
      ? 0
      : Math.max(0, Math.round(action.confirmedAtMs - state.startedAtMs))

  return {
    currentQuestionIndex: isLastQuestion
      ? state.currentQuestionIndex
      : state.currentQuestionIndex + 1,
    answers,
    status: isLastQuestion ? 'completed' : 'answering',
    startedAtMs: state.startedAtMs,
    elapsedTimeMs,
  }
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
    createInitialState,
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
        question: currentQuestion,
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
