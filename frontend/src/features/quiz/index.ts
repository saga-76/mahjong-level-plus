export { questions } from './data/question'
export { AnswerChoices } from './components/AnswerChoices'
export { MahjongTile } from './components/MahjongTile'
export { WinningHand } from './components/WinningHand'
export { useQuizProgress } from './hooks/useQuizProgress'
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
