export { questions } from './data/question'
export { rankCriteria } from './data/rankCriteria'
export { AnswerChoices } from './components/AnswerChoices'
export { MahjongTile } from './components/MahjongTile'
export { WinningHand } from './components/WinningHand'
export { QuizPageContainer } from './containers/QuizPageContainer'
export { useQuizProgress } from './hooks/useQuizProgress'
export {
  calculateScore,
  POINTS_PER_CORRECT_ANSWER,
  TIME_BONUS_BASE_SCORE,
  TIME_BONUS_REFERENCE_MS,
} from './logic/calculateScore'
export { determineRank } from './logic/determineRank'
export { QUESTIONS_PER_PATTERN, selectQuestions } from './logic/selectQuestions'

export type {
  Meld,
  MeldType,
  PatternAQuestion,
  PatternBQuestion,
  PlayerType,
  Question,
  QuestionCondition,
  QuestionHand,
  QuestionPattern,
  TileCode,
  WinType,
} from './types/question'

export type {
  AnswerRecord,
  QuizProgressState,
  QuizStatus,
} from './types/answer'
export type { Rank, RankCriterion } from './types/rank'
export type { QuizResult, ScoreResult } from './types/score'
