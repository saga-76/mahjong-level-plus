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
        className={`${styles.ornateButton} ${styles.primaryButton} min-h-20 w-full cursor-pointer px-4 py-3 text-3xl font-semibold tracking-[0.18em] text-[#f1d49e] sm:min-h-32 sm:px-8 sm:py-4 sm:text-5xl sm:tracking-[0.28em] lg:min-h-40 lg:text-6xl [@media(min-width:640px)_and_(max-height:850px)]:min-h-24 [@media(min-width:640px)_and_(max-height:850px)]:text-4xl`}
        onClick={onStart}
      >
        <span className={styles.label}>スタート</span>
      </button>

      <button
        type="button"
        className={`${styles.ornateButton} ${styles.secondaryButton} min-h-14 w-full cursor-pointer px-4 py-2 text-2xl font-semibold tracking-[0.14em] text-[#063b2b] sm:min-h-20 sm:w-5/6 sm:px-6 sm:py-3 sm:text-4xl sm:tracking-[0.22em] lg:min-h-24 lg:text-5xl [@media(min-width:640px)_and_(max-height:850px)]:min-h-16 [@media(min-width:640px)_and_(max-height:850px)]:text-3xl`}
        onClick={onOpenHowTo}
      >
        <span className={`${styles.label} ${styles.secondaryLabel}`}>
          遊び方
        </span>
      </button>
      <button
        type="button"
        className={`${styles.ornateButton} ${styles.secondaryButton} min-h-14 w-full cursor-pointer px-4 py-2 text-2xl font-semibold tracking-[0.12em] text-[#063b2b] sm:min-h-20 sm:w-5/6 sm:px-6 sm:py-3 sm:text-4xl sm:tracking-[0.18em] lg:min-h-24 lg:text-5xl [@media(min-width:640px)_and_(max-height:850px)]:min-h-16 [@media(min-width:640px)_and_(max-height:850px)]:text-3xl`}
        onClick={onOpenScoreRank}
      >
        <span className={`${styles.label} ${styles.secondaryLabel}`}>
          得点・ランク
        </span>
      </button>
    </nav>
  )
}
