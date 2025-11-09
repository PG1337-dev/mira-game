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

const jump = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-20px);
  }
  50% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(-10px);
  }
`

const sparkle = keyframes`
  0%, 100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: scale(1.2) rotate(180deg);
    opacity: 0.8;
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
  border: 3px solid ${props => props.theme.colors.neonMagenta};
  border-radius: 15px;
  padding: 50px;
  max-width: 500px;
  text-align: center;
  box-shadow: 
    0 0 50px rgba(255, 0, 255, 0.6),
    0 0 100px rgba(0, 240, 255, 0.4),
    inset 0 0 30px rgba(255, 0, 255, 0.1);
  animation: ${slideIn} 0.5s ease-out;
  position: relative;
  overflow: hidden;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
`

const Title = styled.h2`
  font-size: 48px;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 4px;
  color: ${props => props.theme.colors.neonMagenta};
  text-shadow: ${props => props.theme.shadows.neonMagenta};
`

const Message = styled.div`
  font-size: 24px;
  color: ${props => props.theme.colors.textPrimary};
  line-height: 1.5;
`

const HeroContainer = styled.div`
  width: 80px;
  height: 80px;
  animation: ${jump} 1.5s ease-in-out infinite;
`

const HeroSVG = styled.svg`
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 10px rgba(255, 0, 255, 0.8));
`

const Sparkles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`

const Sparkle = styled.div<{ delay: number; x: number; y: number }>`
  position: absolute;
  left: ${props => props.x}%;
  top: ${props => props.y}%;
  width: 20px;
  height: 20px;
  color: ${props => props.theme.colors.neonCyan};
  font-size: 24px;
  animation: ${sparkle} 2s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
`

const ContinueButton = styled.button`
  padding: 18px 40px;
  font-size: 22px;
  font-weight: bold;
  background: linear-gradient(135deg, ${props => props.theme.colors.neonCyan}, ${props => props.theme.colors.neonMagenta});
  border: none;
  border-radius: 8px;
  color: ${props => props.theme.colors.bgPrimary};
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 2px;

  &:hover {
    transform: scale(1.05);
    box-shadow: 
      0 0 30px rgba(0, 240, 255, 0.6),
      0 0 50px rgba(255, 0, 255, 0.4);
  }

  &:active {
    transform: scale(0.98);
  }
`

interface LettersCollectedModalProps {
  onContinue: () => void
}

function LettersCollectedModal({ onContinue }: LettersCollectedModalProps) {
  const sparklePositions = [
    { x: 10, y: 20, delay: 0 },
    { x: 85, y: 15, delay: 0.3 },
    { x: 20, y: 70, delay: 0.6 },
    { x: 80, y: 75, delay: 0.9 },
    { x: 50, y: 10, delay: 1.2 },
  ]

  return (
    <ModalOverlay>
      <Modal>
        <Sparkles>
          {sparklePositions.map((pos, i) => (
            <Sparkle key={i} x={pos.x} y={pos.y} delay={pos.delay}>
              ✨
            </Sparkle>
          ))}
        </Sparkles>
        
        <Content>
          <Title>🎉 AMAZING! 🎉</Title>
          
          <HeroContainer>
            <HeroSVG viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
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
              
              {/* Mouth - Happy! */}
              <path
                d="M 12 15 Q 16 18 20 15"
                stroke="#ff69b4"
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
              />
              
              {/* Body */}
              <rect x="12" y="20" width="8" height="8" rx="2" fill="#00f0ff" />
              
              {/* Arms - raised in celebration! */}
              <rect x="9" y="20" width="2" height="6" rx="1" fill="#ffd4a3" transform="rotate(-30 10 20)" />
              <rect x="21" y="20" width="2" height="6" rx="1" fill="#ffd4a3" transform="rotate(30 22 20)" />
              
              {/* Legs */}
              <rect x="13" y="27" width="2" height="4" rx="1" fill="#ffd4a3" />
              <rect x="17" y="27" width="2" height="4" rx="1" fill="#ffd4a3" />
              
              {/* Shoes */}
              <ellipse cx="14" cy="30.5" rx="1.5" ry="1" fill="#ff00ff" />
              <ellipse cx="18" cy="30.5" rx="1.5" ry="1" fill="#ff00ff" />
              
              {/* Hair ribbons */}
              <circle cx="9" cy="10" r="2" fill="#ff00ff" />
              <circle cx="23" cy="10" r="2" fill="#ff00ff" />
            </HeroSVG>
          </HeroContainer>
          
          <Message>
            You collected all the letters!<br />
            Now head to the <span style={{ color: '#00f0ff', textShadow: '0 0 10px #00f0ff' }}>FINISH</span>!
          </Message>
          
          <ContinueButton onClick={onContinue}>
            LET'S GO! 🚀
          </ContinueButton>
        </Content>
      </Modal>
    </ModalOverlay>
  )
}

export default LettersCollectedModal

