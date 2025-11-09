import { Labyrinth, Position, Letter, SafeRoom, Enemy } from '../types/game.types'

/**
 * Generates a labyrinth maze using recursive backtracking algorithm
 * Creates a maze with guaranteed path from start to finish
 * Scatters letters of the player's name throughout the maze
 * Adds safe rooms and enemies based on level configuration
 */

export function generateLabyrinth(
  width: number, 
  height: number, 
  playerName: string,
  safeRoomCount: number = 0,
  enemyCount: number = 0
): Labyrinth {
  // Initialize maze with all walls
  const maze: number[][] = Array(height).fill(null).map(() => Array(width).fill(1))
  
  // Start position (top-left area)
  const start: Position = { x: 1, y: 1 }
  
  // Finish position (bottom-right area)
  const finish: Position = { x: width - 2, y: height - 2 }
  
  // Carve out paths using recursive backtracking
  const visited: boolean[][] = Array(height).fill(null).map(() => Array(width).fill(false))
  
  function carve(x: number, y: number): void {
    maze[y][x] = 0
    visited[y][x] = true
    
    // Directions: right, down, left, up
    const directions = [
      { dx: 2, dy: 0 },
      { dx: 0, dy: 2 },
      { dx: -2, dy: 0 },
      { dx: 0, dy: -2 }
    ]
    
    // Shuffle directions for randomness
    shuffleArray(directions)
    
    for (const dir of directions) {
      const newX = x + dir.dx
      const newY = y + dir.dy
      
      if (newX > 0 && newX < width - 1 && 
          newY > 0 && newY < height - 1 && 
          !visited[newY][newX]) {
        // Carve through the wall between current and new cell
        maze[y + dir.dy / 2][x + dir.dx / 2] = 0
        carve(newX, newY)
      }
    }
  }
  
  // Start carving from start position
  carve(start.x, start.y)
  
  // Ensure finish is carved
  maze[finish.y][finish.x] = 0
  
  // Make sure there's a path to finish
  ensurePathToFinish(maze, start, finish)
  
  // Generate letter positions from player name
  const letters = generateLetterPositions(maze, playerName, start, finish)
  
  // Generate safe rooms
  const safeRooms = generateSafeRooms(maze, safeRoomCount, start, finish, letters)
  
  // Generate enemies
  const enemies = generateEnemies(maze, enemyCount, start, finish, letters, safeRooms)
  
  return {
    maze,
    start,
    finish,
    width,
    height,
    letters,
    safeRooms,
    enemies
  }
}

function generateLetterPositions(
  maze: number[][], 
  playerName: string, 
  start: Position, 
  finish: Position
): Letter[] {
  const letters: Letter[] = []
  const height = maze.length
  const width = maze[0].length
  
  // Get all available path positions (excluding start and finish)
  const availablePositions: Position[] = []
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (maze[y][x] === 0 && 
          !(x === start.x && y === start.y) && 
          !(x === finish.x && y === finish.y)) {
        availablePositions.push({ x, y })
      }
    }
  }
  
  // Shuffle available positions
  shuffleArray(availablePositions)
  
  // Place each letter of the name
  const nameChars = playerName.toUpperCase().split('')
  for (let i = 0; i < nameChars.length && i < availablePositions.length; i++) {
    letters.push({
      ...availablePositions[i],
      char: nameChars[i],
      collected: false
    })
  }
  
  return letters
}

function shuffleArray<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
}

function generateSafeRooms(
  maze: number[][], 
  count: number, 
  start: Position, 
  finish: Position,
  letters: Letter[]
): SafeRoom[] {
  const safeRooms: SafeRoom[] = []
  const height = maze.length
  const width = maze[0].length
  
  if (count === 0) return safeRooms
  
  // Get all available positions (paths, not start/finish/letters)
  const availablePositions: Position[] = []
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (maze[y][x] === 0 && 
          !(x === start.x && y === start.y) &&
          !(x === finish.x && y === finish.y) &&
          !letters.some(l => l.x === x && l.y === y)) {
        availablePositions.push({ x, y })
      }
    }
  }
  
  // Shuffle and take first N positions
  shuffleArray(availablePositions)
  
  for (let i = 0; i < Math.min(count, availablePositions.length); i++) {
    safeRooms.push({
      ...availablePositions[i],
      id: `safe-${i}`
    })
  }
  
  return safeRooms
}

function generateEnemies(
  maze: number[][], 
  count: number, 
  start: Position, 
  finish: Position,
  letters: Letter[],
  safeRooms: SafeRoom[]
): Enemy[] {
  const enemies: Enemy[] = []
  const height = maze.length
  const width = maze[0].length
  
  if (count === 0) return enemies
  
  // Get all available positions (paths, not start/finish/letters/safeRooms)
  const availablePositions: Position[] = []
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (maze[y][x] === 0 && 
          !(x === start.x && y === start.y) &&
          !(x === finish.x && y === finish.y) &&
          !letters.some(l => l.x === x && l.y === y) &&
          !safeRooms.some(r => r.x === x && r.y === y)) {
        // Try to place enemies away from start
        const distanceFromStart = Math.abs(x - start.x) + Math.abs(y - start.y)
        if (distanceFromStart > 5) {
          availablePositions.push({ x, y })
        }
      }
    }
  }
  
  // Shuffle and take first N positions
  shuffleArray(availablePositions)
  
  const directions: ('up' | 'down' | 'left' | 'right')[] = ['up', 'down', 'left', 'right']
  
  for (let i = 0; i < Math.min(count, availablePositions.length); i++) {
    enemies.push({
      ...availablePositions[i],
      id: `dragon-${i}`,
      type: 'dragon',
      direction: directions[Math.floor(Math.random() * directions.length)],
      speed: 1000
    })
  }
  
  return enemies
}

function ensurePathToFinish(maze: number[][], start: Position, finish: Position): void {
  const height = maze.length
  const width = maze[0].length
  const visited: boolean[][] = Array(height).fill(null).map(() => Array(width).fill(false))
  
  function canReach(x: number, y: number, targetX: number, targetY: number): boolean {
    if (x === targetX && y === targetY) return true
    if (x < 0 || x >= width || y < 0 || y >= height) return false
    if (maze[y][x] === 1 || visited[y][x]) return false
    
    visited[y][x] = true
    
    return canReach(x + 1, y, targetX, targetY) ||
           canReach(x - 1, y, targetX, targetY) ||
           canReach(x, y + 1, targetX, targetY) ||
           canReach(x, y - 1, targetX, targetY)
  }
  
  // Check if path exists
  const pathExists = canReach(start.x, start.y, finish.x, finish.y)
  
  // If no path exists, create a simple path
  if (!pathExists) {
    let x = start.x
    let y = start.y
    
    while (x !== finish.x || y !== finish.y) {
      maze[y][x] = 0
      
      if (x < finish.x) x++
      else if (x > finish.x) x--
      else if (y < finish.y) y++
      else if (y > finish.y) y--
    }
    maze[finish.y][finish.x] = 0
  }
}

