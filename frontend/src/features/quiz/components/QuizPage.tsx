import type { Question } from '../types/question'
import { AnswerChoices } from './AnswerChoices'
import { DoraTiles } from './DoraTiles'
import { WinningHand } from './WinningHand'

type QuizPageProps = {
  readonly question: Question
  readonly currentQuestionNumber: number
  readonly totalQuestions: number
  readonly onAnswer: (answer: string) => void
  readonly onQuit: () => void
}

export function QuizPage({
  question,
  currentQuestionNumber,
  totalQuestions,
  onAnswer,
  onQuit,
}: QuizPageProps) {
  const windLabels = {
    east: '東',
    south: '南',
    west: '西',
    north: '北',
  } as const
  const winTypeLabel = question.condition.winType === 'ron' ? 'ロン' : 'ツモ'
  const roundWindLabel = windLabels[question.condition.roundWind]
  const seatWindLabel = `${windLabels[question.condition.seatWind]}家`
  const hasRiichi = question.yaku.some((yaku) => yaku.name.includes('リーチ'))
  const answeredQuestionCount = Math.max(
    0,
    Math.min(currentQuestionNumber - 1, totalQuestions),
  )

  return (
    <main className="relative min-h-dvh overflow-x-hidden bg-[#031a14] px-2 py-2 text-white sm:px-4 sm:py-4 lg:py-6 [@media(min-width:640px)_and_(max-height:900px)]:py-2">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,75,54,0.7),transparent_58%),linear-gradient(135deg,rgba(198,161,96,0.08),transparent_45%)]"
      />
      <div className="relative mx-auto flex min-h-[calc(100dvh-1rem)] w-full max-w-none rounded-lg bg-[#082f25]/95 p-3 shadow-[0_16px_40px_rgba(0,0,0,0.7)] sm:min-h-[calc(100dvh-2rem)] sm:rounded-xl sm:p-6 lg:min-h-[calc(100dvh-3rem)] lg:p-8 [@media(min-width:640px)_and_(max-height:900px)]:min-h-[calc(100dvh-1rem)] [@media(min-width:640px)_and_(max-height:900px)]:p-4">
        <div className="mx-auto flex w-full max-w-[96rem] flex-1 flex-col gap-6 sm:gap-8 lg:justify-between lg:gap-12 [@media(min-width:640px)_and_(max-height:900px)]:gap-4">
          <header className="relative text-center">
            <div className="mb-2 flex justify-end sm:absolute sm:top-0 sm:right-0 sm:mb-0">
              <button
                type="button"
                className="min-h-11 cursor-pointer rounded bg-white px-4 py-2 text-sm font-semibold tracking-[0.08em] text-black transition hover:bg-[#f2f2f2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:tracking-[0.12em]"
                onClick={onQuit}
              >
                中断する
              </button>
            </div>
            <h1 className="text-3xl font-semibold sm:text-4xl [@media(min-width:640px)_and_(max-height:900px)]:text-2xl">
              {totalQuestions}問出題
            </h1>
            <div
              role="progressbar"
              aria-label="問題の進捗"
              aria-valuemin={0}
              aria-valuemax={totalQuestions}
              aria-valuenow={answeredQuestionCount}
              className="mt-8 grid h-4 w-full gap-0.5 sm:mt-12 [@media(min-width:640px)_and_(max-height:900px)]:mt-8 [@media(min-width:640px)_and_(max-height:900px)]:h-3"
              style={{ gridTemplateColumns: `repeat(${totalQuestions}, 1fr)` }}
            >
              {Array.from({ length: totalQuestions }, (_, index) => (
                <span
                  key={index}
                  aria-hidden="true"
                  data-state={
                    index < answeredQuestionCount ? 'completed' : 'remaining'
                  }
                  className="border border-blue-400/40 bg-[#010d0a] transition-colors duration-200"
                  style={
                    index < answeredQuestionCount
                      ? {
                          backgroundColor: `hsl(210 95% ${78 - (index / Math.max(totalQuestions - 1, 1)) * 48}%)`,
                        }
                      : undefined
                  }
                />
              ))}
            </div>
          </header>

          <section
            aria-label="問題の条件"
            className="rounded bg-[#031f18]/90 p-4 shadow-inner shadow-black/25 sm:p-7 [@media(min-width:640px)_and_(max-height:900px)]:p-3"
          >
            <dl className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-base sm:gap-x-12 sm:gap-y-4 sm:text-xl [@media(min-width:640px)_and_(max-height:900px)]:gap-y-1 [@media(min-width:640px)_and_(max-height:900px)]:text-base">
              <div className="flex gap-2">
                <dt className="font-medium text-white">場風</dt>
                <dd className="text-lg font-semibold sm:text-2xl [@media(min-width:640px)_and_(max-height:900px)]:text-xl">
                  {roundWindLabel}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-medium text-white">自家</dt>
                <dd className="text-lg font-semibold sm:text-2xl [@media(min-width:640px)_and_(max-height:900px)]:text-xl">
                  {seatWindLabel}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-medium text-white">アガリ方</dt>
                <dd className="text-lg font-semibold sm:text-2xl [@media(min-width:640px)_and_(max-height:900px)]:text-xl">
                  {winTypeLabel}
                </dd>
              </div>
              {hasRiichi && (
                <div className="flex gap-2">
                  <dt className="sr-only">リーチ宣言</dt>
                  <dd className="text-lg font-semibold sm:text-2xl [@media(min-width:640px)_and_(max-height:900px)]:text-xl">
                    リーチ
                  </dd>
                </div>
              )}
            </dl>

            <div className="mt-3 pt-3 sm:mt-5 sm:pt-4 [@media(min-width:640px)_and_(max-height:900px)]:mt-2 [@media(min-width:640px)_and_(max-height:900px)]:pt-2">
              <p className="mb-3 text-center text-base font-semibold text-white sm:mb-4 sm:text-xl [@media(min-width:640px)_and_(max-height:900px)]:mb-1 [@media(min-width:640px)_and_(max-height:900px)]:text-base">
                ドラ
              </p>
              <DoraTiles tiles={question.doraTiles} size="large" />
            </div>
          </section>

          <section
            aria-labelledby="winning-hand-heading"
            className="rounded bg-[#031f18]/90 p-4 shadow-inner shadow-black/25 sm:p-7 [@media(min-width:640px)_and_(max-height:900px)]:p-3"
          >
            <h2
              id="winning-hand-heading"
              className="mb-4 text-center text-xl font-semibold sm:mb-6 sm:text-2xl [@media(min-width:640px)_and_(max-height:900px)]:mb-2 [@media(min-width:640px)_and_(max-height:900px)]:text-lg"
            >
              アガリ役
            </h2>
            <WinningHand
              hand={question.hand}
              showWinningTileFrame={false}
              tileSize="large"
            />
          </section>

          <section aria-labelledby="answer-heading">
            <h2
              id="answer-heading"
              className="mb-4 text-center text-xl font-semibold sm:mb-6 sm:text-2xl [@media(min-width:640px)_and_(max-height:900px)]:mb-2 [@media(min-width:640px)_and_(max-height:900px)]:text-lg"
            >
              点数を選択してください
            </h2>
            <AnswerChoices
              choices={question.choices}
              selectedAnswer={null}
              onSelect={onAnswer}
            />
          </section>
        </div>
      </div>
    </main>
  )
}
