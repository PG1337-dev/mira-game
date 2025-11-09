import styled, { keyframes } from 'styled-components'
import { Position } from '../types/game.types'

const sparkleFloat = keyframes`
  0% {
    transform: translateY(0) scale(0);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  100% {
    transform: translateY(-40px) scale(1.5);
    opacity: 0;
  }
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
`

const SparklesContainer = styled.div<{ x: number; y: number; cellSize: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => props.cellSize}px;
  height: ${props => props.cellSize}px;
  transform: translate(${props => props.x * props.cellSize}px, ${props => props.y * props.cellSize}px);
  z-index: 15;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Sparkle = styled.div<{ delay: number; x: number; y: number }>`
  position: absolute;
  left: ${props => props.x}%;
  top: ${props => props.y}%;
  font-size: 20px;
  animation: ${sparkleFloat} 1.5s ease-out forwards;
  animation-delay: ${props => props.delay}s;
`

const Star = styled.div<{ delay: number }>`
  position: absolute;
  font-size: 24px;
  animation: ${rotate} 2s linear infinite, ${pulse} 1s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
`

const MagicCircle = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  border: 3px solid #FF69B4;
  border-radius: 50%;
  animation: ${pulse} 0.8s ease-in-out 3;
  box-shadow: 0 0 20px #FF69B4, inset 0 0 20px #FF69B4;
`

interface MagicSparklesProps {
  position: Position
  onComplete: () => void
}

function MagicSparkles({ position, onComplete }: MagicSparklesProps) {
  const cellSize = 40

  // Auto-remove after animation
  React.useEffect(() => {
    const timer = setTimeout(onComplete, 2000)
    return () => clearTimeout(timer)
  }, [onComplete])

  const sparkles = [
    { emoji: '✨', delay: 0, x: 50, y: 50 },
    { emoji: '⭐', delay: 0.1, x: 30, y: 30 },
    { emoji: '✨', delay: 0.2, x: 70, y: 30 },
    { emoji: '💫', delay: 0.3, x: 30, y: 70 },
    { emoji: '✨', delay: 0.4, x: 70, y: 70 },
    { emoji: '⭐', delay: 0.5, x: 50, y: 20 },
    { emoji: '✨', delay: 0.6, x: 20, y: 50 },
    { emoji: '💫', delay: 0.7, x: 80, y: 50 },
    { emoji: '✨', delay: 0.8, x: 50, y: 80 },
  ]

  return (
    <SparklesContainer x={position.x} y={position.y} cellSize={cellSize}>
      <MagicCircle />
      <Star delay={0}>🌟</Star>
      {sparkles.map((sparkle, i) => (
        <Sparkle key={i} delay={sparkle.delay} x={sparkle.x} y={sparkle.y}>
          {sparkle.emoji}
        </Sparkle>
      ))}
    </SparklesContainer>
  )
}

// Add React import
import React from 'react'

export default MagicSparkles

