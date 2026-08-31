import { DoraTiles, WinningHand } from '../../quiz'
import type { ReviewedQuestion } from '../types/review'
import { formatYakuLabel } from '../utils/formatYakuLabel'

type ReviewQuestionCardProps = {
  readonly reviewedQuestion: ReviewedQuestion
  readonly questionNumber: number
}

export function ReviewQuestionCard({
  reviewedQuestion: { question, selectedAnswer, isCorrect },
  questionNumber,
}: ReviewQuestionCardProps) {
  const headingId = `review-question-${questionNumber}`
  const windLabels = {
    east: '東',
    south: '南',
    west: '西',
    north: '北',
  } as const
  const seatWindLabel = `${windLabels[question.condition.seatWind]}家`
  const yakuLabel = formatYakuLabel(question.yaku)
  const yakuWithDoraLabel =
    question.dora > 0 ? `${yakuLabel}、ドラ${question.dora}翻` : yakuLabel

  return (
    <article
      aria-labelledby={headingId}
      className="rounded-lg bg-[#0d4938] p-3 shadow-[0_16px_36px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.1)] sm:rounded-xl sm:p-6 lg:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id={headingId} className="text-xl font-semibold sm:text-2xl">
          問題 {questionNumber}
        </h2>
        <span
          aria-label={`問題${questionNumber}の判定`}
          className={`rounded-full border-2 px-5 py-1.5 text-base font-bold sm:text-lg ${
            isCorrect
              ? 'border-emerald-200 bg-emerald-200 text-emerald-950'
              : 'border-red-200 bg-red-200 text-red-950'
          }`}
        >
          {isCorrect ? '正解' : '不正解'}
        </span>
      </div>

      <div className="mt-4 grid gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4">
        <div
          className={`rounded border-2 p-3 sm:p-4 ${
            isCorrect
              ? 'border-emerald-300 bg-emerald-300 text-emerald-950'
              : 'border-red-300 bg-red-300 text-red-950'
          }`}
        >
          <p className="text-sm font-medium">選択した回答</p>
          <p className="mt-1 break-words text-lg font-semibold sm:text-xl">
            {selectedAnswer ?? '未回答'}
          </p>
        </div>
        <div className="rounded border-2 border-emerald-300 bg-emerald-300 p-3 text-emerald-950 sm:p-4">
          <p className="text-sm font-medium">正解</p>
          <p className="mt-1 break-words text-lg font-semibold sm:text-xl">
            {question.correctAnswer}
          </p>
        </div>
      </div>

      <div className="relative mt-4 rounded border border-[#c6a160]/70 bg-[#031f18]/90 px-3 pt-12 pb-3 shadow-inner shadow-black/25 sm:mt-6 sm:px-5 sm:pt-20 sm:pb-5">
        <div className="absolute top-2 left-2 flex items-center gap-4 sm:top-3 sm:left-3 sm:gap-6">
          <span
            aria-label={`自家 ${seatWindLabel}`}
            className="rounded bg-[#f3e8ce] px-2 py-1 text-xs font-black text-[#031a14] shadow-md sm:px-2.5 sm:py-1 sm:text-base"
          >
            {seatWindLabel}
          </span>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-xs font-semibold text-white sm:text-base">
              ドラ
            </span>
            <DoraTiles tiles={question.doraTiles} compact />
          </div>
        </div>
        <WinningHand hand={question.hand} />
      </div>

      <dl className="mt-4 grid gap-2 sm:mt-6 sm:grid-cols-2 sm:gap-3">
        <div className="rounded border border-[#c6a160]/50 bg-black/20 p-3 sm:col-span-2 sm:p-4">
          <dt className="text-sm font-medium text-white">役</dt>
          <dd className="mt-1">{yakuWithDoraLabel}</dd>
        </div>
        <div className="rounded border border-[#c6a160]/50 bg-black/20 p-3 sm:p-4">
          <dt className="text-sm font-medium text-white">翻</dt>
          <dd className="mt-1">{question.han}翻</dd>
        </div>
        <div className="rounded border border-[#c6a160]/50 bg-black/20 p-3 sm:p-4">
          <dt className="text-sm font-medium text-white">符</dt>
          <dd className="mt-1">
            {question.fu === null ? '計算不要（満貫以上）' : `${question.fu}符`}
          </dd>
        </div>
      </dl>

      <section
        aria-label={`問題${questionNumber}の解説`}
        className="mt-4 rounded border border-[#c6a160] bg-[#031a14]/60 p-3 sm:mt-6 sm:p-5"
      >
        <h3 className="font-semibold text-white">解説</h3>
        <p className="mt-2 leading-relaxed text-white">
          {question.explanation}
        </p>
      </section>
    </article>
  )
}
