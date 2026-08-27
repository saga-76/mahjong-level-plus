import type { ReviewedQuestion } from '../types/review'
import { ReviewActions } from './ReviewActions'
import { ReviewQuestionCard } from './ReviewQuestionCard'

type AnswerReviewPageProps = {
  readonly reviewedQuestions: readonly ReviewedQuestion[]
  readonly onBack: () => void
  readonly onRetry: () => void
  readonly onTop: () => void
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
          {reviewedQuestions.map((reviewedQuestion, index) => (
            <li key={reviewedQuestion.question.id}>
              <ReviewQuestionCard
                reviewedQuestion={reviewedQuestion}
                questionNumber={index + 1}
              />
            </li>
          ))}
        </ol>

        <div className="mt-8 sm:mt-10">
          <ReviewActions onBack={onBack} onRetry={onRetry} onTop={onTop} />
        </div>
      </div>
    </main>
  )
}
