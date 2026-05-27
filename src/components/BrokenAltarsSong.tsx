import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Music, Flame, MapPin, Eye, Radio, Sparkles } from 'lucide-react';
import { Language, TRANSLATIONS, LOCALIZED_SONG } from '../i18n';
// @ts-ignore
import audiosFreeLogo from '../assets/images/audiosfree_logo_1779824392501.png';

interface BrokenAltarsSongProps {
  onPlayTrigger: () => void;
  isUnlocked: boolean;
  language: Language;
}

export default function BrokenAltarsSong({ onPlayTrigger, isUnlocked, language }: BrokenAltarsSongProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeVerse, setActiveVerse] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const song = LOCALIZED_SONG[language];
  const t = TRANSLATIONS[language];

  // Auto-advance simulated song playing for atmospheric visual interest
  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setActiveVerse((prev) => (prev + 1) % song.lyrics.length);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, song]);

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
    onPlayTrigger();
  };

  const handleLineClick = (index: number) => {
    setActiveVerse(index);
    onPlayTrigger();
  };

  return (
    <div className={`relative p-5 md:p-8 rounded-xl border transition-all duration-700 overflow-hidden ${
      isUnlocked 
        ? 'bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border-brand-gold/60 bg-opacity-95 box-glow-gold'
        : 'bg-[#0f0a0a]/90 border-brand-dark-brick/40 box-glow-red opacity-80'
    }`}>
      
      {/* Background sacred circle motif watermark */}
      <div className={`absolute -right-16 -bottom-16 w-64 h-64 rounded-full border pointer-events-none transition-all duration-1000 ${
        isUnlocked ? 'border-brand-gold/10 scale-110' : 'border-brand-accent-red/5 scale-95'
      }`} />
      <div className={`absolute -right-24 -bottom-24 w-80 h-80 rounded-full border border-dashed pointer-events-none transition-all duration-1000 ${
        isUnlocked ? 'border-brand-gold/5 scale-120 rotate-12' : 'border-brand-accent-red/3 scale-100'
      }`} />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* Left column: Embedded cassette player look */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-[8px] font-mono tracking-widest uppercase transition-all duration-500 ${
                isUnlocked 
                  ? 'bg-brand-gold/20 text-brand-gold border border-brand-gold/40' 
                  : 'bg-brand-accent-red/20 text-brand-accent-red border border-brand-accent-red/30'
              }`}>
                {isUnlocked ? t.songDeck.unlockedBadge : t.songDeck.forbiddenBadge}
              </span>
              <span className="font-mono text-[9px] text-gray-500 tracking-wider">SEC_ALIGN_444HZ</span>
            </div>

            <h3 className={`font-serif text-2xl md:text-3xl font-bold tracking-wider transition-colors duration-700 ${
              isUnlocked ? 'text-brand-gold text-glow-gold' : 'text-gray-300'
            }`}>
              {song.title}
            </h3>
            
            <p className="font-mono text-[10px] text-zinc-400">
              {song.subtitle}
            </p>
          </div>

          {/* Interactive Core Deck Visualizer */}
          <div className={`p-4 rounded-lg border flex flex-col items-center justify-center relative select-none transition-all duration-700 ${
            isUnlocked 
              ? 'bg-black/60 border-brand-gold/20' 
              : 'bg-brand-charcoal/80 border-brand-dark-brick/10'
          }`}>
            
            {/* AudiosFree Unique Dystopian Resistance Logo Replacement */}
            <div className="relative my-4 group flex justify-center items-center">
              <div className={`absolute -inset-1.5 bg-gradient-to-r ${
                isUnlocked ? 'from-brand-gold/60 to-amber-500/20' : 'from-brand-accent-red/20 to-red-950/10'
              } rounded-full blur opacity-50 group-hover:opacity-80 transition duration-700 animate-pulse`} />
              
              <img 
                src={audiosFreeLogo} 
                alt="AudiosFree Dystopian Resistance Logo" 
                referrerPolicy="no-referrer"
                className={`w-28 h-28 object-contain rounded-full relative z-10 border ${
                  isUnlocked 
                    ? 'border-brand-gold bg-black shadow-[0_0_15px_rgba(230,195,95,0.45)]' 
                    : 'border-brand-dark-brick/40 bg-zinc-950/90 opacity-60 grayscale hover:opacity-85'
                } transition-all duration-500 select-none`}
              />
              
              {/* Optional overlay spinning tuner element for high tech look during playback */}
              {isPlaying && (
                <div className={`absolute inset-0 z-20 border border-dashed rounded-full animate-[spin_40s_linear_infinite] ${
                  isUnlocked ? 'border-brand-gold/50' : 'border-brand-accent-red/40'
                }`} style={{ width: '120px', height: '120px', margin: 'auto' }} />
              )}
            </div>

            {/* Simulated interactive controller */}
            <div className="flex items-center gap-4 mt-2">
              <button
                onClick={handlePlayToggle}
                className={`p-3 rounded-full cursor-pointer border transition-all duration-300 ${
                  isUnlocked
                    ? 'bg-brand-gold/20 hover:bg-brand-gold/30 text-brand-gold border-brand-gold/50'
                    : 'bg-brand-accent-red/10 hover:bg-brand-accent-red/20 text-brand-accent-red border-brand-accent-red/30'
                }`}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>

              <div className="text-left">
                <p className={`font-mono text-[9px] uppercase tracking-widest ${
                  isUnlocked ? 'text-brand-gold' : 'text-brand-accent-red'
                }`}>
                  {isPlaying ? t.songDeck.playerActive : t.songDeck.playerReady}
                </p>
                <p className="font-mono text-[9px] text-gray-500">
                  {isPlaying ? 'DECRYPT_BITRATE: 444KBPS' : 'COMPLIANCE CH-ID: UNSTABLE'}
                </p>
              </div>
            </div>

            {/* Custom moving wave lights inside the cassette */}
            <div className="w-full flex justify-between h-4 items-end gap-1 mt-4 px-2 opacity-80">
              {Array.from({ length: 24 }).map((_, idx) => {
                const waveH = isPlaying 
                  ? Math.sin(idx * 0.5 + activeVerse) * 8 + 10 
                  : 2;
                return (
                  <div 
                    key={idx} 
                    className={`flex-1 rounded-t transition-all duration-300 ${
                      isUnlocked ? 'bg-brand-gold/60' : 'bg-brand-accent-red/50'
                    }`}
                    style={{ height: `${waveH}px` }}
                  />
                );
              })}
            </div>
          </div>

          {/* Lore info bullet and lyrics hint */}
          <div className="p-3.5 bg-zinc-950/65 rounded border border-zinc-900 space-y-2 text-[10px] leading-relaxed">
            <div className="flex items-center gap-1.5 text-brand-gold font-bold">
              <MapPin className="w-3.5 h-3.5" />
              <span>{t.songDeck.altarWitness}</span>
            </div>
            <p className="text-gray-400 italic">
              {t.songDeck.altarWitnessQuote}
            </p>
          </div>

        </div>

        {/* Right column: Interactive scrolling lyrics sheet */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="mb-3 flex justify-between items-center pb-2 border-b border-zinc-900">
            <span className="font-mono text-[10px] text-yellow-500 tracking-wider flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-yellow-500 animate-pulse" />
              {t.songDeck.specTitle}
            </span>
            <span className="font-sans text-[10px] text-zinc-500">
              {t.songDeck.specSub}
            </span>
          </div>

          <div 
            ref={scrollContainerRef}
            className="h-[280px] overflow-y-auto pr-2 space-y-1 align-top scrollbar-thin scrollbar-thumb-zinc-800"
          >
            {song.lyrics.map((line, idx) => {
              const isEmpty = line.trim() === '';
              const isHeader = line.startsWith('[');
              const isActive = activeVerse === idx;

              if (isEmpty) return <div key={idx} className="h-2" />;
              if (isHeader) {
                return (
                  <div 
                    key={idx} 
                    className={`font-mono text-[9px] uppercase tracking-widest mt-3 mb-1 font-bold ${
                      isUnlocked ? 'text-brand-gold-glow/75' : 'text-zinc-600'
                    }`}
                  >
                    {line}
                  </div>
                );
              }

              return (
                <div
                  key={idx}
                  onClick={() => handleLineClick(idx)}
                  className={`py-1.5 px-2.5 rounded text-xs leading-normal cursor-pointer transition-all duration-300 border ${
                    isActive
                      ? isUnlocked
                        ? 'bg-brand-gold/15 border-brand-gold/30 text-white font-semibold text-glow-gold scale-[1.01] translate-x-1'
                        : 'bg-brand-accent-red/15 border-brand-accent-red/30 text-white font-semibold'
                      : 'bg-transparent border-transparent text-gray-400 hover:text-white hover:bg-zinc-900/45'
                  }`}
                >
                  {line}
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-900/60 flex flex-wrap gap-2 justify-between items-center text-[10px] font-mono text-zinc-500 select-none">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-brand-gold animate-bounce" />
              {isUnlocked ? t.songDeck.decryptStatusAwakened : t.songDeck.decryptStatusRestricted}
            </span>
            <span>AUDIOSFREE // BROKEN ALTARS TRANSMISSION // C. 2026</span>
          </div>

        </div>

      </div>

    </div>
  );
}
