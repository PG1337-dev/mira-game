import { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import Labyrinth from './Labyrinth'
import Hero from './Hero'
import Timer from './Timer'
import WinModal from './WinModal'
import { generateLabyrinth } from '../game-logic/labyrinthGenerator'
import { moveHero, checkWin, checkLetterCollection, canFinish } from '../game-logic/heroController'
import { Labyrinth as LabyrinthType, Letter } from '../types/game.types'

const BoardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: radial-gradient(circle at center, ${props => props.theme.colors.bgSecondary} 0%, ${props => props.theme.colors.bgPrimary} 100%);
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;
  padding: 15px 30px;
  background: rgba(26, 26, 46, 0.7);
  border: 2px solid ${props => props.theme.colors.neonCyan};
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.3);
`

const PlayerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 18px;
`

const PlayerLabel = styled.span`
  color: ${props => props.theme.colors.textSecondary};
`

const PlayerName = styled.span`
  color: ${props => props.theme.colors.neonCyan};
  font-weight: bold;
  font-size: 20px;
  text-shadow: 0 0 10px ${props => props.theme.colors.neonCyan};
`

const LettersProgress = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 16px;
  color: ${props => props.theme.colors.textSecondary};
`

const LetterDisplay = styled.div`
  display: flex;
  gap: 5px;
`

const LetterBadge = styled.span<{ collected: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 16px;
  background: ${props => props.collected 
    ? `linear-gradient(135deg, ${props.theme.colors.neonMagenta}, ${props.theme.colors.neonCyan})`
    : props.theme.colors.bgSecondary};
  color: ${props => props.collected ? props.theme.colors.bgPrimary : props.theme.colors.textSecondary};
  border: 2px solid ${props => props.collected ? props.theme.colors.neonMagenta : props.theme.colors.textSecondary};
  opacity: ${props => props.collected ? 1 : 0.5};
  transition: all 0.3s ease;
  text-shadow: ${props => props.collected ? 'none' : '0 0 5px rgba(255, 0, 255, 0.5)'};
`

const GameContainer = styled.div`
  position: relative;
  display: inline-block;
  border: 3px solid ${props => props.theme.colors.neonMagenta};
  border-radius: 8px;
  box-shadow: 
    0 0 30px rgba(255, 0, 255, 0.5),
    inset 0 0 20px rgba(255, 0, 255, 0.1);
  background-color: ${props => props.theme.colors.bgPrimary};
`

const Instruction = styled.div`
  margin-top: 15px;
  text-align: center;
  font-size: 16px;
  color: ${props => props.theme.colors.neonOrange};
  text-shadow: ${props => props.theme.shadows.neonOrange};
`

interface GameBoardProps {
  playerName: string
  onRestart: () => void
}

function GameBoard({ playerName, onRestart }: GameBoardProps) {
  // Generate labyrinth on mount with player's name letters
  const [labyrinth, setLabyrinth] = useState<LabyrinthType>(() => generateLabyrinth(15, 15, playerName))
  const [heroPosition, setHeroPosition] = useState(labyrinth.start)
  const [isGameActive, setIsGameActive] = useState(true)
  const [hasWon, setHasWon] = useState(false)
  const [completionTime, setCompletionTime] = useState(0)
  const [letters, setLetters] = useState<Letter[]>(labyrinth.letters)

  // Handle keyboard controls
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!isGameActive || hasWon) return

    const key = e.key
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
      e.preventDefault()
      
      const newPosition = moveHero(heroPosition, key, labyrinth)
      if (newPosition) {
        setHeroPosition(newPosition)
        
        // Check if player collected a letter
        const collectedLetter = checkLetterCollection(newPosition, letters)
        if (collectedLetter) {
          setLetters(prevLetters => 
            prevLetters.map(l => 
              l.x === collectedLetter.x && l.y === collectedLetter.y 
                ? { ...l, collected: true }
                : l
            )
          )
        }
        
        // Check if player reached the finish with all letters collected
        if (checkWin(newPosition, labyrinth.finish, letters)) {
          setHasWon(true)
          setIsGameActive(false)
        }
      }
    }
  }, [heroPosition, labyrinth, isGameActive, hasWon, letters])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  const handleTimerUpdate = (time: number) => {
    setCompletionTime(time)
  }

  const handlePlayAgain = () => {
    // Generate new labyrinth with same player name
    const newLabyrinth = generateLabyrinth(15, 15, playerName)
    setLabyrinth(newLabyrinth)
    setHeroPosition(newLabyrinth.start)
    setLetters(newLabyrinth.letters)
    setIsGameActive(true)
    setHasWon(false)
    setCompletionTime(0)
  }

  const allLettersCollected = canFinish(letters)
  const collectedCount = letters.filter(l => l.collected).length

  return (
    <BoardContainer>
      <Header>
        <PlayerInfo>
          <PlayerLabel>Player:</PlayerLabel>
          <PlayerName>{playerName}</PlayerName>
          <LettersProgress>
            Letters: {collectedCount} / {letters.length}
            <LetterDisplay>
              {letters.map((letter, index) => (
                <LetterBadge key={index} collected={letter.collected}>
                  {letter.char}
                </LetterBadge>
              ))}
            </LetterDisplay>
          </LettersProgress>
        </PlayerInfo>
        <Timer isActive={isGameActive} onTimeUpdate={handleTimerUpdate} />
      </Header>

      <GameContainer>
        <Labyrinth 
          maze={labyrinth.maze} 
          start={labyrinth.start}
          finish={labyrinth.finish}
          letters={letters}
          canFinish={allLettersCollected}
        />
        <Hero position={heroPosition} />
      </GameContainer>

      <Instruction>
        {!allLettersCollected 
          ? "Collect all your name letters before going to the finish!"
          : "All letters collected! Head to the finish! 🎯"}
      </Instruction>

      {hasWon && (
        <WinModal 
          playerName={playerName}
          completionTime={completionTime}
          lettersCollected={letters.length}
          onPlayAgain={handlePlayAgain}
          onMainMenu={onRestart}
        />
      )}
    </BoardContainer>
  )
}

export default GameBoard

