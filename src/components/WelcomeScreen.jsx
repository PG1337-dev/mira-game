import { useState } from 'react'
import '../styles/WelcomeScreen.css'

function WelcomeScreen({ onStart }) {
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      onStart(name.trim())
    }
  }

  return (
    <div className="welcome-screen">
      <div className="welcome-container">
        <h1 className="game-title">
          <span className="neon-text">MIRA'S</span>
          <br />
          <span className="neon-text-alt">LABYRINTH</span>
        </h1>
        
        <div className="welcome-subtitle">
          Navigate through the maze and reach the finish!
        </div>

        <form onSubmit={handleSubmit} className="name-form">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="name-input"
            maxLength="20"
            autoFocus
          />
          <button type="submit" className="start-button" disabled={!name.trim()}>
            START GAME
          </button>
        </form>

        <div className="controls-info">
          <p>Use arrow keys ← ↑ → ↓ to move</p>
        </div>
      </div>
    </div>
  )
}

export default WelcomeScreen

