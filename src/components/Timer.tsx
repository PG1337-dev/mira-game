import { useState, useEffect } from 'react'
import styled from 'styled-components'

const TimerContainer = styled.div`
  display: flex;
  gap: 10px;
  font-size: 20px;
`

const TimerLabel = styled.span`
  color: ${props => props.theme.colors.textSecondary};
`

const TimerValue = styled.span`
  color: ${props => props.theme.colors.neonOrange};
  font-weight: bold;
  font-family: 'Courier New', monospace;
  font-size: 24px;
  text-shadow: ${props => props.theme.shadows.neonOrange};
`

interface TimerProps {
  isActive: boolean
  onTimeUpdate?: (time: number) => void
}

function Timer({ isActive, onTimeUpdate }: TimerProps) {
  const [time, setTime] = useState(0)

  useEffect(() => {
    let interval: number | null = null

    if (isActive) {
      interval = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime + 1
          if (onTimeUpdate) {
            onTimeUpdate(newTime)
          }
          return newTime
        })
      }, 1000)
    } else if (interval) {
      clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, onTimeUpdate])

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <TimerContainer>
      <TimerLabel>Time:</TimerLabel>
      <TimerValue>{formatTime(time)}</TimerValue>
    </TimerContainer>
  )
}

export default Timer

