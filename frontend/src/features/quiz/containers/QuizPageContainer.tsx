import { useEffect, useMemo, useState } from 'react'
import type { QuizResult } from '../types/score'
import { QuizPage } from '../components/QuizPage'
import { questions } from '../data/question'
import { useQuizProgress } from '../hooks/useQuizProgress'
import { calculateScore } from '../logic/calculateScore'
import { selectQuestions } from '../logic/selectQuestions'

type QuizPageContainerProps = {
  readonly onQuit: () => void
  readonly onComplete: (result: QuizResult) => void
}

export function QuizPageContainer({
  onQuit,
  onComplete,
}: QuizPageContainerProps) {
  const [quizQuestions] = useState(() => selectQuestions(questions))
  const {
    answers,
    confirmAnswer,
    currentQuestion,
    currentQuestionIndex,
    elapsedTimeMs,
    isCompleted,
    resetQuiz,
  } = useQuizProgress(quizQuestions)
  const result = useMemo<QuizResult>(
    () => ({
      ...calculateScore({
        questions: quizQuestions,
        answers,
        elapsedTimeMs,
      }),
      totalQuestions: quizQuestions.length,
      elapsedTimeMs,
    }),
    [answers, elapsedTimeMs, quizQuestions],
  )

  useEffect(() => {
    if (isCompleted) {
      onComplete(result)
    }
  }, [isCompleted, onComplete, result])

  const handleQuit = () => {
    resetQuiz()
    onQuit()
  }

  if (isCompleted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#05251d] px-4 text-[#f1d49e]">
        <p>結果を集計しています。</p>
      </main>
    )
  }

  if (currentQuestion === null) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#05251d] text-[#f1d49e]">
        <p>問題を読み込めませんでした。</p>
      </main>
    )
  }

  return (
    <QuizPage
      question={currentQuestion}
      currentQuestionNumber={currentQuestionIndex + 1}
      totalQuestions={quizQuestions.length}
      onAnswer={confirmAnswer}
      onQuit={handleQuit}
    />
  )
}
