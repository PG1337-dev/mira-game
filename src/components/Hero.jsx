import '../styles/Hero.css'

function Hero({ position }) {
  const cellSize = 40 // Must match CSS cell size
  
  const style = {
    transform: `translate(${position.x * cellSize}px, ${position.y * cellSize}px)`
  }

  return (
    <div className="hero" style={style}>
      <div className="hero-inner"></div>
    </div>
  )
}

export default Hero

