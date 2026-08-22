import { useCallback, useReducer } from 'react'

import type { QuizProgressState } from '../types/answer'
import type { Question } from '../types/question'

type ConfirmAnswerAction = {
  readonly type: 'confirmAnswer'
  readonly question: Question
  readonly selectedAnswer: string
  readonly totalQuestions: number
}

function createInitialState(totalQuestions: number): QuizProgressState {
  return {
    currentQuestionIndex: 0,
    answers: [],
    status: totalQuestions === 0 ? 'completed' : 'answering',
  }
}

function quizProgressReducer(
  state: QuizProgressState,
  action: ConfirmAnswerAction,
): QuizProgressState {
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

  return {
    currentQuestionIndex: isLastQuestion
      ? state.currentQuestionIndex
      : state.currentQuestionIndex + 1,
    answers,
    status: isLastQuestion ? 'completed' : 'answering',
  }
}

export function useQuizProgress(questions: readonly Question[]) {
  const [state, dispatch] = useReducer(
    quizProgressReducer,
    questions.length,
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
      })
    },
    [currentQuestion, questions.length],
  )

  return {
    ...state,
    currentQuestion,
    isCompleted: state.status === 'completed',
    confirmAnswer,
  }
}
