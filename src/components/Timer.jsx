import { useState, useEffect } from 'react'
import '../styles/Timer.css'

function Timer({ isActive, onTimeUpdate }) {
  const [time, setTime] = useState(0)

  useEffect(() => {
    let interval = null

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
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isActive, onTimeUpdate])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="timer">
      <span className="timer-label">Time:</span>
      <span className="timer-value">{formatTime(time)}</span>
    </div>
  )
}

export default Timer

