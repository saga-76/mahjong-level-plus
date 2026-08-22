import type { Question } from '../types/question'
import { AnswerChoices } from './AnswerChoices'
import { WinningHand } from './WinningHand'

type QuizPageProps = {
  readonly question: Question
  readonly currentQuestionNumber: number
  readonly totalQuestions: number
  readonly onAnswer: (answer: string) => void
}

export function QuizPage({
  question,
  currentQuestionNumber,
  totalQuestions,
  onAnswer,
}: QuizPageProps) {
  const playerLabel = question.condition.player === 'dealer' ? '親' : '子'
  const winTypeLabel = question.condition.winType === 'ron' ? 'ロン' : 'ツモ'

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#031a14] px-2 py-4 text-[#f1d49e] sm:px-4 sm:py-6">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,75,54,0.7),transparent_58%),linear-gradient(135deg,rgba(198,161,96,0.08),transparent_45%)]"
      />
      <div className="relative mx-auto w-full max-w-none rounded-xl border-2 border-[#c6a160] bg-[#082f25]/95 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.7)] outline outline-1 -outline-offset-3 outline-[#d4ae6b]/40 sm:p-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
          <header className="text-center">
            <p className="text-sm tracking-[0.2em] text-[#d4ae6b]">QUESTION</p>
            <h1 className="mt-1 text-3xl font-semibold">
              {currentQuestionNumber} / {totalQuestions}
            </h1>
            <progress
              aria-label="問題の進捗"
              value={currentQuestionNumber}
              max={totalQuestions}
              className="progress mt-4 h-3 w-full bg-[#02140f] [&::-moz-progress-bar]:bg-[#d4ae6b] [&::-webkit-progress-value]:bg-[#d4ae6b]"
            />
          </header>

          <section
            aria-labelledby="question-condition-heading"
            className="rounded border border-[#c6a160] bg-black/20 p-5"
          >
            <h2
              id="question-condition-heading"
              className="text-center text-xl font-semibold"
            >
              問題の条件
            </h2>
            <dl className="mt-4 flex flex-wrap justify-center gap-x-8 gap-y-3 text-lg">
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
          </section>

          <section
            aria-labelledby="winning-hand-heading"
            className="rounded border border-[#c6a160] bg-black/20 p-5"
          >
            <h2
              id="winning-hand-heading"
              className="mb-5 text-center text-xl font-semibold"
            >
              アガリ形
            </h2>
            <WinningHand hand={question.hand} />
          </section>

          <section aria-labelledby="answer-heading">
            <h2
              id="answer-heading"
              className="mb-4 text-center text-xl font-semibold"
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
