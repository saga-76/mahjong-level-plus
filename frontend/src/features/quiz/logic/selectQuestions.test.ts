import { describe, expect, it } from 'vitest'

import type { Question, QuestionPattern } from '../types/question'
import { selectQuestions } from './selectQuestions'

function createQuestion(
  pattern: QuestionPattern,
  questionNumber: number,
): Question {
  const baseQuestion = {
    id: `${pattern}-${questionNumber}`,
    hand: {
      concealedTiles: [
        '1m',
        '2m',
        '3m',
        '4p',
        '5p',
        '6p',
        '6s',
        '7s',
        '8s',
        '7z',
        '7z',
        '7z',
        '5m',
      ],
      winningTile: '5m',
      melds: [],
    },
    condition: {
      player: 'nonDealer',
      winType: 'ron',
    },
    choices: ['3,900点', '5,200点', '8,000点'],
    correctAnswer: '5,200点',
    han: 3,
    explanation: 'テスト用の問題です。',
  } as const

  if (pattern === 'A') {
    return {
      ...baseQuestion,
      pattern,
      fu: null,
    }
  }

  return {
    ...baseQuestion,
    pattern,
    fu: 40,
  }
}

function createQuestions(patternACount = 6, patternBCount = 6): Question[] {
  const patternAQuestions = Array.from({ length: patternACount }, (_, index) =>
    createQuestion('A', index + 1),
  )
  const patternBQuestions = Array.from({ length: patternBCount }, (_, index) =>
    createQuestion('B', index + 1),
  )

  return [...patternAQuestions, ...patternBQuestions]
}

describe('selectQuestions', () => {
  it('パターンA・Bから5問ずつ選出する', () => {
    const selectedQuestions = selectQuestions(createQuestions(), () => 0.5)

    expect(selectedQuestions).toHaveLength(10)
    expect(
      selectedQuestions.filter((question) => question.pattern === 'A'),
    ).toHaveLength(5)
    expect(
      selectedQuestions.filter((question) => question.pattern === 'B'),
    ).toHaveLength(5)
  })

  it('同じ問題を重複して選出しない', () => {
    const selectedQuestions = selectQuestions(createQuestions(), () => 0.5)
    const selectedQuestionIds = selectedQuestions.map((question) => question.id)

    expect(new Set(selectedQuestionIds).size).toBe(10)
  })

  it('選出した10問の順番を並べ替える', () => {
    const questions = createQuestions(5, 5)
    const originalQuestionIds = questions.map((question) => question.id)

    const selectedQuestions = selectQuestions(questions, () => 0)
    const selectedQuestionIds = selectedQuestions.map((question) => question.id)

    expect(selectedQuestionIds).not.toEqual(originalQuestionIds)
  })

  it('問題IDが重複している場合はエラーになる', () => {
    const questions = createQuestions(5, 5)

    expect(() =>
      selectQuestions([...questions, questions[0]], () => 0.5),
    ).toThrow('問題IDが重複しています。')
  })

  it('パターンA・Bの問題数が不足している場合はエラーになる', () => {
    expect(() => selectQuestions(createQuestions(4, 5))).toThrow(
      'パターンAの問題が5問以上必要です。',
    )
    expect(() => selectQuestions(createQuestions(5, 4))).toThrow(
      'パターンBの問題が5問以上必要です。',
    )
  })
})
