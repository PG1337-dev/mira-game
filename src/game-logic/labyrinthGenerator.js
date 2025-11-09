/**
 * Generates a labyrinth maze using a simplified algorithm
 * Creates a maze with guaranteed path from start to finish
 */

export function generateLabyrinth(width, height) {
  // Initialize maze with all walls
  const maze = Array(height).fill(null).map(() => Array(width).fill(1))
  
  // Create a simple path-based maze
  // 0 = path, 1 = wall
  
  // Start position (top-left area)
  const start = { x: 1, y: 1 }
  
  // Finish position (bottom-right area)
  const finish = { x: width - 2, y: height - 2 }
  
  // Carve out paths using recursive backtracking
  const visited = Array(height).fill(null).map(() => Array(width).fill(false))
  
  function carve(x, y) {
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
  
  return {
    maze,
    start,
    finish,
    width,
    height
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
}

function ensurePathToFinish(maze, start, finish) {
  // Simple path finding to ensure connectivity
  const height = maze.length
  const width = maze[0].length
  const visited = Array(height).fill(null).map(() => Array(width).fill(false))
  
  function canReach(x, y, targetX, targetY) {
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

