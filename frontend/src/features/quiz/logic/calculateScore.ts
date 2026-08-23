import type { AnswerRecord } from '../types/answer'
import type { Question } from '../types/question'
import type { ScoreResult } from '../types/score'

export const POINTS_PER_CORRECT_ANSWER = 100
export const TIME_BONUS_BASE_SCORE = 1_000
export const TIME_BONUS_REFERENCE_MS = 30_000

type CalculateScoreArguments = {
  readonly questions: readonly Question[]
  readonly answers: readonly AnswerRecord[]
  readonly elapsedTimeMs: number
}

export function calculateScore({
  questions,
  answers,
  elapsedTimeMs,
}: CalculateScoreArguments): ScoreResult {
  const questionById = new Map(
    questions.map((question) => [question.id, question]),
  )
  const answerByQuestionId = new Map(
    answers.map((answer) => [answer.questionId, answer]),
  )
  const correctCount = [...answerByQuestionId.values()].filter((answer) => {
    const question = questionById.get(answer.questionId)

    return question?.correctAnswer === answer.selectedAnswer
  }).length
  const correctScore = correctCount * POINTS_PER_CORRECT_ANSWER
  const accuracy = questions.length === 0 ? 0 : correctCount / questions.length
  const canCalculateTimeBonus =
    accuracy > 0 && Number.isFinite(elapsedTimeMs) && elapsedTimeMs > 0
  const timeBonus = canCalculateTimeBonus
    ? Math.floor(
        (TIME_BONUS_BASE_SCORE * accuracy * TIME_BONUS_REFERENCE_MS) /
          elapsedTimeMs,
      )
    : 0

  return {
    correctCount,
    correctScore,
    timeBonus,
    totalScore: correctScore + timeBonus,
  }
}
