import { useState } from 'react'
import { TopPage } from '../components/TopPage'

type TopPageContainerProps = {
  readonly onStart: () => void
}

export function TopPageContainer({ onStart }: TopPageContainerProps) {
  const [isHowToOpen, setIsHowToOpen] = useState(false)
  const [isScoreRankOpen, setIsScoreRankOpen] = useState(false)

  const handleOpenHowTo = () => {
    setIsHowToOpen(true)
  }

  const handleCloseHowTo = () => {
    setIsHowToOpen(false)
  }

  const handleOpenScoreRank = () => {
    setIsScoreRankOpen(true)
  }

  const handleCloseScoreRank = () => {
    setIsScoreRankOpen(false)
  }

  return (
    <TopPage
      isHowToOpen={isHowToOpen}
      isScoreRankOpen={isScoreRankOpen}
      onStart={onStart}
      onCloseHowTo={handleCloseHowTo}
      onCloseScoreRank={handleCloseScoreRank}
      onOpenHowTo={handleOpenHowTo}
      onOpenScoreRank={handleOpenScoreRank}
    />
  )
}
