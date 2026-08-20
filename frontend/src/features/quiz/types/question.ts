type Suit = 'm' | 'p' | 's'
type SuitNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type HonorNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7

type StandardSuitTile = `${SuitNumber}${Suit}`
type RedFiveTile = `0${Suit}`
type HonorTile = `${HonorNumber}z`

export type TileCode = StandardSuitTile | RedFiveTile | HonorTile

export type QuestionPattern = 'A' | 'B'

export type PlayerType = 'dealer' | 'nonDealer'
export type WinType = 'ron' | 'tsumo'

export type QuestionCondition = {
  readonly player: PlayerType
  readonly winType: WinType
}

type BaseQuestion = {
  readonly id: string
  readonly tiles: readonly TileCode[]
  readonly condition: QuestionCondition
  readonly choices: readonly [string, string, string]
  readonly correctAnswer: string
  readonly han: number
  readonly explanation: string
}

export type PatternAQuestion = BaseQuestion & {
  readonly pattern: 'A'
  readonly fu: null
}

export type PatternBQuestion = BaseQuestion & {
  readonly pattern: 'B'
  readonly fu: number
}

export type Question = PatternAQuestion | PatternBQuestion
