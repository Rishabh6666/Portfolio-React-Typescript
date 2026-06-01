// Procedural Web Audio Lofi Synth Engine
// Generates warm lofi beats, retro keys, syncopated bass, and vinyl crackle entirely in-browser.

export class LofiAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private currentTrack = 0;
  private timerId: any = null;
  
  // Audio Nodes
  private masterGain: GainNode | null = null;
  private vinylFilter: BiquadFilterNode | null = null;
  private vinylVolume: GainNode | null = null;
  private delayNode: DelayNode | null = null;
  private delayGain: GainNode | null = null;
  
  // Synthesizer Settings
  private tempo = 76; // Cozy, chill lofi tempo
  private nextStepTime = 0.0;
  private stepInBar = 0; // 0 to 15 (sixteenth notes)
  private currentBar = 0; // 0 to 15 (4 measures of 4/4)
  private lookahead = 25.0; // How frequently to call scheduler (ms)
  private scheduleAheadTime = 0.1; // How far ahead to schedule audio (s)

  // Track chord progressions (represented in MIDI translated to Frequencies)
  // Each track has a 4-chord looping progression
  private tracks = [
    {
      // Track 0: Neo Cosmic Dreams (Gmaj9 - Ebmaj9 - Em9 - Fmaj9) — Ethereal, ambient
      name: "Neo Cosmic Dreams",
      chords: [
        [196.00, 246.94, 293.66, 369.99, 440.00], // Gmaj9 (G3, B3, D4, F#4, A4)
        [155.56, 196.00, 233.08, 293.66, 349.23], // Ebmaj9 (Eb3, G3, Bb3, D4, F4)
        [164.81, 196.00, 246.94, 293.66, 392.00], // Emin9 (E3, G3, B3, D4, G4)
        [174.61, 220.00, 261.63, 329.63, 392.00]  // Fmaj9 (F3, A4, C4, E4, G4)
      ],
      roots: [98.00, 77.78, 82.41, 87.31] // Roots (G2, Eb2, E2, F2)
    },
    {
      // Track 1: Dynamic Flow (Dmaj9 - Bm9 - Gmaj9 - A11) — Soothing chiptune fusion
      name: "Dynamic Flow",
      chords: [
        [146.83, 220.00, 277.18, 329.63, 440.00], // Dmaj9
        [123.47, 185.00, 220.00, 277.18, 329.63], // Bm9
        [196.00, 246.94, 293.66, 392.00, 440.00], // Gmaj9
        [110.00, 164.81, 220.00, 293.66, 329.63]  // A11
      ],
      roots: [73.42, 61.74, 98.00, 55.00] // (D2, B1, G2, A1)
    },
    {
      // Track 2: Vaporwave Grid (Cmaj9 - D13 - Bm9 - Esus4) — Retro cassette nostalgias
      name: "Vaporwave Grid",
      chords: [
        [130.81, 196.00, 261.63, 329.63, 392.00], // Cmaj9
        [146.83, 220.00, 293.66, 369.99, 440.00], // D13/D9 style
        [123.47, 185.00, 220.00, 261.63, 329.63], // Bm7
        [164.81, 220.00, 246.94, 329.63, 440.00]  // Esus4
      ],
      roots: [65.41, 73.42, 61.74, 82.41] // (C2, D2, B1, E2)
    }
  ];

  constructor() {}

  // Initialize Audio Context on demand
  private init() {
    if (this.ctx) return;
    
    // Create AudioContext
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    this.ctx = new AudioContextClass();

    // Master volume control to keep output smooth and sweet
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.38, this.ctx.currentTime); // Gentle overall gain
    this.masterGain.connect(this.ctx.destination);

    // Warm echo/delay line for pluck melodies
    this.delayNode = this.ctx.createDelay(1.0);
    this.delayGain = this.ctx.createGain();
    this.delayNode.delayTime.setValueAtTime(0.44, this.ctx.currentTime); // Slap delay feedback
    this.delayGain.gain.setValueAtTime(0.32, this.ctx.currentTime);

    // Feedback loop
    this.delayNode.connect(this.delayGain);
    this.delayGain.connect(this.delayNode);
    // Connect delay output to master
    this.delayNode.connect(this.masterGain);

    // Generate vinyl crackle buffer loop
    this.setupVinylCrackle();
  }

  // Create infinite retro record noise
  private setupVinylCrackle() {
    if (!this.ctx || !this.masterGain) return;

    const sampleRate = this.ctx.sampleRate;
    const bufferSize = sampleRate * 3.5; // 3.5s looping noise
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
    const data = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      // White noise base + sparse popping cracks
      const white = Math.random() * 2.0 - 1.0;
      let crackle = 0;
      if (Math.random() < 0.00015) {
        // High impulse crack popping
        crackle = (Math.random() > 0.5 ? 1 : -1) * (0.4 + Math.random() * 0.5);
      }
      data[i] = white * 0.015 + crackle;
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    // Filter noise to sound old & muffled (Bandpass filter + high-pass)
    this.vinylFilter = this.ctx.createBiquadFilter();
    this.vinylFilter.type = "bandpass";
    this.vinylFilter.frequency.setValueAtTime(950, this.ctx.currentTime);
    this.vinylFilter.Q.setValueAtTime(1.2, this.ctx.currentTime);

    this.vinylVolume = this.ctx.createGain();
    this.vinylVolume.gain.setValueAtTime(0.12, this.ctx.currentTime); // Low background hiss

    noiseSource.connect(this.vinylFilter);
    this.vinylFilter.connect(this.vinylVolume);
    this.vinylVolume.connect(this.masterGain);

    noiseSource.start(0);
  }

  // Play a soft rhodes-like chord
  private playRhodesNote(frequency: number, startTime: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;

    // Dual oscillator configuration for chorus-like vintage detuning
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    const filterNode = this.ctx.createBiquadFilter();

    osc1.type = "triangle"; // Warm retro base
    osc2.type = "sine"; // Pure round thickness
    
    // Light detune for nostalgic microtonal pitch drifting
    osc1.frequency.setValueAtTime(frequency - 0.7, startTime);
    osc2.frequency.setValueAtTime(frequency + 0.7, startTime);

    // Warm muffled lowpass filter sweep
    filterNode.type = "lowpass";
    filterNode.frequency.setValueAtTime(120, startTime);
    filterNode.frequency.exponentialRampToValueAtTime(750, startTime + 0.12);
    filterNode.frequency.exponentialRampToValueAtTime(450, startTime + duration);

    // Standard ADSR key enclosure
    gainNode.gain.setValueAtTime(0.0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.035); // Fast soft attack
    gainNode.gain.exponentialRampToValueAtTime(0.08, startTime + 0.25); // Sweet decay
    gainNode.gain.setValueAtTime(0.08, startTime + duration - 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration); // Smooth release

    // Connect nodes
    osc1.connect(filterNode);
    osc2.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(this.masterGain);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + duration);
    osc2.stop(startTime + duration);
  }

  // Play a syncopated warm sinus bass note
  private playBassNote(frequency: number, startTime: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc.type = "sine"; // Pure sub bass
    osc.frequency.setValueAtTime(frequency, startTime);

    gainNode.gain.setValueAtTime(0.0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.24, startTime + 0.04);
    gainNode.gain.setValueAtTime(0.18, startTime + duration - 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gainNode);
    gainNode.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  // Play a sparkling melodic glass bell pluck
  private playMelodyNote(frequency: number, startTime: number) {
    if (!this.ctx || !this.masterGain || !this.delayNode) return;

    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(frequency, startTime);

    // Fast pluck bell envelope
    gainNode.gain.setValueAtTime(0.0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.11, startTime + 0.005);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.38);

    // Feed to master output AND delay line for dreamy space space
    osc.connect(gainNode);
    gainNode.connect(this.masterGain);
    gainNode.connect(this.delayNode);

    osc.start(startTime);
    osc.stop(startTime + 0.45);
  }

  // Cozy muffled kick drum sound
  private playLofiKick(startTime: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc.type = "sine";
    // Quick pitch sweep downward for kick fatness
    osc.frequency.setValueAtTime(140, startTime);
    osc.frequency.exponentialRampToValueAtTime(45, startTime + 0.088);

    gainNode.gain.setValueAtTime(0.45, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.16);

    osc.connect(gainNode);
    gainNode.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + 0.18);
  }

  // Soft filtered shaker / hi-hat snare sound
  private playSnareBeats(startTime: number, volume = 0.08) {
    if (!this.ctx || !this.masterGain) return;

    // Create a burst of white noise
    const bufferSize = this.ctx.sampleRate * 0.12; // Short snap
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2.0 - 1.0;
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = buffer;

    // Lowpass filter snaps so it has high lofi warmth instead of sizzly bite
    const bandpass = this.ctx.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.setValueAtTime(1100, startTime);
    bandpass.Q.setValueAtTime(1.0, startTime);

    const gainNode = this.ctx.createGain();
    gainNode.gain.setValueAtTime(volume, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.11);

    noiseSource.connect(bandpass);
    bandpass.connect(gainNode);
    gainNode.connect(this.masterGain);

    noiseSource.start(startTime);
    noiseSource.stop(startTime + 0.13);
  }

  // Play a soft high-hat "tick"
  private playHat(startTime: number) {
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = this.ctx.sampleRate * 0.03; // Very short sound
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
       output[i] = Math.random() * 2.0 - 1.0;
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.setValueAtTime(6500, startTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.04, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.025);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    source.start(startTime);
    source.stop(startTime + 0.03);
  }

  // Core Scheduler
  private scheduleInstruments(step: number, time: number) {
    const trackData = this.tracks[this.currentTrack];
    const currentChordIndex = Math.floor(step / 16) % 4;
    const chord = trackData.chords[currentChordIndex];
    const root = trackData.roots[currentChordIndex];

    const currentStepInBar = step % 16;

    // 1. DRUM BEAT PATTERNS (Soft cozy groove)
    // Cozy Kick on 0 and 8, or subtle syncopation at step 14
    if (currentStepInBar === 0 || currentStepInBar === 8) {
      this.playLofiKick(time);
    } else if (currentStepInBar === 14 && Math.random() > 0.45) {
      this.playLofiKick(time);
    }

    // Direct cozy acoustic-like snare/snap on step 4 and 12
    if (currentStepInBar === 4 || currentStepInBar === 12) {
      this.playSnareBeats(time, 0.07);
    }

    // Direct shaker/hat tick on off-beats
    if (currentStepInBar % 2 === 1) {
      this.playHat(time);
    }

    // 2. SOOTHING CHORDS
    // Play warm rhodes strummed/arpeggiated block on start of bar and middle of bar
    if (currentStepInBar === 0 || currentStepInBar === 8) {
      const chordDuration = 1.35; // Sustain notes
      chord.forEach((freq, idx) => {
        // Humanizing Rhodes strumming: delay slightly per note in octave stack
        const humanizeDelay = idx * 0.024; 
        this.playRhodesNote(freq, time + humanizeDelay, chordDuration);
      });
    }

    // 3. SYNCOPATED BASSLINE (octave-divided smooth sinus root notes)
    if (currentStepInBar === 0) {
      this.playBassNote(root, time, 0.58);
    } else if (currentStepInBar === 6) {
      this.playBassNote(root * 1.5, time, 0.28); // Perfect fifth bounce
    } else if (currentStepInBar === 10) {
      this.playBassNote(root, time, 0.28);
    } else if (currentStepInBar === 14) {
      this.playBassNote(root * 1.33, time, 0.18); // Harmonic fourth passing
    }

    // 4. RANDOM SWEET PENTATONIC BELL PLUCK MELODY
    // Play sparse melodic highlights based on target track scale frequencies
    const seed = Math.random();
    if (currentStepInBar === 2 || currentStepInBar === 5 || currentStepInBar === 11 || currentStepInBar === 13) {
      if (seed > 0.44) {
        // Pick one high note from the current octave scale
        const noteIndex = Math.floor(Math.random() * chord.length);
        const melodyFrequency = chord[noteIndex] * 2.0; // transpose up 1 octave for bells
        this.playMelodyNote(melodyFrequency, time);
      }
    }
  }

  // Sequencer clock runner
  private scheduler() {
    if (!this.ctx) return;
    
    while (this.nextStepTime < this.ctx.currentTime + this.scheduleAheadTime) {
      this.scheduleInstruments(this.stepInBar, this.nextStepTime);
      this.advanceStep();
    }
  }

  private advanceStep() {
    // 16th note step = (60s / tempo) / 4
    const secondsPerStep = (60.0 / this.tempo) / 4.0;
    this.nextStepTime += secondsPerStep;
    this.stepInBar = (this.stepInBar + 1) % 64; // Loop 4 full measures (64 steps)
  }

  // API Trigger: Start Playing
  public start() {
    this.init();
    if (this.isPlaying || !this.ctx) return;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    this.isPlaying = true;
    this.nextStepTime = this.ctx.currentTime + 0.05;
    this.stepInBar = 0;

    // Background scheduling polling loop
    this.timerId = setInterval(() => {
      this.scheduler();
    }, this.lookahead);
  }

  // API Trigger: Stop Playing
  public stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  // API Trigger: Change Track (0, 1, 2)
  public setTrack(trackIndex: number) {
    if (trackIndex < 0 || trackIndex >= this.tracks.length) return;
    this.currentTrack = trackIndex;
    this.stepInBar = 0; // reset bar sequence on change
    if (this.ctx) {
      this.nextStepTime = this.ctx.currentTime + 0.02;
    }
  }

  // API Query: Is it active
  public getIsPlaying() {
    return this.isPlaying;
  }
}

// Single modular shared instance or static factory getter
let engineInstance: LofiAudioEngine | null = null;
export function getLofiAudioEngine(): LofiAudioEngine {
  if (!engineInstance) {
    engineInstance = new LofiAudioEngine();
  }
  return engineInstance;
}
