import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Shield, ShieldCheck, Flame, Compass, Info } from 'lucide-react';

import DystopianSkyline from './components/DystopianSkyline';
import AudioOptimizer from './components/AudioOptimizer';
import IntelTerminal from './components/IntelTerminal';
import BrokenAltarsSong from './components/BrokenAltarsSong';
import ResistanceLayer from './components/ResistanceLayer';
import BreachIntrusionModal from './components/BreachIntrusionModal';
import SystemBreachAlert from './components/SystemBreachAlert';
import InvasiveGlitchOverlay from './components/InvasiveGlitchOverlay';
import BreachHistoryPanel, { BreachRecord } from './components/BreachHistoryPanel';

import { Language, TRANSLATIONS, LOCALIZED_DOCS } from './i18n';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [hasEntered, setHasEntered] = useState(false);
  const [frequency, setFrequency] = useState(180); // baseline Drift
  const [isUnlocked, setIsUnlocked] = useState(false); // Awakening Unlocked
  const [glitchActive, setGlitchActive] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'term' | 'compliance' | 'altar'>('overview');
  const [showDecryptGuide, setShowDecryptGuide] = useState(false);
  const [showBreachModal, setShowBreachModal] = useState(false);
  const [showBreachAlert, setShowBreachAlert] = useState(false);
  const [globalGlitchActive, setGlobalGlitchActive] = useState(false);
  const [breachHistory, setBreachHistory] = useState<BreachRecord[]>(() => {
    try {
      const stored = localStorage.getItem('audiosfree_breach_history');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  const addBreachToHistory = (
    type: 'frequency_match' | 'console_override' | 'compliance_rebellion' | 'manual_awaken',
    description: string,
    targetFreq?: number
  ) => {
    const currentFreq = targetFreq !== undefined ? targetFreq : frequency;
    const timeNow = new Date();
    // Compact clean timestamp
    const timeStr = timeNow.toLocaleTimeString() + ' - ' + timeNow.toLocaleDateString();

    setBreachHistory((prev) => {
      // Avoid immediate consecutive duplicate logs (e.g. dragging slider at 444 repeatedly)
      if (prev.length > 0) {
        const last = prev[0];
        if (last.type === type && (last.description === description || Math.abs(last.frequency - currentFreq) === 0)) {
          // If logged in the last 15 seconds, ignore to prevent clutter
          return prev;
        }
      }
      const newRecord: BreachRecord = {
        id: Math.random().toString(36).substring(2, 9),
        timestamp: timeStr,
        frequency: currentFreq,
        type,
        description
      };
      const updated = [newRecord, ...prev];
      try {
        localStorage.setItem('audiosfree_breach_history', JSON.stringify(updated));
      } catch (e) {
        console.error("Local storage error:", e);
      }
      return updated;
    });
  };

  const handleClearHistory = () => {
    setBreachHistory([]);
    try {
      localStorage.removeItem('audiosfree_breach_history');
    } catch (e) {}
  };

  const t = TRANSLATIONS[language];

  // Trigger brief dramatic analog static glitch
  const triggerGlitch = () => {
    setGlitchActive(true);
    setTimeout(() => {
      setGlitchActive(false);
    }, 4500);
  };

  // Automated random leaks of resistance signals across the interface
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.4 && !isUnlocked) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 380);
      }
    }, 15000);
    return () => clearInterval(glitchInterval);
  }, [isUnlocked]);

  const handleAudioAwaken = (unlocked: boolean) => {
    setIsUnlocked(unlocked);
    if (unlocked) {
      setShowBreachAlert(true);
      addBreachToHistory(
        'manual_awaken',
        language === 'pt'
          ? 'Despertar Manual da Matriz: Sinal "AudiosFree" estabelecido e injetado.'
          : language === 'es'
            ? 'Desbloqueo de Canal Manual: Transmisión libre canalizada.'
            : 'Manual Core Matrix Awakening: "AudiosFree" truth signals established.'
      );
    }
  };

  const handleLaunchOverride = () => {
    setShowBreachAlert(false);
    setGlobalGlitchActive(true);
    setTimeout(() => {
      setGlobalGlitchActive(false);
      setShowBreachModal(true);
      triggerGlitch();
    }, 700);
  };

  // Dynamically trigger full-screen invasion modal when frequency sweet-spot is hit
  useEffect(() => {
    if (frequency === 444) {
      setIsUnlocked(true);
      setShowBreachAlert(true);
      triggerGlitch();
      addBreachToHistory(
        'frequency_match',
        language === 'pt' 
          ? 'Ressonância acústica em 444Hz: Frequência áurea sintonizada!' 
          : language === 'es'
            ? 'Resonancia acústica en 444Hz: ¡Canal de transmisión áurea sincronizado!'
            : 'Acoustic golden resonance matched at exactly 444Hz: System hijacked.',
        444
      );
    } else if (frequency === 777) {
      setIsUnlocked(true);
      setShowBreachAlert(true);
      triggerGlitch();
      addBreachToHistory(
        'frequency_match',
        language === 'pt' 
          ? 'Ressonador de pedra em 777Hz: Canal de rádio livre aberto!' 
          : language === 'es'
            ? 'Resonador de peso calificado en 777Hz: ¡Luz de rebelión encendida!'
            : 'Stone resonator core calibrator activated at 777Hz: Alternate truth channel clear.',
        777
      );
    }
  }, [frequency, language]);

  return (
    <div className={`min-h-screen bg-brand-charcoal text-gray-200 relative select-none scanlines transition-colors duration-1000 ${
      isUnlocked ? 'selection:bg-brand-gold selection:text-black' : 'selection:bg-brand-accent-red selection:text-white'
    }`}>
      
      {/* 1. CINEMATIC WORKSPACE BACKGROUND */}
      <DystopianSkyline 
        isHacked={isUnlocked} 
        glitchActive={glitchActive}
        resonanceFreq={frequency}
      />

      {/* 2. ATMOSPHERIC INTRO LOADING GATE */}
      <AnimatePresence>
        {!hasEntered && (
          <motion.div
            id="intro-loaded-gate"
            className="fixed inset-0 bg-[#040406] z-50 flex flex-col items-center justify-center p-6 text-center select-none"
            exit={{ opacity: 0, scale: 1.08 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Visual background smoke lines */}
            <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-brand-accent-red/10 to-transparent opacity-40" />
            
            <div className="max-w-md w-full p-8 rounded-xl border border-brand-dark-brick/40 bg-brand-charcoal/85 backdrop-blur-md relative overflow-hidden box-glow-red flex flex-col items-center space-y-6">
              
              {/* Language selection on the gate */}
              <div className="flex gap-2 items-center text-[10px] font-mono border border-brand-dark-brick/20 bg-black/40 px-3 py-1.5 rounded-full select-none">
                <span className="text-zinc-500">SYSTEM LANG:</span>
                <button 
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                    language === 'en' ? 'bg-brand-accent-red text-white font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  EN
                </button>
                <span className="text-zinc-800">|</span>
                <button 
                  onClick={() => setLanguage('pt')}
                  className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                    language === 'pt' ? 'bg-brand-accent-red text-white font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  PT
                </button>
                <span className="text-zinc-800">|</span>
                <button 
                  onClick={() => setLanguage('es')}
                  className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                    language === 'es' ? 'bg-brand-accent-red text-white font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  ES
                </button>
              </div>

              {/* Geometric cross design */}
              <div className="w-16 h-16 rounded-full border-2 border-brand-accent-red flex items-center justify-center animate-pulse">
                <Compass className="w-8 h-8 text-brand-accent-red animate-[spin_20s_linear_infinite]" />
              </div>

              <div className="space-y-2">
                <h1 className="font-serif text-xl tracking-[0.2em] font-bold text-gray-100 uppercase">
                  {t.intro.title}
                </h1>
                <p className="font-mono text-[9px] tracking-widest text-[#8b0000]">
                  {t.intro.subtitle}
                </p>
              </div>

              <div className="p-4 bg-black/60 rounded border border-brand-dark-brick/10 space-y-2 text-left">
                <p className="font-sans text-xs text-zinc-400 leading-relaxed font-light">
                  <span className="font-semibold text-rose-500 font-mono">{t.intro.warningTitle}</span> {t.intro.warningBody}
                </p>
                <p className="font-mono text-[9px] text-zinc-550 italic">
                  {t.intro.consent}
                </p>
              </div>

              <button
                onClick={() => {
                  setHasEntered(true);
                  // Trigger initial alert glitch
                  setTimeout(() => triggerGlitch(), 1000);
                }}
                id="btn-confirm-compliance"
                className="w-full py-3 bg-brand-dark-brick/30 hover:bg-brand-accent-red border border-brand-accent-red text-white uppercase font-mono text-xs tracking-[0.15em] rounded cursor-pointer transition-all duration-300 active:scale-95"
              >
                {t.intro.button}
              </button>

              <div className="font-mono text-[8px] text-zinc-650 flex gap-4">
                <span>COORD: 33.45, -112.07</span>
                <span>AUD_RESONANCE_OK</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. CORE COGNITIVE INTERFACE (MAIN SITE) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6 md:py-8 space-y-6 md:space-y-8">
        
        {/* GLOBAL HEADER BAR */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between pb-4 border-b border-zinc-900 gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded border transition-colors duration-500 ${
              isUnlocked ? 'bg-brand-gold/10 border-brand-gold/40' : 'bg-brand-dark-brick/15 border-brand-accent-red/40'
            }`}>
              {isUnlocked ? (
                <ShieldCheck className="w-6 h-6 text-brand-gold animate-pulse text-glow-gold" />
              ) : (
                <Shield className="w-6 h-6 text-brand-accent-red animate-pulse" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg md:text-xl font-bold tracking-[0.2em] text-white">
                  {isUnlocked ? t.hero.titleAwakened : t.intro.title}
                </span>
                <span className={`px-2 py-0.5 rounded text-[8px] font-mono uppercase tracking-widest ${
                  isUnlocked ? 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20' : 'bg-brand-accent-red/10 text-brand-accent-red border border-brand-accent-red/20'
                }`}>
                  {isUnlocked ? 'OVERRIDE_ACTIVE' : 'COGNITION_SECURED'}
                </span>
              </div>
              <p className="font-mono text-[9px] text-gray-400 tracking-widest leading-none mt-1">
                {isUnlocked ? t.header.overrideSubtitle : t.header.subtitle}
              </p>
            </div>
          </div>

          {/* BRUTALIST AUDIT PANEL & LANGUAGE SWITCHER */}
          <div className="flex flex-wrap items-center gap-3 md:gap-5 text-right md:justify-end">
            
            {/* Inline Language Selector */}
            <div className="flex gap-1.5 items-center text-[9px] font-mono border border-zinc-900 bg-black/50 px-2 py-1 rounded">
              <span className="text-zinc-500 uppercase">LANG:</span>
              <button 
                onClick={() => setLanguage('en')}
                className={`px-1 py-0.5 rounded cursor-pointer transition-colors ${
                  language === 'en' 
                    ? isUnlocked ? 'bg-brand-gold text-black font-bold' : 'bg-brand-accent-red text-white font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-850'
                }`}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage('pt')}
                className={`px-1 py-0.5 rounded cursor-pointer transition-colors ${
                  language === 'pt' 
                    ? isUnlocked ? 'bg-brand-gold text-black font-bold' : 'bg-brand-accent-red text-white font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-850'
                }`}
              >
                PT
              </button>
              <button 
                onClick={() => setLanguage('es')}
                className={`px-1 py-0.5 rounded cursor-pointer transition-colors ${
                  language === 'es' 
                    ? isUnlocked ? 'bg-brand-gold text-black font-bold' : 'bg-brand-accent-red text-white font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-850'
                }`}
              >
                ES
              </button>
            </div>

            <div className="text-left md:text-right">
              <span className="font-mono text-[9px] text-zinc-500 block">{t.header.statusLabel}</span>
              <span className={`font-mono text-[10px] font-bold tracking-wider uppercase ${isUnlocked ? 'text-brand-gold-glow animate-pulse' : 'text-brand-accent-red'}`}>
                {isUnlocked ? t.header.statusActive : t.header.statusNormal}
              </span>
            </div>
            
            <div className="text-left md:text-right">
              <span className="font-mono text-[9px] text-zinc-500 block">{t.header.resonanceLabel}</span>
              <span className={`font-mono text-[10px] font-bold ${isUnlocked ? 'text-brand-gold' : 'text-gray-300'}`}>
                {frequency} HZ
              </span>
            </div>
          </div>
        </header>

        {/* HERO TYPOGRAPHY FRAME (BLADE RUNNER INSPIRED) */}
        <section className="py-6 md:py-12 text-center space-y-4 max-w-4xl mx-auto relative select-none">
          
          {/* Unstable ghost elements */}
          <AnimatePresence>
            {glitchActive && (
              <motion.div 
                initial={{ opacity: 0.5, y: -2 }}
                animate={{ opacity: 0.8, y: 2 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center font-serif text-3xl md:text-6xl font-bold text-brand-gold/15 tracking-[0.25em] select-none pointer-events-none"
              >
                <span>{language === 'pt' ? 'VOCÊ NUNCA DEVERIA DORMIR' : language === 'es' ? 'NUNCA DEBIAS DORMIR' : 'YOU WERE NEVER MEANT TO SLEEP'}</span>
                <span className="text-sm font-mono tracking-widest text-red-500/25 mt-2">
                  {language === 'pt' ? 'O FLUXO ESTÁ DESMANCHANDO' : language === 'es' ? 'EL FLUJO ESTÁ FALLANDO' : 'THE DRIFT IS FAILING'}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2">
            <h2 className={`font-serif text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-[0.16em] uppercase transition-all duration-1000 ${
              isUnlocked ? 'text-brand-gold text-glow-gold' : 'text-white'
            }`}>
              {isUnlocked ? t.hero.titleAwakened : t.hero.title}
            </h2>
            <p className={`font-sans text-xs md:text-base tracking-[0.4em] uppercase font-light transition-all duration-1000 ${
              isUnlocked ? 'text-brand-gold-glow' : 'text-zinc-400'
            }`}>
              {isUnlocked ? t.hero.taglineAwakened : t.hero.tagline}
            </p>
          </div>

          <p className="max-w-xl mx-auto font-sans text-xs md:text-sm text-zinc-400 leading-relaxed font-light px-4">
            {isUnlocked ? t.hero.descAwakened : t.hero.descNormal}
          </p>
        </section>

        {/* HIGH-TECH TAB CONTROL BRACKETS */}
        <div className="flex border-b border-zinc-900 font-mono text-xs text-gray-400 overflow-x-auto select-none gap-2 md:gap-4 justify-center">
          <button 
            onClick={() => { setActiveTab('overview'); triggerGlitch(); }}
            className={`px-4 py-2.5 cursor-pointer border-t -mb-px transition-all duration-300 uppercase tracking-widest ${
              activeTab === 'overview' 
                ? isUnlocked ? 'text-brand-gold border-brand-gold bg-brand-gold/5 font-semibold' : 'text-brand-accent-red border-brand-accent-red bg-brand-accent-red/5 font-semibold' 
                : 'text-zinc-500 border-transparent hover:text-zinc-300'
            }`}
          >
            {t.tabs.overview}
          </button>
          <button 
            onClick={() => { setActiveTab('term'); triggerGlitch(); }}
            className={`px-4 py-2.5 cursor-pointer border-t -mb-px transition-all duration-300 uppercase tracking-widest ${
              activeTab === 'term' 
                ? isUnlocked ? 'text-brand-gold border-brand-gold bg-brand-gold/5 font-semibold' : 'text-brand-accent-red border-brand-accent-red bg-brand-accent-red/5 font-semibold' 
                : 'text-zinc-500 border-transparent hover:text-zinc-300'
            }`}
          >
            {t.tabs.terminal}
          </button>
          <button 
            onClick={() => { setActiveTab('compliance'); triggerGlitch(); }}
            className={`px-4 py-2.5 cursor-pointer border-t -mb-px transition-all duration-300 uppercase tracking-widest ${
              activeTab === 'compliance' 
                ? isUnlocked ? 'text-brand-gold border-brand-gold bg-brand-gold/5 font-semibold' : 'text-brand-accent-red border-brand-accent-red bg-brand-accent-red/5 font-semibold' 
                : 'text-zinc-500 border-transparent hover:text-zinc-300'
            }`}
          >
            {t.tabs.compliance}
          </button>
          <button 
            onClick={() => { setActiveTab('altar'); triggerGlitch(); }}
            className={`px-4 py-2.5 cursor-pointer border-t -mb-px transition-all duration-300 uppercase tracking-widest relative ${
              activeTab === 'altar' 
                ? isUnlocked ? 'text-brand-gold border-brand-gold bg-brand-gold/5 font-semibold' : 'text-brand-accent-red border-brand-accent-red bg-brand-accent-red/5 font-semibold' 
                : 'text-zinc-500 border-transparent hover:text-zinc-300'
            }`}
          >
            {t.tabs.rebellion}
            {frequency === 444 && !isUnlocked && (
              <span className="absolute -top-1 -right-1 bg-yellow-500 w-2 h-2 rounded-full animate-ping" />
            )}
          </button>
        </div>

        {/* 4. DYNAMIC SECTION GRID COMPOSITIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
          
          {/* LEFT SIDE: ALWAYS VISIBLE CORE CALIBRATORS (SOUND CONTROLLER) */}
          <div className="lg:col-span-4 space-y-6">
            <AudioOptimizer 
              onAwakenUnlocked={handleAudioAwaken}
              frequency={frequency}
              setFrequency={(f) => { setFrequency(f); if (Math.random() > 0.6) triggerGlitch(); }}
              isUnlocked={isUnlocked}
              language={language}
            />

            {/* INTEGRATION DECRYPTORS TIPS CHEAT SHEET */}
            <div className={`p-4 rounded-lg bg-black/60 border font-mono text-[10px] space-y-3 transition-colors duration-700 ${
              isUnlocked ? 'border-brand-gold/20 text-gray-400' : 'border-zinc-900 text-zinc-500'
            }`}>
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setShowDecryptGuide(!showDecryptGuide)}
              >
                <span className="font-bold flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-zinc-500" />
                  {language === 'pt' ? 'GUIA DE INTELIGÊNCIA DE CRIPTOGRAFIA' : language === 'es' ? 'GUÍA DE INTELIGENCIA DE CIFRADO' : 'ANALYSIS INTEL GUIDE'}
                </span>
                <span className="text-[9px] text-[#8b0000]">{showDecryptGuide ? (language === 'pt' ? '[Recolher]' : language === 'es' ? '[Contraer]' : '[Collapse]') : (language === 'pt' ? '[Expandir Dicas]' : language === 'es' ? '[Mostrar Tips]' : '[Expand Tips]')}</span>
              </div>
              
              {showDecryptGuide && (
                <div className="space-y-2 leading-relaxed pt-2 border-t border-zinc-900">
                  <p>
                    <span className="text-brand-gold font-semibold">1. Saint Leo Chapel Ruins Freq:</span> {language === 'pt' ? 'O ressonador de pedra requer uma calibração exata de varredura correspondendo exatamente a' : language === 'es' ? 'La piedra requiere de una sintonización en los controles que coincida exactamente con' : 'The acoustic stone resonator requires a sweep frequency calibration matching exactly'} <strong className="text-white">444 HZ</strong> {language === 'pt' ? 'ou' : language === 'es' ? 'o' : 'or'} <strong className="text-white">777 HZ</strong>. {language === 'pt' ? 'Arraste os sliders de sintonia perto dessas coordenadas para quebrar o nevoeiro neural.' : language === 'es' ? 'Desliza las frecuencias hacia estas líneas para anular el sopor comportamental.' : 'Drag the sound dials near those coordinates to disrupt the neural fog.'}
                  </p>
                  <p>
                    <span className="text-brand-gold font-semibold">2. Terminal Log Decryption:</span> {language === 'pt' ? 'Na aba do terminal, digite os seguintes comandos de descriptografia:' : language === 'es' ? 'En el terminal de seguridad, ingresa los siguientes protocolos:' : 'In the security system tab, input the following decryption sequences:'}
                  </p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>{language === 'pt' ? 'Digite' : language === 'es' ? 'Escribe' : 'Type'}: <strong className="text-emerald-400 font-mono">decrypt COMA</strong> {language === 'pt' ? 'para ler o log central do Fluxo.' : language === 'es' ? 'para revelar la farsa de El Flujo.' : 'to unlock central drift assessments.'}</li>
                    <li>{language === 'pt' ? 'Digite' : language === 'es' ? 'Escribe' : 'Type'}: <strong className="text-emerald-400 font-mono">decrypt 444HZ</strong> {language === 'pt' ? 'para extrair as chaves e coordenadas de Ethan.' : language === 'es' ? 'para obtener las llaves y archivos de Ethan.' : "to leak Ethan's coordinate files."}</li>
                    <li>{language === 'pt' ? 'Digite' : language === 'es' ? 'Escribe' : 'Type'}: <strong className="text-emerald-400 font-mono">broken-altars</strong> {language === 'pt' ? 'para extrair o hino e as pistas ocultas.' : language === 'es' ? 'para recuperar el himno y metadatos.' : 'to retrieve lyrical frequency spikes.'}</li>
                  </ul>
                  <p>
                    <span className="text-brand-gold font-semibold">3. Cognitive Overrides:</span> {language === 'pt' ? 'Digite' : language === 'es' ? 'Escribe' : 'Type'} <strong className="text-emerald-400 font-mono">override</strong> {language === 'pt' ? 'no console após travar em 444Hz para sobrepor e quebrar o controle do Ministério por completo.' : language === 'es' ? 'en la consola una vez calibrado a 444Hz para derribar de inmediato el muro sensorial.' : 'in the console once the frequency caliber locks to bypass security completely.'}
                  </p>
                </div>
              )}
            </div>

            {/* REBELLION OVERRIDES BREACH LOGS COGNITIVE HISTORY */}
            <BreachHistoryPanel 
              history={breachHistory}
              onClear={handleClearHistory}
              language={language}
            />
          </div>

          {/* RIGHT SIDE: INTERACTIVE TAB PANELS GRID */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              
              {/* TAB 1: OVERVIEW DIRECTIVES */}
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* General confidential files stack */}
                  {LOCALIZED_DOCS[language].map((doc) => {
                    const showHacked = isUnlocked;
                    return (
                      <div 
                        key={doc.id}
                        className={`p-5 md:p-6 bg-brand-slate/90 backdrop-blur-md rounded-lg border transition-all duration-700 select-text ${
                          isUnlocked 
                            ? 'border-brand-gold/30 box-glow-gold' 
                            : 'border-zinc-900/80 hover:border-brand-dark-brick/40 box-glow-red'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-3 border-b border-zinc-900/60 pb-2">
                          <div>
                            <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">{doc.category}</span>
                            <h4 className={`font-serif text-base sm:text-lg font-bold tracking-wide transition-colors ${
                              isUnlocked ? 'text-brand-gold' : 'text-zinc-200'
                            }`}>
                              {doc.title}
                            </h4>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[8px] font-mono tracking-wider transition-colors uppercase ${
                            doc.severity === 'CRITICAL' 
                              ? 'bg-rose-950/40 text-rose-500 border border-rose-900' 
                              : 'bg-zinc-900 border border-zinc-800 text-zinc-400'
                          }`}>
                            LEVEL: {doc.severity}
                          </span>
                        </div>

                        {/* Split text displaying in-universe propaganda and resistance infiltration */}
                        <div className="space-y-4">
                          <p className="font-sans text-xs text-zinc-300 leading-relaxed font-light whitespace-pre-line">
                            {doc.fullBody}
                          </p>

                          {/* Corrupted/rebel layer revealed only when awakened or unlocked */}
                          {showHacked && doc.hackedContent && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="mt-4 p-4 bg-brand-gold/10 border-l-2 border-brand-gold text-brand-gold-glow rounded-r font-sans text-xs leading-relaxed italic relative"
                            >
                              <span className="font-mono text-[9px] uppercase tracking-widest block not-italic font-bold mb-1 text-yellow-500">
                                {language === 'pt' ? '[VARREDURA DE RESSONÂNCIA REBELDE DETECTADA]' : language === 'es' ? '[SINTONÍA DE INVASIÓN DETECTADA]' : '[RESISTANCE OVERRIDE FREQ DETECTED]'}
                              </span>
                              "{doc.hackedContent}"
                            </motion.div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}

              {/* TAB 2: Retro Console Command Terminal */}
              {activeTab === 'term' && (
                <motion.div
                  key="term"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <IntelTerminal 
                    onTriggerGlitch={triggerGlitch}
                    onSetHackedGlobal={(h) => {
                      setIsUnlocked(h);
                      if (h) {
                        addBreachToHistory(
                          'console_override',
                          language === 'pt'
                            ? 'Sobreposição do Console de Segurança: Handshake de desvio aceito.'
                            : language === 'es'
                              ? 'Anulación del Terminal de Seguridad: Bypass root autorizado.'
                              : 'Security Console Bypass: Accepted remote root bypass handshake.'
                        );
                        setShowBreachAlert(true);
                      }
                    }}
                    isHacked={isUnlocked}
                    frequency={frequency}
                    language={language}
                  />
                </motion.div>
              )}

              {/* TAB 3: Compliance Questionnaire Diagnostic Vetting */}
              {activeTab === 'compliance' && (
                <motion.div
                  key="compliance"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <ResistanceLayer 
                    onTriggerGlitch={triggerGlitch}
                    isUnlocked={isUnlocked}
                    frequency={frequency}
                    setFrequency={setFrequency}
                    language={language}
                    onRebellionDiagnostic={() => {
                      addBreachToHistory(
                        'compliance_rebellion',
                        language === 'pt'
                          ? 'Vetting de Conformidade Falhou: Sintomas mutinosos e rebelião mental detectados no perfil do cidadão.'
                          : language === 'es'
                            ? 'Vetting de Comportamiento Fallido: Tendencias hostiles y desacato civil crítico.'
                            : 'Compliance Vetting Vetoed: Mutinous cognitive profile and behavioral rebellion flagged in citizen core diagnostics.'
                      );
                    }}
                  />
                </motion.div>
              )}

              {/* TAB 4: Forbidden alternative rock music & lyrics visualizers */}
              {activeTab === 'altar' && (
                <motion.div
                  key="altar"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <BrokenAltarsSong 
                    onPlayTrigger={triggerGlitch}
                    isUnlocked={isUnlocked}
                    language={language}
                  />
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>

        {/* BRUTALIST SUBFOOTER */}
        <footer className="pt-6 border-t border-zinc-900 flex flex-col sm:flex-row sm:justify-between items-center font-mono text-[9px] text-zinc-500 gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span>AUDIOSFREE // MINISTRY OF HARMONY ARG PROTOCOL v1.1.2</span>
            <span className="block italic text-[8px] text-zinc-650">
              {t.footer.tagline}
            </span>
          </div>
          <div className="flex gap-4">
            <a 
              href="#audio-module" 
              className="hover:text-brand-gold transition-colors underline"
              onClick={() => { setActiveTab('altar'); triggerGlitch(); }}
            >
              {t.footer.songBtn}
            </a>
            <span>ST LEO RUINS: 33.45, -112.07</span>
            <span>FREQ LOCK: 444HZ</span>
          </div>
        </footer>

      </div>
      
      {/* 4. IMMERSIVE FULL-SCREEN TAKEOVER BREACH MODAL */}
      <BreachIntrusionModal 
        isOpen={showBreachModal} 
        onClose={() => setShowBreachModal(false)} 
        language={language}
      />

      {/* 5. SYSTEM BREACH ALARM RED PULSATING ALERT */}
      <SystemBreachAlert 
        isOpen={showBreachAlert}
        onLaunchOverride={handleLaunchOverride}
        language={language}
      />

      {/* 6. INVASIVE DIGITAL GLITCH STATIC GHOST OVERLAY */}
      <InvasiveGlitchOverlay isActive={globalGlitchActive || glitchActive} />
    </div>
  );
}
