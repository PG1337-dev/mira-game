import { useState, useEffect } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import GameBoard from './components/GameBoard'
import './styles/App.css'

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [playerName, setPlayerName] = useState('')

  const handleStartGame = (name) => {
    setPlayerName(name)
    setGameStarted(true)
  }

  const handleRestart = () => {
    setGameStarted(false)
    setPlayerName('')
  }

  return (
    <div className="app">
      {!gameStarted ? (
        <WelcomeScreen onStart={handleStartGame} />
      ) : (
        <GameBoard playerName={playerName} onRestart={handleRestart} />
      )}
    </div>
  )
}

export default App

