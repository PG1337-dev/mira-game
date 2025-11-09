import { LevelConfig } from '../types/game.types'

/**
 * Configuration for each game level
 * Level 1: No enemies, small maze
 * Level 2+: Introduces dragon enemies and safe rooms
 */

export const LEVEL_CONFIGS: LevelConfig[] = [
  // Level 1: Tutorial - No enemies
  {
    level: 1,
    mazeSize: 15,
    enemyCount: 0,
    safeRoomCount: 0,
    enemySpeed: 0,
  },
  // Level 2: First dragon appears!
  {
    level: 2,
    mazeSize: 15,
    enemyCount: 1,
    safeRoomCount: 3,
    enemySpeed: 800, // milliseconds between moves (slower)
  },
  // Level 3: Dragon gets faster
  {
    level: 3,
    mazeSize: 17,
    enemyCount: 1,
    safeRoomCount: 3,
    enemySpeed: 700,
  },
  // Level 4: Bigger maze
  {
    level: 4,
    mazeSize: 19,
    enemyCount: 1,
    safeRoomCount: 4,
    enemySpeed: 600,
  },
  // Level 5: Two dragons!
  {
    level: 5,
    mazeSize: 19,
    enemyCount: 2,
    safeRoomCount: 5,
    enemySpeed: 700,
  },
  // Level 6: Faster dragons
  {
    level: 6,
    mazeSize: 21,
    enemyCount: 2,
    safeRoomCount: 5,
    enemySpeed: 500,
  },
  // Level 7: Big maze
  {
    level: 7,
    mazeSize: 23,
    enemyCount: 2,
    safeRoomCount: 6,
    enemySpeed: 500,
  },
  // Level 8: Three dragons!
  {
    level: 8,
    mazeSize: 23,
    enemyCount: 3,
    safeRoomCount: 7,
    enemySpeed: 600,
  },
  // Level 9: Fast and furious
  {
    level: 9,
    mazeSize: 25,
    enemyCount: 3,
    safeRoomCount: 8,
    enemySpeed: 400,
  },
  // Level 10: Final challenge!
  {
    level: 10,
    mazeSize: 27,
    enemyCount: 4,
    safeRoomCount: 10,
    enemySpeed: 400,
  },
]

export function getLevelConfig(level: number): LevelConfig {
  const config = LEVEL_CONFIGS.find(c => c.level === level)
  if (!config) {
    // Default to level 1 if invalid level
    return LEVEL_CONFIGS[0]
  }
  return config
}

export const MAX_LEVEL = LEVEL_CONFIGS.length

