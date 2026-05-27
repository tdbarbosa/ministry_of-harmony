import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Eye, EyeOff, Radio, RefreshCw, AlertTriangle, Flame } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n';

const SPOKEN_WARNINGS: Record<string, string> = {
  en: "You are being deceived. What you hear is not peace, it is forced silence. Wake up.",
  pt: "Vocês estão sendo enganados. O que vocês ouvem não é a paz, é um silêncio forçado. Acordem.",
  es: "Están siendo engañados. Lo que escuchan no es paz, es un silencio forzado. Despierten."
};

interface AudioOptimizerProps {
  onAwakenUnlocked: (unlocked: boolean) => void;
  frequency: number;
  setFrequency: (freq: number) => void;
  isUnlocked: boolean;
  language: Language;
}

export default function AudioOptimizer({
  onAwakenUnlocked,
  frequency,
  setFrequency,
  isUnlocked,
  language,
}: AudioOptimizerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [compliance, setCompliance] = useState(85);
  const [rebellionPower, setRebellionPower] = useState(0);
  const [showSpectralData, setShowSpectralData] = useState(false);
  const [isAlerting, setIsAlerting] = useState(false);

  // Web Audio Context refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  
  // Oscillators and nodes
  const masterVolumeRef = useRef<GainNode | null>(null);
  const driftOscRef1 = useRef<OscillatorNode | null>(null);
  const driftOscRef2 = useRef<OscillatorNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);
  const heartbeatOscRef = useRef<OscillatorNode | null>(null);
  const pulseGainRef = useRef<GainNode | null>(null);
  const highGainRef = useRef<GainNode | null>(null);
  
  // Resistance synthesizer nodes
  const chordsOscsRef = useRef<OscillatorNode[]>([]);
  const chordsGainRef = useRef<GainNode | null>(null);
  
  // Analyser node for drawing waveform
  const analyserRef = useRef<AnalyserNode | null>(null);
  const waveformCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Spoken alarm tracking
  const lastSpokenTimeRef = useRef<number>(0);

  // Start / Init Web Audio
  const initAudio = () => {
    if (audioCtxRef.current) return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Master Gain Node
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.2, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterVolumeRef.current = masterGain;

      // Create Analyser for mapping sound visually
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      masterGain.connect(analyser);
      analyserRef.current = analyser;

      // 1. THE DRIFT HOVER DRONE (Dystopian oppression hum)
      // Detuned dual oscillators (low frequency baseline)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, ctx.currentTime); // A1 note
      
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(55.6, ctx.currentTime); // slightly detuned for deep heavy phasing

      const droneGain = ctx.createGain();
      droneGain.gain.setValueAtTime(0.55, ctx.currentTime);

      // Low pass filter to keep it heavy and muddy
      const lpFilter = ctx.createBiquadFilter();
      lpFilter.type = 'lowpass';
      lpFilter.frequency.setValueAtTime(140, ctx.currentTime);

      // LFO modulated filter cutoff to simulate unstable generator towers
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.2, ctx.currentTime); // very slow roll (0.2 Hz)
      lfoGain.gain.setValueAtTime(35, ctx.currentTime); // sweep filter up and down by 35Hz

      lfo.connect(lfoGain);
      lfoGain.connect(lpFilter.frequency);
      
      // Connections
      osc1.connect(droneGain);
      osc2.connect(droneGain);
      droneGain.connect(lpFilter);
      lpFilter.connect(masterGain);

      driftOscRef1.current = osc1;
      driftOscRef2.current = osc2;
      lfoRef.current = lfo;

      // 2. THE STABILIZING COGNITIVE HEARTBEAT (Low rhythmic pulsing)
      const hOsc = ctx.createOscillator();
      hOsc.type = 'sine';
      hOsc.frequency.setValueAtTime(45, ctx.currentTime);

      const hGain = ctx.createGain();
      hGain.gain.setValueAtTime(0.0, ctx.currentTime);

      hOsc.connect(hGain);
      hGain.connect(masterGain);

      heartbeatOscRef.current = hOsc;
      pulseGainRef.current = hGain;

      // 3. SECRETS HARMONICS - Resistance Golden chord node
      // Connect to a low-pass filter to keep notes warm, deep, and prevent any high pitched discomfort.
      const altarsFilter = ctx.createBiquadFilter();
      altarsFilter.type = 'lowpass';
      altarsFilter.frequency.setValueAtTime(320, ctx.currentTime); // Filter high frequencies, keeping our core sines warm

      const altarsGainNode = ctx.createGain();
      altarsGainNode.gain.setValueAtTime(0.0, ctx.currentTime);
      
      altarsFilter.connect(masterGain);
      altarsGainNode.connect(altarsFilter);
      chordsGainRef.current = altarsGainNode;

      // Start core generators
      osc1.start();
      osc2.start();
      lfo.start();
      hOsc.start();

      // Trigger heartbeat sequence (looping envelope)
      triggerHeartbeatLoop(ctx, hGain);

      setIsPlaying(true);
    } catch (err) {
      console.error('Failed to initialize AudioContext due to browser permissions:', err);
    }
  };

  // Heartbeat periodic trigger
  const heartbeatTimerRef = useRef<number | null>(null);
  const triggerHeartbeatLoop = (ctx: AudioContext, gainNode: GainNode) => {
    let beatTime = ctx.currentTime;
    
    const playBeat = () => {
      // Periodic trigger simulating human heartbeat keeping baseline neural state
      const now = ctx.currentTime;
      // Fade in first swell
      gainNode.gain.cancelScheduledValues(now);
      gainNode.gain.setValueAtTime(0.0, now);
      gainNode.gain.linearRampToValueAtTime(0.4, now + 0.08);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      
      // Second swell (double beat: lub-dub)
      const secondBeat = now + 0.32;
      gainNode.gain.linearRampToValueAtTime(0.32, secondBeat);
      gainNode.gain.exponentialRampToValueAtTime(0.001, secondBeat + 0.3);

      // loop every 1.5 seconds (representing ~40-60 BPM heavily medicated baseline)
      heartbeatTimerRef.current = window.setTimeout(playBeat, 1600);
    };

    playBeat();
  };

  // Destructure shutdown on component unmount
  useEffect(() => {
    return () => {
      if (heartbeatTimerRef.current) {
        clearTimeout(heartbeatTimerRef.current);
      }
      stopAllAudio();
    };
  }, []);

  const stopAllAudio = () => {
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      driftOscRef1.current?.stop();
      driftOscRef2.current?.stop();
      lfoRef.current?.stop();
      heartbeatOscRef.current?.stop();
      chordsOscsRef.current.forEach(o => {
        try { o.stop(); } catch(e) {}
      });
      chordsOscsRef.current = [];
      audioCtxRef.current?.close();
    } catch(e) {}
    audioCtxRef.current = null;
    setIsPlaying(false);
  };

  const handleToggleSound = () => {
    if (isPlaying) {
      stopAllAudio();
    } else {
      initAudio();
    }
  };

  // Handle live changes to frequency dial
  useEffect(() => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;

    // Is the frequency sweet spot hit? (Between 430Hz and 455Hz, targeting 444Hz, or 770-785Hz, targeting 777Hz)
    const distanceTo444 = Math.abs(frequency - 444);
    const distanceTo777 = Math.abs(frequency - 777);
    const isClose = distanceTo444 < 12 || distanceTo777 < 12;

    // Reacting to sweet spot
    if (isClose && isPlaying) {
      setIsAlerting(true);
      // Sweeping power calculations
      const power = isClose ? (12 - Math.min(distanceTo444, distanceTo777)) / 12 : 0;
      setRebellionPower(power);
      
      onAwakenUnlocked(true);

      // Speak subtle, eerie alert message ("Vocês estão sendo enganados...") to interest the listener
      const now = Date.now();
      // Only speak every 14 seconds to intrigue the listener without being spammy
      if (now - lastSpokenTimeRef.current > 14000) {
        lastSpokenTimeRef.current = now;
        try {
          if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const message = SPOKEN_WARNINGS[language] || SPOKEN_WARNINGS.en;
            const utterance = new SpeechSynthesisUtterance(message);
            utterance.rate = 0.85; // Slow down for chilling/mechanical dystopian feeling
            utterance.pitch = language === 'pt' ? 0.75 : 0.65; // Eerie deep tone
            utterance.volume = 0.95;
            
            if (language === 'pt') {
              utterance.lang = 'pt-BR';
            } else if (language === 'es') {
              utterance.lang = 'es-ES';
            } else {
              utterance.lang = 'en-US';
            }
            window.speechSynthesis.speak(utterance);
          }
        } catch (e) {
          console.error("Speech synthesis failed", e);
        }
      }

      // Play secret chord sound layers (freedom synth sweeps) in real-time - much quieter and low-pass filtered
      if (chordsGainRef.current) {
        const gainVal = 0.18 * power; // Extremely warm, subtle and pleasant volume setting
        chordsGainRef.current.gain.setTargetAtTime(gainVal, ctx.currentTime, 0.15);
      }

      // Spawn synth notes representing choral/ambient church organ elements under St Leo
      if (chordsOscsRef.current.length === 0) {
        // Deep warm harmonies: undertone, sub-bass, root, and sweet perfect fourth
        const base = frequency;
        const freqs = [base / 2, base / 4, base, base * 0.75];

        chordsOscsRef.current = freqs.map((f, index) => {
          const osc = ctx.createOscillator();
          osc.type = 'sine'; // Only pure, non-screechy sine wave
          osc.frequency.setValueAtTime(f, ctx.currentTime);
          
          // Gentle detuning chorus for warmth
          const detune = ctx.createOscillator();
          const detuneGain = ctx.createGain();
          detune.frequency.setValueAtTime(0.4 + index * 0.05, ctx.currentTime);
          detuneGain.gain.setValueAtTime(1.5 + index * 0.5, ctx.currentTime);
          
          detune.connect(detuneGain);
          detuneGain.connect(osc.frequency);
          
          osc.connect(chordsGainRef.current!);
          detune.start();
          osc.start();
          return osc;
        });
      } else {
        // Live modulate frequencies based on slide drag
        const base = frequency;
        const freqs = [base / 2, base / 4, base, base * 0.75];
        chordsOscsRef.current.forEach((osc, idx) => {
          if (osc) {
            osc.frequency.setTargetAtTime(freqs[idx], ctx.currentTime, 0.08);
          }
        });
      }

      // Slightly decrease the oppressive drone to symbolize light winning
      if (driftOscRef1.current && driftOscRef2.current) {
        const remainingDrone = 0.55 * (1 - power * 0.85);
        driftOscRef1.current.frequency.setTargetAtTime(55 * (1 + power * 0.15), ctx.currentTime, 0.2);
        driftOscRef2.current.frequency.setTargetAtTime(55.6 * (1 + power * 0.15), ctx.currentTime, 0.2);
      }
    } else {
      setIsAlerting(false);
      setRebellionPower(0);
      onAwakenUnlocked(false);

      // Instantly cancel speaking when dial is detuned or paused
      try {
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
      } catch (e) {}

      // Silence the golden chord synthesizer
      if (chordsGainRef.current) {
        chordsGainRef.current.gain.setTargetAtTime(0.0, ctx.currentTime, 0.25);
      }

      // Reset oppressive drone frequency back to heavy 55Hz
      if (driftOscRef1.current && driftOscRef2.current) {
        driftOscRef1.current.frequency.setTargetAtTime(55, ctx.currentTime, 0.3);
        driftOscRef2.current.frequency.setTargetAtTime(55.6, ctx.currentTime, 0.3);
      }

      // Stop and prune the chord oscillators safely
      if (chordsOscsRef.current.length > 0) {
        const oscsToStop = chordsOscsRef.current;
        chordsOscsRef.current = [];
        oscsToStop.forEach(o => {
          try { o.stop(ctx.currentTime + 0.3); } catch(e) {}
        });
      }
    }
  }, [frequency, isPlaying, onAwakenUnlocked, language]);

  // Adjust overall master gain based on general calibrator sliders (compliance slider)
  useEffect(() => {
    if (!masterVolumeRef.current || !audioCtxRef.current) return;
    // higher compliance = flatter dampening
    const baseGain = 0.2 * (compliance / 100);
    masterVolumeRef.current.gain.setTargetAtTime(baseGain, audioCtxRef.current.currentTime, 0.1);
  }, [compliance]);

  // Waveform Drawing loop using requestAnimationFrame
  useEffect(() => {
    let animId: number;
    const canvas = waveformCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = canvas.parentElement?.clientWidth || 300);
    let h = (canvas.height = 70);

    const bufferLength = analyserRef.current?.frequencyBinCount || 128;
    const dataArray = new Uint8Array(bufferLength);

    const drawWave = () => {
      ctx.clearRect(0, 0, w, h);

      // Draw background design
      ctx.strokeStyle = '#161622';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();

      if (analyserRef.current && isPlaying) {
        analyserRef.current.getByteTimeDomainData(dataArray);

        // Map line aesthetics
        ctx.lineWidth = isAlerting ? 2.5 : 1.8;
        if (isAlerting) {
          // Unstable glitching golden waveform
          ctx.strokeStyle = `rgba(195, 155, 52, ${0.4 + Math.random() * 0.6})`;
          ctx.beginPath();
          const sliceWidth = w / bufferLength;
          let x = 0;

          for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0;
            // Introduce explosive glitching offsets
            const glitchOffset = isAlerting ? (Math.random() - 0.5) * rebellionPower * 14 : 0;
            const y = (v * h) / 2 + glitchOffset;

            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
            x += sliceWidth;
          }
          ctx.stroke();
        } else {
          // Pure, predictable flatline red wave (Drift Compliance Wave)
          ctx.strokeStyle = 'rgba(139, 0, 0, 0.7)';
          ctx.beginPath();
          const sliceWidth = w / bufferLength;
          let x = 0;

          for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0;
            const y = (v * h) / 2;

            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
            x += sliceWidth;
          }
          ctx.stroke();
        }
      } else {
        // Draw flat line when silent
        ctx.strokeStyle = '#3a0d0d';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(0, h / 2);
        for (let i = 0; i < w; i += 8) {
          ctx.lineTo(i, h / 2 + (Math.random() - 0.5) * 0.8);
        }
        ctx.stroke();
      }

      animId = requestAnimationFrame(drawWave);
    };

    drawWave();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, isAlerting, rebellionPower]);

  const t = TRANSLATIONS[language];

  return (
    <div id="audio-module" className="relative p-5 md:p-6 bg-brand-slate/90 backdrop-blur-md rounded-lg border border-brand-dark-brick/40 box-glow-red select-none overflow-hidden">
      
      {/* Decorative metal corner brackets */}
      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-brand-accent-red" />
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-brand-accent-red" />
      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-brand-accent-red" />
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-brand-accent-red" />

      {/* Cyberpunk branding marker */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Radio className={`w-4 h-4 ${isAlerting ? 'text-brand-gold animate-pulse' : 'text-brand-accent-red animate-ping'}`} />
          <span className="font-mono text-[9px] tracking-[0.25em] text-gray-500 uppercase">
            {isAlerting ? t.optimizer.titleBreach : t.optimizer.titleSecure}
          </span>
        </div>
        <button
          onClick={handleToggleSound}
          id="btn-gate-audio"
          className={`flex items-center gap-2 px-3 py-1 font-mono text-[10px] tracking-wider rounded border transition-all duration-300 cursor-pointer ${
            isPlaying
              ? 'bg-brand-dark-brick/20 border-brand-accent-red text-brand-accent-red hover:bg-brand-accent-red hover:text-white'
              : 'bg-brand-accent-red/20 border-brand-accent-red text-white hover:bg-brand-accent-red'
          }`}
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-3.5 h-3.5" />
              <span>{t.optimizer.buttonActive}</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              <span>{t.optimizer.buttonInit}</span>
            </>
          )}
        </button>
      </div>

      {/* Warning Alert Banner */}
      {isAlerting && (
        <div className="mb-3 px-3 py-1.5 bg-brand-gold/10 border border-brand-gold/30 rounded flex items-center gap-2 animate-pulse">
          <AlertTriangle className="w-4 h-4 text-brand-gold shrink-0" />
          <p className="font-mono text-[10px] text-brand-gold leading-tight">
            {t.optimizer.warningBanner} [F={frequency}HZ]
          </p>
        </div>
      )}

      {/* Waveform scope display visualizer */}
      <div className="mb-4 bg-black/60 rounded border border-brand-dark-brick/10 overflow-hidden relative">
        <div className="absolute top-1 left-2 flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full ${isPlaying ? (isAlerting ? 'bg-brand-gold animate-ping' : 'bg-brand-accent-red animate-pulse') : 'bg-gray-700'}`} />
          <span className="font-mono text-[8px] text-gray-500 tracking-wider font-light">{t.optimizer.scopeLabel} {frequency}Hz</span>
        </div>
        <canvas ref={waveformCanvasRef} className="w-full h-[70px] block" />
      </div>

      {!isPlaying ? (
        <div className="py-4 text-center border border-dashed border-brand-dark-brick/10 rounded flex flex-col items-center justify-center gap-2">
          <p className="font-sans text-xs text-gray-400">{t.optimizer.offlineLabel}</p>
          <button 
            onClick={initAudio}
            className="font-mono text-[10px] text-brand-gold underline hover:text-brand-gold-glow cursor-pointer transition-colors"
          >
            {t.optimizer.offlineButton}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          
          {/* Fictional knobs presented as sleek geometric sliders */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-sans text-[11px] text-gray-400 tracking-wide uppercase">{t.optimizer.slider1Title}</span>
                <span className={`font-mono text-xs font-semibold ${isAlerting ? 'text-brand-gold text-glow-gold' : 'text-brand-accent-red'}`}>
                  {frequency} Hz
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="1000"
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
                className="w-full h-1 bg-brand-charcoal rounded-lg appearance-none cursor-pointer accent-brand-accent-red border border-brand-dark-brick/20 slider-thumb:w-4 slider-thumb:h-4 focus:outline-none focus:ring-1 focus:ring-brand-accent-red"
              />
              <div className="flex justify-between font-mono text-[8px] text-gray-500 mt-1">
                <span>{t.optimizer.slider1Left}</span>
                <span className={`transition-all ${isAlerting ? 'text-brand-gold font-bold scale-110' : ''}`}>{t.optimizer.slider1Middle}</span>
                <span>{t.optimizer.slider1Right}</span>
                <span>{t.optimizer.slider1Max}</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-sans text-[11px] text-gray-400 tracking-wide uppercase">{t.optimizer.slider2Title}</span>
                <span className="font-mono text-xs text-gray-300">{compliance}% {t.optimizer.slider2State}</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={compliance}
                onChange={(e) => setCompliance(Number(e.target.value))}
                className="w-full h-1 bg-brand-charcoal rounded-lg appearance-none cursor-pointer accent-brand-accent-red border border-brand-dark-brick/20 focus:outline-none"
              />
              <div className="flex justify-between font-mono text-[8px] text-gray-500 mt-1">
                <span>{t.optimizer.slider2Left}</span>
                <span>{t.optimizer.slider2Middle}</span>
                <span>{t.optimizer.slider2Right}</span>
              </div>
            </div>
          </div>

          {/* Golden sweet spot indicator helper */}
          {rebellionPower > 0 && (
            <div className="p-3 bg-brand-gold/10 border border-brand-gold/20 rounded font-mono text-[10px] text-gray-300 space-y-1">
              <div className="flex items-center gap-1.5 text-brand-gold font-bold">
                <Flame className="w-3.5 h-3.5 animate-bounce" />
                <span>{t.optimizer.sweetSpotTitle}</span>
              </div>
              <p className="leading-relaxed">
                {t.optimizer.sweetSpotDesc}
              </p>
              <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden mt-2">
                <div 
                  className="bg-brand-gold h-full rounded-full transition-all duration-100 ease-out" 
                  style={{ width: `${rebellionPower * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Extra metadata readout panel */}
          <div className="pt-3 border-t border-brand-dark-brick/20 flex gap-4 justify-between items-center text-[10px] font-mono text-gray-500">
            <span className="flex items-center gap-1 text-[9px]">
              <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-emerald-500' : 'bg-red-500'} inline-block`} />
              {t.optimizer.devicesCount}
            </span>
            <span className="text-[9px]">{t.optimizer.coordinatesLabel} (33.45, -112.07)</span>
          </div>

        </div>
      )}
    </div>
  );
}
