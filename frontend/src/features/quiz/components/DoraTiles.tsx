import type { DoraTileCodes } from '../types/question'
import { MahjongTile } from './MahjongTile'

type DoraTilesProps = {
  readonly tiles: DoraTileCodes
  readonly compact?: boolean
  readonly size?: 'default' | 'large'
}

export function DoraTiles({
  tiles,
  compact = false,
  size = 'default',
}: DoraTilesProps) {
  const emptyStateSizeClass = compact
    ? 'w-8 sm:w-10'
    : size === 'large'
      ? 'w-auto min-w-8 sm:w-12 md:w-14 lg:w-16 xl:w-[4.5rem] [@media(min-width:640px)_and_(max-height:900px)]:w-12'
      : 'w-8 sm:w-10 md:w-12 lg:w-14'

  return (
    <div
      role="group"
      aria-label="ドラ牌"
      className="flex items-end justify-center gap-1"
    >
      {tiles.length === 0 ? (
        <span
          className={`flex shrink-0 items-center justify-center whitespace-nowrap text-sm text-white sm:aspect-[3/4] ${emptyStateSizeClass}`}
        >
          なし
        </span>
      ) : (
        tiles.map((tile, index) => (
          <MahjongTile
            key={`${tile}-${index}`}
            tile={tile}
            size={size}
            className={compact ? 'max-w-10' : ''}
          />
        ))
      )}
    </div>
  )
}
