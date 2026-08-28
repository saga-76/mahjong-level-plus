import topBackground from '../assets/top-background.webp'
import { HowToDialog } from './HowToDialog'
import { MahjongTileDecoration } from './MahjongTileDecoration'
import { TopActions } from './TopActions'
import { TopFooter } from './TopFooter'
import { ScoreRankDialog } from './ScoreRankDialog'
import styles from './TopPage.module.css'

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
      className="relative h-dvh overflow-hidden bg-cover bg-center font-['Yu_Mincho','Hiragino_Mincho_ProN',serif]"
      style={{ backgroundImage: `url(${topBackground})` }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(0,12,9,0.18)_78%)]"
      />
      <div className="relative z-20 flex h-full min-h-0 flex-col">
        <main className="flex min-h-0 flex-1 items-center justify-center overflow-hidden px-3 py-4 sm:px-6">
          <section
            className={`${styles.content} flex min-w-0 flex-col items-center text-center`}
          >
            <div className={styles.titleSpotlight}>
              <h1
                className={`${styles.title} bg-gradient-to-b from-[#fff1c7] via-[#d8ad68] to-[#9a682e] bg-clip-text font-bold text-transparent drop-shadow-[0_4px_3px_rgba(0,0,0,0.8)]`}
              >
                麻雀レベル++
              </h1>
            </div>

            <p
              className={`${styles.tagline} font-semibold text-[#e8c58d] drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)]`}
            >
              点数計算を、速く、正確に
            </p>

            <div
              aria-hidden="true"
              className={`${styles.divider} flex items-center text-[#c99b55]`}
            >
              <span className="h-px flex-1 bg-current/60" />
              <span
                className={`${styles.dividerMark} rotate-45 border border-current`}
              />
              <span className="h-px flex-1 bg-current/60" />
            </div>

            <div className="w-full min-w-0">
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
