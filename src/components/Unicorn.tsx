import styled, { keyframes } from 'styled-components'
import { Unicorn as UnicornType } from '../types/game.types'

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
`

const sparkle = keyframes`
  0%, 100% {
    opacity: 1;
    filter: drop-shadow(0 0 8px rgba(255, 192, 203, 0.8))
            drop-shadow(0 0 15px rgba(138, 43, 226, 0.6));
  }
  50% {
    opacity: 0.7;
    filter: drop-shadow(0 0 15px rgba(255, 192, 203, 1))
            drop-shadow(0 0 25px rgba(138, 43, 226, 0.8));
  }
`

const UnicornContainer = styled.div<{ x: number; y: number; cellSize: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => props.cellSize}px;
  height: ${props => props.cellSize}px;
  transform: translate(${props => props.x * props.cellSize}px, ${props => props.y * props.cellSize}px);
  z-index: 8;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`

const UnicornSprite = styled.div`
  width: 34px;
  height: 34px;
  position: relative;
  animation: ${float} 3s ease-in-out infinite, ${sparkle} 2s ease-in-out infinite;
`

const UnicornSVG = styled.svg`
  width: 100%;
  height: 100%;
`

interface UnicornProps {
  unicorn: UnicornType
}

function Unicorn({ unicorn }: UnicornProps) {
  const cellSize = 40

  return (
    <UnicornContainer x={unicorn.x} y={unicorn.y} cellSize={cellSize}>
      <UnicornSprite>
        <UnicornSVG viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          {/* Body */}
          <ellipse cx="16" cy="20" rx="9" ry="7" fill="#FFE4E1" />
          
          {/* Head */}
          <ellipse cx="16" cy="13" rx="7" ry="8" fill="#FFF0F5" />
          
          {/* Horn (magical unicorn horn!) */}
          <path
            d="M 16 4 L 14 10 L 18 10 Z"
            fill="url(#hornGradient)"
            stroke="#FFD700"
            strokeWidth="0.5"
          />
          
          {/* Horn gradient */}
          <defs>
            <linearGradient id="hornGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#FF69B4" />
              <stop offset="100%" stopColor="#BA55D3" />
            </linearGradient>
          </defs>
          
          {/* Horn sparkle */}
          <circle cx="16" cy="6" r="1" fill="#FFFFFF" opacity="0.9" />
          
          {/* Mane (colorful!) */}
          <path
            d="M 10 10 Q 8 8 9 12 Q 10 14 11 12"
            fill="#FF69B4"
            opacity="0.8"
          />
          <path
            d="M 12 9 Q 10 7 11 11 Q 12 13 13 11"
            fill="#BA55D3"
            opacity="0.8"
          />
          <path
            d="M 20 9 Q 22 7 21 11 Q 20 13 19 11"
            fill="#87CEEB"
            opacity="0.8"
          />
          <path
            d="M 22 10 Q 24 8 23 12 Q 22 14 21 12"
            fill="#FFB6C1"
            opacity="0.8"
          />
          
          {/* Eyes (cute sparkly eyes) */}
          <ellipse cx="13" cy="13" rx="1.5" ry="2" fill="#8B4513" />
          <ellipse cx="19" cy="13" rx="1.5" ry="2" fill="#8B4513" />
          
          {/* Eye sparkles */}
          <circle cx="13.5" cy="12.5" r="0.7" fill="#FFFFFF" />
          <circle cx="19.5" cy="12.5" r="0.7" fill="#FFFFFF" />
          <circle cx="13" cy="13.5" r="0.3" fill="#FFFFFF" opacity="0.7" />
          <circle cx="19" cy="13.5" r="0.3" fill="#FFFFFF" opacity="0.7" />
          
          {/* Blush */}
          <ellipse cx="11" cy="15" rx="2" ry="1" fill="#FFB6C1" opacity="0.6" />
          <ellipse cx="21" cy="15" rx="2" ry="1" fill="#FFB6C1" opacity="0.6" />
          
          {/* Nose */}
          <ellipse cx="16" cy="16" rx="1" ry="0.8" fill="#FFB6C1" />
          
          {/* Smile */}
          <path
            d="M 14 17 Q 16 18 18 17"
            stroke="#FF69B4"
            strokeWidth="0.5"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Legs */}
          <rect x="12" y="25" width="2" height="5" rx="1" fill="#FFE4E1" />
          <rect x="18" y="25" width="2" height="5" rx="1" fill="#FFE4E1" />
          <rect x="13" y="26" width="2" height="4" rx="1" fill="#FFE4E1" />
          <rect x="17" y="26" width="2" height="4" rx="1" fill="#FFE4E1" />
          
          {/* Hooves */}
          <ellipse cx="13" cy="29.5" rx="1.5" ry="0.8" fill="#DDA0DD" />
          <ellipse cx="19" cy="29.5" rx="1.5" ry="0.8" fill="#DDA0DD" />
          <ellipse cx="14" cy="30" rx="1.5" ry="0.8" fill="#DDA0DD" />
          <ellipse cx="18" cy="30" rx="1.5" ry="0.8" fill="#DDA0DD" />
          
          {/* Tail (flowing rainbow tail!) */}
          <path
            d="M 24 20 Q 26 22 25 25 Q 24 27 26 28"
            stroke="#FF69B4"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M 24 20 Q 27 21 26 24 Q 25 26 27 27"
            stroke="#BA55D3"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M 24 20 Q 28 20 27 23 Q 26 25 28 26"
            stroke="#87CEEB"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />
        </UnicornSVG>
      </UnicornSprite>
    </UnicornContainer>
  )
}

export default Unicorn

