import { useState, useEffect, useRef, DragEvent, ChangeEvent } from 'react';
import { 
  Flame, X, Play, Pause, AlertTriangle, Upload, 
  Terminal, Music, Sparkles, CheckCircle, Radio, FileAudio, RotateCcw
} from 'lucide-react';
import { Language, TRANSLATIONS, LOCALIZED_SONG } from '../i18n';

interface BreachIntrusionModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export default function BreachIntrusionModal({ isOpen, onClose, language }: BreachIntrusionModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLyricIndex, setActiveLyricIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hackLevel, setHackLevel] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number | null>(null);
  const synthIntervalRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const synthOscsRef = useRef<OscillatorNode[]>([]);
  const synthGainRef = useRef<GainNode | null>(null);

  const t = TRANSLATIONS[language];
  const song = LOCALIZED_SONG[language];

  // Dynamic system invasion log generator
  useEffect(() => {
    if (!isOpen) return;

    setHackLevel(0);
    setLogs([]);
    setIsPlaying(false);
    setProgress(0);

    const initialLogs = language === 'pt' ? [
      '⚡ INICIANDO PROTOCOLO DE CONEXÃO REBELDE...',
      '📡 CALCULANDO PONTO DE RESSONÂNCIA DO SETOR 09 [444Hz]',
      '🔥 ALINHAMENTO DAS CAPELAS DE PEDRA ALCANÇADO',
      '🚨 BURGULANDO DEFESAS DO MINISTÉRIO DA HARMONIA...',
    ] : language === 'es' ? [
      '⚡ INICIANDO PROTOCOLO DE CONEXIÓN REBELDE...',
      '📡 CALCULANDO PUNTO DE RESONANCIA DEL SECTOR 09 [444Hz]',
      '🔥 ALINEACIÓN DE LAS CAPILLAS DE PIEDRA CONFIRMADO',
      '🚨 ATRAVESANDO DEFENSAS DEL MINISTERIO DE LA ARMONÍA...',
    ] : [
      '⚡ INITIALIZING REBEL EMISSION SYSTEM SPLICER...',
      '📡 LOCALIZING SECTOR 09 STONE SANCTUARY RESONANCE [444Hz]',
      '🔥 ANCIENT SANDSTONE ACOUSTIC ALIGNMENT VERIFIED',
      '🚨 BURSTING THROUGH MINISTRY OF HARMONY STATIC TRANSMITTERS...',
    ];

    let currentLogIdx = 0;
    const logInterval = setInterval(() => {
      if (currentLogIdx < initialLogs.length) {
        setLogs(prev => [...prev, initialLogs[currentLogIdx]]);
        setHackLevel(prev => Math.min(prev + 25, 100));
        currentLogIdx++;
      } else {
        clearInterval(logInterval);
        // Add final alert
        const finalMsg = language === 'pt'
          ? '🔑 PROTOCOLO SOBREPOSTO! COGNICÃO COGNITIVA: ANULADA. ÁUDIO DO ARQUIVO PRONTO.'
          : language === 'es' ? '🔑 PROTOCOLO COMPROMETIDO. CONTROL COGNITIVO: ANULADO. ÁUDIO COMPLETO.'
          : '🔑 PROTOCOLS EXTRANEOUS APPROVED! COGNITIVE BASE OVERRIDDEN! RESISTANCE AUDIO DOCKED.';
        setLogs(prev => [...prev, finalMsg]);
      }
    }, 700);

    // Auto-launch gorgeous procedural synthesizer bypass so user hears track instantly on launch
    const autoSynthTimer = setTimeout(() => {
      handleSynthPlay();
    }, 1200);

    return () => {
      clearInterval(logInterval);
      clearTimeout(autoSynthTimer);
    };
  }, [isOpen, language]);

  // Audio elements effects
  useEffect(() => {
    if (audioFile) {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      const url = URL.createObjectURL(audioFile);
      setAudioUrl(url);
      setIsPlaying(false);
      setProgress(0);
      setActiveLyricIndex(0);
      
      const fileLoadedMsg = language === 'pt'
        ? `🎵 NOVO TRANSMISSOR MONTADO: ${audioFile.name} CARREGADO COM SUCESSO!`
        : language === 'es' ? `🎵 TRANSMISOR INDUCTIVO MONTADO: ${audioFile.name} CARGADO!`
        : `🎵 TRANSMISSION ATTACHED: ${audioFile.name} SUCCESSFULLY MOUNTED!`;
      setLogs(prev => [...prev, fileLoadedMsg]);
    }
  }, [audioFile]);

  // Handle play/pause
  const handleTogglePlay = () => {
    if (audioUrl) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        // Stop synth if it's playing
        stopSynth();
        
        audioRef.current?.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.error("Audio playback error:", err);
          // Auto-fallback to synth if audio fails
          handleSynthPlay();
        });
      }
    } else {
      // No MP3 uploaded, toggle a gorgeous synthesizer representation
      if (isSynthesizing) {
        stopSynth();
      } else {
        handleSynthPlay();
      }
    }
  };

  // Programmatic Synth Fallback (Web Audio API) playing Christian rock progressions
  const handleSynthPlay = () => {
    try {
      if (!audioContextRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioContextClass();
      }
      const ctx = audioContextRef.current;
      
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.18, ctx.currentTime);
      masterGain.connect(ctx.destination);
      synthGainRef.current = masterGain;

      const baseFreq = 444; // Sacred rebellion node
      // Epic Rock chords (IV - I - V - vi progression: F#m, C#m, G#m, A-ish or D, A, E, F#m)
      const progression = [
        [baseFreq, baseFreq * 1.25, baseFreq * 1.5], // Chord 1
        [baseFreq * 0.75, baseFreq, baseFreq * 1.125], // Chord 2
        [baseFreq * 0.88, baseFreq * 1.1, baseFreq * 1.33], // Chord 3
        [baseFreq * 0.67, baseFreq * 0.83, baseFreq] // Chord 4
      ];

      let chordIndex = 0;
      setIsSynthesizing(true);
      setIsPlaying(true);

      const playChord = () => {
        // Stop current oscillators
        synthOscsRef.current.forEach(osc => {
          try { osc.stop(); } catch(e) {}
        });
        synthOscsRef.current = [];

        const chord = progression[chordIndex];
        synthOscsRef.current = chord.map((freq, idx) => {
          const osc = ctx.createOscillator();
          osc.type = idx === 0 ? 'sine' : idx === 1 ? 'triangle' : 'sawtooth';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Tube Distortion simulation filter
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(900, ctx.currentTime);

          // Add feedback vibrato
          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          lfo.frequency.setValueAtTime(4.5, ctx.currentTime);
          lfoGain.gain.setValueAtTime(12, ctx.currentTime);
          lfo.connect(lfoGain);
          lfoGain.connect(osc.frequency);

          osc.connect(filter);
          filter.connect(masterGain);
          
          lfo.start();
          osc.start();
          return osc;
        });

        // Advance lyric index and progression index
        setActiveLyricIndex(prev => (prev + 1) % song.lyrics.length);
        chordIndex = (chordIndex + 1) % progression.length;
      };

      playChord();
      const intervalId = window.setInterval(playChord, 3500);
      synthIntervalRef.current = intervalId;

    } catch (err) {
      console.error("Synthesizer startup failed:", err);
    }
  };

  const stopSynth = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    synthOscsRef.current.forEach(osc => {
      try { osc.stop(); } catch(e) {}
    });
    synthOscsRef.current = [];
    setIsSynthesizing(false);
    setIsPlaying(false);
  };

  // Audio events track progress
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration || 1;
      const pct = (current / total) * 100;
      setProgress(pct);

      // Track lyric index based on percentage
      const lines = song.lyrics.length;
      const calculatedIndex = Math.min(Math.floor((current / total) * lines), lines - 1);
      setActiveLyricIndex(calculatedIndex);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setActiveLyricIndex(0);
  };

  // Drag and drop handlers
  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("audio/")) {
        setAudioFile(file);
      }
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("audio/")) {
        setAudioFile(file);
      }
    }
  };

  // Responsive visual oscillations on canvas
  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let h = (canvas.height = 100);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Design grid lines
      ctx.strokeStyle = '#220b0b';
      ctx.lineWidth = 1;
      for (let i = 0; i < w; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, h);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.strokeStyle = 'rgba(139, 0, 0, 0.4)';
      ctx.stroke();

      if (isPlaying) {
        // Raw electrical signal rendering with lightning spikes
        ctx.beginPath();
        const sliceWidth = w / 60;
        let x = 0;

        for (let i = 0; i < 60; i++) {
          const mod = isSynthesizing ? 22 : 35;
          const noise = (Math.random() - 0.5) * mod * (Math.sin(i * 0.1) + 0.5);
          const y = h / 2 + noise;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          x += sliceWidth;
        }

        ctx.strokeStyle = '#eab308'; // Pure Gold wave
        ctx.lineWidth = 2;
        ctx.shadowColor = '#eab308';
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.shadowBlur = 0; // reset
      } else {
        // Passive alert humming line
        ctx.beginPath();
        ctx.moveTo(0, h / 2);
        for (let i = 0; i < w; i += 10) {
          ctx.lineTo(i, h / 2 + (Math.random() - 0.5) * 2);
        }
        ctx.strokeStyle = '#dc2626'; // Deep Red passive line
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, isSynthesizing]);

  // Clean-up refs on destroy
  useEffect(() => {
    return () => {
      stopSynth();
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-6 select-none animate-[fadeIn_0.5s_ease-out]">
      <div className="max-w-4xl w-full bg-brand-charcoal border-2 border-brand-accent-red/80 rounded-xl box-glow-red overflow-hidden relative flex flex-col h-[90vh] md:h-initial">
        
        {/* Decorative alert headers flashing */}
        <div className="bg-brand-accent-red/25 border-b-2 border-brand-accent-red flex justify-between items-center px-4 py-2.5 bg-gradient-to-r from-red-950/40 via-transparent to-red-950/40">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-brand-accent-red animate-pulse" />
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-white uppercase">
              {language === 'pt' ? '!!! INVASÃO DE FREQUÊNCIA DETECTADA !!!' : language === 'es' ? '!!! INTRUSIÓN DE FRECUENCIA DETECTADA !!!' : '!!! CRITICAL BREACH OVERRIDE ATTAINED !!!'}
            </span>
          </div>
          <button 
            onClick={() => {
              stopSynth();
              if (audioRef.current) audioRef.current.pause();
              onClose();
            }}
            className="p-1 rounded bg-red-950/40 border border-brand-accent-red/30 hover:border-brand-accent-red text-rose-500 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Core Layout Split */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-y-auto">
          
          {/* Left hacker terminal console controls */}
          <div className="md:col-span-5 p-5 border-r border-zinc-900 bg-black/50 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex gap-2 items-center">
                <Terminal className="w-4 h-4 text-brand-gold" />
                <span className="font-mono text-[10px] uppercase text-zinc-500 tracking-wider">
                  SYSTEM OVERFLOW INTRUSION
                </span>
                <span className="animate-ping w-1.5 h-1.5 rounded-full bg-brand-gold ml-auto" />
              </div>

              {/* Hack status progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-[9px] text-zinc-400">
                  <span>{language === 'pt' ? 'SULFURAMENTO SENSORIAL' : language === 'es' ? 'SUPRESIÓN SENSORIAL' : 'COGNITION DISRUPTOR'}</span>
                  <span className="text-brand-gold font-bold">{hackLevel}%</span>
                </div>
                <div className="w-full bg-zinc-950 border border-zinc-900 rounded-full h-2 overflow-hidden relative">
                  <div 
                    className="bg-brand-gold h-full transition-all duration-1000 ease-out"
                    style={{ width: `${hackLevel}%` }}
                  />
                </div>
              </div>

              {/* Console event stream */}
              <div className="p-3 bg-zinc-950 border border-zinc-900 rounded font-mono text-[9px] space-y-1.5 h-[140px] overflow-y-auto text-emerald-500">
                {logs.map((log, listIdx) => (
                  <div key={listIdx} className="leading-normal whitespace-pre-wrap break-all border-b border-zinc-950 pb-1">
                    <span className="text-zinc-600 font-light mr-1">[{new Date().toLocaleTimeString()}]</span>
                    {log}
                  </div>
                ))}
              </div>
            </div>

            {/* Drag and Drop Zone / Audio file selection - Completely Optional now */}
            <div 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`p-4 rounded-lg border border-dashed flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 relative ${
                dragActive 
                  ? 'border-brand-gold bg-brand-gold/10' 
                  : audioFile 
                    ? 'border-emerald-500/50 bg-emerald-950/10' 
                    : 'border-brand-dark-brick/40 hover:border-brand-gold/40 hover:bg-zinc-900/10'
              }`}
            >
              <input 
                id="file-mp3-upload"
                type="type"
                accept="audio/*"
                onChange={handleFileSelect}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              
              {audioFile ? (
                <div className="space-y-1">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto animate-bounce" />
                  <p className="font-mono text-[9px] text-white font-bold leading-tight">
                    {audioFile.name}
                  </p>
                  <p className="font-sans text-[7.5px] text-zinc-500">
                    {(audioFile.size / (1024 * 1024)).toFixed(2)} MB // {language === 'pt' ? 'Pista Activa' : language === 'es' ? 'Audio Activo' : 'Override Loaded'}
                  </p>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setAudioFile(null);
                      setAudioUrl(null);
                      if (audioRef.current) audioRef.current.src = "";
                    }}
                    className="font-mono text-[8px] text-red-500 uppercase underline mt-1 hover:text-red-400 block mx-auto"
                  >
                    {language === 'pt' ? 'Remover Arquivo' : language === 'es' ? 'Quitar Archivo' : 'Remove Track'}
                  </button>
                </div>
              ) : (
                <div className="space-y-1 p-1">
                  <Upload className="w-4 h-4 text-brand-gold/70 mx-auto animate-pulse" />
                  <p className="font-sans text-[9px] text-zinc-300 font-semibold tracking-wider uppercase">
                    {language === 'pt' ? 'SINTONIZADOR SECUNDÁRIO (OPCIONAL)' : language === 'es' ? 'SINTONIZADOR SECUNDARIO (OPCIONAL)' : 'CUSTOM FILE INJECTOR (OPTIONAL)'}
                  </p>
                  <span className="font-mono text-[7.5px] text-zinc-500 leading-tight block">
                    {language === 'pt' ? 'Arraste um MP3 herético próprio para usar no player.' : language === 'es' ? 'Arrastra un MP3 propio para reproducir aquí.' : 'Drag custom MP3 here to override system stream.'}
                  </span>
                </div>
              )}
            </div>

            {/* Audio tag for playbacks */}
            {audioUrl && (
              <audio 
                ref={audioRef}
                src={audioUrl}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleAudioEnded}
              />
            )}
          </div>

          {/* Right lyrics, active visual, action node */}
          <div className="md:col-span-7 p-5 md:p-6 flex flex-col justify-between space-y-5 bg-gradient-to-b from-brand-charcoal to-[#0d0909]">
            
            {/* Waveform Visualization Canvas */}
            <div className="bg-black/60 rounded border border-brand-dark-brick/10 relative overflow-hidden p-3 select-none">
              <div className="absolute top-1.5 left-2 flex items-center gap-1.5 z-10">
                <Radio className={`w-3 h-3 ${isPlaying ? 'text-brand-gold animate-bounce' : 'text-zinc-600'}`} />
                <span className="font-mono text-[8px] text-zinc-500 font-light">
                  {isSynthesizing ? 'SYNTH SIGNAL GENERATION: 444HZ' : isPlaying ? 'PLAYING BROKEN_ALTARS.MP3 SIGNAL' : 'SIGNAL IDLE // OVERRIDE COMPROMISE READY'}
                </span>
              </div>
              <canvas ref={canvasRef} className="w-full h-[65px] block mt-1" />
            </div>

            {/* Scrolling Lyrics Sheets */}
            <div className="space-y-2 flex-1 flex flex-col justify-between">
              <div className="flex items-center gap-1 border-b border-zinc-900 pb-2">
                <Flame className="w-4 h-4 text-brand-gold animate-bounce" />
                <h4 className="font-serif text-sm font-bold text-brand-gold uppercase tracking-wider text-glow-gold">
                  {song.title} <span className="font-mono text-[9px] text-zinc-500 font-normal">({song.subtitle})</span>
                </h4>
              </div>

              {/* Static overlay gradient for fancy scrolling tape feel */}
              <div className="relative h-[200px] bg-black/35 rounded border border-zinc-950 p-3 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 space-y-1">
                {song.lyrics.map((line, lIdx) => {
                  const isActive = activeLyricIndex === lIdx;
                  const isEmpty = line.trim() === '';
                  const isSection = line.startsWith('[');

                  if (isEmpty) return <div key={lIdx} className="h-1.5" />;
                  if (isSection) return (
                    <div key={lIdx} className="font-mono text-[8px] text-brand-gold/60 font-bold uppercase tracking-widest mt-2">{line}</div>
                  );

                  return (
                    <p 
                      key={lIdx} 
                      className={`text-xs leading-relaxed transition-all duration-300 ${
                        isActive 
                          ? 'text-white font-bold text-glow-gold pl-2 border-l border-brand-gold bg-brand-gold/10 py-1 rounded-r' 
                          : 'text-zinc-400 font-light hover:text-white'
                      }`}
                    >
                      {line}
                    </p>
                  );
                })}
              </div>
            </div>

            {/* Core Intrusion Interaction Deck */}
            <div className="pt-3 border-t border-zinc-900 flex justify-between items-center gap-3">
              <button
                onClick={handleTogglePlay}
                className={`py-3 px-6 rounded-lg font-mono text-xs tracking-widest uppercase font-bold flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 shrink-0 ${
                  isPlaying 
                    ? 'bg-zinc-950 hover:bg-zinc-900 text-brand-gold border border-brand-gold/50 box-glow-gold'
                    : 'bg-brand-gold text-black hover:bg-brand-gold-glow border border-brand-gold'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>{language === 'pt' ? 'PAUSAR TRANSMISSÃO' : language === 'es' ? 'PAUSAR EMISIÓN' : 'PAUSE TRANSMISSION'}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-black text-black" />
                    <span>{language === 'pt' ? 'INICIAR TRANSMISSÃO REBELDE' : language === 'es' ? 'INICIAR EMISIÓN REBELDE' : 'IGNITE REBEL TRANSMISSION'}</span>
                  </>
                )}
              </button>

              <div className="font-mono text-[9px] text-zinc-550 leading-tight">
                {audioFile ? (
                  <p className="text-emerald-400 font-bold">
                    [SOURCE: MP3 FILE DETECTED]
                  </p>
                ) : (
                  <p className="text-yellow-500">
                    [FALLBACK: SYSTEM AUDIO SYNTH]
                  </p>
                )}
                <p className="text-zinc-600 mt-0.5">
                  COORD: 33° 27' 00" N // 112° 04' 12" O
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Hack footer exit */}
        <div className="bg-zinc-950 border-t border-zinc-900/60 p-3 text-center flex justify-between items-center font-mono text-[8px] text-zinc-650">
          <span>COGNITIVE OVERRIDE // BAND: AUDIOSFREE // TRANSMISSION DETUNER LOCK v4.95</span>
          <button 
            onClick={() => {
              stopSynth();
              if (audioRef.current) audioRef.current.pause();
              onClose();
            }}
            className="text-brand-accent-red underline hover:text-white cursor-pointer"
          >
            {language === 'pt' ? '[SAIR DA SOBREPOSIÇÃO SENSORIAL]' : language === 'es' ? '[SALIR DE LA SOBREPOSICIÓN SENSORIAL]' : '[EXIT TERMINAL SENSORY CHANNEL]'}
          </button>
        </div>

      </div>
    </div>
  );
}
