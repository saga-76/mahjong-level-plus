export type TestQuestion = {
  id: string
  tiles: readonly string[]
  condition: {
    player: 'dealer' | 'nonDealer'
    winType: 'ron' | 'tsumo'
    roundWind: 'east' | 'south' | 'west' | 'north'
    seatWind: 'east' | 'south' | 'west' | 'north'
  }
  choices: readonly string[]
  correctAnswer: string
  han: number
  fu: number | null
  requiresFuCalculation: boolean
  explanation: string
}

type TestQuestionOverrides = Omit<Partial<TestQuestion>, 'condition'> & {
  condition?: Partial<TestQuestion['condition']>
}

const baseTestQuestion: TestQuestion = {
  id: 'test-question-1',
  tiles: [
    '1m',
    '2m',
    '3m',
    '4m',
    '5m',
    '6m',
    '2p',
    '3p',
    '4p',
    '6s',
    '7s',
    '8s',
    '5p',
    '5p',
  ],
  condition: {
    player: 'nonDealer',
    winType: 'ron',
    roundWind: 'east',
    seatWind: 'south',
  },
  choices: ['3,900点', '5,200点', '8,000点'],
  correctAnswer: '8,000点',
  han: 5,
  fu: null,
  requiresFuCalculation: false,
  explanation: '子のロン和了で5翻のため、満貫の8,000点です。',
}

export function createTestQuestion(
  overrides: TestQuestionOverrides = {},
): TestQuestion {
  return {
    ...baseTestQuestion,
    ...overrides,
    tiles: [...(overrides.tiles ?? baseTestQuestion.tiles)],
    choices: [...(overrides.choices ?? baseTestQuestion.choices)],
    condition: {
      ...baseTestQuestion.condition,
      ...overrides.condition,
    },
  }
}

export const testQuestions: readonly TestQuestion[] = [
  createTestQuestion(),
  createTestQuestion({
    id: 'test-question-2',
    condition: {
      player: 'nonDealer',
      winType: 'ron',
      roundWind: 'south',
      seatWind: 'west',
    },
    choices: ['3,900点', '5,200点', '7,700点'],
    correctAnswer: '5,200点',
    han: 3,
    fu: 40,
    requiresFuCalculation: true,
    explanation: '子のロン和了で40符3翻のため、5,200点です。',
  }),
]
