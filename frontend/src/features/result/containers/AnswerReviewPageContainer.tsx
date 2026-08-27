import type { QuizResult } from '../../quiz'
import { AnswerReviewPage } from '../components/AnswerReviewPage'
import { createReviewedQuestions } from '../logic/createReviewedQuestions'

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
  const reviewedQuestions = createReviewedQuestions(result)

  return (
    <AnswerReviewPage
      reviewedQuestions={reviewedQuestions}
      onBack={onBack}
      onRetry={onRetry}
      onTop={onTop}
    />
  )
}
