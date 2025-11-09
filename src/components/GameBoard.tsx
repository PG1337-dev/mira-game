import { useState, useEffect, useCallback, useRef } from 'react'
import styled from 'styled-components'
import Labyrinth from './Labyrinth'
import Hero from './Hero'
import Dragon from './Dragon'
import Unicorn from './Unicorn'
import MagicSparkles from './MagicSparkles'
import Timer from './Timer'
import WinModal from './WinModal'
import LettersCollectedModal from './LettersCollectedModal'
import { generateLabyrinth } from '../game-logic/labyrinthGenerator'
import { 
  moveHero, 
  checkWin, 
  checkLetterCollection, 
  canFinish,
  checkDragonCollision,
  isInSafeRoom,
  moveEnemy,
  moveUnicorn
} from '../game-logic/heroController'
import { getLevelConfig, MAX_LEVEL } from '../game-logic/levelConfig'
import { soundSystem } from '../game-logic/soundSystem'
import { Labyrinth as LabyrinthType, Letter, Enemy, Position, Unicorn as UnicornType } from '../types/game.types'

const BoardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: radial-gradient(circle at center, ${props => props.theme.colors.bgSecondary} 0%, ${props => props.theme.colors.bgPrimary} 100%);
  overflow-y: auto;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1000px;
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

const MiddleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

const LevelBadge = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.colors.neonMagenta};
  text-shadow: ${props => props.theme.shadows.neonMagenta};
`

const MusicButton = styled.button<{ isPlaying: boolean }>`
  padding: 8px 16px;
  font-size: 24px;
  background: ${props => props.isPlaying 
    ? `linear-gradient(135deg, ${props.theme.colors.neonCyan}, ${props.theme.colors.neonMagenta})`
    : 'rgba(26, 26, 46, 0.8)'};
  border: 2px solid ${props => props.isPlaying ? props.theme.colors.neonCyan : props.theme.colors.textSecondary};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 20px rgba(0, 240, 255, 0.5);
  }

  &:active {
    transform: scale(0.95);
  }
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
  max-width: 600px;
`

interface GameBoardProps {
  playerName: string
  onRestart: () => void
}

function GameBoard({ playerName, onRestart }: GameBoardProps) {
  const [currentLevel, setCurrentLevel] = useState(1)
  const levelConfig = getLevelConfig(currentLevel)
  
  // Generate labyrinth on mount with player's name letters
  const [labyrinth, setLabyrinth] = useState<LabyrinthType>(() => 
    generateLabyrinth(
      levelConfig.mazeSize, 
      levelConfig.mazeSize, 
      playerName,
      levelConfig.safeRoomCount,
      levelConfig.enemyCount
    )
  )
  
  const [heroPosition, setHeroPosition] = useState(labyrinth.start)
  const [isGameActive, setIsGameActive] = useState(true)
  const [hasWon, setHasWon] = useState(false)
  const [completionTime, setCompletionTime] = useState(0)
  const [letters, setLetters] = useState<Letter[]>(labyrinth.letters)
  const [enemies, setEnemies] = useState<Enemy[]>(labyrinth.enemies)
  const [unicorn, setUnicorn] = useState<UnicornType | null>(labyrinth.unicorn)
  const [showCelebration, setShowCelebration] = useState(false)
  const [isRespawning, setIsRespawning] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [magicSparklesPosition, setMagicSparklesPosition] = useState<Position | null>(null)
  
  const enemyIntervalRef = useRef<number | null>(null)

  // Start music when component mounts or level changes
  useEffect(() => {
    soundSystem.stopBackgroundMusic() // Stop previous level's music
    soundSystem.startBackgroundMusic(currentLevel) // Start new level's music
    setIsMusicPlaying(true)
    
    return () => {
      soundSystem.stopBackgroundMusic()
    }
  }, [currentLevel])

  // Enemy movement logic
  useEffect(() => {
    if (!isGameActive || enemies.length === 0 || isRespawning) {
      if (enemyIntervalRef.current) {
        clearInterval(enemyIntervalRef.current)
        enemyIntervalRef.current = null
      }
      return
    }

    enemyIntervalRef.current = setInterval(() => {
      setEnemies(prevEnemies => 
        prevEnemies.map(enemy => 
          moveEnemy(enemy, labyrinth.maze)
        )
      )
    }, levelConfig.enemySpeed)

    return () => {
      if (enemyIntervalRef.current) {
        clearInterval(enemyIntervalRef.current)
      }
    }
  }, [isGameActive, enemies.length, labyrinth.maze, labyrinth.safeRooms, levelConfig.enemySpeed, isRespawning])

  // Unicorn movement (slower than dragons, moves every 800ms)
  useEffect(() => {
    if (!isGameActive || !unicorn || isRespawning) return

    const unicornInterval = setInterval(() => {
      setUnicorn(prevUnicorn => {
        if (!prevUnicorn) return null
        return moveUnicorn(prevUnicorn, labyrinth.maze, labyrinth.safeRooms, heroPosition)
      })
    }, 800) // Slower movement than dragons

    return () => clearInterval(unicornInterval)
  }, [isGameActive, unicorn, labyrinth.maze, labyrinth.safeRooms, heroPosition, isRespawning])

  // Check if unicorn touches dragon - unicorn protects hero!
  useEffect(() => {
    if (!unicorn || enemies.length === 0) return

    const touchedDragonIndex = enemies.findIndex(
      enemy => enemy.x === unicorn.x && enemy.y === unicorn.y
    )

    if (touchedDragonIndex !== -1) {
      // Unicorn magic! Dragon disappears with sparkles
      setMagicSparklesPosition(unicorn)
      soundSystem.playUnicornMagicSound()
      
      // Remove the dragon
      setEnemies(prevEnemies => 
        prevEnemies.filter((_, index) => index !== touchedDragonIndex)
      )
    }
  }, [enemies, unicorn])

  // Check for dragon collision and unicorn touch
  useEffect(() => {
    if (!isGameActive || isRespawning || hasWon) return

    // Check if hero touched the unicorn (magical friend!)
    if (unicorn && 
        heroPosition.x === unicorn.x && 
        heroPosition.y === unicorn.y) {
      setMagicSparklesPosition(heroPosition)
      soundSystem.playUnicornMagicSound()
    }

    // Check if hero is in a safe room (dragons can't harm here)
    if (isInSafeRoom(heroPosition, labyrinth.safeRooms)) {
      return
    }

    // Check collision with dragons
    if (checkDragonCollision(heroPosition, enemies)) {
      handleDragonCaught()
    }
  }, [heroPosition, enemies, isGameActive, labyrinth.safeRooms, unicorn, isRespawning, hasWon])

  const handleDragonCaught = () => {
    setIsRespawning(true)
    setIsGameActive(false)
    soundSystem.playDragonCatchSound()
    
    // Flash effect or animation here could be added
    setTimeout(() => {
      setHeroPosition(labyrinth.start)
      setIsRespawning(false)
      setIsGameActive(true)
    }, 500)
  }

  const toggleMusic = () => {
    const muted = soundSystem.toggleMute(currentLevel)
    setIsMusicPlaying(!muted)
  }

  // Handle keyboard controls
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!isGameActive || hasWon || isRespawning) return

    const key = e.key
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
      e.preventDefault()
      
      const newPosition = moveHero(heroPosition, key, labyrinth)
      if (newPosition) {
        setHeroPosition(newPosition)
        
      // Check if player collected a letter
      const collectedLetter = checkLetterCollection(newPosition, letters)
      if (collectedLetter) {
        soundSystem.playCollectSound()
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
        // Play celebration music and win sound
        soundSystem.playCelebrationMusic()
        soundSystem.playWinSound()
        setShowCelebration(true) // Show celebration modal on win!
        setHasWon(true)
        setIsGameActive(false)
      }
      }
    }
  }, [heroPosition, labyrinth, isGameActive, hasWon, letters, isRespawning])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  const handleTimerUpdate = (time: number) => {
    setCompletionTime(time)
  }

  const handleNextLevel = () => {
    const nextLevel = currentLevel + 1
    if (nextLevel > MAX_LEVEL) {
      // Beat the game! Go back to main menu
      onRestart()
      return
    }

    setCurrentLevel(nextLevel)
    const nextLevelConfig = getLevelConfig(nextLevel)
    const newLabyrinth = generateLabyrinth(
      nextLevelConfig.mazeSize,
      nextLevelConfig.mazeSize,
      playerName,
      nextLevelConfig.safeRoomCount,
      nextLevelConfig.enemyCount
    )
    
    setLabyrinth(newLabyrinth)
    setHeroPosition(newLabyrinth.start)
    setLetters(newLabyrinth.letters)
    setEnemies(newLabyrinth.enemies)
    setUnicorn(newLabyrinth.unicorn)
    setIsGameActive(true)
    setHasWon(false)
    setCompletionTime(0)
    setShowCelebration(false)
    setIsRespawning(false)
  }

  const handlePlayAgain = () => {
    // Restart current level
    const newLabyrinth = generateLabyrinth(
      levelConfig.mazeSize,
      levelConfig.mazeSize,
      playerName,
      levelConfig.safeRoomCount,
      levelConfig.enemyCount
    )
    
    setLabyrinth(newLabyrinth)
    setHeroPosition(newLabyrinth.start)
    setLetters(newLabyrinth.letters)
    setEnemies(newLabyrinth.enemies)
    setUnicorn(newLabyrinth.unicorn)
    setIsGameActive(true)
    setHasWon(false)
    setCompletionTime(0)
    setShowCelebration(false)
    setIsRespawning(false)
  }

  const handleCelebrationContinue = () => {
    setShowCelebration(false)
    // After celebration, show the win modal with stats
    // (hasWon is already true, so WinModal will show)
  }

  const allLettersCollected = canFinish(letters)
  const collectedCount = letters.filter(l => l.collected).length
  const heroInSafeRoom = isInSafeRoom(heroPosition, labyrinth.safeRooms)

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
        <MiddleSection>
          <LevelBadge>LEVEL {currentLevel}</LevelBadge>
          <MusicButton 
            onClick={toggleMusic} 
            isPlaying={isMusicPlaying}
            title={isMusicPlaying ? "Mute Music" : "Play Music"}
          >
            {isMusicPlaying ? '🎵' : '🔇'}
          </MusicButton>
        </MiddleSection>
        <Timer isActive={isGameActive && !isRespawning} onTimeUpdate={handleTimerUpdate} />
      </Header>

      <GameContainer>
        <Labyrinth 
          maze={labyrinth.maze} 
          start={labyrinth.start}
          finish={labyrinth.finish}
          letters={letters}
          safeRooms={labyrinth.safeRooms}
          canFinish={allLettersCollected}
        />
        <Hero position={heroPosition} />
        {enemies.map(enemy => (
          <Dragon key={enemy.id} enemy={enemy} />
        ))}
        {unicorn && (
          <Unicorn unicorn={unicorn} />
        )}
        {magicSparklesPosition && (
          <MagicSparkles 
            position={magicSparklesPosition} 
            onComplete={() => setMagicSparklesPosition(null)}
          />
        )}
      </GameContainer>

      <Instruction>
        {isRespawning && "⚠️ Dragon caught you! Respawning..."}
        {!isRespawning && !allLettersCollected && "Collect all your name letters!"}
        {!isRespawning && allLettersCollected && "✅ All letters collected! Head to the finish! 🎯"}
        {!isRespawning && heroInSafeRoom && enemies.length > 0 && " 🏠 You're safe here!"}
        {!isRespawning && !heroInSafeRoom && enemies.length > 0 && " 🐉 Watch out for dragons!"}
        {!isRespawning && unicorn && enemies.length > 0 && " 🦄 Unicorn protects you from dragons!"}
      </Instruction>

      {showCelebration && hasWon && (
        <LettersCollectedModal onContinue={handleCelebrationContinue} />
      )}

      {hasWon && !showCelebration && (
        <WinModal 
          playerName={playerName}
          completionTime={completionTime}
          lettersCollected={letters.length}
          onPlayAgain={handlePlayAgain}
          onMainMenu={onRestart}
          onNextLevel={currentLevel < MAX_LEVEL ? handleNextLevel : undefined}
          currentLevel={currentLevel}
          maxLevel={MAX_LEVEL}
        />
      )}
    </BoardContainer>
  )
}

export default GameBoard

