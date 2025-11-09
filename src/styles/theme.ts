export const theme = {
  colors: {
    bgPrimary: '#0a0a0a',
    bgSecondary: '#1a1a2e',
    bgTertiary: '#16213e',
    
    neonCyan: '#00f0ff',
    neonMagenta: '#ff00ff',
    neonOrange: '#ff6600',
    neonGreen: '#00ff41',
    
    textPrimary: '#ffffff',
    textSecondary: '#b0b0b0',
    
    wallColor: '#1a1a2e',
    pathColor: '#16213e',
  },
  
  shadows: {
    neonCyan: '0 0 10px #00f0ff, 0 0 20px #00f0ff, 0 0 30px #00f0ff, 0 0 40px #00f0ff',
    neonMagenta: '0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff, 0 0 40px #ff00ff',
    neonOrange: '0 0 10px #ff6600',
  },
  
  cellSize: 40,
}

export type Theme = typeof theme

