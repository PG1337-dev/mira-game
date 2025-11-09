import styled, { keyframes } from 'styled-components'
import { Enemy } from '../types/game.types'

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-4px);
  }
`

const fireGlow = keyframes`
  0%, 100% {
    filter: drop-shadow(0 0 8px rgba(255, 102, 0, 0.8))
            drop-shadow(0 0 15px rgba(255, 0, 0, 0.6));
  }
  50% {
    filter: drop-shadow(0 0 15px rgba(255, 102, 0, 1))
            drop-shadow(0 0 25px rgba(255, 0, 0, 0.8));
  }
`

const DragonContainer = styled.div<{ x: number; y: number; cellSize: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => props.cellSize}px;
  height: ${props => props.cellSize}px;
  transform: translate(${props => props.x * props.cellSize}px, ${props => props.y * props.cellSize}px);
  transition: transform 0.2s ease-out;
  z-index: 9;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`

const DragonSprite = styled.div`
  width: 35px;
  height: 35px;
  position: relative;
  animation: ${float} 2s ease-in-out infinite, ${fireGlow} 2s ease-in-out infinite;
`

const DragonSVG = styled.svg`
  width: 100%;
  height: 100%;
`

interface DragonProps {
  enemy: Enemy
}

function Dragon({ enemy }: DragonProps) {
  const cellSize = 40

  return (
    <DragonContainer x={enemy.x} y={enemy.y} cellSize={cellSize}>
      <DragonSprite>
        <DragonSVG viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          {/* Dragon Body */}
          <ellipse cx="16" cy="18" rx="10" ry="8" fill="#8B0000" />
          
          {/* Dragon Head */}
          <ellipse cx="16" cy="12" rx="7" ry="6" fill="#A52A2A" />
          
          {/* Horns */}
          <path
            d="M 10 10 L 8 6 L 11 9"
            fill="#4A0000"
            stroke="#4A0000"
            strokeWidth="1"
          />
          <path
            d="M 22 10 L 24 6 L 21 9"
            fill="#4A0000"
            stroke="#4A0000"
            strokeWidth="1"
          />
          
          {/* Eyes - fierce! */}
          <ellipse cx="13" cy="11" rx="1.5" ry="2" fill="#FFD700" />
          <ellipse cx="19" cy="11" rx="1.5" ry="2" fill="#FFD700" />
          <circle cx="13" cy="11" r="0.8" fill="#000000" />
          <circle cx="19" cy="11" r="0.8" fill="#000000" />
          
          {/* Nostrils */}
          <ellipse cx="14" cy="14" rx="1" ry="0.8" fill="#4A0000" />
          <ellipse cx="18" cy="14" rx="1" ry="0.8" fill="#4A0000" />
          
          {/* Fire breath effect */}
          <path
            d="M 16 15 Q 14 16 12 18"
            stroke="#FF6600"
            strokeWidth="1.5"
            fill="none"
            opacity="0.7"
          />
          <path
            d="M 16 15 Q 18 16 20 18"
            stroke="#FF6600"
            strokeWidth="1.5"
            fill="none"
            opacity="0.7"
          />
          
          {/* Wings */}
          <ellipse 
            cx="10" 
            cy="16" 
            rx="5" 
            ry="8" 
            fill="#8B0000" 
            opacity="0.7"
            transform="rotate(-20 10 16)"
          />
          <ellipse 
            cx="22" 
            cy="16" 
            rx="5" 
            ry="8" 
            fill="#8B0000" 
            opacity="0.7"
            transform="rotate(20 22 16)"
          />
          
          {/* Wing details */}
          <path
            d="M 8 14 Q 6 16 8 18"
            stroke="#4A0000"
            strokeWidth="0.8"
            fill="none"
          />
          <path
            d="M 24 14 Q 26 16 24 18"
            stroke="#4A0000"
            strokeWidth="0.8"
            fill="none"
          />
          
          {/* Tail */}
          <path
            d="M 16 24 Q 18 27 20 29 L 19 28 L 20 29 L 18 27"
            fill="#8B0000"
            stroke="#4A0000"
            strokeWidth="0.5"
          />
          
          {/* Tail spike */}
          <path
            d="M 20 29 L 22 30 L 20 28"
            fill="#FFD700"
          />
          
          {/* Belly scales */}
          <ellipse cx="16" cy="19" rx="5" ry="4" fill="#CD5C5C" opacity="0.6" />
          
          {/* Scale details */}
          <circle cx="14" cy="18" r="0.8" fill="#4A0000" opacity="0.3" />
          <circle cx="16" cy="19" r="0.8" fill="#4A0000" opacity="0.3" />
          <circle cx="18" cy="18" r="0.8" fill="#4A0000" opacity="0.3" />
        </DragonSVG>
      </DragonSprite>
    </DragonContainer>
  )
}

export default Dragon

