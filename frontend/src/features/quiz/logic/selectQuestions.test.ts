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
      roundWind: 'east',
      seatWind: 'south',
    },
    choices: ['3,900点', '5,200点', '8,000点'],
    correctAnswer: '5,200点',
    yaku: [{ name: 'リーチ', han: 1 }],
    han: 1,
    dora: 0,
    doraTiles: [],
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
    const selectedQuestions = selectQuestions(createQuestions(), {
      random: () => 0.5,
    })

    expect(selectedQuestions).toHaveLength(10)
    expect(
      selectedQuestions.filter((question) => question.pattern === 'A'),
    ).toHaveLength(5)
    expect(
      selectedQuestions.filter((question) => question.pattern === 'B'),
    ).toHaveLength(5)
  })

  it('同じ問題を重複して選出しない', () => {
    const selectedQuestions = selectQuestions(createQuestions(), {
      random: () => 0.5,
    })
    const selectedQuestionIds = selectedQuestions.map((question) => question.id)

    expect(new Set(selectedQuestionIds).size).toBe(10)
  })

  it('選出した10問の順番を並べ替える', () => {
    const questions = createQuestions(5, 5)
    const originalQuestionIds = questions.map((question) => question.id)

    const selectedQuestions = selectQuestions(questions, { random: () => 0 })
    const selectedQuestionIds = selectedQuestions.map((question) => question.id)

    expect(selectedQuestionIds).not.toEqual(originalQuestionIds)
  })

  it('選出しても元の問題データと順番を変更しない', () => {
    const questions = createQuestions()
    const originalQuestionIds = questions.map((question) => question.id)
    const originalChoices = questions.map((question) => [...question.choices])

    selectQuestions(questions, { random: () => 0 })

    expect(questions.map((question) => question.id)).toEqual(
      originalQuestionIds,
    )
    expect(questions.map((question) => question.choices)).toEqual(
      originalChoices,
    )
  })

  it('各問題の選択肢を並べ替えて正解位置を分散できる', () => {
    const selectedQuestions = selectQuestions(createQuestions(5, 5), {
      random: () => 0,
    })

    expect(selectedQuestions).toHaveLength(10)
    for (const question of selectedQuestions) {
      expect(question.choices[0]).toBe(question.correctAnswer)
      expect(question.choices).toContain(question.correctAnswer)
    }
  })

  it('任意の出題数を指定してA・Bをできるだけ均等に選出する', () => {
    const selectedQuestions = selectQuestions(createQuestions(8, 8), {
      questionCount: 7,
      random: () => 0.5,
    })

    expect(selectedQuestions).toHaveLength(7)
    expect(
      selectedQuestions.filter((question) => question.pattern === 'A'),
    ).toHaveLength(4)
    expect(
      selectedQuestions.filter((question) => question.pattern === 'B'),
    ).toHaveLength(3)
  })

  it.each([0, -1, 1.5])('不正な出題数%sはエラーになる', (questionCount) => {
    expect(() => selectQuestions(createQuestions(), { questionCount })).toThrow(
      '出題数は1以上の整数で指定してください。',
    )
  })

  it('問題プールより多い出題数はエラーになる', () => {
    expect(() =>
      selectQuestions(createQuestions(5, 5), { questionCount: 11 }),
    ).toThrow('出題数11問に対して、問題が10問しかありません。')
  })

  it('問題IDが重複している場合はエラーになる', () => {
    const questions = createQuestions(5, 5)

    expect(() =>
      selectQuestions([...questions, questions[0]], { random: () => 0.5 }),
    ).toThrow('問題IDが重複しています。')
  })

  it('パターンA・Bの問題数が不足している場合はエラーになる', () => {
    expect(() => selectQuestions(createQuestions(4, 6))).toThrow(
      'パターンAの問題が5問以上必要です。',
    )
    expect(() => selectQuestions(createQuestions(6, 4))).toThrow(
      'パターンBの問題が5問以上必要です。',
    )
  })
})
