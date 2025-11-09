# Quick Start Guide 🚀

## Running the Game

```bash
# Start the development server
npm run dev
```

Then open your browser to the URL shown (usually http://localhost:5173)

## How to Play

1. Enter your daughter's name on the welcome screen
2. Click "START GAME"
3. Use arrow keys (↑ ↓ ← →) to move the cute anime girl hero
4. **Collect all letters of the name** scattered throughout the maze
5. After collecting all letters, the finish will light up in cyan
6. Navigate from the green START to the cyan FINISH
7. Try to complete the maze as quickly as possible!

## Building for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Tech Notes

- **Framework**: React 18 with Vite
- **Language**: TypeScript
- **Styling**: styled-components with Blade Runner color scheme
- **Hero Character**: SVG-based anime-style girl with floating animation
- **Maze Algorithm**: Recursive backtracking with guaranteed solution path
- **Game Mechanic**: Letter collection before finishing
- **Controls**: Keyboard arrow keys
- **Cell Size**: 40x40px
- **Default Maze Size**: 15x15 cells

## Future Enhancements

- ✅ ~~Replace hero square~~ - Anime girl character added!
- ✅ ~~Collectible items~~ - Letter collection mechanic added!
- Add walk cycle animations
- Multiple difficulty levels (maze size)
- Sound effects and music
- High score system with localStorage
- Mobile touch controls
- Character customization

Have fun playing! 🎮

