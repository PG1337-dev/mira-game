export interface Position {
  x: number
  y: number
}

export interface Letter extends Position {
  char: string
  collected: boolean
}

export interface Labyrinth {
  maze: number[][]
  start: Position
  finish: Position
  width: number
  height: number
  letters: Letter[]
}

export type CellType = 'wall' | 'path' | 'start' | 'finish'

export interface GameState {
  labyrinth: Labyrinth
  heroPosition: Position
  isGameActive: boolean
  hasWon: boolean
  completionTime: number
  collectedLetters: string[]
}

