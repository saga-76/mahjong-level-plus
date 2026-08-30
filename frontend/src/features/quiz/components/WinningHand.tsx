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
      className="min-w-0 overflow-x-hidden pb-1 sm:touch-pan-x sm:overscroll-x-contain sm:overflow-x-auto sm:pb-2"
    >
      <div className="mx-auto flex w-full min-w-0 items-end justify-center gap-1 sm:w-max sm:min-w-max sm:gap-4">
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

        <div className="relative pt-4 sm:pt-0">
          <p className="absolute top-0 right-0 whitespace-nowrap text-[10px] font-semibold text-white sm:static sm:mb-1 sm:text-xs">
            アガリ牌
          </p>
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
          <div
            key={`${meld.type}-${meldIndex}`}
            className="relative pt-4 sm:pt-0"
          >
            <p className="absolute top-0 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold text-white sm:static sm:mb-1 sm:translate-x-0 sm:text-xs">
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
    </section>
  )
}
