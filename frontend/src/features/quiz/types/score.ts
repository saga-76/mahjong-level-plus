export type ScoreResult = {
  readonly correctCount: number
  readonly correctScore: number
  readonly timeBonus: number
  readonly totalScore: number
}

export type QuizResult = ScoreResult & {
  readonly totalQuestions: number
  readonly elapsedTimeMs: number
}
