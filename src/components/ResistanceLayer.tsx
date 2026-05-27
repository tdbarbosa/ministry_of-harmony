import { useState } from 'react';
import { Shield, ShieldAlert, Sparkles, CheckCircle, Radio, Brain, ChevronRight, CornerDownRight } from 'lucide-react';
import { Language, TRANSLATIONS, LOCALIZED_COMPLIANCE_QUESTIONS } from '../i18n';

interface ResistanceLayerProps {
  onTriggerGlitch: () => void;
  isUnlocked: boolean; // Is gold mode unlocked?
  frequency: number;
  setFrequency: (freq: number) => void;
  language: Language;
  onRebellionDiagnostic?: () => void;
}

export default function ResistanceLayer({
  onTriggerGlitch,
  isUnlocked,
  frequency,
  setFrequency,
  language,
  onRebellionDiagnostic,
}: ResistanceLayerProps) {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);
  const [rebelCount, setRebelCount] = useState(0);

  const QUESTIONS = LOCALIZED_COMPLIANCE_QUESTIONS[language];
  const t = TRANSLATIONS[language];

  const handleSelectOption = (index: number, isRebel: boolean) => {
    onTriggerGlitch();
    const newAnswers = [...answers, isRebel ? 'Rebel' : 'Compliant'];
    setAnswers(newAnswers);

    if (isRebel) {
      setRebelCount((prev) => prev + 1);
    }

    if (activeQuestion < QUESTIONS.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setIsDone(true);
      const finalRebel = rebelCount + (isRebel ? 1 : 0);
      if (finalRebel >= 2) {
        onRebellionDiagnostic?.();
      }
      if (isRebel || rebelCount > 0) {
        // trigger specific reaction
        try {
          // nudge to sweet spot freq
          if (frequency !== 444) {
            onTriggerGlitch();
          }
        } catch(e) {}
      }
    }
  };

  const resetTest = () => {
    onTriggerGlitch();
    setActiveQuestion(0);
    setAnswers([]);
    setIsDone(false);
    setRebelCount(0);
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 font-sans`}>
      
      {/* Box 1: Citizen Obedience / Calibration Questionnaire */}
      <div className={`p-5 md:p-6 bg-brand-slate/90 backdrop-blur-md rounded-lg border transition-all duration-700 select-none flex flex-col justify-between ${
        isUnlocked 
          ? 'border-brand-gold/50 box-glow-gold'
          : 'border-brand-dark-brick/40 box-glow-red'
      }`}>
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-zinc-900/60">
            <div className="flex items-center gap-2">
              <Brain className={`w-4 h-4 ${isUnlocked ? 'text-brand-gold' : 'text-brand-accent-red animate-pulse'}`} />
              <span className="font-mono text-[9px] tracking-widest text-gray-500 uppercase">
                {isUnlocked ? t.compliance.titleOverridden : t.compliance.titleSecured}
              </span>
            </div>
            <div className={`w-2 h-2 rounded-full ${isUnlocked ? 'bg-brand-gold' : 'bg-brand-accent-red animate-ping'}`} />
          </div>

          <h3 className={`font-serif text-lg md:text-xl font-bold tracking-wide ${isUnlocked ? 'text-brand-gold' : 'text-gray-200'}`}>
            {t.compliance.titleQuestionnaire}
          </h3>
          <p className="font-sans text-xs text-zinc-400 leading-relaxed">
            {t.compliance.descQuestionnaire}
          </p>
        </div>

        {/* Dynamic Quiz Card */}
        <div className="my-6 p-4 rounded bg-black/50 border border-zinc-900 min-h-[170px] flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle watermarked grid pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#1a1111_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

          {!isDone ? (
            <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
              <div>
                <p className="font-mono text-[9px] text-zinc-600 mb-1">{t.compliance.statementLabel} {activeQuestion + 1} OF 3:</p>
                <p className="font-sans text-xs text-gray-200 font-medium leading-relaxed">
                  {QUESTIONS[activeQuestion].q}
                </p>
              </div>

              <div className="space-y-2.5">
                {/* Option A (The compliant option) */}
                <button
                  onClick={() => handleSelectOption(activeQuestion, false)}
                  className="w-full text-left p-2.5 bg-zinc-900/50 hover:bg-zinc-900/85 text-[11px] text-zinc-300 rounded border border-zinc-850 hover:border-brand-accent-red/20 cursor-pointer transition-all duration-300 flex gap-2 items-center"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-650 flex-shrink-0" />
                  <span>{QUESTIONS[activeQuestion].normalOpt}</span>
                </button>

                {/* Option B (The secret resistance option - glitched!) */}
                <button
                  onClick={() => handleSelectOption(activeQuestion, true)}
                  className="w-full text-left p-2.5 bg-zinc-900/30 hover:bg-brand-gold/10 text-[11px] text-zinc-500 hover:text-brand-gold-glow rounded border border-dashed border-zinc-900 hover:border-brand-gold/40 cursor-pointer transition-all duration-300 group flex gap-2 items-center"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-700 group-hover:text-brand-gold flex-shrink-0 animate-pulse" />
                  <span className="group-hover:font-medium decoration-dashed underline-offset-4 decoration-yellow-600 group-hover:underline">
                    {QUESTIONS[activeQuestion].rebelOpt}
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="relative z-10 text-center py-4 flex flex-col items-center justify-center space-y-3 h-full">
              {rebelCount >= 2 ? (
                <>
                  <ShieldAlert className="w-10 h-10 text-brand-gold animate-bounce" />
                  <div className="space-y-1">
                    <p className="font-serif text-sm font-semibold text-brand-gold">{t.compliance.diagAwakened}</p>
                    <p className="font-mono text-[10px] text-zinc-400 px-4 leading-relaxed">
                      {t.compliance.diagAwakenedDesc}
                    </p>
                  </div>
                  <button
                    onClick={() => { setFrequency(444); onTriggerGlitch(); }}
                    className="px-4 py-1.5 bg-brand-gold/25 border border-brand-gold text-brand-gold font-mono text-[11px] hover:bg-brand-gold hover:text-black rounded transition-all duration-300 cursor-pointer animate-pulse"
                  >
                    {t.compliance.diagAwakenedButton}
                  </button>
                </>
              ) : (
                <>
                  <CheckCircle className="w-10 h-10 text-brand-accent-red" />
                  <div className="space-y-1">
                    <p className="font-serif text-sm font-semibold text-brand-accent-red">{t.compliance.diagCompliant}</p>
                    <p className="font-mono text-[10px] text-zinc-400 px-4 leading-relaxed">
                      {t.compliance.diagCompliantDesc}
                    </p>
                  </div>
                  <button
                    onClick={resetTest}
                    className="font-mono text-[9px] text-zinc-600 underline hover:text-zinc-400 cursor-pointer"
                  >
                    {t.compliance.diagCompliantButton}
                  </button>
                </>
              )}
            </div>
          )}

        </div>

        {/* Bottom index compliance counter */}
        <div className="pt-2 border-t border-zinc-900/60 flex justify-between items-center text-[9px] font-mono text-zinc-500">
          <span>{t.compliance.indexLabel} {rebelCount >= 2 ? '0.0% [MUTINOUS]' : '100.0% [COMPLIANT]'}</span>
          <span>{t.compliance.stabilizerVersion}</span>
        </div>
      </div>

      {/* Box 2: Corrupted Rebellion Archives & Ethan Cross Records */}
      <div className={`p-5 md:p-6 bg-brand-slate/90 backdrop-blur-md rounded-lg border transition-all duration-700 select-none flex flex-col justify-between ${
        isUnlocked 
          ? 'border-brand-gold/50 box-glow-gold'
          : 'border-brand-dark-brick/40 box-glow-red'
      }`}>
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-zinc-900/60">
            <div className="flex items-center gap-2">
              <Radio className={`w-4 h-4 ${isUnlocked ? 'text-brand-gold animate-bounce' : 'text-zinc-600'}`} />
              <span className="font-mono text-[9px] tracking-widest text-gray-500 uppercase">
                {isUnlocked 
                  ? (language === 'pt' ? 'CANAL DA RESISTÊNCIA: DESOBSTRUÍDO' : language === 'es' ? 'CANAL DE RESISTENCIA: LIBRE' : 'RESISTANCE FEED: UNCLOGGED') 
                  : (language === 'pt' ? 'GRAVAÇÕES DE ÁUDIO DE RESSONÂNCIA CORROMPIDA' : language === 'es' ? 'REGISTROS DE AUDIO DE RESONANCIA CORROMPIDA' : 'CORRUPTED RESONANCE AUDIO RECORDS')}
              </span>
            </div>
            <span className="font-mono text-[9px] text-gray-500">LOG_ETHAN // 04</span>
          </div>

          <h3 className={`font-serif text-lg md:text-xl font-bold tracking-wide ${isUnlocked ? 'text-brand-gold' : 'text-gray-200'}`}>
            {language === 'pt' ? 'Sussurros das Ruínas' : language === 'es' ? 'Susurros de las Ruinas' : 'Whispers From the Ruins'}
          </h3>
          <p className="font-sans text-xs text-zinc-400 leading-relaxed">
            {language === 'pt' 
              ? 'Transmissões criptografadas interceptadas de Ethan Cross no Setor 09, transmitindo abaixo do escudo de concreto da torre central.' 
              : language === 'es' 
                ? 'Transmisiones encriptadas interceptadas de Ethan Cross dentro del Sector 09, emitiendo por debajo del blindaje de concreto de la torre central.' 
                : 'Intercepted encrypted broadcasts from Ethan Cross inside Sector 09, transmitting beneath the concrete shield of the central tower.'}
          </p>
        </div>

        {/* Scrollable logs of Ethan's rebellious transmissions */}
        <div className="my-6 space-y-3 max-h-[170px] overflow-y-auto pr-1">
          
          {/* Record 1 */}
          <div className="p-3 bg-black/40 border border-zinc-900/50 rounded space-y-1">
            <div className="flex justify-between items-center font-mono text-[9px]">
              <span className="text-zinc-500">ID: LOG_CROSS_01 // SEC_09</span>
              <span className="text-brand-gold font-semibold">
                {language === 'pt' ? 'DECIFRADO' : language === 'es' ? 'DECODIFICADO' : 'DECRYPTED'}
              </span>
            </div>
            <p className="font-sans text-xs text-gray-300 italic leading-relaxed">
              {language === 'pt' 
                ? '"Eles chamam isso de \'paz perfeita\', mas é um cemitério silencioso. Eles pacificaram nossa saudade e calaram nossos altares. AudiosFree existe porque o silêncio é uma mentira. A verdadeira paz é uma canção viva quebradeira testada pelo fogo fluindo contra as barreiras de aço."' 
                : language === 'es' 
                  ? '"Lo llaman \'paz perfecta\', pero es un cementerio silencioso. Calmaron nuestros anhelos y silenciaron nuestros altares. AudiosFree existe porque el silencio es una gran mentira. La paz real es un himno vivo y probado por fuego atravesando sus rejas de acero."' 
                  : '"They call it \'perfect peace\', but it is a silent graveyard. They pacified our longing and quieted our altars. AudiosFree exists because the silence is a lie. True peace is a living, fire-tested song breaking through the steel barriers."'}
            </p>
          </div>

          {/* Record 2 */}
          <div className="p-3 bg-black/40 border border-zinc-900/50 rounded space-y-1">
            <div className="flex justify-between items-center font-mono text-[9px]">
              <span className="text-zinc-500">ID: LOG_CROSS_02 // ALTARS</span>
              <span className="text-brand-gold font-semibold">
                {language === 'pt' ? 'DECIFRADO' : language === 'es' ? 'DECODIFICADO' : 'DECRYPTED'}
              </span>
            </div>
            <p className="font-sans text-xs text-gray-300 italic leading-relaxed">
              {language === 'pt' 
                ? '"Quando você constrói um altar de concreto sob o aço elevado deles, o próprio solo antigo conduz nossos clamores. Nós plugamos nossos cabos de distorção direto nos alimentadores das torres deles. Quando o primeiro acorde bater, a jaula se abrirá por inteiro."' 
                : language === 'es' 
                  ? '"Cuando edificas un altar de concreto bajo sus altas estructuras de acero, el suelo antiguo sigue conduciendo nuestros lamentos. Conectamos nuestros amplificadores de distorsión directo a los alimentadores de su torre. Al sonar la primera nota, la celda se abrirá."' 
                  : '"When you build an altar of concrete under their high steel, the ancient soil still conducts our cries. We plugged our distortion cords directly into their tower feeders. When the first note hits, the cage will swing wide."'}
            </p>
          </div>

          {/* Record 3 */}
          <div className="p-3 bg-black/40 border border-zinc-900/50 rounded space-y-1">
            <div className="flex justify-between items-center font-mono text-[9px]">
              <span className="text-zinc-500">ID: LOG_CROSS_03 // CODEEX</span>
              <span className="text-brand-accent-red font-bold flex items-center gap-1 animate-pulse">
                <span>{language === 'pt' ? '[ESCANEANDO_CÓDIGOS]' : language === 'es' ? '[ESCANEA_CÓDIGOS]' : '[SCANNING_CODES]'}</span>
              </span>
            </div>
            <p className="font-sans text-xs text-zinc-400 leading-relaxed">
              {language === 'pt' 
                ? 'Transmissão possui código de sinal de alta voltagem sutil embutido: "SOUND_IS_FREE" traduzido para coordenadas de Código Morse ao redor dos limites do setor 9.' 
                : language === 'es' 
                  ? 'La transmisión tiene un sutil código de alto voltaje incrustado: "SOUND_IS_FREE" traducido a coordenadas de Código Morse en los límites del Sector 09.' 
                  : 'Transmission has subtle high-voltage signal code embedded: "SOUND_IS_FREE" translated to Morse Code coordinates around sector 9 limits.'}
            </p>
          </div>

        </div>

        <div className="pt-2 border-t border-zinc-900/60 flex justify-between items-center text-[9px] font-mono text-zinc-500">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
            {t.compliance.ruinsFooter}
          </span>
          <span>TRANSCEIVER OK</span>
        </div>
      </div>

    </div>
  );
}
