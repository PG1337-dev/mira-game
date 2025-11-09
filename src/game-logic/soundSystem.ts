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

  // Japanese-style 8-bit melody (inspired by classic Nintendo games)
  // Using pentatonic scale for authentic Japanese sound
  startBackgroundMusic(): void {
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
    }

    // Cute Japanese melody pattern
    const melody: Array<{ note: number; duration: number }> = [
      // Main theme
      { note: notes.E5, duration: beatDuration * 0.5 },
      { note: notes.G5, duration: beatDuration * 0.5 },
      { note: notes.A5, duration: beatDuration * 1 },
      { note: notes.G5, duration: beatDuration * 0.5 },
      { note: notes.E5, duration: beatDuration * 0.5 },
      { note: notes.C5, duration: beatDuration * 1 },
      { note: notes.D5, duration: beatDuration * 0.5 },
      { note: notes.E5, duration: beatDuration * 1.5 },
      
      { note: notes.E5, duration: beatDuration * 0.5 },
      { note: notes.G5, duration: beatDuration * 0.5 },
      { note: notes.A5, duration: beatDuration * 1 },
      { note: notes.C5, duration: beatDuration * 0.5 },
      { note: notes.D5, duration: beatDuration * 0.5 },
      { note: notes.E5, duration: beatDuration * 2 },
      
      // Variation
      { note: notes.G5, duration: beatDuration * 0.5 },
      { note: notes.A5, duration: beatDuration * 0.5 },
      { note: notes.G5, duration: beatDuration * 0.5 },
      { note: notes.E5, duration: beatDuration * 0.5 },
      { note: notes.D5, duration: beatDuration * 1 },
      { note: notes.C5, duration: beatDuration * 0.5 },
      { note: notes.D5, duration: beatDuration * 0.5 },
      { note: notes.E5, duration: beatDuration * 1 },
      { note: notes.G5, duration: beatDuration * 1 },
    ]

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
    this.playNote(523.25, 0.1, startTime, 0.2) // C5
    this.playNote(659.25, 0.1, startTime + 0.05, 0.2) // E5
    this.playNote(783.99, 0.15, startTime + 0.1, 0.2) // G5
  }

  playDragonCatchSound(): void {
    if (!this.audioContext || this.isMuted) return

    const startTime = this.audioContext.currentTime
    // Descending notes for "oops" effect
    this.playNote(440, 0.1, startTime, 0.3)
    this.playNote(392, 0.1, startTime + 0.1, 0.3)
    this.playNote(349, 0.1, startTime + 0.2, 0.3)
    this.playNote(293, 0.2, startTime + 0.3, 0.3)
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
    // Happy fanfare
    const melody = [
      { freq: 523.25, time: 0 },      // C5
      { freq: 659.25, time: 0.15 },   // E5
      { freq: 783.99, time: 0.3 },    // G5
      { freq: 1046.5, time: 0.45 },   // C6
      { freq: 783.99, time: 0.6 },    // G5
      { freq: 1046.5, time: 0.75 },   // C6
    ]

    melody.forEach(({ freq, time }) => {
      this.playNote(freq, 0.2, startTime + time, 0.3)
    })
  }

  toggleMute(): boolean {
    this.isMuted = !this.isMuted
    
    if (this.isMuted) {
      this.stopBackgroundMusic()
    } else {
      this.startBackgroundMusic()
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

