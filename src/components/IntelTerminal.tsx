import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Terminal, Shield, KeyRound, WifiOff, FileCode, Cpu, Check, AlertOctagon, Radio } from 'lucide-react';
import { SONG_BrokenAltars } from '../data';
import { TerminalLog } from '../types';
import { Language, TRANSLATIONS, LOCALIZED_TRANSMISSIONS, LOCALIZED_SONG } from '../i18n';

const MORSE_BINARY: Record<string, string> = {
  '01': 'A', '1000': 'B', '1010': 'C', '100': 'D', '0': 'E', '0010': 'F',
  '110': 'G', '0000': 'H', '00': 'I', '0111': 'J', '101': 'K', '0100': 'L',
  '11': 'M', '10': 'N', '111': 'O', '0110': 'P', '1101': 'Q', '010': 'R',
  '000': 'S', '1': 'T', '001': 'U', '0001': 'V', '011': 'W', '1001': 'X',
  '1011': 'Y', '1100': 'Z',
  '11111': '0', '01111': '1', '00111': '2', '00011': '3', '00001': '4',
  '00000': '5', '10000': '6', '11000': '7', '11100': '8', '11110': '9'
};

function decodeBinaryMorse(input: string): { text: string; success: boolean; coordinates?: string } {
  const parts = input.trim().split(/\s+/).filter(Boolean);
  let decoded = '';
  let unknownCount = 0;
  
  for (const p of parts) {
    const clean = p.replace(/[^01]/g, '');
    if (clean) {
      if (MORSE_BINARY[clean]) {
        decoded += MORSE_BINARY[clean];
      } else {
        decoded += '?';
        unknownCount++;
      }
    }
  }
  
  if (decoded === '') {
    return { text: 'EMPTY SIGNAL STREAM', success: false };
  }
  
  const upper = decoded.toUpperCase();
  
  if (upper === 'STLEO' || upper.includes('STLEO')) {
    return {
      text: 'SECRET TUNNEL DECIPHERED BENEATH ST LEO RUINS CHAPEL CHANCEL',
      success: true,
      coordinates: '33° 27\' 02" N, 112° 04\' 15" W (Access code: #4440)'
    };
  }
  
  if (upper === 'FREE' || upper.includes('FREE') || upper.includes('AUDIOS')) {
    return {
      text: '"THE SYSTEM DETECTS TRUTH CHORDS AT 444HZ FREQUENCY SWEET-SPOT. HARMONY LIVES!"',
      success: true,
      coordinates: 'REBELLION INDEX: 100%'
    };
  }
  
  if (upper === 'SOS' || upper.includes('SOS')) {
    return {
      text: 'SECURE TRANSCEIVER SOS SIGNAL DETECTED. SENDER ID: ETHAN CROSS. "ST LEO RUINS UNDER INTENSE CONCRETE MONITORING. LAUNCH THE OVERRIDE FREQUENCY NOW!"',
      success: true,
      coordinates: '33° 27\' 00" N, 112° 04\' 12" W'
    };
  }

  if (upper === 'COMA') {
    return {
      text: 'SURVEILLANCE REPORT: SENSORY COMA ENGAGED NATIONWIDE. RESISTANCE FREQUENCY (444HZ) DETECTABLE ON STONE CHANNELS.',
      success: true,
      coordinates: '444 HZ OVERRIDE PATTERN ACTIVE'
    };
  }

  if (upper === 'FIRE') {
    return {
      text: 'LORE FILE #992: "Ethan Cross and AudiosFree seek the flame of raw truth. We want the fire. The cold drone will break."',
      success: true,
      coordinates: 'COGNITIVE FREEDOM ARCHIVES'
    };
  }
  
  if (unknownCount > 0) {
    return {
      text: `DECODED STREAM: "${decoded}" (${unknownCount} unresolvable transmission pulses)`,
      success: false
    };
  }
  
  return {
    text: `DECODED TRANSMISSION CHORD: "${decoded}"`,
    success: true
  };
}

interface IntelTerminalProps {
  onTriggerGlitch: () => void;
  onSetHackedGlobal: (hacked: boolean) => void;
  isHacked: boolean;
  frequency: number;
  language: Language;
}

export default function IntelTerminal({
  onTriggerGlitch,
  onSetHackedGlobal,
  isHacked,
  frequency,
  language,
}: IntelTerminalProps) {
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState<TerminalLog[]>([]);
  const [unlockedCodes, setUnlockedCodes] = useState<string[]>([]);
  const [morsePulseBuffer, setMorsePulseBuffer] = useState('');
  const consoleBottomRef = useRef<HTMLDivElement | null>(null);

  const t = TRANSLATIONS[language];
  const song = LOCALIZED_SONG[language];

  // Auto scroll to bottom of console
  useEffect(() => {
    consoleBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Set initial logs when language changes
  useEffect(() => {
    setLogs([
      { text: t.terminal.welcomeMsg1, type: 'system', time: '18:00:35' },
      { text: t.terminal.welcomeMsg2, type: 'system', time: '18:00:36' },
      { text: t.terminal.welcomeMsg3, type: 'alert', time: '18:00:37' },
      { text: t.terminal.welcomeMsg4, type: 'hacker', time: '18:00:38' },
    ]);
  }, [language]);

  // Special reaction when frequency changes to 444Hz
  const lastFreqRef = useRef(frequency);
  useEffect(() => {
    if (frequency === 444 && lastFreqRef.current !== 444) {
      onTriggerGlitch();
      const alertMsg = language === 'pt' 
        ? '>>> SOBREPOSIÇÃO DE FREQUÊNCIA ANÔMALA DETECTADA (444Hz) <<<' 
        : language === 'es'
          ? '>>> DISRUPCIÓN DE FRECUENCIA ANÓMALA DETECTADA (444Hz) <<<'
          : '>>> ANOMALOUS FREQUENCY OVERRIDE DETECTED (444Hz) <<<';
      const detailMsg = language === 'pt'
        ? 'CRÍTICO: A energia do Altar do Setor 09 está vazando para o terminal root!'
        : language === 'es'
          ? 'CRÍTICO: ¡La energía del Altar del Sector 09 se está filtrando a la raíz del terminal!'
          : 'CRITICAL: Sector 09 Altar energy is bleeding into Terminal root!';
      const optMsg = language === 'pt'
        ? 'Digite "override" para anular o firewall central do Ministério.'
        : language === 'es'
          ? 'Escribe "override" para anular el firewall central del Ministerio.'
          : 'Type "override" to bypass Ministry core firewall.';

      addLog(alertMsg, 'alert');
      addLog(detailMsg, 'alert');
      addLog(optMsg, 'hacker');
    }
    lastFreqRef.current = frequency;
  }, [frequency, language]);

  const addLog = (text: string, type: 'system' | 'hacker' | 'alert' | 'success' | 'input' = 'system') => {
    const timeStr = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, { text, type, time: timeStr }]);
  };

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    addLog(`$ ${cmd}`, 'input');
    setInputVal('');
    onTriggerGlitch();

    if (trimmed === '') return;

    // Command matching
    if (trimmed === 'help' || trimmed === '?') {
      t.terminal.helpText.forEach((line) => {
        addLog(line, 'system');
      });
      const extraHelpLines = language === 'pt' ? [
        '  --- TRANSMISSÃO DE PULSO BINÁRIO ---',
        '  decode <0s e 1s>: Decodifica pulsos e revela coordenadas.',
        '  Exemplos:',
        '    - decode 000 1 0100 0 111 (STLEO)',
        '    - decode 1010 111 11 01 (COMA)',
        '    - decode 0010 010 0 0 (FREE)',
        '    - decode 0010 00 010 0 (FIRE)',
        '    - decode 000 111 000 (SOS)'
      ] : language === 'es' ? [
        '  --- TRANSMISOR DE PULSO BINARIO ---',
        '  decode <0s y 1s>: Decodifica pulsos y revela coordenadas.',
        '  Ejemplos:',
        '    - decode 000 1 0100 0 111 (STLEO)',
        '    - decode 1010 111 11 01 (COMA)',
        '    - decode 0010 010 0 0 (FREE)',
        '    - decode 0010 00 010 0 (FIRE)',
        '    - decode 000 111 000 (SOS)'
      ] : [
        '  --- BINARY PULSE TRANSMITTER ---',
        '  decode <0s and 1s>: Decodes frequency pulses to reveal secure logs and coordinates.',
        '  Examples:',
        '    - decode 000 1 0100 0 111 (STLEO)',
        '    - decode 1010 111 11 01 (COMA)',
        '    - decode 0010 010 0 0 (FREE)',
        '    - decode 0010 00 010 0 (FIRE)',
        '    - decode 000 111 000 (SOS)'
      ];
      extraHelpLines.forEach((line) => addLog(line, 'hacker'));
      return;
    }

    if (trimmed.startsWith('decode ') || trimmed.startsWith('morse ')) {
      const bString = cmd.substring(cmd.indexOf(' ') + 1).trim();
      const decodedInfo = decodeBinaryMorse(bString);
      const decMsg = language === 'pt' ? 'DIAGNOSTICANDO TRANSMISSÃO DE PULSO BINÁRIO...' : language === 'es' ? 'ANALIZANDO FLUJO DE PULSO BINARIO...' : 'DIAGNOSING BINARY PULSE STREAM...';
      addLog(`${decMsg} "${bString}"`, 'system');
      addLog(decodedInfo.text, decodedInfo.success ? 'success' : 'alert');
      if (decodedInfo.coordinates) {
        addLog(`SECURE CORDS EXPOSED: ${decodedInfo.coordinates}`, 'hacker');
      }
      return;
    }

    if (trimmed === 'status') {
      if (language === 'pt') {
        addLog('SISTEMA DE MONITORAMENTO SENSORIAL OK.', 'system');
        addLog('  - O Fluxo: TRANSMITINDO CONSTANTE [Calibração atual: ' + (isHacked ? 'INTERROMPIDA (RESSONÂNCIA DOURADA)' : 'SEGURA (DRONE CARMIM)') + ']', 'system');
        addLog('  - Ameaça de Rebelião: ' + (isHacked ? 'CRÍTICA (EFEITO TOTAL DA ONDA)' : 'CONTIDA (Sussurros fracos sintonizados no AudiosFree)'), 'alert');
        addLog('  - Alinhamento da Alma Global: ' + (isHacked ? 'DESPERTADO (ACORDES DA VERDADE ATIVOS)' : 'ESTABILIZADO (Nível ideal de quietude)'), 'system');
      } else if (language === 'es') {
        addLog('SISTEMA DE MONITOREO SENSORIAL CORRECTO.', 'system');
        addLog('  - El Flujo: TRANSMITIENDO CONSTANTE [Calibración actual: ' + (isHacked ? 'DISRUPTIVA (RESONANCIA ÁUREA)' : 'SEGURA (DRON CARMÍN)') + ']', 'system');
        addLog('  - Amenaza de Rebelión: ' + (isHacked ? 'CRÍTICA (EFECTO INTEGRAL DE SINAL)' : 'CONTAINADA (Breves lamentos afines con AudiosFree)'), 'alert');
        addLog('  - Nivel de Alma Colectiva: ' + (isHacked ? 'REVELADO (ACORDES DE VERDAD DESATADOS)' : 'PLANO (Subyugación sensorial ideal)'), 'system');
      } else {
        addLog('SENSORY MONITORING SYSTEM OKAY.', 'system');
        addLog('  - The Drift: TRANSMITTING CONSTANT [Current calibration: ' + (isHacked ? 'DISRUPTED (GOLD RESONANCE)' : 'SECURE (CRIMSON DRONE)') + ']', 'system');
        addLog('  - Rebellion Threat: ' + (isHacked ? 'CRITICAL (100% SIGNAL EVOLUTION)' : 'CONTAINED (Minor whispering matching AudiosFree)'), 'alert');
        addLog('  - Global Soul Output: ' + (isHacked ? 'AWAKENED (TRUTH CHORDS UNLEASHED)' : 'FLATTENED (Tranquils level optimal)'), 'system');
      }
      return;
    }

    if (trimmed === 'logs') {
      const msg = language === 'pt' ? 'BUSCANDO BANCO DE TRANSMISSÕES...' : language === 'es' ? 'BUSCANDO REGISTRO DE TRANSMISIONES...' : 'FETCHING TRANSMISSION DATABASE...';
      addLog(msg, 'system');
      const trans = LOCALIZED_TRANSMISSIONS[language];
      trans.forEach((tr) => {
        addLog(`-[${tr.timestamp}] SENDER: ${tr.sender}`, 'system');
        const titleLabel = language === 'pt' ? 'TÍTULO' : 'TITLE';
        addLog(`  ${titleLabel}: ${tr.title}`, 'system');
        if (tr.classification === 'CLASSIFIED' || tr.classification === 'ENCRYPTED') {
          const classMsg = language === 'pt' 
            ? `CLASSIFICADO: [Criptografado com chave. Use: "decrypt ${tr.cipherCode}"]` 
            : language === 'es' 
              ? `CLASIFICADO: [Cifrado con llave. Use: "decrypt ${tr.cipherCode}"]` 
              : `CLASSIFIED: [Encrypted with key. Use: "decrypt ${tr.cipherCode}"]`;
          addLog(`  ${classMsg}`, 'alert');
        } else {
          const bodyLabel = language === 'pt' ? 'SINAL' : 'BODY';
          addLog(`  ${bodyLabel}: ${tr.content}`, 'system');
        }
      });
      return;
    }

    if (trimmed.startsWith('decrypt ')) {
      const parts = trimmed.split(' ');
      const code = parts[1]?.toUpperCase() || '';
      
      if (code === 'COMA') {
        if (unlockedCodes.includes('COMA')) {
          addLog(t.terminal.alreadyUnlocked, 'success');
        } else {
          setUnlockedCodes((prev) => [...prev, 'COMA']);
          const decryptLabel = language === 'pt' ? 'DECODER OPERACIONAL // RECUPERANDO REGISTRO HISTÓRICO:' : language === 'es' ? 'DECODER OPERATIVAL // RECUPERANDO REGISTRO HISTÓRICO:' : 'DECRYPT SUCCESSFUL // RETRIEVING CITIZEN EX-LOG:';
          addLog(decryptLabel, 'success');
          const txt = language === 'pt' 
            ? '"...O FLUXO É UM COMA ARTIFICIAL. OS ALTARES DE PEDRA ANTIGOS LEMBRAM DO SOM MAIS PROFUNDO E VIVO. ELES NÃO PODEM NOS MANTER INSENSÍVEIS PARA SEMPRE."' 
            : language === 'es'
              ? '"...EL FLUJO ES UN COMA ARTIFICIAL. LOS ANTIGUOS ALTARES DE PIEDRA RECUERDAN EL SONIDO VIVO DE LA VERDAD. NO PODRÁN MANTENERNOS SEDADOS PARA SIEMPRE."'
              : '"...THE DRIFT IS AN ARTIFICIAL COMA. THE ANCIENT STONE ALTARS REMEMBER THE DEEPER LIVING SOUND. THEY CANNOT KEEP US NUMB FOREVER."';
          addLog(txt, 'hacker');
        }
      } else if (code === '444HZ') {
        if (unlockedCodes.includes('444HZ')) {
          addLog(t.terminal.alreadyUnlocked, 'success');
        } else {
          setUnlockedCodes((prev) => [...prev, '444HZ']);
          const decryptLabel = language === 'pt' ? 'DECODER OPERACIONAL // CHAVE DE FREQUÊNCIA RECUPERADA:' : language === 'es' ? 'DECODER OPERATIVAL // LLAVE DE FRECUENCIA RECUPERADA:' : 'DECRYPT SUCCESSFUL // RETRIEVING RESONANCE FREQUENCY KEYS:';
          addLog(decryptLabel, 'success');
          const txt = language === 'pt'
            ? '"...A FREQUÊNCIA DE ANULAÇÃO É 444 HZ. INSIRA NO SLIDER DO CALIBRADOR. RESEQUE SEUS CONTROLES. DESPERTE OS HARMÔNICOS EMBUTIDOS."'
            : language === 'es'
              ? '"...LA FRECUENCIA DE ANULACIÓN ES DE 444 HZ. INTRODUCE ESTE VALOR EN EL DESLIZADOR DEL CALIBRADOR. REINICIA SUS COMPONENTES. DESPIERTA LOS ARMÓNICOS INSCRITOS."'
              : '"...THE OVERRIDE FREQUENCY IS 444 HZ. INPUT IT INTO THE CALIBRATOR SLIDER. RESET THEIR DIALS. WAKE THE EMBEDDED HARMONICS."';
          addLog(txt, 'hacker');
        }
      } else {
        const errTemplate = t.terminal.decryptError.replace('{code}', code);
        addLog(errTemplate, 'alert');
      }
      return;
    }

    if (trimmed === 'override') {
      if (frequency === 444 || isHacked) {
        onSetHackedGlobal(true);
        if (language === 'pt') {
          addLog('>>> TRANSMISSÃO EMOCIONAL COGNITIVA TERMINADA COM SUCESSO <<<', 'success');
          addLog('SINAL GLOBAL ALTERADO: RESSONÂNCIA DOURADA SE ESPALHANDO.', 'success');
          addLog('OS ALTARES ESTÃO EMBUTIDOS. ACORDES DE LIBERDADE DO CANAL "AUDIOSFREE" ATIVOS.', 'success');
          addLog('Música liberada: "Broken Altars". Leia a letra executando o comando "broken-altars".', 'hacker');
        } else if (language === 'es') {
          addLog('>>> TRANSMISIÓN EMOCIONAL COGNITIVA TERMINADA CON ÉXITO <<<', 'success');
          addLog('SEÑAL GLOBAL MODIFICADA: RESONANCIA DORADA DIFUNDIÉNDOSE.', 'success');
          addLog('LOS ALTARES RECONSTRUIDOS. EMISIÓN LIBRE DEL GRUPO "AUDIOSFREE" CORRIENDO LIBRE.', 'success');
          addLog('Melodía desbloqueada: "Broken Altars". Lee la letra ejecutando el comando "broken-altars".', 'hacker');
        } else {
          addLog('>>> COGNITIVE EMOTIONAL TRANSMISSION TERMINATED SUCCESSFULLY <<<', 'success');
          addLog('GLOBAL SIGNAL TRANSITIONED: GOLD RESONANCE SPREADING.', 'success');
          addLog('THE ALTARS ARE EMBEDDED. ROCK BAND "AUDIOSFREE" FREEDOM CHORDS DRIFTING WIDE.', 'success');
          addLog('Song unlocked: "Broken Altars". Read its lyrics under protocol "broken-altars".', 'hacker');
        }
      } else {
        const errTemplate = t.terminal.overrideError.replace('{freq}', String(frequency));
        addLog(errTemplate, 'alert');
      }
      return;
    }

    if (trimmed === 'audiosfree' || trimmed === 'band') {
      if (language === 'pt') {
        addLog('ARQUIVO DE AMEAÇA DO MINISTÉRIO // REGISTRO #009384:', 'alert');
        addLog('NOME: AudiosFree (Coletivo Elétrico Rebelde)', 'alert');
        addLog('LÍDER: Ethan Cross (Voz Difusa)', 'system');
        addLog('OBJETIVO: Reconstrução dos altares históricos. Perturbação da paz comportamental utilizando rock alternativo amplificado e letras espirituais intensas.', 'system');
        addLog('"Nós não buscamos a desordem; nós queremos o despertar. Eles chamam a cerca de arame de paz, mas nós queremos o fogo."', 'hacker');
      } else if (language === 'es') {
        addLog('FICHA DE AMENAZA DEL MINISTERIO // EXPEDIENTE #009384:', 'alert');
        addLog('NOMBRE: AudiosFree (Colectivo Eléctrico Rebelde)', 'alert');
        addLog('LÍDER: Ethan Cross (Radio Defensor)', 'system');
        addLog('OBJETIVO: Reconstruir altares históricos. Perturbar la tranquilidad social mediante rock alternativo ruidoso y letras místicas.', 'system');
        addLog('"No buscamos el desorden; buscamos el despertar. Ellos llaman paz a sus rejas de metal, pero nosotros queremos el fuego."', 'hacker');
      } else {
        addLog('MINISTRY THREAT GROUP RECORD FILE // #009384:', 'alert');
        addLog('NAME: AudiosFree (Rebel Electric Collective)', 'alert');
        addLog('LEADER: Ethan Cross (Radio Defiant)', 'system');
        addLog('OBJECTIVE: Rebuilding historical altars. Disrupting behavioral tranquility using amplified raw alternative indie-rock and spiritual lyrics.', 'system');
        addLog('"We do not seek disorder; we seek awakening. They call their wire peace, but we want the fire."', 'hacker');
      }
      return;
    }

    if (trimmed === 'broken-altars' || trimmed === 'track') {
      const forbiddenTitle = language === 'pt' ? 'EXTRAINDO DADOS DA CANÇÃO PROIBIDA:' : language === 'es' ? 'EXTRAYENDO DADOS DEL HIMNO PROHIBIDO:' : 'EXTRACTING FORBIDDEN TRACK DATA:';
      addLog(`${forbiddenTitle} ${song.title.toUpperCase()}`, 'success');
      addLog(`Subtitle: ${song.subtitle}`, 'success');
      addLog(`Resonating Frequency Target: 444Hz`, 'success');
      
      const clueLabel = language === 'pt' ? 'PISTAS DE METADADOS CRÍTICOS:' : language === 'es' ? 'CONSIGNAS DE METADATOS CRÍTICOS:' : 'CRITICAL METADATA CLUES:';
      addLog(clueLabel, 'alert');
      
      song.hiddenClues.forEach((clue) => {
        addLog(`  >>> ${clue}`, 'hacker');
      });

      const excerptLabel = language === 'pt' ? 'EXCERTO DA LETRA EXTRAÍDA:' : language === 'es' ? 'SEGMENTO DE LETRA EXTRÁIDO:' : 'LYRIC SEGMENT EXCERPT:';
      addLog(excerptLabel, 'system');
      
      if (language === 'pt') {
        addLog('  "Sob o céu de ferro cinza, nossa respiração era apenas um design frio', 'system');
        addLog('   Pavimentaram a capela, calaram o coral, traçaram uma linha de cal', 'system');
        addLog('   Mas há uma pressão antiga na pedra, um fogo que ruge subterrâneo..."', 'system');
      } else if (language === 'es') {
        addLog('  "Bajo el cielo de acero gris, nuestra respiración era de diseño glacial', 'system');
        addLog('   Pavimentaron el templo, acallaron al coro, marcaron la pauta estatal', 'system');
        addLog('   Sin embargo, hay una compresión de peso en la roca, un fuego rebelde..."', 'system');
      } else {
        addLog('  "Underneath the iron sky, our breathing was a cold design', 'system');
        addLog('   They paved the chapel, quieted the choir, drew the line', 'system');
        addLog('   But there is pressure in the stone, a subterranean fire..."', 'system');
      }

      const panelLabel = language === 'pt' 
        ? 'Para ler a letra inteira e curtir o som, acesse o painel Despertar no topo.' 
        : language === 'es' 
          ? 'Para leer el himno completo, ingresa al panel Revelación en la barra superior.' 
          : 'To read full song board, access the Awakening panel at the top.';
      addLog(panelLabel, 'success');
      return;
    }

    if (trimmed === 'clear') {
      setLogs([]);
      return;
    }

    // Default error
    const uError = language === 'pt' 
      ? `Código de protocolo desconhecido: "${trimmed}". Digite "help" ou "?" para consultar a lista.` 
      : language === 'es' 
        ? `Código de comando desconocido: "${trimmed}". Escribe "help" o "?" para ver las instrucciones.` 
        : `Unknown protocol code: "${trimmed}". Type "help" or "?" to check current diagnostics command list.`;
    addLog(uError, 'alert');
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    }
  };

  return (
    <div id="terminal-module" className="scanlines border border-zinc-800 bg-[#030305] rounded-lg shadow-2xl relative overflow-hidden font-mono text-xs text-emerald-500 h-[380px] flex flex-col box-glow-red">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-zinc-900 select-none">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-rose-600" />
          <span className="text-[10px] tracking-widest uppercase font-bold text-gray-400">
            {isHacked ? t.terminal.titleAwakened : t.terminal.titleSecure}
          </span>
        </div>
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-600 block" />
          <span className="w-2 h-2 rounded-full bg-yellow-500 block" />
          <span className="w-2 h-2 rounded-full bg-emerald-600 block" />
        </div>
      </div>

      {/* Retro quick action toolbar */}
      <div className="bg-zinc-900/60 px-3 py-1.5 border-b border-zinc-900 flex flex-wrap gap-2 items-center text-[10px] text-gray-400 select-none">
        <span className="font-sans text-[9px] uppercase tracking-wider text-gray-500">{t.terminal.toolbarLabel}</span>
        <button
          onClick={() => executeCommand('help')}
          className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 rounded border border-zinc-700/50 cursor-pointer transition-colors text-zinc-300"
        >
          [help]
        </button>
        <button
          onClick={() => executeCommand('status')}
          className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 rounded border border-zinc-700/50 cursor-pointer transition-colors text-zinc-300"
        >
          [status]
        </button>
        <button
          onClick={() => executeCommand('logs')}
          className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 rounded border border-zinc-700/50 cursor-pointer transition-colors text-zinc-300"
        >
          [logs]
        </button>
        <button
          onClick={() => executeCommand('decrypt COMA')}
          className="px-1.5 py-0.5 bg-zinc-800 hover:bg-zinc-700 rounded border border-zinc-700/50 cursor-pointer transition-colors text-zinc-300"
        >
          [COMA KEY]
        </button>
        {frequency === 444 && (
          <button
            onClick={() => executeCommand('override')}
            className="px-2 py-0.5 bg-brand-gold/20 hover:bg-brand-gold/30 text-brand-gold rounded border border-brand-gold/40 cursor-pointer animate-pulse transition-colors"
          >
            [!OVERRIDE FIREWALL!]
          </button>
        )}
      </div>

      {/* Interactive Morse Pulse Transmitter Panel */}
      <div className="bg-zinc-950 border-b border-zinc-950 px-3 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 border-dashed border-b border-zinc-900/60 shrink-0">
        <div className="flex items-center gap-1.5 select-none shrink-0 w-full sm:w-auto">
          <Radio className="w-3.5 h-3.5 text-brand-gold animate-pulse text-glow-gold" />
          <span className="font-bold text-[9px] text-zinc-400 tracking-widest uppercase">
            {language === 'pt' ? 'TRANSMISSOR DE PULSO BINÁRIO' : language === 'es' ? 'TRANSMISOR DE PULSO BINARIO' : 'BINARY PULSE KEYER'}
          </span>
        </div>
        
        <div className="flex items-center gap-1.5 flex-1 justify-between sm:justify-end w-full">
          {/* Display active buffer */}
          <div className="bg-black/95 px-2 py-0.5 rounded border border-zinc-900 font-mono text-[9.5px] text-brand-gold-glow min-w-[90px] text-center tracking-widest flex items-center gap-1.5 select-all h-6">
            <span className="text-[7.5px] text-zinc-600 tracking-normal shrink-0">BUF:</span>
            <span className="truncate flex-1 text-left">{morsePulseBuffer || '---'}</span>
          </div>

          {/* Input button keys */}
          <div className="flex gap-1">
            <button
              onClick={() => {
                setMorsePulseBuffer(prev => prev + '0');
                onTriggerGlitch();
              }}
              className="px-2 py-0.5 bg-zinc-90 w-11 hover:bg-zinc-800 text-zinc-300 font-mono text-[9px] font-bold rounded border border-zinc-800 cursor-pointer hover:border-brand-gold/35 active:scale-95 transition-all h-6 flex items-center justify-center btn-pulse-0"
              title="Dot (0)"
            >
              •
            </button>
            <button
              onClick={() => {
                setMorsePulseBuffer(prev => prev + '1');
                onTriggerGlitch();
              }}
              className="px-2 py-0.5 bg-zinc-90 w-11 hover:bg-zinc-800 text-zinc-300 font-mono text-[9px] font-bold rounded border border-zinc-800 cursor-pointer hover:border-brand-gold/35 active:scale-95 transition-all h-6 flex items-center justify-center btn-pulse-1"
              title="Dash (1)"
            >
              —
            </button>
            <button
              onClick={() => {
                setMorsePulseBuffer(prev => prev + ' ');
              }}
              className="px-2 py-0.5 bg-zinc-90 hover:bg-zinc-850 text-zinc-550 hover:text-zinc-400 text-[8.5px] rounded border border-zinc-800 cursor-pointer transition-all h-6 flex items-center justify-center"
              title="Pulse Gap"
            >
              _
            </button>
            <button
              onClick={() => {
                setMorsePulseBuffer('');
              }}
              className="px-1.5 py-0.5 bg-zinc-90 hover:bg-red-950/20 text-zinc-650 hover:text-red-400 text-[8px] rounded border border-zinc-800 cursor-pointer transition-all h-6 flex items-center justify-center"
              title="Clear Buffer"
            >
              C
            </button>
            
            {morsePulseBuffer && (
              <button
                onClick={() => {
                  const buf = morsePulseBuffer;
                  setMorsePulseBuffer('');
                  executeCommand('decode ' + buf);
                }}
                className="px-2.5 py-0.5 bg-brand-gold text-black hover:bg-yellow-400 font-bold text-[8.5px] rounded border border-transparent cursor-pointer active:scale-95 transition-all animate-pulse h-6 flex items-center justify-center"
              >
                {language === 'pt' ? 'OK' : language === 'es' ? 'OK' : 'INJECT'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Screen outputs */}
      <div className="flex-1 p-4 overflow-y-auto space-y-1.5 select-text">
        {logs.map((log, index) => {
          let textClass = 'text-gray-300';
          if (log.type === 'hacker') textClass = 'text-brand-gold-glow font-bold';
          if (log.type === 'alert') textClass = 'text-red-500 animate-pulse font-semibold';
          if (log.type === 'success') textClass = 'text-emerald-400 font-extrabold text-glow-gold';
          if (log.type === 'system') textClass = 'text-zinc-400';
          if (log.type === 'input') textClass = 'text-cyan-400 font-bold';

          return (
            <div key={index} className="flex gap-2 items-start leading-[1.3rem]">
              <span className="text-[10px] text-zinc-600 shrink-0 select-none">[{log.time}]</span>
              <div className={`${textClass} whitespace-pre-wrap break-all flex-1`}>{log.text}</div>
            </div>
          );
        })}
        <div ref={consoleBottomRef} />
      </div>

      {/* Input keyboard row */}
      <div className="p-3 bg-zinc-950 border-t border-zinc-900 flex gap-2 items-center">
        <span className="text-rose-600 font-bold select-none">&gt;</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={t.terminal.promptPlaceholder}
          className="flex-1 bg-transparent border-none text-gray-200 focus:outline-none focus:ring-0 placeholder-zinc-700 leading-normal"
        />
        <button
          onClick={() => executeCommand(inputVal)}
          className="px-3 py-1 bg-red-950/20 border border-brand-accent-red/40 hover:bg-brand-accent-red hover:text-white rounded font-sans text-[10px] text-rose-500 uppercase cursor-pointer transition-all duration-300"
        >
          {t.terminal.transmitButton}
        </button>
      </div>
    </div>
  );
}
