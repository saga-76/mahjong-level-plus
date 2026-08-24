import { determineRank, type QuizResult } from '../../quiz'
import { ResultPage } from '../components/ResultPage'

type ResultPageContainerProps = {
  readonly result: QuizResult
}

export function ResultPageContainer({ result }: ResultPageContainerProps) {
  const rankCriterion = determineRank(result.totalScore)

  return <ResultPage result={result} rankCriterion={rankCriterion} />
}
