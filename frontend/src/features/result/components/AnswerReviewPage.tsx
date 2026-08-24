import { DoraTiles, WinningHand } from '../../quiz'
import type { ReviewedQuestion } from '../types/review'

type AnswerReviewPageProps = {
  readonly reviewedQuestions: readonly ReviewedQuestion[]
  readonly onBack: () => void
  readonly onRetry: () => void
  readonly onTop: () => void
}

type ReviewActionsProps = {
  readonly onBack: () => void
  readonly onRetry: () => void
  readonly onTop: () => void
}

function ReviewActions({ onBack, onRetry, onTop }: ReviewActionsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <button
        type="button"
        className="cursor-pointer rounded border-2 border-[#c6a160] bg-[#f2e5c8] px-6 py-3 font-semibold text-[#063b2b] transition hover:bg-[#f8efd9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f1d49e]"
        onClick={onBack}
      >
        結果に戻る
      </button>
      <button
        type="button"
        className="cursor-pointer rounded border-2 border-[#c6a160] bg-[#123727] px-6 py-3 font-semibold text-[#f1d49e] transition hover:bg-[#1b4b36] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f1d49e]"
        onClick={onRetry}
      >
        もう一度挑戦
      </button>
      <button
        type="button"
        className="cursor-pointer rounded border-2 border-[#c6a160] bg-transparent px-6 py-3 font-semibold text-[#f1d49e] transition hover:bg-[#1b4b36] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f1d49e]"
        onClick={onTop}
      >
        トップ画面
      </button>
    </div>
  )
}

export function AnswerReviewPage({
  reviewedQuestions,
  onBack,
  onRetry,
  onTop,
}: AnswerReviewPageProps) {
  return (
    <main className="relative min-h-screen bg-[#031a14] px-3 py-6 text-[#f1d49e] sm:px-6 sm:py-10">
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(27,75,54,0.7),transparent_58%),linear-gradient(135deg,rgba(198,161,96,0.08),transparent_45%)]"
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <header className="flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-sm tracking-[0.3em] text-[#d4ae6b]">REVIEW</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[0.12em] sm:text-4xl">
              10問の解説
            </h1>
          </div>
          <ReviewActions onBack={onBack} onRetry={onRetry} onTop={onTop} />
        </header>

        <ol className="mt-8 space-y-8">
          {reviewedQuestions.map(
            ({ question, selectedAnswer, isCorrect }, index) => {
              const headingId = `review-question-${index + 1}`
              const yakuLabel = question.yaku
                .map((yaku) => `${yaku.name}（${yaku.han}翻）`)
                .join('、')

              return (
                <li key={question.id}>
                  <article
                    aria-labelledby={headingId}
                    className="rounded-xl border-2 border-[#c6a160] bg-[#082f25]/95 p-5 shadow-[0_12px_30px_rgba(0,0,0,0.55)] sm:p-8"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h2 id={headingId} className="text-2xl font-semibold">
                        問題 {index + 1}
                      </h2>
                      <span
                        aria-label={`問題${index + 1}の判定`}
                        className={`rounded-full border px-4 py-1 text-sm font-semibold ${
                          isCorrect
                            ? 'border-emerald-300 bg-emerald-950/70 text-emerald-200'
                            : 'border-red-300 bg-red-950/70 text-red-200'
                        }`}
                      >
                        {isCorrect ? '正解' : '不正解'}
                      </span>
                    </div>

                    <div className="mt-6 rounded border border-[#c6a160]/70 bg-black/20 p-4 sm:p-5">
                      <WinningHand hand={question.hand} />
                    </div>

                    <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                      <div className="rounded border border-[#c6a160]/50 bg-black/20 p-4">
                        <dt className="text-sm text-[#d4ae6b]">役</dt>
                        <dd className="mt-1">{yakuLabel}</dd>
                      </div>
                      <div className="rounded border border-[#c6a160]/50 bg-black/20 p-4">
                        <dt className="text-sm text-[#d4ae6b]">翻</dt>
                        <dd className="mt-1">{question.han}翻</dd>
                      </div>
                      <div className="rounded border border-[#c6a160]/50 bg-black/20 p-4">
                        <dt className="text-sm text-[#d4ae6b]">符</dt>
                        <dd className="mt-1">
                          {question.fu === null
                            ? '計算不要（満貫以上）'
                            : `${question.fu}符`}
                        </dd>
                      </div>
                      <div className="rounded border border-[#c6a160]/50 bg-black/20 p-4">
                        <dt className="text-sm text-[#d4ae6b]">ドラ牌</dt>
                        <dd className="mt-2">
                          <DoraTiles tiles={question.doraTiles} compact />
                        </dd>
                      </div>
                      <div className="rounded border border-[#c6a160]/50 bg-black/20 p-4">
                        <dt className="text-sm text-[#d4ae6b]">ドラ枚数</dt>
                        <dd className="mt-1">{question.dora}枚</dd>
                      </div>
                    </dl>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div
                        className={`rounded border p-4 ${
                          isCorrect
                            ? 'border-emerald-400/70 bg-emerald-950/40'
                            : 'border-red-400/70 bg-red-950/40'
                        }`}
                      >
                        <p className="text-sm text-[#d4ae6b]">選択した回答</p>
                        <p className="mt-1 text-xl font-semibold">
                          {selectedAnswer ?? '未回答'}
                        </p>
                      </div>
                      <div className="rounded border border-emerald-400/70 bg-emerald-950/40 p-4">
                        <p className="text-sm text-[#d4ae6b]">正解</p>
                        <p className="mt-1 text-xl font-semibold">
                          {question.correctAnswer}
                        </p>
                      </div>
                    </div>

                    <section
                      aria-label={`問題${index + 1}の解説`}
                      className="mt-6 rounded border border-[#c6a160] bg-[#031a14]/60 p-5"
                    >
                      <h3 className="font-semibold text-[#d4ae6b]">解説</h3>
                      <p className="mt-2 leading-relaxed text-[#f5e7c8]">
                        {question.explanation}
                      </p>
                    </section>
                  </article>
                </li>
              )
            },
          )}
        </ol>

        <div className="mt-10">
          <ReviewActions onBack={onBack} onRetry={onRetry} onTop={onTop} />
        </div>
      </div>
    </main>
  )
}
