import type { Question } from '../../quiz'

export type ReviewedQuestion = {
  readonly question: Question
  readonly selectedAnswer: string | null
  readonly isCorrect: boolean
}
