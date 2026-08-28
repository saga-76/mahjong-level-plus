import type { QuizProgressState } from '../types/answer'

export type QuizProgressAction =
  | {
      readonly type: 'confirmAnswer'
      readonly questionId: string
      readonly selectedAnswer: string
      readonly totalQuestions: number
      readonly confirmedAtMs: number
    }
  | {
      readonly type: 'resetQuiz'
      readonly totalQuestions: number
      readonly startedAtMs: number
    }

type CreateQuizProgressStateArguments = {
  readonly totalQuestions: number
  readonly startedAtMs: number | null
}

export function createQuizProgressState({
  totalQuestions,
  startedAtMs,
}: CreateQuizProgressStateArguments): QuizProgressState {
  const hasQuestions = totalQuestions > 0

  return {
    currentQuestionIndex: 0,
    answers: [],
    status: hasQuestions ? 'answering' : 'completed',
    startedAtMs: hasQuestions ? startedAtMs : null,
    elapsedTimeMs: 0,
  }
}

export function quizProgressReducer(
  state: QuizProgressState,
  action: QuizProgressAction,
): QuizProgressState {
  if (action.type === 'resetQuiz') {
    return createQuizProgressState({
      totalQuestions: action.totalQuestions,
      startedAtMs: action.startedAtMs,
    })
  }

  if (state.status === 'completed') {
    return state
  }

  const isAlreadyAnswered = state.answers.some(
    (answer) => answer.questionId === action.questionId,
  )

  if (isAlreadyAnswered) {
    return state
  }

  const answers = [
    ...state.answers,
    {
      questionId: action.questionId,
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
