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

  return (
    <main className="relative min-h-dvh overflow-x-hidden bg-[#031a14] px-2 py-2 text-[#f1d49e] sm:px-4 sm:py-4 lg:py-6 [@media(min-width:640px)_and_(max-height:900px)]:py-2">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,75,54,0.7),transparent_58%),linear-gradient(135deg,rgba(198,161,96,0.08),transparent_45%)]"
      />
      <div className="relative mx-auto flex min-h-[calc(100dvh-1rem)] w-full max-w-none rounded-lg border-2 border-[#c6a160] bg-[#082f25]/95 p-3 shadow-[0_16px_40px_rgba(0,0,0,0.7)] outline outline-1 -outline-offset-3 outline-[#d4ae6b]/40 sm:min-h-[calc(100dvh-2rem)] sm:rounded-xl sm:p-6 lg:min-h-[calc(100dvh-3rem)] lg:p-8 [@media(min-width:640px)_and_(max-height:900px)]:min-h-[calc(100dvh-1rem)] [@media(min-width:640px)_and_(max-height:900px)]:p-4">
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-5 sm:gap-6 lg:justify-between lg:gap-10 [@media(min-width:640px)_and_(max-height:900px)]:gap-4">
          <header className="relative text-center">
            <div className="mb-2 flex justify-end sm:absolute sm:top-0 sm:right-0 sm:mb-0">
              <button
                type="button"
                className="cursor-pointer rounded border border-[#c6a160] bg-[#031a14]/70 px-3 py-2 text-sm font-semibold tracking-[0.08em] text-[#f1d49e] transition hover:bg-[#1b4b36] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f1d49e] sm:px-4 sm:tracking-[0.12em]"
                onClick={onQuit}
              >
                やめる
              </button>
            </div>
            <p className="text-sm tracking-[0.2em] text-[#d4ae6b]">QUESTION</p>
            <h1 className="mt-1 text-2xl font-semibold sm:text-3xl [@media(min-width:640px)_and_(max-height:900px)]:text-2xl">
              {currentQuestionNumber} / {totalQuestions}
            </h1>
            <progress
              aria-label="問題の進捗"
              value={currentQuestionNumber}
              max={totalQuestions}
              className="progress mt-3 h-3 w-full bg-[#02140f] [&::-moz-progress-bar]:bg-[#d4ae6b] [&::-webkit-progress-value]:bg-[#d4ae6b] sm:mt-4 [@media(min-width:640px)_and_(max-height:900px)]:mt-2"
            />
          </header>

          <section
            aria-label="問題の条件"
            className="rounded border border-[#c6a160] bg-black/20 p-3 sm:p-5 [@media(min-width:640px)_and_(max-height:900px)]:p-3"
          >
            <dl className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm sm:gap-x-8 sm:gap-y-3 sm:text-lg [@media(min-width:640px)_and_(max-height:900px)]:gap-y-1 [@media(min-width:640px)_and_(max-height:900px)]:text-base">
              <div className="flex gap-2">
                <dt className="text-[#d4ae6b]">場風</dt>
                <dd className="text-base font-semibold sm:text-xl">
                  {roundWindLabel}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-[#d4ae6b]">自家</dt>
                <dd className="text-base font-semibold sm:text-xl">
                  {seatWindLabel}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-[#d4ae6b]">アガリ方</dt>
                <dd className="text-base font-semibold sm:text-xl">
                  {winTypeLabel}
                </dd>
              </div>
            </dl>

            <div className="mt-3 border-t border-[#c6a160]/40 pt-3 sm:mt-5 sm:pt-4 [@media(min-width:640px)_and_(max-height:900px)]:mt-2 [@media(min-width:640px)_and_(max-height:900px)]:pt-2">
              <p className="mb-2 text-center text-sm font-semibold text-[#d4ae6b] sm:mb-3 [@media(min-width:640px)_and_(max-height:900px)]:mb-1">
                ドラ
              </p>
              <DoraTiles tiles={question.doraTiles} />
            </div>
          </section>

          <section
            aria-labelledby="winning-hand-heading"
            className="rounded border border-[#c6a160] bg-black/20 p-3 sm:p-5 [@media(min-width:640px)_and_(max-height:900px)]:p-3"
          >
            <h2
              id="winning-hand-heading"
              className="mb-3 text-center text-lg font-semibold sm:mb-5 sm:text-xl [@media(min-width:640px)_and_(max-height:900px)]:mb-2 [@media(min-width:640px)_and_(max-height:900px)]:text-lg"
            >
              アガリ役
            </h2>
            <WinningHand hand={question.hand} />
          </section>

          <section aria-labelledby="answer-heading">
            <h2
              id="answer-heading"
              className="mb-3 text-center text-lg font-semibold sm:mb-4 sm:text-xl [@media(min-width:640px)_and_(max-height:900px)]:mb-2 [@media(min-width:640px)_and_(max-height:900px)]:text-lg"
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
