import type { QuizResult, RankCriterion } from '../../quiz'

type ResultPageProps = {
  readonly result: QuizResult
  readonly rankCriterion: RankCriterion
  readonly onReview: () => void
}

function formatElapsedTime(elapsedTimeMs: number): string {
  return `${(elapsedTimeMs / 1_000).toFixed(3)}秒`
}

export function ResultPage({
  result,
  rankCriterion,
  onReview,
}: ResultPageProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#031a14] px-4 py-8 text-[#f1d49e] sm:px-6">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,75,54,0.75),transparent_60%),linear-gradient(135deg,rgba(198,161,96,0.1),transparent_45%)]"
      />

      <section className="relative w-full max-w-4xl rounded-xl border-2 border-[#c6a160] bg-[#082f25]/95 px-5 py-8 text-center shadow-[0_16px_40px_rgba(0,0,0,0.7)] outline outline-1 -outline-offset-3 outline-[#d4ae6b]/40 sm:px-10 sm:py-12">
        <p className="text-sm tracking-[0.3em] text-[#d4ae6b]">RESULT</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[0.15em] sm:text-4xl">
          結果
        </h1>

        <div className="mt-8">
          <p className="text-sm tracking-[0.2em] text-[#d4ae6b]">RANK</p>
          <p
            aria-label="ランク"
            className="mt-2 text-7xl font-bold text-[#f1d49e] drop-shadow-[0_4px_3px_rgba(0,0,0,0.8)] sm:text-8xl"
          >
            {rankCriterion.rank}
          </p>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-[#f5e7c8] sm:text-lg">
            {rankCriterion.description}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded border border-[#c6a160] bg-black/20 p-5">
            <p className="text-sm text-[#d4ae6b]">スコア</p>
            <p className="mt-2 text-3xl font-semibold">
              {result.totalScore.toLocaleString()}点
            </p>
          </div>
          <div className="rounded border border-[#c6a160] bg-black/20 p-5">
            <p className="text-sm text-[#d4ae6b]">正解数</p>
            <p className="mt-2 text-3xl font-semibold">
              {result.correctCount} / {result.totalQuestions}問
            </p>
          </div>
          <div className="rounded border border-[#c6a160] bg-black/20 p-5">
            <p className="text-sm text-[#d4ae6b]">回答時間</p>
            <p className="mt-2 text-3xl font-semibold">
              {formatElapsedTime(result.elapsedTimeMs)}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="mt-8 min-w-64 cursor-pointer rounded border-2 border-[#c6a160] bg-[#f2e5c8] px-8 py-4 text-lg font-semibold tracking-[0.08em] text-[#063b2b] transition hover:bg-[#f8efd9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f1d49e]"
          onClick={onReview}
        >
          10問の解説を見る
        </button>
      </section>
    </main>
  )
}
