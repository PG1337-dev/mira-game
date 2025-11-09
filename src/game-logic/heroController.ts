import { Position, Labyrinth, Letter, Enemy, SafeRoom } from '../types/game.types'

/**
 * Hero movement and collision detection logic
 */

export function moveHero(currentPosition: Position, key: string, labyrinth: Labyrinth): Position | null {
  const { maze } = labyrinth
  let newX = currentPosition.x
  let newY = currentPosition.y

  // Determine new position based on arrow key
  switch (key) {
    case 'ArrowUp':
      newY -= 1
      break
    case 'ArrowDown':
      newY += 1
      break
    case 'ArrowLeft':
      newX -= 1
      break
    case 'ArrowRight':
      newX += 1
      break
    default:
      return null
  }

  // Check if new position is valid (within bounds and not a wall)
  if (isValidMove(newX, newY, maze)) {
    return { x: newX, y: newY }
  }

  // Invalid move, return null (hero stays in place)
  return null
}

function isValidMove(x: number, y: number, maze: number[][]): boolean {
  const height = maze.length
  const width = maze[0].length

  // Check bounds
  if (x < 0 || x >= width || y < 0 || y >= height) {
    return false
  }

  // Check if it's a wall (1 = wall, 0 = path)
  if (maze[y][x] === 1) {
    return false
  }

  return true
}

export function checkLetterCollection(position: Position, letters: Letter[]): Letter | null {
  const letter = letters.find(
    l => l.x === position.x && l.y === position.y && !l.collected
  )
  return letter || null
}

export function checkWin(
  position: Position, 
  finishPosition: Position, 
  letters: Letter[]
): boolean {
  // Check if player is at finish AND has collected all letters
  const atFinish = position.x === finishPosition.x && position.y === finishPosition.y
  const allLettersCollected = letters.every(l => l.collected)
  
  return atFinish && allLettersCollected
}

export function canFinish(letters: Letter[]): boolean {
  return letters.every(l => l.collected)
}

export function checkDragonCollision(heroPosition: Position, enemies: Enemy[]): boolean {
  return enemies.some(enemy => 
    enemy.x === heroPosition.x && enemy.y === heroPosition.y
  )
}

export function isInSafeRoom(position: Position, safeRooms: SafeRoom[]): boolean {
  return safeRooms.some(room => 
    room.x === position.x && room.y === position.y
  )
}

export function moveEnemy(enemy: Enemy, maze: number[][]): Enemy {
  const directions: { [key: string]: { dx: number; dy: number } } = {
    up: { dx: 0, dy: -1 },
    down: { dx: 0, dy: 1 },
    left: { dx: -1, dy: 0 },
    right: { dx: 1, dy: 0 }
  }

  const currentDir = directions[enemy.direction]
  let newX = enemy.x + currentDir.dx
  let newY = enemy.y + currentDir.dy

  // Check if new position is valid (not wall)
  if (!isValidEnemyMove(newX, newY, maze)) {
    // If blocked, try random direction
    const possibleDirections: ('up' | 'down' | 'left' | 'right')[] = []
    
    for (const dir of Object.keys(directions) as ('up' | 'down' | 'left' | 'right')[]) {
      const testX = enemy.x + directions[dir].dx
      const testY = enemy.y + directions[dir].dy
      if (isValidEnemyMove(testX, testY, maze)) {
        possibleDirections.push(dir)
      }
    }

    if (possibleDirections.length > 0) {
      const newDirection = possibleDirections[Math.floor(Math.random() * possibleDirections.length)]
      newX = enemy.x + directions[newDirection].dx
      newY = enemy.y + directions[newDirection].dy
      
      return {
        ...enemy,
        x: newX,
        y: newY,
        direction: newDirection
      }
    }
    
    // If no valid moves, stay in place but change direction
    const randomDirection: ('up' | 'down' | 'left' | 'right')[] = ['up', 'down', 'left', 'right']
    return {
      ...enemy,
      direction: randomDirection[Math.floor(Math.random() * randomDirection.length)]
    }
  }

  // Move in current direction
  return {
    ...enemy,
    x: newX,
    y: newY
  }
}

function isValidEnemyMove(x: number, y: number, maze: number[][]): boolean {
  const height = maze.length
  const width = maze[0].length

  // Check bounds
  if (x < 0 || x >= width || y < 0 || y >= height) {
    return false
  }

  // Check if it's a wall
  if (maze[y][x] === 1) {
    return false
  }

  // Dragons CAN move through safe rooms now!
  // (but can't harm hero if hero is in safe room)

  return true
}

export function moveUnicorn(
  unicorn: { x: number; y: number; id: string },
  maze: number[][],
  safeRooms: SafeRoom[],
  heroPosition: Position
): { x: number; y: number; id: string } {
  // Unicorn moves slowly and randomly
  const directions = [
    { dx: 0, dy: -1 }, // up
    { dx: 0, dy: 1 },  // down
    { dx: -1, dy: 0 }, // left
    { dx: 1, dy: 0 },  // right
  ]
  
  // Shuffle directions for random movement
  const shuffled = [...directions].sort(() => Math.random() - 0.5)
  
  for (const dir of shuffled) {
    const newX = unicorn.x + dir.dx
    const newY = unicorn.y + dir.dy
    
    // Check if valid position (not wall, not safe room, not too close to hero)
    if (newY >= 0 && newY < maze.length && 
        newX >= 0 && newX < maze[0].length && 
        maze[newY][newX] === 0 &&
        !safeRooms.some(room => room.x === newX && room.y === newY) &&
        !(newX === heroPosition.x && newY === heroPosition.y)) {
      return { x: newX, y: newY, id: unicorn.id }
    }
  }
  
  // Can't move, stay in place
  return unicorn
}

