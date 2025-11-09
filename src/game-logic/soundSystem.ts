/**
 * 8-bit Sound System using Web Audio API
 * Creates retro Japanese-style game music and sound effects
 */

class SoundSystem {
  private audioContext: AudioContext | null = null
  private masterGain: GainNode | null = null
  private musicGain: GainNode | null = null
  private isMuted: boolean = false
  private currentMusicInterval: number | null = null

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      this.masterGain = this.audioContext.createGain()
      this.masterGain.connect(this.audioContext.destination)
      
      this.musicGain = this.audioContext.createGain()
      this.musicGain.gain.value = 0.3 // Background music volume
      this.musicGain.connect(this.masterGain)
    }
  }

  private createOscillator(frequency: number, type: OscillatorType = 'square'): OscillatorNode | null {
    if (!this.audioContext) return null
    
    const oscillator = this.audioContext.createOscillator()
    oscillator.type = type
    oscillator.frequency.value = frequency
    return oscillator
  }

  // Play a single note
  private playNote(frequency: number, duration: number, startTime: number, volume: number = 0.3): void {
    if (!this.audioContext || !this.musicGain || this.isMuted) return

    const oscillator = this.createOscillator(frequency)
    if (!oscillator) return

    const gainNode = this.audioContext.createGain()
    gainNode.gain.setValueAtTime(0, startTime)
    gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration)

    oscillator.connect(gainNode)
    gainNode.connect(this.musicGain!)

    oscillator.start(startTime)
    oscillator.stop(startTime + duration)
  }

  // Different melodies for each level (1-10)
  startBackgroundMusic(level: number = 1): void {
    if (!this.audioContext || this.currentMusicInterval) return

    const bpm = 140
    const beatDuration = 60 / bpm

    // Japanese pentatonic scale notes (frequencies in Hz)
    const notes = {
      C4: 261.63,
      D4: 293.66,
      E4: 329.63,
      G4: 392.00,
      A4: 440.00,
      C5: 523.25,
      D5: 587.33,
      E5: 659.25,
      G5: 783.99,
      A5: 880.00,
      C6: 1046.5,
    }

    // 10 different melodies - one for each level!
    const melodies: { [key: number]: Array<{ note: number; duration: number }> } = {
      // Level 1: Simple and cheerful (tutorial)
      1: [
        { note: notes.C5, duration: beatDuration * 1 },
        { note: notes.E5, duration: beatDuration * 1 },
        { note: notes.G5, duration: beatDuration * 1 },
        { note: notes.E5, duration: beatDuration * 1 },
        { note: notes.C5, duration: beatDuration * 1 },
        { note: notes.G4, duration: beatDuration * 1 },
        { note: notes.C5, duration: beatDuration * 2 },
      ],
      
      // Level 2: Adventure begins!
      2: [
        { note: notes.E5, duration: beatDuration * 0.5 },
        { note: notes.G5, duration: beatDuration * 0.5 },
        { note: notes.A5, duration: beatDuration * 1 },
        { note: notes.G5, duration: beatDuration * 0.5 },
        { note: notes.E5, duration: beatDuration * 0.5 },
        { note: notes.C5, duration: beatDuration * 1 },
        { note: notes.D5, duration: beatDuration * 0.5 },
        { note: notes.E5, duration: beatDuration * 1.5 },
      ],
      
      // Level 3: Getting exciting
      3: [
        { note: notes.G5, duration: beatDuration * 0.5 },
        { note: notes.E5, duration: beatDuration * 0.5 },
        { note: notes.C5, duration: beatDuration * 0.5 },
        { note: notes.E5, duration: beatDuration * 0.5 },
        { note: notes.G5, duration: beatDuration * 1 },
        { note: notes.A5, duration: beatDuration * 1 },
        { note: notes.G5, duration: beatDuration * 1 },
        { note: notes.E5, duration: beatDuration * 1 },
      ],
      
      // Level 4: Mysterious
      4: [
        { note: notes.A5, duration: beatDuration * 1 },
        { note: notes.G5, duration: beatDuration * 0.5 },
        { note: notes.E5, duration: beatDuration * 0.5 },
        { note: notes.D5, duration: beatDuration * 1 },
        { note: notes.E5, duration: beatDuration * 1 },
        { note: notes.G5, duration: beatDuration * 1 },
        { note: notes.A5, duration: beatDuration * 1 },
      ],
      
      // Level 5: Energetic!
      5: [
        { note: notes.E5, duration: beatDuration * 0.25 },
        { note: notes.G5, duration: beatDuration * 0.25 },
        { note: notes.A5, duration: beatDuration * 0.5 },
        { note: notes.G5, duration: beatDuration * 0.25 },
        { note: notes.A5, duration: beatDuration * 0.25 },
        { note: notes.C6, duration: beatDuration * 1 },
        { note: notes.A5, duration: beatDuration * 0.5 },
        { note: notes.G5, duration: beatDuration * 0.5 },
        { note: notes.E5, duration: beatDuration * 1 },
      ],
      
      // Level 6: Dreamy
      6: [
        { note: notes.C5, duration: beatDuration * 1 },
        { note: notes.D5, duration: beatDuration * 1 },
        { note: notes.E5, duration: beatDuration * 1 },
        { note: notes.G5, duration: beatDuration * 1 },
        { note: notes.E5, duration: beatDuration * 1 },
        { note: notes.D5, duration: beatDuration * 1 },
        { note: notes.C5, duration: beatDuration * 2 },
      ],
      
      // Level 7: Brave and bold
      7: [
        { note: notes.G5, duration: beatDuration * 0.5 },
        { note: notes.A5, duration: beatDuration * 0.5 },
        { note: notes.C6, duration: beatDuration * 1 },
        { note: notes.A5, duration: beatDuration * 0.5 },
        { note: notes.G5, duration: beatDuration * 0.5 },
        { note: notes.E5, duration: beatDuration * 1 },
        { note: notes.G5, duration: beatDuration * 1 },
        { note: notes.C5, duration: beatDuration * 1 },
      ],
      
      // Level 8: Intense!
      8: [
        { note: notes.E5, duration: beatDuration * 0.25 },
        { note: notes.E5, duration: beatDuration * 0.25 },
        { note: notes.G5, duration: beatDuration * 0.5 },
        { note: notes.A5, duration: beatDuration * 0.5 },
        { note: notes.C6, duration: beatDuration * 0.5 },
        { note: notes.A5, duration: beatDuration * 0.5 },
        { note: notes.G5, duration: beatDuration * 0.5 },
        { note: notes.E5, duration: beatDuration * 1 },
      ],
      
      // Level 9: Epic battle
      9: [
        { note: notes.A5, duration: beatDuration * 0.5 },
        { note: notes.G5, duration: beatDuration * 0.5 },
        { note: notes.E5, duration: beatDuration * 0.5 },
        { note: notes.G5, duration: beatDuration * 0.5 },
        { note: notes.A5, duration: beatDuration * 1 },
        { note: notes.C6, duration: beatDuration * 1 },
        { note: notes.A5, duration: beatDuration * 1 },
        { note: notes.G5, duration: beatDuration * 1 },
      ],
      
      // Level 10: Final boss!
      10: [
        { note: notes.C6, duration: beatDuration * 0.5 },
        { note: notes.A5, duration: beatDuration * 0.5 },
        { note: notes.G5, duration: beatDuration * 0.5 },
        { note: notes.A5, duration: beatDuration * 0.5 },
        { note: notes.C6, duration: beatDuration * 1 },
        { note: notes.G5, duration: beatDuration * 0.5 },
        { note: notes.E5, duration: beatDuration * 0.5 },
        { note: notes.C5, duration: beatDuration * 1 },
        { note: notes.A5, duration: beatDuration * 1 },
      ],
    }

    // Get melody for current level (default to level 1 if not found)
    const melody = melodies[level] || melodies[1]

    const playMelody = () => {
      if (!this.audioContext) return

      const startTime = this.audioContext.currentTime
      let currentTime = startTime

      melody.forEach(({ note, duration }) => {
        this.playNote(note, duration * 0.9, currentTime, 0.15)
        currentTime += duration
      })
    }

    // Calculate total melody duration
    const totalDuration = melody.reduce((sum, note) => sum + note.duration, 0)
    
    // Play melody immediately
    playMelody()
    
    // Loop the melody
    this.currentMusicInterval = setInterval(playMelody, totalDuration * 1000) as unknown as number
  }

  stopBackgroundMusic(): void {
    if (this.currentMusicInterval) {
      clearInterval(this.currentMusicInterval)
      this.currentMusicInterval = null
    }
  }

  // Sound effects
  playCollectSound(): void {
    if (!this.audioContext || this.isMuted) return

    const startTime = this.audioContext.currentTime
    // Brighter, more noticeable collection sound
    this.playNote(659.25, 0.12, startTime, 0.35) // E5
    this.playNote(783.99, 0.12, startTime + 0.08, 0.35) // G5
    this.playNote(1046.5, 0.15, startTime + 0.16, 0.35) // C6
  }

  playUnicornMagicSound(): void {
    if (!this.audioContext || this.isMuted) return

    const startTime = this.audioContext.currentTime
    // Magical sparkle sound - ascending then descending
    const notes = [
      { freq: 523.25, time: 0 },      // C5
      { freq: 659.25, time: 0.08 },   // E5
      { freq: 783.99, time: 0.16 },   // G5
      { freq: 1046.5, time: 0.24 },   // C6
      { freq: 1318.5, time: 0.32 },   // E6
      { freq: 1046.5, time: 0.4 },    // C6 - descending
      { freq: 783.99, time: 0.48 },   // G5
    ]

    notes.forEach(({ freq, time }) => {
      this.playNote(freq, 0.1, startTime + time, 0.25)
    })
  }

  playDragonCatchSound(): void {
    if (!this.audioContext || this.isMuted) return

    const startTime = this.audioContext.currentTime
    // Sharp "BIP BIP" alarm sound
    this.playNote(880, 0.08, startTime, 0.4) // A5 - high pitch
    this.playNote(880, 0.08, startTime + 0.12, 0.4)
    this.playNote(880, 0.08, startTime + 0.24, 0.4)
    this.playNote(440, 0.15, startTime + 0.36, 0.35) // A4 - lower
  }

  playWinSound(): void {
    if (!this.audioContext || this.isMuted) return

    const startTime = this.audioContext.currentTime
    const notes = [261.63, 329.63, 392, 523.25, 659.25] // C major arpeggio
    
    notes.forEach((note, i) => {
      this.playNote(note, 0.2, startTime + i * 0.1, 0.25)
    })
  }

  playCelebrationSound(): void {
    if (!this.audioContext || this.isMuted) return

    const startTime = this.audioContext.currentTime
    // Short fanfare for letter collection
    const melody = [
      { freq: 523.25, time: 0 },      // C5
      { freq: 659.25, time: 0.1 },    // E5
      { freq: 783.99, time: 0.2 },    // G5
      { freq: 1046.5, time: 0.3 },    // C6
    ]

    melody.forEach(({ freq, time }) => {
      this.playNote(freq, 0.15, startTime + time, 0.25)
    })
  }

  // Full celebration music when all letters are collected!
  playCelebrationMusic(): void {
    if (!this.audioContext || this.isMuted) return

    // Stop background music for celebration
    this.stopBackgroundMusic()

    const startTime = this.audioContext.currentTime
    const bpm = 160
    const beat = 60 / bpm

    // Victory fanfare melody
    const victoryMelody = [
      // First phrase
      { freq: 659.25, time: 0, duration: beat * 0.5 },       // E5
      { freq: 659.25, time: beat * 0.5, duration: beat * 0.5 },
      { freq: 659.25, time: beat * 1, duration: beat * 1 },
      { freq: 523.25, time: beat * 2, duration: beat * 0.5 },  // C5
      { freq: 659.25, time: beat * 2.5, duration: beat * 1 },
      
      // Second phrase
      { freq: 783.99, time: beat * 4, duration: beat * 2 },    // G5
      { freq: 1046.5, time: beat * 6, duration: beat * 0.5 },  // C6
      { freq: 1046.5, time: beat * 6.5, duration: beat * 0.5 },
      { freq: 1046.5, time: beat * 7, duration: beat * 0.5 },
      { freq: 1174.7, time: beat * 7.5, duration: beat * 0.5 }, // D6
      { freq: 1046.5, time: beat * 8, duration: beat * 2 },    // C6
    ]

    victoryMelody.forEach(({ freq, time, duration }) => {
      this.playNote(freq, duration * 0.9, startTime + time, 0.3)
    })

    // Note: Background music will be restarted by GameBoard when resuming game
  }

  toggleMute(currentLevel: number = 1): boolean {
    this.isMuted = !this.isMuted
    
    if (this.isMuted) {
      this.stopBackgroundMusic()
    } else {
      this.startBackgroundMusic(currentLevel)
    }
    
    return this.isMuted
  }

  setMuted(muted: boolean): void {
    if (this.isMuted !== muted) {
      this.toggleMute()
    }
  }

  getMuted(): boolean {
    return this.isMuted
  }

  cleanup(): void {
    this.stopBackgroundMusic()
    if (this.audioContext) {
      this.audioContext.close()
    }
  }
}

// Singleton instance
export const soundSystem = new SoundSystem()

