import type { QuizResult, Rank, RankCriterion } from '../../quiz'

type ResultPageProps = {
  readonly result: QuizResult
  readonly rankCriterion: RankCriterion
  readonly onReview: () => void
  readonly onRetry: () => void
  readonly onTop: () => void
}

const rankStyleClasses: Record<Rank, string> = {
  G: 'text-[#94a3b8] [text-shadow:0_1px_0_#e2e8f0,0_3px_0_#475569,0_5px_0_#1e293b,0_9px_14px_rgba(0,0,0,0.75)]',
  F: 'text-[#b7794b] [text-shadow:0_1px_0_#e7b98e,0_3px_0_#7c3f1d,0_5px_0_#4a2412,0_9px_14px_rgba(0,0,0,0.75)]',
  E: 'text-[#22c55e] [text-shadow:0_1px_0_#86efac,0_3px_0_#15803d,0_5px_0_#14532d,0_9px_14px_rgba(0,0,0,0.75)]',
  D: 'text-[#22d3ee] [text-shadow:0_1px_0_#a5f3fc,0_3px_0_#0891b2,0_5px_0_#164e63,0_9px_14px_rgba(0,0,0,0.75)]',
  C: 'text-[#3b82f6] [text-shadow:0_1px_0_#93c5fd,0_3px_0_#1d4ed8,0_5px_0_#1e3a8a,0_9px_14px_rgba(0,0,0,0.75)]',
  B: 'text-[#8b5cf6] [text-shadow:0_1px_0_#c4b5fd,0_3px_0_#6d28d9,0_5px_0_#4c1d95,0_9px_14px_rgba(0,0,0,0.75)]',
  A: 'text-[#ef4444] [text-shadow:0_1px_0_#ff9a9a,0_3px_0_#a31313,0_5px_0_#6f0d0d,0_9px_14px_rgba(0,0,0,0.75)]',
  S: 'text-[#d946ef] [text-shadow:0_1px_0_#f5d0fe,0_3px_0_#a21caf,0_5px_0_#701a75,0_9px_14px_rgba(0,0,0,0.75)]',
  SS: 'text-[#e2e8f0] [text-shadow:0_1px_0_#ffffff,0_3px_0_#94a3b8,0_5px_0_#475569,0_9px_14px_rgba(0,0,0,0.8)]',
  SSS: 'text-[#facc15] [text-shadow:0_1px_0_#fef3c7,0_3px_0_#d97706,0_5px_0_#92400e,0_9px_14px_rgba(0,0,0,0.8)]',
}

function formatElapsedTime(elapsedTimeMs: number): string {
  const seconds = Math.floor(elapsedTimeMs / 1_000)
  const milliseconds = (elapsedTimeMs % 1_000).toString().padStart(3, '0')

  return `${seconds}秒${milliseconds}`
}

export function ResultPage({
  result,
  rankCriterion,
  onReview,
  onRetry,
  onTop,
}: ResultPageProps) {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-x-hidden bg-[#031a14] px-3 py-4 text-white sm:px-6 sm:py-8">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,75,54,0.75),transparent_60%),linear-gradient(135deg,rgba(198,161,96,0.1),transparent_45%)]"
      />

      <section className="relative w-full max-w-4xl rounded-xl bg-[#0d4938] px-4 py-6 text-center shadow-[0_18px_44px_rgba(0,0,0,0.78),inset_0_1px_0_rgba(255,255,255,0.1)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <h1 className="text-3xl font-semibold tracking-[0.15em] [text-shadow:0_0_18px_rgba(250,204,21,0.45)] sm:text-4xl">
          今回の結果
        </h1>

        <div className="relative isolate mt-6 sm:mt-8">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -z-10 h-40 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f8d88f]/25 blur-3xl"
          />
          <p className="text-sm font-semibold tracking-[0.2em] text-white">
            RANK
          </p>
          <p
            aria-label="ランク"
            className={`mt-2 text-6xl font-black sm:text-8xl ${rankStyleClasses[rankCriterion.rank]}`}
          >
            {rankCriterion.rank}
          </p>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-white sm:text-lg">
            {rankCriterion.description}
          </p>
        </div>

        <div className="mt-7 grid gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4">
          <div className="rounded bg-emerald-200/80 p-4 shadow-[inset_0_0_18px_rgba(209,250,229,0.5),0_6px_14px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-5">
            <p className="text-sm font-semibold text-black">スコア</p>
            <p className="mt-1 text-2xl font-bold text-black sm:mt-2 sm:text-3xl">
              {result.totalScore.toLocaleString()}点
            </p>
          </div>
          <div className="rounded bg-emerald-200/80 p-4 shadow-[inset_0_0_18px_rgba(209,250,229,0.5),0_6px_14px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-5">
            <p className="text-sm font-semibold text-black">正解数</p>
            <p className="mt-1 text-2xl font-bold text-black sm:mt-2 sm:text-3xl">
              {result.correctCount} / {result.totalQuestions}問
            </p>
          </div>
          <div className="rounded bg-emerald-200/80 p-4 shadow-[inset_0_0_18px_rgba(209,250,229,0.5),0_6px_14px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-5">
            <p className="text-sm font-semibold text-black">回答時間</p>
            <p className="mt-1 text-2xl font-bold text-black sm:mt-2 sm:text-3xl">
              {formatElapsedTime(result.elapsedTimeMs)}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
          <button
            type="button"
            className="w-full cursor-pointer rounded bg-[#f3e8ce] px-3 py-2 text-sm font-semibold tracking-[0.04em] text-[#031a14] transition hover:bg-[#fff5dc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto sm:min-w-44 sm:px-4 sm:py-2.5 sm:tracking-[0.08em]"
            onClick={onRetry}
          >
            もう一度挑戦
          </button>
          <button
            type="button"
            className="w-full cursor-pointer rounded bg-[#f3e8ce] px-3 py-2 text-sm font-semibold tracking-[0.04em] text-[#031a14] transition hover:bg-[#fff5dc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto sm:min-w-44 sm:px-4 sm:py-2.5 sm:tracking-[0.08em]"
            onClick={onReview}
          >
            解説を見る
          </button>
          <button
            type="button"
            className="w-full cursor-pointer rounded bg-[#f3e8ce] px-3 py-2 text-sm font-semibold tracking-[0.04em] text-[#031a14] transition hover:bg-[#fff5dc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto sm:min-w-44 sm:px-4 sm:py-2.5 sm:tracking-[0.08em]"
            onClick={onTop}
          >
            トップ画面
          </button>
        </div>
      </section>
    </main>
  )
}
