/**
 * HORROR AUDIO ENGINE
 * ----------------------------------------------------
 * Gera ambientação de terror com Web Audio API procedural (vento sombrio,
 * drone misterioso, pulso cardíaco) e sussurros inquietantes com a Web Speech API.
 * 100% gratuito, sem dependências externas e com total controle de volume e pausa.
 */

class HorrorAudioEngine {
  constructor() {
    this.audioCtx = null;
    this.isMuted = true; // Inicia mutado para respeitar políticas de navegadores
    this.ambientGain = null;
    this.effectsGain = null;
    this.droneOsc1 = null;
    this.droneOsc2 = null;
    this.noiseNode = null;
    this.windFilter = null;
    this.windInterval = null;
    this.whisperTimer = null;
    this.isWhispering = false;
    this.isInitialized = false;

    // Configurações
    this.config = window.HALLOWEEN_CONFIG?.audio || {
      volumeGeral: 0.4,
      intervaloMinSussurrosSegundos: 12,
      intervaloMaxSussurrosSegundos: 24,
      frasesSussurros: [
        "Eu estava esperando por você...",
        "Não olhe para trás...",
        "Você ouviu isso?",
        "A noite está apenas começando..."
      ]
    };
  }

  // Inicializa contexto de áudio após primeira interação do usuário
  init() {
    if (this.isInitialized) return;

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
        
        // Master Gain
        this.masterGain = this.audioCtx.createGain();
        this.masterGain.gain.setValueAtTime(this.config.volumeGeral, this.audioCtx.currentTime);
        this.masterGain.connect(this.audioCtx.destination);

        // Ambient Gain
        this.ambientGain = this.audioCtx.createGain();
        this.ambientGain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
        this.ambientGain.connect(this.masterGain);

        // Effects Gain
        this.effectsGain = this.audioCtx.createGain();
        this.effectsGain.gain.setValueAtTime(0.7, this.audioCtx.currentTime);
        this.effectsGain.connect(this.masterGain);

        this.setupDrone();
        this.setupWind();
      }
      this.isInitialized = true;
    } catch (err) {
      console.warn("Web Audio API não suportada ou bloqueada:", err);
    }
  }

  // Sintetizador de drone sombrio em baixa frequência
  setupDrone() {
    if (!this.audioCtx) return;

    // Oscilador 1: Sub-bass 50Hz
    this.droneOsc1 = this.audioCtx.createOscillator();
    this.droneOsc1.type = 'sawtooth';
    this.droneOsc1.frequency.setValueAtTime(55, this.audioCtx.currentTime);

    // Oscilador 2: Desafinado 57.5Hz para criar batimento acústico misterioso
    this.droneOsc2 = this.audioCtx.createOscillator();
    this.droneOsc2.type = 'sine';
    this.droneOsc2.frequency.setValueAtTime(57.5, this.audioCtx.currentTime);

    // Filtro Passa-Baixas ressonante
    const droneFilter = this.audioCtx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.setValueAtTime(110, this.audioCtx.currentTime);
    droneFilter.Q.setValueAtTime(4.0, this.audioCtx.currentTime);

    const droneGain = this.audioCtx.createGain();
    droneGain.gain.setValueAtTime(0.28, this.audioCtx.currentTime);

    this.droneOsc1.connect(droneFilter);
    this.droneOsc2.connect(droneFilter);
    droneFilter.connect(droneGain);
    droneGain.connect(this.ambientGain);

    this.droneOsc1.start();
    this.droneOsc2.start();
  }

  // Sintetizador de vento fantasmagórico com ruído modulado
  setupWind() {
    if (!this.audioCtx) return;

    // Buffer de Ruído Rosa/Branco
    const bufferSize = 2 * this.audioCtx.sampleRate;
    const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      output[i] = (b0 + b1 + b2) * 0.15;
    }

    const whiteNoise = this.audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filtro modulado
    this.windFilter = this.audioCtx.createBiquadFilter();
    this.windFilter.type = 'bandpass';
    this.windFilter.frequency.setValueAtTime(320, this.audioCtx.currentTime);
    this.windFilter.Q.setValueAtTime(2.5, this.audioCtx.currentTime);

    const windGain = this.audioCtx.createGain();
    windGain.gain.setValueAtTime(0.22, this.audioCtx.currentTime);

    whiteNoise.connect(this.windFilter);
    this.windFilter.connect(windGain);
    windGain.connect(this.ambientGain);

    whiteNoise.start();

    // Modulação suave do vento
    this.windInterval = setInterval(() => {
      if (this.audioCtx && this.windFilter && !this.isMuted) {
        const targetFreq = 220 + Math.random() * 380;
        const rampDuration = 3 + Math.random() * 4;
        this.windFilter.frequency.linearRampToValueAtTime(
          targetFreq,
          this.audioCtx.currentTime + rampDuration
        );
      }
    }, 4500);
  }

  // Inicia áudio ambiente com fade in
  start() {
    this.init();
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    this.isMuted = false;

    if (this.ambientGain && this.audioCtx) {
      this.ambientGain.gain.cancelScheduledValues(this.audioCtx.currentTime);
      this.ambientGain.gain.linearRampToValueAtTime(1.0, this.audioCtx.currentTime + 2.5);
    }

    this.scheduleNextWhisper();
  }

  // Pausa/Muta todo o áudio
  pause() {
    this.isMuted = true;
    if (this.ambientGain && this.audioCtx) {
      this.ambientGain.gain.cancelScheduledValues(this.audioCtx.currentTime);
      this.ambientGain.gain.linearRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.8);
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (this.whisperTimer) {
      clearTimeout(this.whisperTimer);
      this.whisperTimer = null;
    }
  }

  // Alterna áudio
  toggle() {
    if (this.isMuted) {
      this.start();
      return true;
    } else {
      this.pause();
      return false;
    }
  }

  // Som de revelação do pergaminho (jumpscare sutil cinematográfico)
  playRevealStinger() {
    this.init();
    if (this.isMuted || !this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;

      // Impacto sub-grave
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(28, now + 1.2);

      gain.gain.setValueAtTime(0.9, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);

      osc.connect(gain);
      gain.connect(this.effectsGain);
      osc.start(now);
      osc.stop(now + 1.7);

      // Shimmer misterioso de sino antigo
      const bellOsc = this.audioCtx.createOscillator();
      const bellGain = this.audioCtx.createGain();
      bellOsc.type = 'sine';
      bellOsc.frequency.setValueAtTime(440, now);
      bellOsc.frequency.linearRampToValueAtTime(436, now + 2.0);

      bellGain.gain.setValueAtTime(0.2, now);
      bellGain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

      bellOsc.connect(bellGain);
      bellGain.connect(this.effectsGain);
      bellOsc.start(now);
      bellOsc.stop(now + 2.3);
    } catch (e) {
      console.warn("Erro ao tocar stinger:", e);
    }
  }

  // Som de batida cardíaca
  playHeartbeat() {
    if (this.isMuted || !this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      const playThump = (time, vol, freq) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);
        osc.frequency.exponentialRampToValueAtTime(30, time + 0.18);
        gain.gain.setValueAtTime(vol, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.22);
        osc.connect(gain);
        gain.connect(this.effectsGain);
        osc.start(time);
        osc.stop(time + 0.25);
      };

      playThump(now, 0.6, 75);
      playThump(now + 0.25, 0.45, 65);
    } catch (e) {}
  }

  // Agendador de sussurros humanos
  scheduleNextWhisper() {
    if (this.whisperTimer) {
      clearTimeout(this.whisperTimer);
    }
    if (this.isMuted) return;

    const minSec = this.config.intervaloMinSussurrosSegundos || 12;
    const maxSec = this.config.intervaloMaxSussurrosSegundos || 25;
    const delayMs = (minSec + Math.random() * (maxSec - minSec)) * 1000;

    this.whisperTimer = setTimeout(() => {
      this.playWhisper();
    }, delayMs);
  }

  // Reproduz sussurro com Web Speech API com afinação e velocidade sombrias
  playWhisper(phraseOverride = null) {
    if (this.isMuted || this.isWhispering || !window.speechSynthesis) {
      return;
    }

    const phrases = this.config.frasesSussurros;
    if (!phrases || phrases.length === 0) return;

    const phrase = phraseOverride || phrases[Math.floor(Math.random() * phrases.length)];
    this.isWhispering = true;

    // Dispara pulso de coração sutil junto com o sussurro
    this.playHeartbeat();

    // Notifica a interface para exibir legenda fantasmagórica temporária
    window.dispatchEvent(new CustomEvent('halloween:whisper', { detail: { text: phrase } }));

    try {
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.lang = 'pt-BR';
      utterance.pitch = 0.55; // Tom grave e fantasmagórico
      utterance.rate = 0.78;  // Falar pausadamente como um sussurro
      utterance.volume = 0.55; // Volume moderado e inquietante

      // Tenta selecionar voz em português se disponível
      const voices = window.speechSynthesis.getVoices();
      const ptVoice = voices.find(v => v.lang.includes('pt-BR') || v.lang.includes('pt'));
      if (ptVoice) {
        utterance.voice = ptVoice;
      }

      utterance.onend = () => {
        this.isWhispering = false;
        this.scheduleNextWhisper();
      };

      utterance.onerror = () => {
        this.isWhispering = false;
        this.scheduleNextWhisper();
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      this.isWhispering = false;
      this.scheduleNextWhisper();
    }
  }
}

// Cria instância global
window.HorrorAudio = new HorrorAudioEngine();
