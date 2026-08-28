import { useEffect, useState } from 'react'
import type { QuizResult } from '../types/score'
import { QuizPage } from '../components/QuizPage'
import { QUIZ_QUESTION_COUNT } from '../config/quizConfig'
import { questions } from '../data/question'
import { useQuizProgress } from '../hooks/useQuizProgress'
import { createQuizResult } from '../logic/createQuizResult'
import { selectQuestions } from '../logic/selectQuestions'

type QuizPageContainerProps = {
  readonly onQuit: () => void
  readonly onComplete: (result: QuizResult) => void
}

export function QuizPageContainer({
  onQuit,
  onComplete,
}: QuizPageContainerProps) {
  const [quizQuestions] = useState(() =>
    selectQuestions(questions, { questionCount: QUIZ_QUESTION_COUNT }),
  )
  const {
    answers,
    confirmAnswer,
    currentQuestion,
    currentQuestionIndex,
    elapsedTimeMs,
    isCompleted,
    resetQuiz,
  } = useQuizProgress(quizQuestions)
  useEffect(() => {
    if (isCompleted) {
      onComplete(
        createQuizResult({
          questions: quizQuestions,
          answers,
          elapsedTimeMs,
        }),
      )
    }
  }, [answers, elapsedTimeMs, isCompleted, onComplete, quizQuestions])

  const handleQuit = () => {
    resetQuiz()
    onQuit()
  }

  if (isCompleted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#05251d] px-4 text-white">
        <p>結果を集計しています。</p>
      </main>
    )
  }

  if (currentQuestion === null) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#05251d] text-white">
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
