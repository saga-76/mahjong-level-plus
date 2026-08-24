import { useCallback, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { QuizPageContainer, type QuizResult } from './features/quiz'
import { ResultPageContainer } from './features/result'
import { TopPageContainer } from './features/top/containers/TopPageContainer'

function App() {
  const navigate = useNavigate()
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null)

  const handleStart = useCallback(() => {
    setQuizResult(null)
    navigate('/quiz')
  }, [navigate])

  const handleQuit = useCallback(() => {
    setQuizResult(null)
    navigate('/')
  }, [navigate])

  const handleComplete = useCallback(
    (result: QuizResult) => {
      setQuizResult(result)
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
            <Navigate to="/" replace />
          ) : (
            <ResultPageContainer result={quizResult} />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
