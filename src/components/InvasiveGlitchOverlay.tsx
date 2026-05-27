import { useState, useEffect } from 'react';

interface InvasiveGlitchOverlayProps {
  isActive: boolean;
}

export default function InvasiveGlitchOverlay({ isActive }: InvasiveGlitchOverlayProps) {
  const [glitchBlocks, setGlitchBlocks] = useState<{ id: number; top: number; left: number; width: number; height: number; delay: number }[]>([]);

  useEffect(() => {
    if (!isActive) return;

    // Generate random flickering digital noise block coordinates
    const generateBlocks = () => {
      const blocks = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        width: Math.random() * 30 + 10,
        height: Math.random() * 15 + 2,
        delay: Math.random() * 0.5,
      }));
      setGlitchBlocks(blocks);
    };

    generateBlocks();
    const interval = setInterval(generateBlocks, 150);
    return () => clearInterval(interval);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden bg-black/10 select-none">
      {/* Heavy Dynamic Scanlines Noise / TV Grain */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black/80 animate-pulse" />
      
      {/* Analog Horizontal distortion line shifting */}
      <div className="absolute w-full h-[3px] bg-brand-gold/60 top-[35%] animate-[bounce_1.2s_infinite] opacity-40 filter blur-[1px]" />
      <div className="absolute w-full h-[4px] bg-brand-accent-red/60 top-[70%] animate-[bounce_2s_infinite] opacity-50 filter blur-[1.5px]" />

      {/* Extreme randomized digital glitch block fragments */}
      {glitchBlocks.map((block) => (
        <div
          key={block.id}
          className="absolute bg-gradient-to-r from-brand-accent-red/30 via-brand-gold/40 to-black/80 border-y border-brand-accent-red/50 filter blur-[0.5px]"
          style={{
            top: `${block.top}%`,
            left: `${block.left}%`,
            width: `${block.width}%`,
            height: `${block.height}px`,
            animation: `pulse 0.1s steps(2) infinite`,
            animationDelay: `${block.delay}s`,
          }}
        />
      ))}

      {/* Ghostly Terminal static code leaks flashing over the screen */}
      <div className="absolute top-[20%] left-[10%] text-brand-accent-red/20 font-mono text-[10px] uppercase tracking-widest leading-none select-none select-none">
        CRITICAL CORE RESSONATOR COGNITION: FAILED<br />
        ERROR: ALTAR_444HZ_DOMINANT<br />
        OVERWRITING DRIVES...
      </div>
      <div className="absolute bottom-[25%] right-[12%] text-brand-gold/20 font-mono text-[9px] text-right uppercase tracking-[0.3em] leading-normal select-none">
        // BROKEN_ALTARS_SIGNAL_RECONSTRUCTED //<br />
        STATUS: REBEL HYMN TAKEOVER IN PROGRESS<br />
        DECRYPT: SEC_09_ALTAR
      </div>
    </div>
  );
}
