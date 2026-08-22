export type AnswerRecord = {
  readonly questionId: string
  readonly selectedAnswer: string
}

export type QuizStatus = 'answering' | 'completed'

export type QuizProgressState = {
  readonly currentQuestionIndex: number
  readonly answers: readonly AnswerRecord[]
  readonly status: QuizStatus
}
