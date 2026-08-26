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

const yakuReadings: Readonly<Record<string, string>> = {
  断么九: 'タンヤオ',
  平和: 'ピンフ',
  一盃口: 'イーペーコー',
  混一色: 'ホンイツ',
  七対子: 'チートイツ',
  清一色: 'チンイツ',
  門前清自摸和: 'メンゼンツモ',
  対々和: 'トイトイ',
  '役牌 中': 'ヤクハイ チュン',
}

function getYakuDisplayName(name: string): string {
  const reading = yakuReadings[name]

  return reading === undefined ? name : `${name}（${reading}）`
}

function ReviewActions({ onBack, onRetry, onTop }: ReviewActionsProps) {
  return (
    <div className="flex w-full flex-col justify-center gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-3">
      <button
        type="button"
        className="w-full cursor-pointer rounded border-2 border-[#c6a160] bg-[#f2e5c8] px-4 py-3 font-semibold text-[#063b2b] transition hover:bg-[#f8efd9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f1d49e] sm:w-auto sm:px-6"
        onClick={onBack}
      >
        結果に戻る
      </button>
      <button
        type="button"
        className="w-full cursor-pointer rounded border-2 border-[#c6a160] bg-[#123727] px-4 py-3 font-semibold text-[#f1d49e] transition hover:bg-[#1b4b36] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f1d49e] sm:w-auto sm:px-6"
        onClick={onRetry}
      >
        もう一度挑戦
      </button>
      <button
        type="button"
        className="w-full cursor-pointer rounded border-2 border-[#c6a160] bg-transparent px-4 py-3 font-semibold text-[#f1d49e] transition hover:bg-[#1b4b36] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f1d49e] sm:w-auto sm:px-6"
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
    <main className="relative min-h-dvh overflow-x-hidden bg-[#031a14] px-2 py-4 text-[#f1d49e] sm:px-6 sm:py-10">
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(27,75,54,0.7),transparent_58%),linear-gradient(135deg,rgba(198,161,96,0.08),transparent_45%)]"
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <header className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:gap-5 sm:text-left">
          <div>
            <p className="text-sm tracking-[0.3em] text-[#d4ae6b]">REVIEW</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-[0.08em] sm:text-4xl sm:tracking-[0.12em]">
              10問の解説
            </h1>
          </div>
          <ReviewActions onBack={onBack} onRetry={onRetry} onTop={onTop} />
        </header>

        <ol className="mt-6 space-y-5 sm:mt-8 sm:space-y-8">
          {reviewedQuestions.map(
            ({ question, selectedAnswer, isCorrect }, index) => {
              const headingId = `review-question-${index + 1}`
              const yakuLabel = question.yaku
                .map((yaku) => `${getYakuDisplayName(yaku.name)}${yaku.han}翻`)
                .join('、')

              return (
                <li key={question.id}>
                  <article
                    aria-labelledby={headingId}
                    className="rounded-lg border-2 border-[#c6a160] bg-[#082f25]/95 p-3 shadow-[0_12px_30px_rgba(0,0,0,0.55)] sm:rounded-xl sm:p-8"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h2
                        id={headingId}
                        className="text-xl font-semibold sm:text-2xl"
                      >
                        問題 {index + 1}
                      </h2>
                      <span
                        aria-label={`問題${index + 1}の判定`}
                        className={`rounded-full border-2 px-5 py-1.5 text-base font-bold sm:text-lg ${
                          isCorrect
                            ? 'border-emerald-200 bg-emerald-950/90 text-emerald-100'
                            : 'border-red-200 bg-red-950/90 text-red-100'
                        }`}
                      >
                        {isCorrect ? '正解' : '不正解'}
                      </span>
                    </div>

                    <div className="mt-4 rounded border border-[#c6a160]/70 bg-black/20 p-3 sm:mt-6 sm:p-5">
                      <WinningHand hand={question.hand} />
                    </div>

                    <dl className="mt-4 grid gap-2 sm:mt-6 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
                      <div className="rounded border border-[#c6a160]/50 bg-black/20 p-3 sm:col-span-2 sm:p-4 lg:col-span-4">
                        <dt className="text-sm text-[#d4ae6b]">役</dt>
                        <dd className="mt-1">{yakuLabel}</dd>
                      </div>
                      <div className="rounded border border-[#c6a160]/50 bg-black/20 p-3 sm:p-4">
                        <dt className="text-sm text-[#d4ae6b]">翻</dt>
                        <dd className="mt-1">{question.han}翻</dd>
                      </div>
                      <div className="rounded border border-[#c6a160]/50 bg-black/20 p-3 sm:p-4">
                        <dt className="text-sm text-[#d4ae6b]">符</dt>
                        <dd className="mt-1">
                          {question.fu === null
                            ? '計算不要（満貫以上）'
                            : `${question.fu}符`}
                        </dd>
                      </div>
                      <div className="rounded border border-[#c6a160]/50 bg-black/20 p-3 sm:p-4">
                        <dt className="text-sm text-[#d4ae6b]">ドラ牌</dt>
                        <dd className="mt-2">
                          <DoraTiles tiles={question.doraTiles} compact />
                        </dd>
                      </div>
                      <div className="rounded border border-[#c6a160]/50 bg-black/20 p-3 sm:p-4">
                        <dt className="text-sm text-[#d4ae6b]">ドラ枚数</dt>
                        <dd className="mt-1">{question.dora}枚</dd>
                      </div>
                    </dl>

                    <div className="mt-4 grid gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4">
                      <div
                        className={`rounded border-2 p-3 sm:p-4 ${
                          isCorrect
                            ? 'border-emerald-300 bg-emerald-950/85'
                            : 'border-red-300 bg-red-950/85'
                        }`}
                      >
                        <p className="text-sm text-[#d4ae6b]">選択した回答</p>
                        <p className="mt-1 break-words text-lg font-semibold sm:text-xl">
                          {selectedAnswer ?? '未回答'}
                        </p>
                      </div>
                      <div className="rounded border-2 border-emerald-300 bg-emerald-950/85 p-3 sm:p-4">
                        <p className="text-sm text-[#d4ae6b]">正解</p>
                        <p className="mt-1 break-words text-lg font-semibold sm:text-xl">
                          {question.correctAnswer}
                        </p>
                      </div>
                    </div>

                    <section
                      aria-label={`問題${index + 1}の解説`}
                      className="mt-4 rounded border border-[#c6a160] bg-[#031a14]/60 p-3 sm:mt-6 sm:p-5"
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

        <div className="mt-8 sm:mt-10">
          <ReviewActions onBack={onBack} onRetry={onRetry} onTop={onTop} />
        </div>
      </div>
    </main>
  )
}
