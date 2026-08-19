import { useState } from 'react'
import { TopPage } from '../components/TopPage'

export function TopPageContainer() {
  const [isHowToOpen, setIsHowToOpen] = useState(false)

  const handleOpenHowTo = () => {
    setIsHowToOpen(true)
  }

  const handleCloseHowTo = () => {
    setIsHowToOpen(false)
  }

  return (
    <TopPage
      isHowToOpen={isHowToOpen}
      onCloseHowTo={handleCloseHowTo}
      onOpenHowTo={handleOpenHowTo}
    />
  )
}
