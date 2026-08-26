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
      className={`block h-auto w-8 shrink-0 select-none rounded-[10%] border border-[#b38a4f] bg-[#f2e5c8] p-0.5 shadow-[0_4px_8px_rgba(0,0,0,0.55)] sm:w-10 md:w-12 lg:w-14 ${className}`}
      draggable="false"
    />
  )
}
