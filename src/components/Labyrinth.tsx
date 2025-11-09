import styled, { keyframes } from 'styled-components'
import { Position, Letter } from '../types/game.types'

const pulse = keyframes`
  0%, 100% {
    box-shadow: 
      0 0 15px currentColor,
      inset 0 0 10px currentColor;
  }
  50% {
    box-shadow: 
      0 0 30px currentColor,
      inset 0 0 20px currentColor;
  }
`

const letterFloat = keyframes`
  0%, 100% {
    transform: translateY(0px) scale(1);
  }
  50% {
    transform: translateY(-5px) scale(1.1);
  }
`

const LabyrinthContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.bgPrimary};
`

const LabyrinthRow = styled.div`
  display: flex;
`

const Cell = styled.div<{ 
  isWall: boolean
  isStart: boolean
  isFinish: boolean
  canFinish: boolean
}>`
  width: ${props => props.theme.cellSize}px;
  height: ${props => props.theme.cellSize}px;
  border: 1px solid rgba(0, 240, 255, 0.1);
  position: relative;
  
  ${props => props.isWall && `
    background-color: ${props.theme.colors.wallColor};
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.8);
  `}
  
  ${props => !props.isWall && !props.isStart && !props.isFinish && `
    background-color: ${props.theme.colors.pathColor};
  `}
  
  ${props => props.isStart && `
    background: radial-gradient(circle, ${props.theme.colors.neonGreen}, ${props.theme.colors.pathColor});
    box-shadow: 
      0 0 15px ${props.theme.colors.neonGreen},
      inset 0 0 10px ${props.theme.colors.neonGreen};
  `}
  
  ${props => props.isFinish && `
    background: radial-gradient(
      circle, 
      ${props.canFinish ? props.theme.colors.neonCyan : props.theme.colors.bgSecondary}, 
      ${props.theme.colors.pathColor}
    );
    color: ${props.canFinish ? props.theme.colors.neonCyan : props.theme.colors.textSecondary};
    animation: ${props.canFinish ? pulse : 'none'} 2s ease-in-out infinite;
    opacity: ${props.canFinish ? 1 : 0.5};
  `}
`

const LetterOverlay = styled.div<{ collected: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.collected ? props.theme.colors.textSecondary : props.theme.colors.neonMagenta};
  text-shadow: ${props => !props.collected && props.theme.shadows.neonMagenta};
  animation: ${props => !props.collected ? letterFloat : 'none'} 2s ease-in-out infinite;
  opacity: ${props => props.collected ? 0.3 : 1};
  pointer-events: none;
  z-index: 5;
  text-decoration: ${props => props.collected ? 'line-through' : 'none'};
`

interface LabyrinthProps {
  maze: number[][]
  start: Position
  finish: Position
  letters: Letter[]
  canFinish: boolean
}

function Labyrinth({ maze, start, finish, letters, canFinish }: LabyrinthProps) {
  // Create a map for quick letter lookup
  const letterMap = new Map<string, Letter>()
  letters.forEach(letter => {
    letterMap.set(`${letter.x},${letter.y}`, letter)
  })

  return (
    <LabyrinthContainer>
      {maze.map((row, rowIndex) => (
        <LabyrinthRow key={rowIndex}>
          {row.map((cell, colIndex) => {
            const isStart = start.x === colIndex && start.y === rowIndex
            const isFinish = finish.x === colIndex && finish.y === rowIndex
            const isWall = cell === 1
            const letter = letterMap.get(`${colIndex},${rowIndex}`)

            return (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                isWall={isWall}
                isStart={isStart}
                isFinish={isFinish}
                canFinish={canFinish}
              >
                {letter && (
                  <LetterOverlay collected={letter.collected}>
                    {letter.char}
                  </LetterOverlay>
                )}
              </Cell>
            )
          })}
        </LabyrinthRow>
      ))}
    </LabyrinthContainer>
  )
}

export default Labyrinth

