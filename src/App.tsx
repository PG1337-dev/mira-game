import { useState } from 'react'
import styled from 'styled-components'
import WelcomeScreen from './components/WelcomeScreen'
import GameBoard from './components/GameBoard'

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.bgPrimary};
`

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [playerName, setPlayerName] = useState('')

  const handleStartGame = (name: string) => {
    setPlayerName(name)
    setGameStarted(true)
  }

  const handleRestart = () => {
    setGameStarted(false)
    setPlayerName('')
  }

  return (
    <AppContainer>
      {!gameStarted ? (
        <WelcomeScreen onStart={handleStartGame} />
      ) : (
        <GameBoard playerName={playerName} onRestart={handleRestart} />
      )}
    </AppContainer>
  )
}

export default App

