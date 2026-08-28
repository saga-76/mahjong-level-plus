import { determineRank, type QuizResult } from '../../quiz'
import { ResultPage } from '../components/ResultPage'

type ResultPageContainerProps = {
  readonly result: QuizResult
  readonly onReview: () => void
  readonly onRetry: () => void
  readonly onTop: () => void
}

export function ResultPageContainer({
  result,
  onReview,
  onRetry,
  onTop,
}: ResultPageContainerProps) {
  const rankCriterion = determineRank({
    score: result.totalScore,
    correctCount: result.correctCount,
    totalQuestions: result.totalQuestions,
  })

  return (
    <ResultPage
      result={result}
      rankCriterion={rankCriterion}
      onReview={onReview}
      onRetry={onRetry}
      onTop={onTop}
    />
  )
}
