import type {
  PatternAQuestion,
  PatternBQuestion,
  Question,
  QuestionHand,
  TileCode,
} from '../types/question'
import { QUIZ_QUESTION_COUNT } from '../config/quizConfig'

type RandomGenerator = () => number
type SelectQuestionsOptions = {
  readonly questionCount?: number
  readonly random?: RandomGenerator
}

function shuffle<T>(
  items: readonly T[],
  random: RandomGenerator = Math.random,
): T[] {
  const shuffledItems = [...items]

  for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(random() * (index + 1))

    ;[shuffledItems[index], shuffledItems[randomIndex]] = [
      shuffledItems[randomIndex],
      shuffledItems[index],
    ]
  }

  return shuffledItems
}

// Compare shapes independently of conditions, tile order, and red-five bonuses.
function handKey(hand: QuestionHand): string {
  const normalize = (tile: TileCode) => tile.replace(/^0/, '5')
  return JSON.stringify({
    concealed: hand.concealedTiles.map(normalize).sort(),
    winning: normalize(hand.winningTile),
    melds: hand.melds
      .map((meld) =>
        JSON.stringify({
          type: meld.type,
          tiles: meld.tiles.map(normalize).sort(),
        }),
      )
      .sort(),
  })
}

function uniqueHands(
  questions: readonly Question[],
  random: RandomGenerator,
): Map<string, Question> {
  const byHand = new Map<string, Question>()
  for (const question of shuffle(questions, random)) {
    const key = handKey(question.hand)
    if (!byHand.has(key)) byHand.set(key, question)
  }
  return byHand
}

function validateUniqueQuestionIds(questions: readonly Question[]): void {
  const questionIds = questions.map((question) => question.id)
  const uniqueQuestionIds = new Set(questionIds)

  if (uniqueQuestionIds.size !== questionIds.length) {
    throw new Error('問題IDが重複しています。')
  }
}

function shuffleChoices(question: Question, random: RandomGenerator): Question {
  return {
    ...question,
    choices: shuffle(question.choices, random) as [string, string, string],
  }
}

export function selectQuestions(
  questions: readonly Question[],
  options: SelectQuestionsOptions = {},
): Question[] {
  const { questionCount = QUIZ_QUESTION_COUNT, random = Math.random } = options

  validateUniqueQuestionIds(questions)

  if (!Number.isInteger(questionCount) || questionCount <= 0) {
    throw new Error('出題数は1以上の整数で指定してください。')
  }

  if (questionCount > questions.length) {
    throw new Error(
      `出題数${questionCount}問に対して、問題が${questions.length}問しかありません。`,
    )
  }

  const patternAQuestionCount = Math.ceil(questionCount / 2)
  const patternBQuestionCount = Math.floor(questionCount / 2)

  const patternAQuestions = questions.filter(
    (question): question is PatternAQuestion => question.pattern === 'A',
  )
  const patternBQuestions = questions.filter(
    (question): question is PatternBQuestion => question.pattern === 'B',
  )

  if (patternAQuestions.length < patternAQuestionCount) {
    throw new Error(`パターンAの問題が${patternAQuestionCount}問以上必要です。`)
  }

  if (patternBQuestions.length < patternBQuestionCount) {
    throw new Error(`パターンBの問題が${patternBQuestionCount}問以上必要です。`)
  }

  const uniqueA = uniqueHands(patternAQuestions, random)
  const uniqueB = uniqueHands(patternBQuestions, random)
  // Reserve enough distinct B hands before selecting a hand shared with A.
  let sharedAllowance = uniqueB.size - patternBQuestionCount
  const selectedPatternAQuestions: Question[] = []
  const selectedKeys = new Set<string>()
  for (const [key, question] of uniqueA) {
    if (selectedPatternAQuestions.length === patternAQuestionCount) break
    if (uniqueB.has(key)) {
      if (sharedAllowance <= 0) continue
      sharedAllowance -= 1
    }
    selectedPatternAQuestions.push(question)
    selectedKeys.add(key)
  }
  const selectedPatternBQuestions = [...uniqueB]
    .filter(([key]) => !selectedKeys.has(key))
    .slice(0, patternBQuestionCount)
    .map(([, question]) => question)

  if (
    selectedPatternAQuestions.length !== patternAQuestionCount ||
    selectedPatternBQuestions.length !== patternBQuestionCount
  ) {
    throw new Error(
      '指定された出題構成に必要な重複しない牌姿が不足しています。',
    )
  }

  const selectedQuestions = shuffle(
    [...selectedPatternAQuestions, ...selectedPatternBQuestions],
    random,
  )

  return selectedQuestions.map((question) => shuffleChoices(question, random))
}
