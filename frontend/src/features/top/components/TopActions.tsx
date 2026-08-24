import styles from './TopActions.module.css'

type TopActionsProps = {
  onStart: () => void
  onOpenHowTo: () => void
  onOpenScoreRank: () => void
}

export function TopActions({
  onStart,
  onOpenHowTo,
  onOpenScoreRank,
}: TopActionsProps) {
  return (
    <nav
      aria-label="トップ画面メニュー"
      className="flex flex-col items-center gap-4 sm:gap-5 [@media(max-height:850px)]:gap-2"
    >
      <button
        type="button"
        className={`${styles.ornateButton} ${styles.primaryButton} min-h-32 w-full cursor-pointer px-8 py-4 text-5xl font-semibold tracking-[0.28em] text-[#f1d49e] sm:min-h-40 sm:text-6xl [@media(max-height:850px)]:min-h-24 [@media(max-height:850px)]:text-4xl`}
        onClick={onStart}
      >
        <span className={styles.label}>スタート</span>
      </button>

      <button
        type="button"
        className={`${styles.ornateButton} ${styles.secondaryButton} min-h-20 w-5/6 cursor-pointer px-6 py-3 text-4xl font-semibold tracking-[0.22em] text-[#063b2b] sm:min-h-24 sm:text-5xl [@media(max-height:850px)]:min-h-16 [@media(max-height:850px)]:text-3xl`}
        onClick={onOpenHowTo}
      >
        <span className={`${styles.label} ${styles.secondaryLabel}`}>
          遊び方
        </span>
      </button>
      <button
        type="button"
        className={`${styles.ornateButton} ${styles.secondaryButton} min-h-20 w-5/6 cursor-pointer px-6 py-3 text-4xl font-semibold tracking-[0.18em] text-[#063b2b] sm:min-h-24 sm:text-5xl [@media(max-height:850px)]:min-h-16 [@media(max-height:850px)]:text-3xl`}
        onClick={onOpenScoreRank}
      >
        <span className={`${styles.label} ${styles.secondaryLabel}`}>
          得点・ランク
        </span>
      </button>
    </nav>
  )
}
