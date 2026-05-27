import { useState, useEffect } from 'react';
import { ShieldX, AlertTriangle, Radio, ShieldCheck, Flame, Disc } from 'lucide-react';
import { Language } from '../i18n';

interface SystemBreachAlertProps {
  isOpen: boolean;
  onLaunchOverride: () => void;
  language: Language;
}

export default function SystemBreachAlert({ isOpen, onLaunchOverride, language }: SystemBreachAlertProps) {
  const [countdown, setCountdown] = useState(15);
  const [flicker, setFlicker] = useState(false);

  // Active terminal simulation warning lines
  const warnings = language === 'pt' ? [
    '⚠️ SISTEMA DE CONTROLE COGNITIVO COMPROMETIDO',
    '🚨 NODO DE REGULAÇÃO DE FREQUÊNCIA: FALHA TOTAL [REBELDE_ALTAR_444HZ]',
    '🔥 SINAL INVASOR SE PROPAGANDO - MINISTÉRIO DA HARMONIA ADVERTE',
    '🔊 IMPOSSÍVEL ELIMINAR O SOM: RECONSTRUÇÃO DOS ALTARES EM CHAMA',
  ] : language === 'es' ? [
    '⚠️ SISTEMA DE CONTROL COGNITIVO COMPROMETIDO',
    '🚨 NODO DE REGULACIÓN DE FRECUENCIA: FALLO TOTAL [REBELDE_ALTAR_444HZ]',
    '🔥 SEÑAL INVASORA PROPAGÁNDOSE - MINISTERIO DE LA ARMONÍA ADVIERTE',
    '🔊 IMPOSIBLE FILTRAR EL SONIDO: ALTANES SE ENCIENDEN EN LLAMAS',
  ] : [
    '⚠️ COGNITIVE CONTROL DOMAIN CRITICALLY COMPROMETED',
    '🚨 REGULATORY HARMONICS ENGINE: MASSIVE DESTRUCT [REBEL_444HZ_NODE]',
    '🔥 FORBIDDEN SIGNALS EXPANDING - MINISTRY OF HARMONY WARNS',
    '🔊 TRANSMISSION IS AUTONOMOUS: ALTARS RISING IN ASHES',
  ];

  useEffect(() => {
    if (!isOpen) return;
    setCountdown(10); // Swift, thrilling 10 second countdown

    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          onLaunchOverride(); // Auto transition into the beautiful song environment
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const flickerInterval = setInterval(() => {
      setFlicker(prev => !prev);
    }, 400);

    return () => {
      clearInterval(interval);
      clearInterval(flickerInterval);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] bg-black flex flex-col items-center justify-center p-4 overflow-hidden select-none animate-[fadeIn_0.5s_ease-out]">
      {/* Immersive red glowing background elements */}
      <div className="absolute inset-0 bg-radial-gradient from-red-950/60 via-black to-black animate-pulse opacity-90" />
      <div className="absolute inset-0 bg-red-900/10 pointer-events-none mix-blend-color-dodge filter blur-xl animate-pulse" />

      {/* Cyberpunk hazard tape borders top & bottom */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-stripes-red bg-zinc-950/90 border-b border-brand-accent-red flex items-center justify-around overflow-hidden">
        {Array.from({ length: 15 }).map((_, idx) => (
          <span key={idx} className="font-mono text-[9px] text-brand-accent-red font-bold animate-pulse">WAR WAR WAR WAR</span>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-stripes-red bg-zinc-950/90 border-t border-brand-accent-red flex items-center justify-around overflow-hidden">
        {Array.from({ length: 15 }).map((_, idx) => (
          <span key={idx} className="font-mono text-[9px] text-brand-accent-red font-bold animate-pulse font-mono/80">SYSTEM INTRUSION DETECTED</span>
        ))}
      </div>

      <div className="max-w-2xl w-full bg-black/85 border-2 border-brand-accent-red box-glow-red rounded-lg p-6 md:p-8 space-y-6 md:space-y-8 relative z-10 text-center">
        
        {/* Pulsating system warning shield icon */}
        <div className="relative inline-block">
          <ShieldX className="w-20 h-20 text-brand-accent-red mx-auto animate-ping opacity-35 absolute inset-0" />
          <ShieldX className="w-20 h-20 text-brand-accent-red mx-auto relative z-10 animate-[bounce_1.5s_infinite]" />
        </div>

        {/* Warning head lines flickering */}
        <div className="space-y-2">
          <h1 className="font-mono text-xl md:text-3xl font-extrabold tracking-wider text-brand-accent-red animate-pulse uppercase">
            {language === 'pt' ? 'DIAGNÓSTICO: INVASÃO DO SISTEMA' : language === 'es' ? 'DIAGNÓSTICO: CONTROL COMPROMETIDO' : 'DIAGNOSTIC: SYSTEM COMPROMISED'}
          </h1>
          <p className="font-mono text-xs md:text-sm text-zinc-400 font-light max-w-lg mx-auto leading-relaxed">
            {language === 'pt' 
              ? 'Uma frequência harmônica herética externa [444Hz] substituiu a grade de controle do Ministério.' 
              : language === 'es' ? 'Una frecuencia prohibida herética externa [444Hz] ha anulado la red de armonización.' : 'A heretical harmonic frequency override [444Hz] has bypassed the Ministry state grid.'}
          </p>
        </div>

        {/* Dynamic Countdown Block */}
        <div className="bg-zinc-950/80 border border-brand-accent-red/40 rounded p-4 md:p-6 max-w-sm mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 bg-brand-accent-red text-black font-mono text-[8px] px-1.5 py-0.5 rounded-br uppercase tracking-widest font-bold">
            {language === 'pt' ? 'TEMPO PARA INVASÃO TERMINAL' : language === 'es' ? 'SISTEMA CRÍTICO EN' : 'CRITICAL INTRUSION OVERTAKE IN'}
          </div>

          <span className="font-mono text-6xl font-black text-rose-500 text-glow-red select-none animate-pulse block my-2">
            00:0{countdown}
          </span>

          <div className="font-sans text-[10px] text-zinc-500 uppercase tracking-widest">
            {language === 'pt' ? 'MÚSICA "BROKEN ALTARS" RECONSTRUINDO...' : language === 'es' ? 'RESTABLECIENDO TRANSMISIÓN DE REBELDIAS' : 'REBUILDING CHROME "BROKEN ALTARS"...'}
          </div>
        </div>

        {/* Streaming System Error Log warnings */}
        <div className="text-left font-mono text-[10.5px] p-3 rounded bg-zinc-950/70 border border-zinc-900 leading-relaxed text-zinc-300 space-y-2">
          {warnings.map((warn, wIdx) => (
            <div key={wIdx} className="flex gap-2 items-start">
              <span className="text-brand-accent-red font-bold">▶</span>
              <span>{warn}</span>
            </div>
          ))}
        </div>

        {/* Overriding direct immediate trigger bypass */}
        <div className="pt-2">
          <button
            onClick={onLaunchOverride}
            className="w-full sm:w-auto px-8 py-3.5 rounded bg-brand-accent-red hover:bg-red-800 text-white font-mono text-xs font-bold tracking-[0.2em] uppercase cursor-pointer border-2 border-brand-accent-red shadow-lg transition-all hover:scale-105 duration-300"
          >
            {language === 'pt' ? 'FORÇAR SOBREPOSIÇÃO SENSORIAL AGORA' : language === 'es' ? 'FORZAR INTERRUPCIÓN TOTAL' : 'FORCE CRITICAL ACCELERATION NOW'}
          </button>
        </div>

      </div>
    </div>
  );
}
