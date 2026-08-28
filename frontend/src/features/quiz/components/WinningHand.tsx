import type { MeldType, QuestionHand, TileCode } from '../types/question'
import { MahjongTile } from './MahjongTile'

const meldLabels: Record<MeldType, string> = {
  chi: 'チー',
  pon: 'ポン',
  kan: 'カン',
}

const suitOrder = {
  m: 0,
  p: 1,
  s: 2,
  z: 3,
} as const

function getTileSortValue(tile: TileCode): number {
  const suit = tile.slice(-1) as keyof typeof suitOrder
  const tileNumber = Number(tile[0])
  const normalizedNumber = tileNumber === 0 ? 5 : tileNumber

  return suitOrder[suit] * 10 + normalizedNumber
}

type WinningHandProps = {
  readonly hand: QuestionHand
  readonly showWinningTileFrame?: boolean
  readonly tileSize?: 'default' | 'large'
}

export function WinningHand({
  hand,
  showWinningTileFrame = true,
  tileSize = 'default',
}: WinningHandProps) {
  const sortedConcealedTiles = [...hand.concealedTiles].sort(
    (firstTile, secondTile) =>
      getTileSortValue(firstTile) - getTileSortValue(secondTile),
  )

  return (
    <section
      aria-label="アガリ役"
      className="touch-pan-x overscroll-x-contain overflow-x-auto pb-2"
    >
      <div className="mx-auto flex w-max min-w-max items-end gap-2 sm:gap-4">
        <div>
          <div
            role="group"
            aria-label="手牌"
            className="flex items-end gap-0.5"
          >
            {sortedConcealedTiles.map((tile, index) => (
              <MahjongTile
                key={`${tile}-${index}`}
                tile={tile}
                size={tileSize}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-1 text-xs font-semibold text-white">アガリ牌</p>
          <div
            role="group"
            aria-label="アガリ牌"
            className={
              showWinningTileFrame
                ? 'rounded-sm ring-2 ring-[#d4ae6b] ring-offset-2 ring-offset-[#05251d]'
                : undefined
            }
          >
            <MahjongTile tile={hand.winningTile} size={tileSize} />
          </div>
        </div>

        {hand.melds.map((meld, meldIndex) => (
          <div key={`${meld.type}-${meldIndex}`}>
            <p className="mb-1 text-xs font-semibold text-white">
              {meldLabels[meld.type]}
            </p>
            <div
              role="group"
              aria-label={meldLabels[meld.type]}
              className="flex items-end gap-0.5 rounded bg-black/20 p-1"
            >
              {meld.tiles.map((tile, tileIndex) => (
                <MahjongTile
                  key={`${tile}-${tileIndex}`}
                  tile={tile}
                  size={tileSize}
                  className="brightness-95"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-xs font-medium text-white sm:hidden">
        牌が見切れる場合は横にスクロールできます
      </p>
    </section>
  )
}
