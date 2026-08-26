import type { MeldType, QuestionHand } from '../types/question'
import { MahjongTile } from './MahjongTile'

const meldLabels: Record<MeldType, string> = {
  chi: 'チー',
  pon: 'ポン',
  kan: 'カン',
}

type WinningHandProps = {
  readonly hand: QuestionHand
}

export function WinningHand({ hand }: WinningHandProps) {
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
            {hand.concealedTiles.map((tile, index) => (
              <MahjongTile key={`${tile}-${index}`} tile={tile} />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-1 text-xs font-semibold text-[#f1d49e]">アガリ牌</p>
          <div
            role="group"
            aria-label="アガリ牌"
            className="rounded-sm ring-2 ring-[#d4ae6b] ring-offset-2 ring-offset-[#05251d]"
          >
            <MahjongTile tile={hand.winningTile} />
          </div>
        </div>

        {hand.melds.map((meld, meldIndex) => (
          <div key={`${meld.type}-${meldIndex}`}>
            <p className="mb-1 text-xs font-semibold text-[#f1d49e]">
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
                  className="brightness-95"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-xs text-[#d4ae6b] sm:hidden">
        牌が見切れる場合は横にスクロールできます
      </p>
    </section>
  )
}
