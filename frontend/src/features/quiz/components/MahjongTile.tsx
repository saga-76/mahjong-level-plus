import type { TileCode } from '../types/question'
import { getMahjongTileImagePath } from '../utils/getMahjongTileImagePath'

type MahjongTileProps = {
  readonly tile: TileCode
  readonly className?: string
  readonly size?: 'default' | 'large'
}

const sizeClasses = {
  default: 'w-[clamp(0.875rem,4.8vw,2rem)] sm:w-10 md:w-12 lg:w-14',
  large:
    'w-[clamp(1rem,5.6vw,2.25rem)] sm:w-12 md:w-14 lg:w-16 xl:w-[4.5rem] [@media(min-width:640px)_and_(max-height:900px)]:w-12',
} as const

export function MahjongTile({
  tile,
  className = '',
  size = 'default',
}: MahjongTileProps) {
  return (
    <img
      src={getMahjongTileImagePath(tile)}
      alt={`${tile}の麻雀牌`}
      className={`block h-auto shrink-0 select-none rounded-[10%] border border-[#b38a4f] bg-[#f2e5c8] p-0.5 shadow-[0_4px_8px_rgba(0,0,0,0.55)] ${sizeClasses[size]} ${className}`}
      draggable="false"
    />
  )
}
