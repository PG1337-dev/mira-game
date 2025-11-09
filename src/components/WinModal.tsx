import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const slideIn = keyframes`
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const titlePulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`

const Modal = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.bgSecondary}, ${props => props.theme.colors.bgPrimary});
  border: 3px solid ${props => props.theme.colors.neonCyan};
  border-radius: 15px;
  padding: 50px;
  max-width: 600px;
  text-align: center;
  box-shadow: 
    0 0 50px rgba(0, 240, 255, 0.6),
    0 0 100px rgba(255, 0, 255, 0.4),
    inset 0 0 30px rgba(0, 240, 255, 0.1);
  animation: ${slideIn} 0.5s ease-out;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`

const Title = styled.h2`
  font-size: 64px;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 4px;
  animation: ${titlePulse} 2s ease-in-out infinite;
  color: ${props => props.theme.colors.neonCyan};
  text-shadow: ${props => props.theme.shadows.neonCyan};
`

const Message = styled.div`
  font-size: 28px;
  color: ${props => props.theme.colors.textPrimary};
`

const PlayerHighlight = styled.span`
  color: ${props => props.theme.colors.neonMagenta};
  font-weight: bold;
  text-shadow: ${props => props.theme.shadows.neonMagenta};
`

const Stats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 25px;
  background: rgba(22, 33, 62, 0.5);
  border: 2px solid ${props => props.theme.colors.neonOrange};
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(255, 102, 0, 0.3);
`

const StatItem = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  font-size: 24px;
`

const StatLabel = styled.span`
  color: ${props => props.theme.colors.textSecondary};
`

const StatValue = styled.span`
  color: ${props => props.theme.colors.neonOrange};
  font-weight: bold;
  font-family: 'Courier New', monospace;
  text-shadow: ${props => props.theme.shadows.neonOrange};
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`

const Button = styled.button<{ primary?: boolean }>`
  padding: 18px 40px;
  font-size: 22px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 2px;

  ${props => props.primary ? `
    background: linear-gradient(135deg, ${props.theme.colors.neonCyan}, ${props.theme.colors.neonMagenta});
    color: ${props.theme.colors.bgPrimary};

    &:hover {
      transform: scale(1.05);
      box-shadow: 
        0 0 30px rgba(0, 240, 255, 0.6),
        0 0 50px rgba(255, 0, 255, 0.4);
    }
  ` : `
    background: rgba(26, 26, 46, 0.8);
    color: ${props.theme.colors.neonCyan};
    border: 2px solid ${props.theme.colors.neonCyan};

    &:hover {
      background: rgba(26, 26, 46, 1);
      box-shadow: 0 0 20px rgba(0, 240, 255, 0.4);
      transform: scale(1.05);
    }
  `}

  &:active {
    transform: scale(0.98);
  }
`

interface WinModalProps {
  playerName: string
  completionTime: number
  lettersCollected: number
  onPlayAgain: () => void
  onMainMenu: () => void
}

function WinModal({ playerName, completionTime, lettersCollected, onPlayAgain, onMainMenu }: WinModalProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <ModalOverlay>
      <Modal>
        <Content>
          <Title>YOU WIN!</Title>
          
          <Message>
            Congratulations, <PlayerHighlight>{playerName}</PlayerHighlight>!<br />
            You collected all {lettersCollected} letters!
          </Message>
          
          <Stats>
            <StatItem>
              <StatLabel>Completion Time:</StatLabel>
              <StatValue>{formatTime(completionTime)}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Letters Collected:</StatLabel>
              <StatValue>{lettersCollected}</StatValue>
            </StatItem>
          </Stats>

          <ButtonContainer>
            <Button primary onClick={onPlayAgain}>
              PLAY AGAIN
            </Button>
            <Button onClick={onMainMenu}>
              MAIN MENU
            </Button>
          </ButtonContainer>
        </Content>
      </Modal>
    </ModalOverlay>
  )
}

export default WinModal

