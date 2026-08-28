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
    <nav aria-label="トップ画面メニュー" className={styles.actions}>
      <button
        type="button"
        className={`${styles.ornateButton} ${styles.primaryButton}`}
        onClick={onStart}
      >
        <span className={styles.label}>スタート</span>
      </button>

      <button
        type="button"
        className={`${styles.ornateButton} ${styles.secondaryButton}`}
        onClick={onOpenHowTo}
      >
        <span className={`${styles.label} ${styles.secondaryLabel}`}>
          遊び方
        </span>
      </button>
      <button
        type="button"
        className={`${styles.ornateButton} ${styles.secondaryButton}`}
        onClick={onOpenScoreRank}
      >
        <span className={`${styles.label} ${styles.secondaryLabel}`}>
          得点・ランク
        </span>
      </button>
    </nav>
  )
}
