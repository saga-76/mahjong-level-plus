import type { DoraTileCodes } from '../types/question'
import { MahjongTile } from './MahjongTile'

type DoraTilesProps = {
  readonly tiles: DoraTileCodes
  readonly compact?: boolean
}

export function DoraTiles({ tiles, compact = false }: DoraTilesProps) {
  return (
    <div
      role="group"
      aria-label="ドラ牌"
      className="flex items-end justify-center gap-1"
    >
      {tiles.length === 0 ? (
        <span className="text-sm text-[#f5e7c8]">なし</span>
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
