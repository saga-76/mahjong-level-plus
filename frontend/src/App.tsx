import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { QuizPageContainer } from './features/quiz'
import { TopPageContainer } from './features/top/containers/TopPageContainer'

function App() {
  const navigate = useNavigate()

  return (
    <Routes>
      <Route
        path="/"
        element={<TopPageContainer onStart={() => navigate('/quiz')} />}
      />
      <Route path="/quiz" element={<QuizPageContainer />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
