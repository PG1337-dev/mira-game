import { useState, useEffect, useCallback } from 'react'
import Labyrinth from './Labyrinth'
import Hero from './Hero'
import Timer from './Timer'
import WinModal from './WinModal'
import { generateLabyrinth } from '../game-logic/labyrinthGenerator'
import { moveHero, checkWin } from '../game-logic/heroController'
import '../styles/GameBoard.css'

function GameBoard({ playerName, onRestart }) {
  // Generate labyrinth on mount
  const [labyrinth, setLabyrinth] = useState(() => generateLabyrinth(15, 15))
  const [heroPosition, setHeroPosition] = useState(labyrinth.start)
  const [isGameActive, setIsGameActive] = useState(true)
  const [hasWon, setHasWon] = useState(false)
  const [completionTime, setCompletionTime] = useState(0)

  // Handle keyboard controls
  const handleKeyPress = useCallback((e) => {
    if (!isGameActive || hasWon) return

    const key = e.key
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
      e.preventDefault()
      
      const newPosition = moveHero(heroPosition, key, labyrinth)
      if (newPosition) {
        setHeroPosition(newPosition)
        
        // Check if player reached the finish
        if (checkWin(newPosition, labyrinth.finish)) {
          setHasWon(true)
          setIsGameActive(false)
        }
      }
    }
  }, [heroPosition, labyrinth, isGameActive, hasWon])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  const handleTimerUpdate = (time) => {
    setCompletionTime(time)
  }

  const handlePlayAgain = () => {
    // Generate new labyrinth
    const newLabyrinth = generateLabyrinth(15, 15)
    setLabyrinth(newLabyrinth)
    setHeroPosition(newLabyrinth.start)
    setIsGameActive(true)
    setHasWon(false)
    setCompletionTime(0)
  }

  return (
    <div className="game-board">
      <div className="game-header">
        <div className="player-info">
          <span className="player-label">Player:</span>
          <span className="player-name">{playerName}</span>
        </div>
        <Timer isActive={isGameActive} onTimeUpdate={handleTimerUpdate} />
      </div>

      <div className="game-container">
        <Labyrinth 
          maze={labyrinth.maze} 
          start={labyrinth.start}
          finish={labyrinth.finish}
        />
        <Hero position={heroPosition} />
      </div>

      {hasWon && (
        <WinModal 
          playerName={playerName}
          completionTime={completionTime}
          onPlayAgain={handlePlayAgain}
          onMainMenu={onRestart}
        />
      )}
    </div>
  )
}

export default GameBoard

