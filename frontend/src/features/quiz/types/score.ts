import type { AnswerRecord } from './answer'
import type { Question } from './question'

export type ScoreResult = {
  readonly correctCount: number
  readonly correctScore: number
  readonly timeBonus: number
  readonly totalScore: number
}

export type QuizResult = ScoreResult & {
  readonly totalQuestions: number
  readonly elapsedTimeMs: number
  readonly questions: readonly Question[]
  readonly answers: readonly AnswerRecord[]
}
