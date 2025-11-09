import styled, { keyframes } from 'styled-components'
import { Position } from '../types/game.types'

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-3px);
  }
`

const glow = keyframes`
  0%, 100% {
    filter: drop-shadow(0 0 5px rgba(255, 0, 255, 0.8))
            drop-shadow(0 0 10px rgba(0, 240, 255, 0.6));
  }
  50% {
    filter: drop-shadow(0 0 10px rgba(255, 0, 255, 1))
            drop-shadow(0 0 20px rgba(0, 240, 255, 0.8));
  }
`

const HeroContainer = styled.div<{ x: number; y: number; cellSize: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => props.cellSize}px;
  height: ${props => props.cellSize}px;
  transform: translate(${props => props.x * props.cellSize}px, ${props => props.y * props.cellSize}px);
  transition: transform 0.15s ease-out;
  z-index: 10;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`

const AnimeGirl = styled.div`
  width: 32px;
  height: 32px;
  position: relative;
  animation: ${float} 2s ease-in-out infinite, ${glow} 2s ease-in-out infinite;
`

// SVG Anime Girl Character
const GirlSVG = styled.svg`
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 5px rgba(255, 0, 255, 0.8));
`

interface HeroProps {
  position: Position
}

function Hero({ position }: HeroProps) {
  const cellSize = 40

  return (
    <HeroContainer x={position.x} y={position.y} cellSize={cellSize}>
      <AnimeGirl>
        <GirlSVG viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          {/* Head */}
          <ellipse cx="16" cy="12" rx="8" ry="9" fill="#ffd4a3" />
          
          {/* Hair */}
          <path
            d="M 8 10 Q 8 6 12 5 Q 16 4 20 5 Q 24 6 24 10 L 24 14 Q 24 8 20 7 Q 16 6 12 7 Q 8 8 8 14 Z"
            fill="#4a0080"
          />
          
          {/* Bangs */}
          <path
            d="M 10 8 Q 12 6 16 6 Q 20 6 22 8"
            fill="#4a0080"
          />
          
          {/* Eyes */}
          <ellipse cx="12" cy="12" rx="1.5" ry="2.5" fill="#2d1b00" />
          <ellipse cx="20" cy="12" rx="1.5" ry="2.5" fill="#2d1b00" />
          
          {/* Eye highlights */}
          <circle cx="12.5" cy="11.5" r="0.5" fill="#ffffff" />
          <circle cx="20.5" cy="11.5" r="0.5" fill="#ffffff" />
          
          {/* Blush */}
          <ellipse cx="10" cy="14" rx="2" ry="1" fill="#ffb3ba" opacity="0.6" />
          <ellipse cx="22" cy="14" rx="2" ry="1" fill="#ffb3ba" opacity="0.6" />
          
          {/* Mouth */}
          <path
            d="M 14 16 Q 16 17 18 16"
            stroke="#ff69b4"
            strokeWidth="0.8"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Body */}
          <rect x="12" y="20" width="8" height="8" rx="2" fill="#00f0ff" />
          
          {/* Arms */}
          <rect x="10" y="22" width="2" height="6" rx="1" fill="#ffd4a3" />
          <rect x="20" y="22" width="2" height="6" rx="1" fill="#ffd4a3" />
          
          {/* Legs */}
          <rect x="13" y="27" width="2" height="4" rx="1" fill="#ffd4a3" />
          <rect x="17" y="27" width="2" height="4" rx="1" fill="#ffd4a3" />
          
          {/* Shoes */}
          <ellipse cx="14" cy="30.5" rx="1.5" ry="1" fill="#ff00ff" />
          <ellipse cx="18" cy="30.5" rx="1.5" ry="1" fill="#ff00ff" />
          
          {/* Hair ribbons */}
          <circle cx="9" cy="10" r="2" fill="#ff00ff" />
          <circle cx="23" cy="10" r="2" fill="#ff00ff" />
        </GirlSVG>
      </AnimeGirl>
    </HeroContainer>
  )
}

export default Hero

