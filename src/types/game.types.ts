export interface Position {
  x: number
  y: number
}

export interface Letter extends Position {
  char: string
  collected: boolean
}

export interface SafeRoom extends Position {
  id: string
}

export interface Enemy extends Position {
  id: string
  type: 'dragon'
  direction: 'up' | 'down' | 'left' | 'right'
  speed: number
}

export interface Unicorn extends Position {
  id: string
}

export interface Labyrinth {
  maze: number[][]
  start: Position
  finish: Position
  width: number
  height: number
  letters: Letter[]
  safeRooms: SafeRoom[]
  enemies: Enemy[]
  unicorn: Unicorn | null
}

export type CellType = 'wall' | 'path' | 'start' | 'finish' | 'safeRoom'

export interface GameState {
  labyrinth: Labyrinth
  heroPosition: Position
  isGameActive: boolean
  hasWon: boolean
  completionTime: number
  collectedLetters: string[]
  currentLevel: number
  lives: number
}

export interface LevelConfig {
  level: number
  mazeSize: number
  enemyCount: number
  safeRoomCount: number
  enemySpeed: number
}

