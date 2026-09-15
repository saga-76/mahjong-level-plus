import type { PlayerType, WinType } from '../types/question'

export type MahjongPointCalculationInput = {
  readonly fu: number | null
  readonly han: number
  readonly player: PlayerType
  readonly winType: WinType
  readonly yakumanCount?: number
}

type RonPoints = {
  readonly basePoints: number
  readonly player: PlayerType
  readonly winType: 'ron'
  readonly ronPoints: number
}

type DealerTsumoPoints = {
  readonly basePoints: number
  readonly player: 'dealer'
  readonly winType: 'tsumo'
  readonly allPayment: number
}

type NonDealerTsumoPoints = {
  readonly basePoints: number
  readonly player: 'nonDealer'
  readonly winType: 'tsumo'
  readonly dealerPayment: number
  readonly nonDealerPayment: number
}

export type MahjongPointResult =
  RonPoints | DealerTsumoPoints | NonDealerTsumoPoints

function roundUpToHundred(points: number): number {
  return Math.ceil(points / 100) * 100
}

function calculateBasePoints({
  fu,
  han,
  yakumanCount = 0,
}: Pick<MahjongPointCalculationInput, 'fu' | 'han' | 'yakumanCount'>): number {
  if (!Number.isInteger(han) || han < 1) {
    throw new RangeError('han must be a positive integer')
  }

  if (!Number.isInteger(yakumanCount) || yakumanCount < 0) {
    throw new RangeError('yakumanCount must be a non-negative integer')
  }

  if (yakumanCount > 0) return 8_000 * yakumanCount
  if (han >= 11) return 6_000
  if (han >= 8) return 4_000
  if (han >= 6) return 3_000
  if (han >= 5) return 2_000

  if (fu === null || !Number.isInteger(fu) || fu < 20) {
    throw new RangeError('fu must be an integer of at least 20 below mangan')
  }

  return Math.min(fu * 2 ** (han + 2), 2_000)
}

/**
 * Calculates standard Japanese mahjong payments without honba or riichi sticks.
 * The app keeps its existing rule where 30-fu 4-han is 7,700/11,600 points.
 * Actual yakuman must be supplied separately from ordinary han.
 */
export function calculateMahjongPoints(
  input: MahjongPointCalculationInput,
): MahjongPointResult {
  const basePoints = calculateBasePoints(input)
  const { player, winType } = input

  if (winType === 'ron') {
    return {
      basePoints,
      player,
      winType,
      ronPoints: roundUpToHundred(basePoints * (player === 'dealer' ? 6 : 4)),
    }
  }

  if (player === 'dealer') {
    return {
      basePoints,
      player,
      winType,
      allPayment: roundUpToHundred(basePoints * 2),
    }
  }

  return {
    basePoints,
    player,
    winType,
    dealerPayment: roundUpToHundred(basePoints * 2),
    nonDealerPayment: roundUpToHundred(basePoints),
  }
}

function formatPoints(points: number): string {
  return points.toLocaleString('en-US')
}

export function formatMahjongPointAnswer(result: MahjongPointResult): string {
  if (result.winType === 'ron') {
    return `${formatPoints(result.ronPoints)}点`
  }

  if (result.player === 'dealer') {
    return `${formatPoints(result.allPayment)}点 オール`
  }

  return `${formatPoints(result.nonDealerPayment)}点 / ${formatPoints(result.dealerPayment)}点`
}
