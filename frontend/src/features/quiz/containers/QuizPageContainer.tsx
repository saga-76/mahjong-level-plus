import { useState } from 'react'
import { QuizPage } from '../components/QuizPage'
import { questions } from '../data/question'
import { useQuizProgress } from '../hooks/useQuizProgress'
import { calculateScore } from '../logic/calculateScore'
import { selectQuestions } from '../logic/selectQuestions'

type QuizPageContainerProps = {
  readonly onQuit: () => void
}

export function QuizPageContainer({ onQuit }: QuizPageContainerProps) {
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

  const handleQuit = () => {
    resetQuiz()
    onQuit()
  }

  if (isCompleted) {
    const score = calculateScore({
      questions: quizQuestions,
      answers,
      elapsedTimeMs,
    })

    return (
      <main className="flex min-h-screen items-center justify-center bg-[#05251d] px-4 text-[#f1d49e]">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">10問の回答が完了しました</h1>
          <p className="mt-4 text-lg">{score.correctCount}問正解</p>
          <p className="mt-2 text-2xl font-semibold">
            スコア：{score.totalScore.toLocaleString()}点
          </p>
        </div>
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
