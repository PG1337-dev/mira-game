import { useState, FormEvent } from 'react'
import styled from 'styled-components'

const ScreenContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at center, ${props => props.theme.colors.bgSecondary} 0%, ${props => props.theme.colors.bgPrimary} 100%);
`

const WelcomeBox = styled.div`
  text-align: center;
  padding: 40px;
  background: rgba(26, 26, 46, 0.5);
  border: 2px solid ${props => props.theme.colors.neonCyan};
  border-radius: 10px;
  box-shadow: 
    0 0 20px rgba(0, 240, 255, 0.3),
    inset 0 0 20px rgba(0, 240, 255, 0.1);
  min-width: 500px;
`

const GameTitle = styled.h1`
  font-size: 72px;
  font-weight: bold;
  margin-bottom: 20px;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 4px;
`

const TitleCyan = styled.span`
  color: ${props => props.theme.colors.neonCyan};
  text-shadow: ${props => props.theme.shadows.neonCyan};
`

const TitleMagenta = styled.span`
  color: ${props => props.theme.colors.neonMagenta};
  text-shadow: ${props => props.theme.shadows.neonMagenta};
`

const Subtitle = styled.div`
  font-size: 20px;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 40px;
`

const NameForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
`

const NameInput = styled.input`
  padding: 16px 24px;
  font-size: 24px;
  background-color: ${props => props.theme.colors.bgSecondary};
  border: 2px solid ${props => props.theme.colors.neonCyan};
  border-radius: 8px;
  color: ${props => props.theme.colors.textPrimary};
  text-align: center;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: ${props => props.theme.colors.neonMagenta};
    box-shadow: 
      0 0 15px rgba(255, 0, 255, 0.5),
      inset 0 0 10px rgba(255, 0, 255, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`

const StartButton = styled.button<{ disabled: boolean }>`
  padding: 20px 40px;
  font-size: 28px;
  font-weight: bold;
  background: linear-gradient(135deg, ${props => props.theme.colors.neonCyan}, ${props => props.theme.colors.neonMagenta});
  border: none;
  border-radius: 8px;
  color: ${props => props.theme.colors.bgPrimary};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 2px;
  opacity: ${props => props.disabled ? 0.5 : 1};

  &:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 
      0 0 30px rgba(0, 240, 255, 0.6),
      0 0 50px rgba(255, 0, 255, 0.4);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`

const ControlsInfo = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 18px;

  p {
    margin: 0;
    color: ${props => props.theme.colors.neonOrange};
  }
`

interface WelcomeScreenProps {
  onStart: (name: string) => void
}

function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [name, setName] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (name.trim()) {
      onStart(name.trim())
    }
  }

  return (
    <ScreenContainer>
      <WelcomeBox>
        <GameTitle>
          <TitleCyan>MIRA'S</TitleCyan>
          <br />
          <TitleMagenta>LABYRINTH</TitleMagenta>
        </GameTitle>
        
        <Subtitle>
          Collect all letters of your name, then reach the finish!
        </Subtitle>

        <NameForm onSubmit={handleSubmit}>
          <NameInput
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            maxLength={20}
            autoFocus
          />
          <StartButton type="submit" disabled={!name.trim()}>
            START GAME
          </StartButton>
        </NameForm>

        <ControlsInfo>
          <p>Use arrow keys ← ↑ → ↓ to move</p>
        </ControlsInfo>
      </WelcomeBox>
    </ScreenContainer>
  )
}

export default WelcomeScreen

