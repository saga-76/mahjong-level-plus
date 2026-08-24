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
  const playerLabel = question.condition.player === 'dealer' ? '親' : '子'
  const winTypeLabel = question.condition.winType === 'ron' ? 'ロン' : 'ツモ'

  return (
    <main className="relative min-h-svh overflow-x-hidden bg-[#031a14] px-2 py-4 text-[#f1d49e] sm:px-4 sm:py-6 [@media(max-height:900px)]:py-2">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,75,54,0.7),transparent_58%),linear-gradient(135deg,rgba(198,161,96,0.08),transparent_45%)]"
      />
      <div className="relative mx-auto w-full max-w-none rounded-xl border-2 border-[#c6a160] bg-[#082f25]/95 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.7)] outline outline-1 -outline-offset-3 outline-[#d4ae6b]/40 sm:p-8 [@media(max-height:900px)]:p-4">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 [@media(max-height:900px)]:gap-4">
          <header className="relative text-center">
            <div className="mb-4 flex justify-end sm:absolute sm:top-0 sm:right-0 sm:mb-0">
              <button
                type="button"
                className="cursor-pointer rounded border border-[#c6a160] bg-[#031a14]/70 px-4 py-2 text-sm font-semibold tracking-[0.12em] text-[#f1d49e] transition hover:bg-[#1b4b36] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f1d49e]"
                onClick={onQuit}
              >
                やめる
              </button>
            </div>
            <p className="text-sm tracking-[0.2em] text-[#d4ae6b]">QUESTION</p>
            <h1 className="mt-1 text-3xl font-semibold [@media(max-height:900px)]:text-2xl">
              {currentQuestionNumber} / {totalQuestions}
            </h1>
            <progress
              aria-label="問題の進捗"
              value={currentQuestionNumber}
              max={totalQuestions}
              className="progress mt-4 h-3 w-full bg-[#02140f] [&::-moz-progress-bar]:bg-[#d4ae6b] [&::-webkit-progress-value]:bg-[#d4ae6b] [@media(max-height:900px)]:mt-2"
            />
          </header>

          <section
            aria-labelledby="question-condition-heading"
            className="rounded border border-[#c6a160] bg-black/20 p-5 [@media(max-height:900px)]:p-3"
          >
            <h2
              id="question-condition-heading"
              className="text-center text-xl font-semibold [@media(max-height:900px)]:text-lg"
            >
              問題の条件
            </h2>
            <dl className="mt-4 flex flex-wrap justify-center gap-x-8 gap-y-3 text-lg [@media(max-height:900px)]:mt-2 [@media(max-height:900px)]:gap-y-1 [@media(max-height:900px)]:text-base">
              <div className="flex gap-2">
                <dt className="text-[#d4ae6b]">家</dt>
                <dd>{playerLabel}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-[#d4ae6b]">アガリ方</dt>
                <dd>{winTypeLabel}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-[#d4ae6b]">翻数</dt>
                <dd>{question.han}翻</dd>
              </div>
            </dl>

            <div className="mt-5 border-t border-[#c6a160]/40 pt-4 [@media(max-height:900px)]:mt-2 [@media(max-height:900px)]:pt-2">
              <p className="mb-3 text-center text-sm font-semibold text-[#d4ae6b] [@media(max-height:900px)]:mb-1">
                ドラ牌
              </p>
              <DoraTiles tiles={question.doraTiles} />
            </div>
          </section>

          <section
            aria-labelledby="winning-hand-heading"
            className="rounded border border-[#c6a160] bg-black/20 p-5 [@media(max-height:900px)]:p-3"
          >
            <h2
              id="winning-hand-heading"
              className="mb-5 text-center text-xl font-semibold [@media(max-height:900px)]:mb-2 [@media(max-height:900px)]:text-lg"
            >
              アガリ形
            </h2>
            <WinningHand hand={question.hand} />
          </section>

          <section aria-labelledby="answer-heading">
            <h2
              id="answer-heading"
              className="mb-4 text-center text-xl font-semibold [@media(max-height:900px)]:mb-2 [@media(max-height:900px)]:text-lg"
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
