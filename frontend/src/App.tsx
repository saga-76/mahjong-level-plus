import { useCallback, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { QuizPageContainer, type QuizResult } from './features/quiz'
import {
  AnswerReviewPageContainer,
  ResultPageContainer,
} from './features/result'
import { TopPageContainer } from './features/top/containers/TopPageContainer'

function App() {
  const navigate = useNavigate()
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null)
  const [isRetrying, setIsRetrying] = useState(false)

  const handleStart = useCallback(() => {
    setQuizResult(null)
    setIsRetrying(false)
    navigate('/quiz')
  }, [navigate])

  const handleQuit = useCallback(() => {
    setQuizResult(null)
    setIsRetrying(false)
    navigate('/')
  }, [navigate])

  const handleRetry = useCallback(() => {
    setQuizResult(null)
    setIsRetrying(true)
  }, [])

  const handleComplete = useCallback(
    (result: QuizResult) => {
      setQuizResult(result)
      setIsRetrying(false)
      navigate('/result')
    },
    [navigate],
  )

  return (
    <Routes>
      <Route path="/" element={<TopPageContainer onStart={handleStart} />} />
      <Route
        path="/quiz"
        element={
          <QuizPageContainer onQuit={handleQuit} onComplete={handleComplete} />
        }
      />
      <Route
        path="/result"
        element={
          quizResult === null ? (
            <Navigate to={isRetrying ? '/quiz' : '/'} replace />
          ) : (
            <ResultPageContainer
              result={quizResult}
              onReview={() => navigate('/review')}
              onRetry={handleRetry}
            />
          )
        }
      />
      <Route
        path="/review"
        element={
          quizResult === null ? (
            <Navigate to={isRetrying ? '/quiz' : '/'} replace />
          ) : (
            <AnswerReviewPageContainer
              result={quizResult}
              onBack={() => navigate('/result')}
            />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
