import type {
  PatternAQuestion,
  PatternBQuestion,
  Question,
} from '../types/question'

export const QUESTIONS_PER_PATTERN = 5

type RandomGenerator = () => number

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

function validateUniqueQuestionIds(questions: readonly Question[]): void {
  const questionIds = questions.map((question) => question.id)
  const uniqueQuestionIds = new Set(questionIds)

  if (uniqueQuestionIds.size !== questionIds.length) {
    throw new Error('問題IDが重複しています。')
  }
}

export function selectQuestions(
  questions: readonly Question[],
  random: RandomGenerator = Math.random,
): Question[] {
  validateUniqueQuestionIds(questions)

  const patternAQuestions = questions.filter(
    (question): question is PatternAQuestion => question.pattern === 'A',
  )
  const patternBQuestions = questions.filter(
    (question): question is PatternBQuestion => question.pattern === 'B',
  )

  if (patternAQuestions.length < QUESTIONS_PER_PATTERN) {
    throw new Error(`パターンAの問題が${QUESTIONS_PER_PATTERN}問以上必要です。`)
  }

  if (patternBQuestions.length < QUESTIONS_PER_PATTERN) {
    throw new Error(`パターンBの問題が${QUESTIONS_PER_PATTERN}問以上必要です。`)
  }

  const selectedPatternAQuestions = shuffle(patternAQuestions, random).slice(
    0,
    QUESTIONS_PER_PATTERN,
  )

  const selectedPatternBQuestions = shuffle(patternBQuestions, random).slice(
    0,
    QUESTIONS_PER_PATTERN,
  )

  return shuffle(
    [...selectedPatternAQuestions, ...selectedPatternBQuestions],
    random,
  )
}
