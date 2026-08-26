import type { DoraTileCodes } from '../types/question'
import { MahjongTile } from './MahjongTile'

type DoraTilesProps = {
  readonly tiles: DoraTileCodes
  readonly compact?: boolean
}

export function DoraTiles({ tiles, compact = false }: DoraTilesProps) {
  const emptyStateSizeClass = compact
    ? 'w-8 sm:w-10'
    : 'w-8 sm:w-10 md:w-12 lg:w-14'

  return (
    <div
      role="group"
      aria-label="ドラ牌"
      className="flex items-end justify-center gap-1"
    >
      {tiles.length === 0 ? (
        <span
          className={`flex aspect-[3/4] shrink-0 items-center justify-center text-sm text-[#f5e7c8] ${emptyStateSizeClass}`}
        >
          なし
        </span>
      ) : (
        tiles.map((tile, index) => (
          <MahjongTile
            key={`${tile}-${index}`}
            tile={tile}
            className={compact ? 'max-w-10' : ''}
          />
        ))
      )}
    </div>
  )
}
