import '../styles/WinModal.css'

function WinModal({ playerName, completionTime, onPlayAgain, onMainMenu }) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="modal-overlay">
      <div className="win-modal">
        <div className="win-content">
          <h2 className="win-title">
            <span className="neon-text">YOU WIN!</span>
          </h2>
          
          <div className="win-message">
            Congratulations, <span className="player-highlight">{playerName}</span>!
          </div>
          
          <div className="completion-stats">
            <div className="stat-item">
              <span className="stat-label">Completion Time:</span>
              <span className="stat-value">{formatTime(completionTime)}</span>
            </div>
          </div>

          <div className="win-buttons">
            <button className="play-again-button" onClick={onPlayAgain}>
              PLAY AGAIN
            </button>
            <button className="main-menu-button" onClick={onMainMenu}>
              MAIN MENU
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WinModal

