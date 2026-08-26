import topBackground from '../assets/top-background.webp'
import { HowToDialog } from './HowToDialog'
import { MahjongTileDecoration } from './MahjongTileDecoration'
import { TopActions } from './TopActions'
import { TopFooter } from './TopFooter'
import { ScoreRankDialog } from './ScoreRankDialog'

type TopPageProps = {
  isHowToOpen: boolean
  isScoreRankOpen: boolean
  onStart: () => void
  onOpenHowTo: () => void
  onCloseHowTo: () => void
  onOpenScoreRank: () => void
  onCloseScoreRank: () => void
}
export function TopPage({
  isHowToOpen,
  isScoreRankOpen,
  onStart,
  onOpenHowTo,
  onCloseHowTo,
  onOpenScoreRank,
  onCloseScoreRank,
}: TopPageProps) {
  return (
    <div
      className="relative min-h-dvh overflow-x-hidden bg-cover bg-center font-['Yu_Mincho','Hiragino_Mincho_ProN',serif]"
      style={{ backgroundImage: `url(${topBackground})` }}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-black/20" />
      <div className="relative z-20 flex min-h-dvh flex-col">
        <main className="flex flex-1 items-center justify-center px-3 py-6 sm:px-6 sm:py-10 lg:py-12 [@media(min-width:640px)_and_(max-height:850px)]:py-3">
          <section className="flex w-full max-w-4xl flex-col items-center text-center sm:-translate-y-4 lg:-translate-y-6 [@media(min-width:640px)_and_(max-height:850px)]:translate-y-0">
            <h1 className="bg-gradient-to-b from-[#fff1c7] via-[#d8ad68] to-[#9a682e] bg-clip-text text-[clamp(2rem,10.5vw,4.5rem)] leading-tight font-bold tracking-[0.04em] text-transparent drop-shadow-[0_4px_3px_rgba(0,0,0,0.8)] sm:text-7xl sm:tracking-[0.08em] md:text-8xl lg:text-9xl [@media(min-width:640px)_and_(max-height:850px)]:text-6xl">
              麻雀レベル++
            </h1>

            <p className="mt-3 text-sm font-semibold tracking-[0.12em] text-[#e8c58d] drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)] sm:mt-4 sm:text-xl sm:tracking-[0.28em] md:text-2xl [@media(min-width:640px)_and_(max-height:850px)]:mt-2 [@media(min-width:640px)_and_(max-height:850px)]:text-lg">
              点数計算を、速く、正確に
            </p>

            <div
              aria-hidden="true"
              className="my-4 flex w-full max-w-xl items-center gap-3 text-[#c99b55] sm:my-6 sm:gap-4 [@media(min-width:640px)_and_(max-height:850px)]:my-3"
            >
              <span className="h-px flex-1 bg-current/60" />
              <span className="size-3 rotate-45 border border-current" />
              <span className="h-px flex-1 bg-current/60" />
            </div>

            <div className="w-full max-w-2xl">
              <TopActions
                onStart={onStart}
                onOpenHowTo={onOpenHowTo}
                onOpenScoreRank={onOpenScoreRank}
              />
            </div>
          </section>
        </main>

        <TopFooter />
      </div>

      <MahjongTileDecoration />

      <HowToDialog isOpen={isHowToOpen} onClose={onCloseHowTo} />

      <ScoreRankDialog isOpen={isScoreRankOpen} onClose={onCloseScoreRank} />
    </div>
  )
}
