import type { QuizResult } from '../../quiz'
import type { ReviewedQuestion } from '../types/review'

type CreateReviewedQuestionsArguments = Pick<
  QuizResult,
  'questions' | 'answers'
>

export function createReviewedQuestions({
  questions,
  answers,
}: CreateReviewedQuestionsArguments): readonly ReviewedQuestion[] {
  const answerByQuestionId = new Map(
    answers.map((answer) => [answer.questionId, answer]),
  )

  return questions.map((question) => {
    const selectedAnswer =
      answerByQuestionId.get(question.id)?.selectedAnswer ?? null

    return {
      question,
      selectedAnswer,
      isCorrect: selectedAnswer === question.correctAnswer,
    }
  })
}
