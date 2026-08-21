import type { TileCode } from '../types/question'
import { getMahjongTileImagePath } from '../utils/getMahjongTileImagePath'

type MahjongTileProps = {
  readonly tile: TileCode
  readonly className?: string
}

export function MahjongTile({ tile, className = '' }: MahjongTileProps) {
  return (
    <img
      src={getMahjongTileImagePath(tile)}
      alt={`${tile}の麻雀牌`}
      className={`block h-auto w-10 shrink-0 select-none sm:w-12 md:w-14 ${className}`}
      draggable="false"
    />
  )
}
