import type { QuizResult } from '../../quiz'
import { AnswerReviewPage } from '../components/AnswerReviewPage'

type AnswerReviewPageContainerProps = {
  readonly result: QuizResult
  readonly onBack: () => void
  readonly onRetry: () => void
  readonly onTop: () => void
}

export function AnswerReviewPageContainer({
  result,
  onBack,
  onRetry,
  onTop,
}: AnswerReviewPageContainerProps) {
  const answerByQuestionId = new Map(
    result.answers.map((answer) => [answer.questionId, answer]),
  )
  const reviewedQuestions = result.questions.map((question) => {
    const answer = answerByQuestionId.get(question.id)
    const selectedAnswer = answer?.selectedAnswer ?? null

    return {
      question,
      selectedAnswer,
      isCorrect: selectedAnswer === question.correctAnswer,
    }
  })

  return (
    <AnswerReviewPage
      reviewedQuestions={reviewedQuestions}
      onBack={onBack}
      onRetry={onRetry}
      onTop={onTop}
    />
  )
}
