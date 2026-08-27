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

  return (
    <article
      aria-labelledby={headingId}
      className="rounded-lg border-2 border-[#c6a160] bg-[#082f25]/95 p-3 shadow-[0_12px_30px_rgba(0,0,0,0.55)] sm:rounded-xl sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id={headingId} className="text-xl font-semibold sm:text-2xl">
          問題 {questionNumber}
        </h2>
        <span
          aria-label={`問題${questionNumber}の判定`}
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
          <dd className="mt-1">{formatYakuLabel(question.yaku)}</dd>
        </div>
        <div className="rounded border border-[#c6a160]/50 bg-black/20 p-3 sm:p-4">
          <dt className="text-sm text-[#d4ae6b]">翻</dt>
          <dd className="mt-1">{question.han}翻</dd>
        </div>
        <div className="rounded border border-[#c6a160]/50 bg-black/20 p-3 sm:p-4">
          <dt className="text-sm text-[#d4ae6b]">符</dt>
          <dd className="mt-1">
            {question.fu === null ? '計算不要（満貫以上）' : `${question.fu}符`}
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
        aria-label={`問題${questionNumber}の解説`}
        className="mt-4 rounded border border-[#c6a160] bg-[#031a14]/60 p-3 sm:mt-6 sm:p-5"
      >
        <h3 className="font-semibold text-[#d4ae6b]">解説</h3>
        <p className="mt-2 leading-relaxed text-[#f5e7c8]">
          {question.explanation}
        </p>
      </section>
    </article>
  )
}
