import { determineRank, type QuizResult } from '../../quiz'
import { ResultPage } from '../components/ResultPage'

type ResultPageContainerProps = {
  readonly result: QuizResult
  readonly onReview: () => void
}

export function ResultPageContainer({
  result,
  onReview,
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
    />
  )
}
