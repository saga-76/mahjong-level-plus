import { describe, expect, it } from 'vitest'

import type { Question, QuestionPattern, TileCode } from '../types/question'
import { selectQuestions } from './selectQuestions'

function createQuestion(
  pattern: QuestionPattern,
  questionNumber: number,
): Question {
  const pair = `${questionNumber}${pattern === 'A' ? 'm' : 'p'}` as TileCode
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
        pair,
      ],
      winningTile: pair,
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

  it('条件やIDが違っても、並び順が違う同じ牌姿は1問までにする', () => {
    const pool = createQuestions(6, 6)
    const original = pool[0]
    const duplicate: Question = {
      ...original,
      id: 'duplicate',
      pattern: 'B',
      fu: 30,
      condition: { ...original.condition, player: 'dealer', seatWind: 'east' },
      hand: {
        ...original.hand,
        concealedTiles: [...original.hand.concealedTiles].reverse(),
      },
    }
    for (const random of [() => 0, () => 0.5, () => 0.999]) {
      const selected = selectQuestions([...pool, duplicate], { random })
      expect(
        selected.filter((q) => [original.id, duplicate.id].includes(q.id))
          .length,
      ).toBeLessThanOrEqual(1)
      expect(selected.filter((q) => q.pattern === 'A')).toHaveLength(5)
      expect(selected.filter((q) => q.pattern === 'B')).toHaveLength(5)
    }
  })

  it('赤5・副露の並び順だけ違う牌姿も同じものとして扱う', () => {
    const pool = createQuestions(5, 5)
    const hand: Question['hand'] = {
      concealedTiles: ['5m'],
      winningTile: '5p',
      melds: [
        { type: 'chi', tiles: ['4m', '5m', '6m'] },
        { type: 'pon', tiles: ['7z', '7z', '7z'] },
      ],
    }
    pool[0] = { ...pool[0], hand }
    const duplicate: Question = {
      ...pool[0],
      id: 'red-duplicate',
      hand: {
        concealedTiles: ['0m'],
        winningTile: '0p',
        melds: [
          { type: 'pon', tiles: ['7z', '7z', '7z'] },
          { type: 'chi', tiles: ['6m', '0m', '4m'] },
        ],
      },
    }
    const selected = selectQuestions([...pool, duplicate], {
      random: () => 0.999,
    })
    expect(
      selected.filter((q) => [pool[0].id, duplicate.id].includes(q.id)),
    ).toHaveLength(1)
  })

  it('両パターンが同じ5種類だけを共有する場合は10問を作れない', () => {
    const pool = createQuestions(5, 5)
    for (let i = 0; i < 5; i++)
      pool[i + 5] = { ...pool[i + 5], hand: pool[i].hand }
    expect(() => selectQuestions(pool)).toThrow('重複しない牌姿')
  })

  it('Bに必要な共有牌姿をAで使い切らず、可能な組み合わせを選ぶ', () => {
    const pool = createQuestions(6, 4)
    const shared: Question = {
      ...pool[0],
      id: 'shared-B',
      pattern: 'B',
      fu: 30,
    }
    const selected = selectQuestions([...pool, shared], { random: () => 0.999 })
    expect(selected.map((q) => q.id)).toContain('shared-B')
    expect(selected.map((q) => q.id)).not.toContain(pool[0].id)
    expect(selected).toHaveLength(10)
  })

  it('IDの数が足りても異なる牌姿が足りなければエラーにする', () => {
    const pool = createQuestions(5, 5)
    pool[1] = { ...pool[1], hand: pool[0].hand }
    expect(() => selectQuestions(pool)).toThrow('重複しない牌姿')
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
