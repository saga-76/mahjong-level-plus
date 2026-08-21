import type { TileCode } from '../types/question'

const suitFilePrefixes = {
  m: 'Man',
  p: 'Pin',
  s: 'Sou',
} as const

const honorFileNames = {
  '1z': 'Ton',
  '2z': 'Nan',
  '3z': 'Shaa',
  '4z': 'Pei',
  '5z': 'Haku',
  '6z': 'Hatsu',
  '7z': 'Chun',
} as const satisfies Partial<Record<TileCode, string>>

export function getMahjongTileImagePath(tile: TileCode): string {
  if (tile in honorFileNames) {
    return `/assets/mahjong/${honorFileNames[tile as keyof typeof honorFileNames]}.svg`
  }

  const tileNumber = tile[0]
  const tileSuit = tile[1] as keyof typeof suitFilePrefixes
  const filePrefix = suitFilePrefixes[tileSuit]
  const fileNumber = tileNumber === '0' ? '5-Dora' : tileNumber

  return `/assets/mahjong/${filePrefix}${fileNumber}.svg`
}
