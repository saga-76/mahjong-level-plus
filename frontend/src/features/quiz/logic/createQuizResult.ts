import type { AnswerRecord } from '../types/answer'
import type { Question } from '../types/question'
import type { QuizResult } from '../types/score'
import { calculateScore } from './calculateScore'

type CreateQuizResultArguments = {
  readonly questions: readonly Question[]
  readonly answers: readonly AnswerRecord[]
  readonly elapsedTimeMs: number
}

export function createQuizResult({
  questions,
  answers,
  elapsedTimeMs,
}: CreateQuizResultArguments): QuizResult {
  return {
    ...calculateScore({ questions, answers, elapsedTimeMs }),
    totalQuestions: questions.length,
    elapsedTimeMs,
    questions,
    answers,
  }
}
