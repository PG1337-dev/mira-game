/**
 * Hero movement and collision detection logic
 */

export function moveHero(currentPosition, key, labyrinth) {
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

function isValidMove(x, y, maze) {
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

export function checkWin(position, finishPosition) {
  return position.x === finishPosition.x && position.y === finishPosition.y
}

