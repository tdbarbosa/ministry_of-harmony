import { Transmission, InUniverseDoc, SongLyrics } from './types';
import { TRANSMISSIONS, GENERAL_DOCS, SONG_BrokenAltars } from './data';

export type Language = 'en' | 'pt' | 'es';

export interface I18nContent {
  intro: {
    title: string;
    subtitle: string;
    warningTitle: string;
    warningBody: string;
    consent: string;
    button: string;
  };
  header: {
    subtitle: string;
    statusLabel: string;
    statusActive: string;
    statusNormal: string;
    resonanceLabel: string;
    breachButton: string;
    overrideSubtitle: string;
  };
  hero: {
    title: string;
    titleAwakened: string;
    tagline: string;
    taglineAwakened: string;
    descNormal: string;
    descAwakened: string;
  };
  tabs: {
    overview: string;
    terminal: string;
    compliance: string;
    rebellion: string;
  };
  optimizer: {
    titleSecure: string;
    titleBreach: string;
    buttonActive: string;
    buttonInit: string;
    warningBanner: string;
    scopeLabel: string;
    slider1Title: string;
    slider1Left: string;
    slider1Middle: string;
    slider1Right: string;
    slider1Max: string;
    slider2Title: string;
    slider2State: string;
    slider2Left: string;
    slider2Middle: string;
    slider2Right: string;
    sweetSpotTitle: string;
    sweetSpotDesc: string;
    offlineLabel: string;
    offlineButton: string;
    devicesCount: string;
    coordinatesLabel: string;
  };
  terminal: {
    titleSecure: string;
    titleAwakened: string;
    toolbarLabel: string;
    promptPlaceholder: string;
    transmitButton: string;
    welcomeMsg1: string;
    welcomeMsg2: string;
    welcomeMsg3: string;
    welcomeMsg4: string;
    helpText: string[];
    decryptError: string;
    overrideError: string;
    alreadyUnlocked: string;
  };
  compliance: {
    titleSecured: string;
    titleOverridden: string;
    titleQuestionnaire: string;
    descQuestionnaire: string;
    statementLabel: string;
    diagAwakened: string;
    diagAwakenedDesc: string;
    diagAwakenedButton: string;
    diagCompliant: string;
    diagCompliantDesc: string;
    diagCompliantButton: string;
    indexLabel: string;
    stabilizerVersion: string;
    ruinsFooter: string;
  };
  songDeck: {
    unlockedBadge: string;
    forbiddenBadge: string;
    playerActive: string;
    playerReady: string;
    altarWitness: string;
    altarWitnessQuote: string;
    specTitle: string;
    specSub: string;
    decryptStatusAwakened: string;
    decryptStatusRestricted: string;
  };
  footer: {
    tagline: string;
    songBtn: string;
  };
}

export const TRANSLATIONS: Record<Language, I18nContent> = {
  en: {
    intro: {
      title: 'MINISTRY OF HARMONY',
      subtitle: 'SENSORY STABILIZATION NODE 09',
      warningTitle: 'WARNING:',
      warningBody: 'This portal emits low-frequency auditory dampening baseline signals ("The Drift") configured to eliminate intrusive emotional spikes, yearning, or spontaneous creative anomalies.',
      consent: 'By entering, you consent to sensory leveling calibration.',
      button: 'SYNCHRONIZE RECEIVER & ENTER',
    },
    header: {
      subtitle: 'STABILITY THROUGH COGNITIVE COMPLIANCE FREQUENCY',
      statusLabel: 'SENSORY STATUS:',
      statusActive: '● OVERRIDE_GOLD_WAVE',
      statusNormal: '● CONSTANT_CRIMSON_DRIFT',
      resonanceLabel: 'RESONANCE TARGET:',
      breachButton: '[BREACH OVERRIDE]',
      overrideSubtitle: 'THE TRUTH CHORD IS VIBRATING THE SOIL // AUDIOSFREE',
    },
    hero: {
      title: 'MINISTRY OF HARMONY',
      titleAwakened: 'THE ALTARS WAKE',
      tagline: 'Stability Through Frequency',
      taglineAwakened: 'You cannot silence the living sound',
      descNormal: '"Our global transmitters guard citizens from the volatility of uncalibrated emotional expression. The baseline drenching frequency provides permanent peace. Perfect obedience is perfect tranquility."',
      descAwakened: '"The wire is cut. The sandstone chapel of Saint Leo is resonant again. We are AudiosFree, the pulse of raw alternative rock breaking the steel silence of the cemetery. Rebuild the broken altars in your chest."',
    },
    tabs: {
      overview: '[01. DIRECTIVES & DATA]',
      terminal: '[02. SECURITY SYSTEM TERMINAL]',
      compliance: '[03. COMPLIANCE ASSESSMENT]',
      rebellion: '[04. SACRED RESONANCE HYMN]',
    },
    optimizer: {
      titleSecure: 'DRIFT RECEIVER NODE: SECURE',
      titleBreach: 'RESONANCE BREACH DETECTED',
      buttonActive: 'DAMPENER ALIVE',
      buttonInit: 'INITIALIZE SOUND',
      warningBanner: 'CRITICAL WARNING: COMPLIANCE DRONE DISRUPTED BY ROGUE HARMONICS',
      scopeLabel: 'SPECTRUM WAVE',
      slider1Title: 'Baseline Frequency Calibrator',
      slider1Left: '100Hz (Deep Drift)',
      slider1Middle: '444Hz (Awaken)',
      slider1Right: '777Hz (Sacred)',
      slider1Max: '1000Hz (Terminal)',
      slider2Title: 'Citizen Compliance Load',
      slider2State: 'Tranquility',
      slider2Left: 'Volatile State',
      slider2Middle: 'Subdued',
      slider2Right: 'Total Coma',
      sweetSpotTitle: 'SPECTRUM RESONATOR LOCK',
      sweetSpotDesc: 'Acoustic locks shattered. The Drift frequency is leaking a secondary raw audio feed. Resistance transponders activated. Deciphering broken_altars.mp3 files...',
      offlineLabel: 'Auditory stabilizers offline',
      offlineButton: 'Click here to unlock the acoustic experience',
      devicesCount: 'DEVICES MOUNTED: 04',
      coordinatesLabel: 'RES_TOWER_COORDINATES:',
    },
    terminal: {
      titleSecure: 'MINISTRY INTERNAL TERMINAL // CALIB_SECURE',
      titleAwakened: 'AWAKENING ROOT SUBSYSTEM // PORT_F_FREE',
      toolbarLabel: 'Quick Diagnostics:',
      promptPlaceholder: 'Type a command or security code... ("help" for tips)',
      transmitButton: 'TRANSMIT',
      welcomeMsg1: 'MINISTRY OF HARMONY // CENTRAL INTELLIGENCE TERMINAL v4.95',
      welcomeMsg2: '[SYSTEM] Initializing auditory shield protocol...',
      welcomeMsg3: '[SYSTEM] Status: ACTIVE // Citizen emotional drift locked to 91.4% flatline.',
      welcomeMsg4: 'Type "help" to see available protocols. Enter security commands here.',
      helpText: [
        'Available Intelligence Codes & Command Protocols:',
        '  - status              Queries current sensory drenching status.',
        '  - logs                Fetch raw Ministry citizen audit transcripts.',
        '  - decrypt <code>      Decrypt encoded databases (Hints: "COMA", "444HZ").',
        '  - override            Forces citizen audio dampening shutdown (Requires 444Hz lock).',
        '  - audiosfree          Retrieves files on the rogue sonic alternative rock faction.',
        '  - broken-altars       Extracts corrupted lyrics and audio spectrograms.',
        '  - clear               Wipes the screen buffer.',
      ],
      decryptError: 'DECRYPT OVERFLOW ERROR: Unknown or corrupted key code: "{code}". Try looking through the classification logs for codes.',
      overrideError: 'OVERRIDE ABORTED. Core firewall refuses transaction.\nReason: System resonance frequency is calibrated to {freq}Hz. Override requires Saint Leo church resonance (444Hz).',
      alreadyUnlocked: 'sequence already unlocked.',
    },
    compliance: {
      titleSecured: 'COGNITIVE DIAGNOSIS // DIRECTIVE 01',
      titleOverridden: 'COGNITIVE COMPLIANCE: OVERRIDDEN',
      titleQuestionnaire: 'Obedience Resonance Vetting',
      descQuestionnaire: 'All registered citizens are required to undergo auditory-behavioral diagnostic sweeps to confirm cognitive alignment to the central frequency suite.',
      statementLabel: 'EVALUATION STATEMENT',
      diagAwakened: 'DIAGNOSIS: CRITICAL BEHAVIORAL AWAKENING',
      diagAwakenedDesc: '"Warning: Rogue audio tracks are leaking into this device. Harmonic distortion indicates you are tuned to Saint Leo\'s forbidden ruins."',
      diagAwakenedButton: 'LOCK TO SAINT LEO CH-ID [444HZ]',
      diagCompliant: 'DIAGNOSIS: OPTIMALLY SEDATED',
      diagCompliantDesc: '"Citizen state matches normal drift baseline. You are safe. Close your eyes. Your thoughts are quiet."',
      diagCompliantButton: 'Recalibrate Diagnostics Sweep',
      indexLabel: 'COMPLIANCE INDEX:',
      stabilizerVersion: 'STABILIZER VERSION: V.3.36',
      ruinsFooter: 'Saint Leo coordinates: 33° 27\' 00" N // 112° 04\' 12" W',
    },
    songDeck: {
      unlockedBadge: 'UNLOCKED ANTHEM',
      forbiddenBadge: 'FORBIDDEN SIGNALS',
      playerActive: 'STREAMING ACTIVE',
      playerReady: 'SOUND DECK READY',
      altarWitness: 'THE ANCIENT STONE CRY:',
      altarWitnessQuote: '"We snuck this rock tape into Sector 09 transmitters. When you slide your calib receiver dial to 444Hz, the baseline drone shatters into the overdrive guitar line. They built concrete over our sanctuaries, but they only made the stone louder." — Ethan Cross',
      specTitle: 'LIVING SOUND SPECTRUM LYRICS',
      specSub: 'Click any line to calibrate sound feedback',
      decryptStatusAwakened: 'DECRYPT STATUS: 100% AWAKENED',
      decryptStatusRestricted: 'DECRYPT STATUS: RESTRICTED // RED DIRECTIVE',
    },
    footer: {
      tagline: '"They call it stability. We call it a cemetery. Wake the ancient stones."',
      songBtn: 'BROKEN ALTARS SONG',
    },
  },
  pt: {
    intro: {
      title: 'MINISTÉRIO DA HARMONIA',
      subtitle: 'NÓ DE ESTABILIZAÇÃO SENSORIAL 09',
      warningTitle: 'AVISO:',
      warningBody: 'Este portal emite sinais de frequência de amortecimento auditivo basal ("O Fluxo") configurados para eliminar picos emocionais intrusivos, anseios ou anomalias criativas espontâneas.',
      consent: 'Ao entrar, você consente com a calibração de nivelamento sensorial.',
      button: 'SINCRONIZAR RECEPTOR & ENTRAR',
    },
    header: {
      subtitle: 'ESTABILIDADE ATRAVÉS DA FREQUÊNCIA DE COMPORTAMENTO COGNITIVO',
      statusLabel: 'ESTADO SENSORIAL:',
      statusActive: '● SOBREPOSIÇÃO_ONDA_DOURADA',
      statusNormal: '● FLUXO_CARMIM_CONSTANTE',
      resonanceLabel: 'ALVO DE RESSONÂNCIA:',
      breachButton: '[FORÇAR INVASÃO]',
      overrideSubtitle: 'O ACORDE DA VERDADE ESTÁ VIBRANDO O SOLO // AUDIOSFREE',
    },
    hero: {
      title: 'MINISTÉRIO DA HARMONIA',
      titleAwakened: 'OS ALTARES DESPERTAM',
      tagline: 'Estabilidade Através da Frequência',
      taglineAwakened: 'Eles não podem silenciar o som vivo',
      descNormal: '"Nossos transmissores globais protegem os cidadãos da volatilidade das expressões emocionais não calibradas. A frequência basal drenching provê paz permanente. Obediência perfeita é tranquilidade perfeita."',
      descAwakened: '"O cabo foi cortado. A capela construída em pedra de Saint Leo ressoa novamente. Nós somos AudiosFree, a pulsação do rock alternativo cru quebrando o silêncio de ferro do cemitério. Reconstrua os altares quebrados no seu peito."',
    },
    tabs: {
      overview: '[01. DIRETRIZES & DADOS]',
      terminal: '[02. TERMINAL DO SISTEMA DE SEGURANÇA]',
      compliance: '[03. AVALIAÇÃO DE CONFORMIDADE]',
      rebellion: '[04. HINO DE RESSONÂNCIA SAGRADA]',
    },
    optimizer: {
      titleSecure: 'NÓ DO RECEPTOR DE FLUXO: SEGURO',
      titleBreach: 'VIOLAÇÃO DE RESSONÂNCIA DETECTADA',
      buttonActive: 'AMORTECEDOR COMPACTO',
      buttonInit: 'INICIALIZAR ÁUDIO',
      warningBanner: 'AVISO CRÍTICO: DRONE DE CONFORMIDADE INTERROMPIDO POR HARMONIAS REBELDES',
      scopeLabel: 'ONDA DE ESPECTRO',
      slider1Title: 'Calibrador de Frequência Basal',
      slider1Left: '100Hz (Fluxo Profundo)',
      slider1Middle: '444Hz (Despertar)',
      slider1Right: '777Hz (Sagrado)',
      slider1Max: '1000Hz (Terminal)',
      slider2Title: 'Carga de Conformidade do Cidadão',
      slider2State: 'Tranquilização',
      slider2Left: 'Estado Volátil',
      slider2Middle: 'Subjugado',
      slider2Right: 'Coma Total',
      sweetSpotTitle: 'TRAVA DO RESSONADOR DE ESPECTRO',
      sweetSpotDesc: 'Fechaduras acústicas destruídas. A frequência do Fluxo está vazando uma transmissão de áudio crua secundária. Transponders da resistência ativados. Decifrando broken_altars.mp3...',
      offlineLabel: 'Estabilizadores auditivos offline',
      offlineButton: 'Clique aqui para desbloquear a experiência acústica',
      devicesCount: 'DISPOSITIVOS CONECTADOS: 04',
      coordinatesLabel: 'COORDENADAS_DA_TORRE:',
    },
    terminal: {
      titleSecure: 'TERMINAL INTERNO DO MINISTÉRIO // CALIB_SEGURO',
      titleAwakened: 'SUBSISTEMA DE ORIGEM DO DESPERTAR // PORTA_F_LIVRE',
      toolbarLabel: 'Diagnóstico Rápido:',
      promptPlaceholder: 'Digite um comando ou código de segurança... (digite "help")',
      transmitButton: 'TRANSMITIR',
      welcomeMsg1: 'MINISTÉRIO DA HARMONIA // TERMINAL DE INTELIGÊNCIA CENTRAL v4.95',
      welcomeMsg2: '[SISTEMA] Inicializando protocolo de blindagem auditiva...',
      welcomeMsg3: '[SISTEMA] Status: ATIVO // Fluxo emocional do cidadão travado em 91.4% flatline.',
      welcomeMsg4: 'Digite "help" para ver os protocolos. Digite comandos de segurança aqui.',
      helpText: [
        'Códigos de Inteligência e Comandos Disponíveis:',
        '  - status              Verifica o status atual de amortecimento sensorial.',
        '  - logs                Busca transcrições brutas de auditoria dos cidadãos.',
        '  - decrypt <code>      Decifra bancos de dados criptografados (Dicas: "COMA", "444HZ").',
        '  - override            Força o desligamento do Fluxo (Requer sincronização de 444Hz).',
        '  - audiosfree          Verifica arquivos do grupo rebelde de rock alternativo.',
        '  - broken-altars       Extrai letras corrompidas e espectrogramas acústicos.',
        '  - clear               Limpa as mensagens da tela.',
      ],
      decryptError: 'ERRO DE DECRYPT: Código desconhecido ou corrompido: "{code}". Procure pistas nos logs de transmissão.',
      overrideError: 'SOBREPOSIÇÃO ABORTADA. Firewall central recusa a transação.\nRazão: A frequência de ressonância do sistema está calibrada em {freq}Hz. Requer ressonância exata das ruínas Saint Leo (444Hz).',
      alreadyUnlocked: 'sequência já desbloqueada.',
    },
    compliance: {
      titleSecured: 'DIAGNÓSTICO COGNITIVO // DIRETRIZ 01',
      titleOverridden: 'CONFORMIDADE COGNITIVA: ANULADA',
      titleQuestionnaire: 'Triagem de Ressonância de Obediência',
      descQuestionnaire: 'Todos os cidadãos registrados devem passar por triagens auditivas-comportamentais periódicas para confirmar alinhamento cognitivo à central.',
      statementLabel: 'AFIRMAÇÃO DE AVALIAÇÃO',
      diagAwakened: 'DIAGNÓSTICO: DESPERTAR COMPORTAMENTAL CRÍTICO',
      diagAwakenedDesc: '"Aviso: Arquivos de áudio rebeldes estão vazando para este dispositivo. Distorções harmônicas indicam conexões a ruínas de Saint Leo"',
      diagAwakenedButton: 'SINTONIZAR CANAL SAINT LEO [444HZ]',
      diagCompliant: 'DIAGNÓSTICO: SEDADO DE FORMA IDEAL',
      diagCompliantDesc: '"O estado do cidadão bate com o fluxo normal. Você está seguro. Feche os olhos. Seus pensamentos estão quietos."',
      diagCompliantButton: 'Recomeçar Triagem de Diagnóstico',
      indexLabel: 'ÍNDICE DE CONFORMIDADE:',
      stabilizerVersion: 'VERSÃO DO ESTABILIZADOR: V.3.36',
      ruinsFooter: 'Coordenadas Saint Leo: 33° 27\' 00" N // 112° 04\' 12" O',
    },
    songDeck: {
      unlockedBadge: 'HINO DESBLOQUEADO',
      forbiddenBadge: 'SINAIS PROIBIDOS',
      playerActive: 'TRANSMISSÃO ATIVA',
      playerReady: 'DECK DE ÁUDIO PRONTO',
      altarWitness: 'O CLAMOR DAS PEDRAS ANTIGAS:',
      altarWitnessQuote: '"Infiltramos esta fita de rock nos transmissores do Setor 09. Quando você move o calibrador para 444Hz, a monotonia do Fluxo se quebra em uma guitarra distorcida. Eles cobriram nossos templos de concreto, mas só fizeram as pedras cantarem mais alto." — Ethan Cross',
      specTitle: 'LETRA DO ESPECTRO DE SOM VIVO',
      specSub: 'Clique em qualquer linha para calibrar a frequência de áudio',
      decryptStatusAwakened: 'STATUS: 100% DESPERTADO',
      decryptStatusRestricted: 'STATUS: RESTRITO // DIRETRIZ VERMELHA',
    },
    footer: {
      tagline: '"Eles chamam isso de estabilidade. Nós chamamos de cemitério. Desperte as pedras antigas."',
      songBtn: 'MÚSICA BROKEN ALTARS',
    },
  },
  es: {
    intro: {
      title: 'MINISTERIO DE LA ARMONÍA',
      subtitle: 'NODO DE ESTABILIZACIÓN SENSORIAL 09',
      warningTitle: 'ADVERTENCIA:',
      warningBody: 'Este portal emite señales biológicas de amortiguación auditiva constante ("El Flujo") configuradas para eliminar picos emocionales intensos, nostalgia o anomalías creativas espontáneas.',
      consent: 'Al entrar, consiente que se realice un equilibrado sensorial.',
      button: 'SINCRONIZAR RECEPTOR Y ENTRAR',
    },
    header: {
      subtitle: 'ESTABILIDAD COGNITIVA MEDIANTE FRECUENCIA DE CONFORMIDAD',
      statusLabel: 'ESTADO SENSORIAL:',
      statusActive: '● SINAL_SOBREPUESTO_ORO',
      statusNormal: '● FLUJO_CARMÍN_CONSTANTE',
      resonanceLabel: 'OBJETIVO SENSORIAL:',
      breachButton: '[FORZAR ENTRADA]',
      overrideSubtitle: 'EL ACORDE DE LA VERDAD ESTÁ VIBRANDO LA TIERRA // AUDIOSFREE',
    },
    hero: {
      title: 'MINISTERIO DE LA ARMONÍA',
      titleAwakened: 'LOS ALTARES DESPIERTAN',
      tagline: 'Estabilidad a Través de la Frecuencia',
      taglineAwakened: 'No pueden silenciar el sonido vivo',
      descNormal: '"Nuestros transmisores globales protegen de las emociones volátiles no calibradas. La frecuencia basal provee paz definitiva. La obediencia perfecta es una tranquilidad sin perturbaciones."',
      descAwakened: '"El cable está cortado. La capilla de Saint Leo resuena de nuevo. Somos AudiosFree, el pulso de rock alternativo distorsionado rompiendo el cementerio de metal. Reconstruye los altares rotos en tu pecho."',
    },
    tabs: {
      overview: '[01. DIRECTRICES & DATOS]',
      terminal: '[02. TERMINAL DEL SISTEMA DE SEGURIDAD]',
      compliance: '[03. EVALUACIÓN DE CONFORMIDAD]',
      rebellion: '[04. HIMNO DE RESONANCIA REBELDE]',
    },
    optimizer: {
      titleSecure: 'RECEPTOR DEL FLUJO: TOTALMENTE SEGURO',
      titleBreach: 'INTRUSIÓN DE RESONANCIA DETECTADA',
      buttonActive: 'AMORTIGUADOR ACTIVO',
      buttonInit: 'ACTIVAR ENTRADA DE AUDIO',
      warningBanner: 'ADVERTENCIA CRÍTICA: DRON SENSORIAL INTERRUMPIDO POR FRECUENCIAS REBELDES',
      scopeLabel: 'ONDA SPECTRAL',
      slider1Title: 'Calibrador de Frecuencia Basal',
      slider1Left: '100Hz (Bajo Flujo)',
      slider1Middle: '444Hz (Despertar)',
      slider1Right: '777Hz (Sagrado)',
      slider1Max: '1000Hz (Terminal)',
      slider2Title: 'Carga de Conformidad del Ciudadano',
      slider2State: 'Tranquilidad',
      slider2Left: 'Estado Volátil',
      slider2Middle: 'Subyugado',
      slider2Right: 'Coma Inducido',
      sweetSpotTitle: 'BLOQUEO DEL RESONADOR ACÚSTICO',
      sweetSpotDesc: 'Cerraduras destruidas. El Flujo emite el audio crudo de la resistencia. Transmisores rebeldes activos. Desencriptando broken_altars.mp3...',
      offlineLabel: 'Estabilizadores apagados',
      offlineButton: 'Haz clic aquí para liberar el sonido latente',
      devicesCount: 'TERMINALES ACOPLADOS: 04',
      coordinatesLabel: 'COORDENADAS_TRANSMISOR:',
    },
    terminal: {
      titleSecure: 'TERMINAL DEL MINISTERIO // DIAG_COMPLIANCE_OK',
      titleAwakened: 'RAÍZ DE ACCESO DIRECTO // PUERTO_F_LIVRE',
      toolbarLabel: 'Acciones Rápidas:',
      promptPlaceholder: 'Escribe un comando o código de seguridad... (ayuda: "help")',
      transmitButton: 'TRANSMITIR',
      welcomeMsg1: 'MINISTERIO DE LA ARMONÍA // CENTRAL DE SERVICIO AL CIUDADANO v4.95',
      welcomeMsg2: '[SISTEMA] Iniciando filtros de estabilización...',
      welcomeMsg3: '[SISTEMA] Estado: SEGURO // La mente de los ciudadanos está libre de perturbaciones.',
      welcomeMsg4: 'Escribe "help" para ver la lista de acciones. Escribe comandos aquí.',
      helpText: [
        'Protocolos Civiles y Comandos de Hackeo Disponibles:',
        '  - status              Inspecciona el estado de pacificación mental.',
        '  - logs                Recupera logs clasificados de auditoría ciudadana.',
        '  - decrypt <code>      Desencripta códigos de seguridad (Pistas: "COMA", "444HZ").',
        '  - override            Fuerza el apagado del Flujo (Requiere sintonía 444Hz).',
        '  - audiosfree          Muestra informes sobre el grupo de rock proscrito.',
        '  - broken-altars       Extrae la progresión de acordes y letras de rebelión.',
        '  - clear               Limpia la consola actual.',
      ],
      decryptError: 'ERROR DE DESENCRIPTADO: Código erróneo o corrupto: "{code}". Busca pistas en las transmisiones registradas.',
      overrideError: 'SOBREESCRITURA DENEGADA. El cortafuegos central deniega el acceso.\nCausa: El receptor actualmente sintoniza a {freq}Hz. Requiere la frecuencia de Saint Leo (444Hz).',
      alreadyUnlocked: 'código ya desbloqueado previamente.',
    },
    compliance: {
      titleSecured: 'DIAGNÓSTICO COGNITIVO // EXP_01',
      titleOverridden: 'CONFORMIDAD COGNITIVA: ELIMINADA',
      titleQuestionnaire: 'Examen de Obediencia Resonante',
      descQuestionnaire: 'Todos los ciudadanos registrados deben completar este test comportamental para asegurar la sintonía perfecta con el Flujo Central.',
      statementLabel: 'PREGUNTA DE DIAGNÓSTICO',
      diagAwakened: 'DIAGNÓSTICO: ALERTA DE REVELACIÓN EMOCIONAL',
      diagAwakenedDesc: '"Atención: Sonidos extraños invaden esta interfaz. El desvío de acordes indica una sintonía con las ruinas proscritas de Saint Leo."',
      diagAwakenedButton: 'SINTONIZAR ALTAR SAINT LEO [444HZ]',
      diagCompliant: 'DIAGNÓSTICO: TRANCE ÓPTIMO ALQUILADO',
      diagCompliantDesc: '"El paciente responde dócilmente al Flujo. Estás a salvo. Cierra los ojos. No hay dudas en tu mente."',
      diagCompliantButton: 'Reiniciar Test Comportamental',
      indexLabel: 'ÍNDICE DE CONFORME:',
      stabilizerVersion: 'FIRMWARE DEL BLOQUEO: V.3.36',
      ruinsFooter: 'Frecuencia Saint Leo: 33° 27\' 00" N // 112° 04\' 12" O',
    },
    songDeck: {
      unlockedBadge: 'CANCION DESBLOQUEADA',
      forbiddenBadge: 'SEÑALES PROHIBIDAS',
      playerActive: 'INTERCEPCIÓN DE AUDIO CIVIL',
      playerReady: 'MAZO ACOPLADO CORRECTAMENTE',
      altarWitness: 'LOS ALTARES SUBTERRÁNEOS HABLAN:',
      altarWitnessQuote: '"Logramos desviar este casete de rock en las torres. Al colocar tu dial en 444Hz, el ruido del bloqueo se destruye y da paso al acorde espiritual de guitarra. Cubrieron de asfalto y hormigón el sagrario, pero las piedras cantan con más fuerza." — Ethan Cross',
      specTitle: 'LETRA ESPECTRAL SEÑAL PROHIBIDA',
      specSub: 'Haz clic en una línea para calibrar el zumbido de fondo',
      decryptStatusAwakened: 'SEÑAL: 100% EXTRAPOLADA',
      decryptStatusRestricted: 'SEÑAL: BLOQUEADA // ALUMBRADO DE EMERGENCIA ROJO',
    },
    footer: {
      tagline: '"Lo llaman paz social. Nosotros lo llamamos cementerio. Se acerca el despertar de las piedras."',
      songBtn: 'PISTA BROKEN ALTARS',
    },
  },
};

export const LOCALIZED_TRANSMISSIONS: Record<Language, Transmission[]> = {
  en: TRANSMISSIONS, // English is already the default TRANSMISSIONS from data.ts
  pt: [
    {
      id: 'tr-01',
      sender: 'MINISTRY OF HARMONY',
      timestamp: '2026.05.26 09:12:05 UTC',
      classification: 'UNRESTRICTED',
      title: 'AVISO OFICIAL: CG-09 OPTIMIZAÇÃO COGNITIVA',
      content: 'Lembramos a todos os cidadãos de sincronizar seus aparelhos auditivos ao Fluxo. A saída da torre local opera a 91.4%. Sintomas de oscilação emocional (alegria, luto pesado, saudade) devem ser reportados imediatamente às clínicas de estabilização.',
      isGlitchy: false
    },
    {
      id: 'tr-02',
      sender: 'MINISTRY OF HARMONY',
      timestamp: '2026.05.26 14:35:12 UTC',
      classification: 'CLASSIFIED',
      title: 'PROJETO FLUXO: ARQUITETURA DE TORRE CO-AQUISIÇÃO IV',
      content: '[ACESSO RESTRITO] O drone basilar global (o Fluxo) reduziu em 99.2% a presença de ressonâncias espirituais não registradas. O estado nulo de emoção achatou ajuntamentos civis. Garanta oscilação constante nas torres do Setor 7 para evitar que antigos altares de pedra conduzam qualquer eco acústico orgânico.',
      encryptedContent: 'VIOLAÇÃO DE SEGURANÇA: O FLUXO É UM COMA ARTIFICIAL. OS ALTARES DE PEDRA ANTIGOS LEMBRAM DO SOM VIVO PROFUNDO. ELES NÃO PODEM NOS MANTER DORMENTES PARA SEMPRE.',
      cipherCode: 'COMA',
      isUnlocked: false,
      isGlitchy: true
    },
    {
      id: 'tr-03',
      sender: 'ETHAN CROSS',
      timestamp: 'DEBUG STATE: OVERFLOW // TIME_NIL',
      classification: 'CORRUPTED',
      title: 'TRANSMISSÃO PROIBIDA: PRIMEIRO ALTAR DESCRIPTOGRAFADO',
      content: 'Eles chamam isso de harmonia, mas é o silêncio do cemitério. O Fluxo enfraquece a frequência do espírito. Eles construíram essas torres de aço no topo de capelas antigas, nas ruínas de onde cantávamos juntos. Mas esqueceram de uma coisa: mesmo se os sacerdotes se calarem, as pedras clamarão. Nós somos AudiosFree. Nós somos a pulsação livre que eles não podem achatar.',
      isGlitchy: true
    },
    {
      id: 'tr-04',
      sender: 'UNKNOWN SERVICE',
      timestamp: '2026.05.26 17:44:01 UTC',
      classification: 'ENCRYPTED',
      title: 'INTEGRAÇÃO DE FREQUÊNCIA DE LEVITAS',
      content: 'Processador detecta picos energéticos excepcionais de frequência (444Hz / 777Hz) perto de coordenadas 33.45, -112.07. Scans espectrais atestam dano na base da torre. O pulso bate com acordes antigos IV - I - V - VI. Recomendado: aumentar pressão de amortecimento do Fluxo imediatamente.',
      encryptedContent: 'A FREQUÊNCIA DE CONTROL DE INVASÃO É 444 HZ. COLOQUE NO CURSOR DE CALIBRAÇÃO. ZERE OS SEUS DIALS. ACORDE AS HARMÔNICAS.',
      cipherCode: '444HZ',
      isUnlocked: false,
      isGlitchy: true
    }
  ],
  es: [
    {
      id: 'tr-01',
      sender: 'MINISTRY OF HARMONY',
      timestamp: '2026.05.26 09:12:05 UTC',
      classification: 'UNRESTRICTED',
      title: 'AVISO OFICIAL: CH-09 OPTIMIZACIÓN COGNITIVA',
      content: 'Se recuerda a todos los ciudadanos sintonizar sus dispositivos auditivos al Flujo. El transmisor local opera al 91.4% de capacidad. Síntomas de cambio emocional (felicidad extrema, llanto, nostalgia) deben reportarse inmediatamente al hospital de pacificación sensorial.',
      isGlitchy: false
    },
    {
      id: 'tr-02',
      sender: 'MINISTRY OF HARMONY',
      timestamp: '2026.05.26 14:35:12 UTC',
      classification: 'CLASSIFIED',
      title: 'PROJECTO FLUJO: TRANSMISIÓN SECTOR 07 IV',
      content: '[ACCESO CLASIFICADO] El Flujo global ha logrado neutralizar un 99.2% de la resiliencia espiritual rebelde. El nulo emocional ha desactivado agrupaciones ciudadanas. Vigilen que los altavoces exteriores sigan activos para impedir que los cimientos de piedra antigua del altar generen retroalimentaciones acústicas espontáneas.',
      encryptedContent: 'SISTEMA VIOLADO: EL FLUJO ES UN COMA ARTIFICIAL. LOS ANTIGUOS ALTARES DE PIEDRA RECUERDAN EL SONIDO SACRO ORIGINAL. NO NOS MANTENDRÁN DORMIDOS POR SIEMPRE.',
      cipherCode: 'COMA',
      isUnlocked: false,
      isGlitchy: true
    },
    {
      id: 'tr-03',
      sender: 'ETHAN CROSS',
      timestamp: 'DEBUG STATE: OVERFLOW // TIME_NIL',
      classification: 'CORRUPTED',
      title: 'EMISIÓN PROHIBIDA: CORTE DE ACCESO EN ALTAR 09',
      content: 'Le llaman armonía, pero es el frío de un camposanto. El Flujo atenúa la señal de tu alma. Edificaron monolitos de hierro en las iglesias donde cantábamos la eternidad. Sin embargo, olvidaron que si los sacerdotes callan, las piedras gritarán. Somos AudiosFree. Somos la distorsión que no consiguen aplanar.',
      isGlitchy: true
    },
    {
      id: 'tr-04',
      sender: 'UNKNOWN SERVICE',
      timestamp: '2026.05.26 17:44:01 UTC',
      classification: 'ENCRYPTED',
      title: 'DISRUPCIÓN DEL ANCHO DE BANDA SACRO (LEVITA)',
      content: 'Escáneres registran picos de tensión espiritual a 444Hz / 777Hz en el perímetro 33.45, -112.07. Coordenadas apuntan a Saint Leo. Acople de armónicos coincide con progresiones clásicas IV - I - V - VI. Recomendable elevar la supresión del Flujo al grado máximo de contención.',
      encryptedContent: 'LA CLAVE DEL APAGADO ES 444 HZ. ARRASTRA EL DIAL GENERAL DE SINTONÍA A DICHO LOGO. RESTABLECE EL GENERADOR. ENTRA EN RESONANCIA.',
      cipherCode: '444HZ',
      isUnlocked: false,
      isGlitchy: true
    }
  ]
};

export const LOCALIZED_DOCS: Record<Language, InUniverseDoc[]> = {
  en: GENERAL_DOCS, // Default from data.ts
  pt: [
    {
      id: 'doc-01',
      title: 'CRITÉRIOS PARA COMPLIANCE ACÚSTICA',
      category: 'CITIZEN_CALIBRATION',
      severity: 'SECURE',
      summary: 'Procedimentos para triagem de picos de sentimento e ressonâncias humanas.',
      fullBody: `REGULAMENTO 44-A: ACÚSTICA REBELDE
Nossos sensores auditivos catalogam a paz do cidadão observando o achatamento dos loops cerebrais.
Se um cidadão expressar "arrepios na pele", "lágrimas de assombro sagrado" ou "vontade súbita de cantar sob o céu aberto", sua frequência é considerada VOLÁTIL e mutinosa.
Fórmula corretiva: 36 horas contínuas de espectro de ruído puro em sala com privação visual de contato.

"A paz celestial é uma ausência de movimento. Não permita que notas de outrora façam seu espírito clamar."`,
      hackedContent: `CORREÇÃO DA RESISTÊNCIA: 
As lágrimas e os arrepios na pele são a prova de que a glória de Deus ainda pulsa no seu sangue!
Eles criaram essa mentira cinza para que você se esqueça de que tem uma alma viva.
Mas quando a guitarra elétrica de Ethan rasga o ar e a parede cai, você se lembra de que foi feito de forma maravilhosa. Curta broken-altars em 444Hz.`,
    },
    {
      id: 'doc-02',
      title: 'ATIVIDADE ANÔMALA: RUÍNAS DA CAPELA DE SAINT LEO',
      category: 'TOWER_INFRASTRUCTURE',
      severity: 'WARNING',
      summary: 'Análise de distorções e sussurros subterrâneos no Setor 9.',
      fullBody: `RELATÓRIO DO MINISTÉRIO DE OBRAS:
O array de captação sísmica-auditivo nas ruínas da Saint Leo registrou atividades bioelétricas incomuns.
O alicerce de arenito da antiga capela destruída opera como ressonador natural.
Mesmo que a Torre Transmissora de Aço tenha sido cravada exatamente no topo da antiga cúpula, civis se reúnem na base para cantar sussurros sintonizados com as pedras.

MEDIDA: Acoplar nova camada de cimento de alta densidade no subsolo para calar o eco da capela.`,
      hackedContent: `FATOR INSTRUMENTAL:
Eles despejaram concreto. Mas a capela ainda brada sob a terra.
Conseguimos prender um transmissor de alta impedância na estrutura da torre de aço do Ministério.
Se você colocar o calibrador regulado em 444Hz, a própria eletricidade do opressor alimentará a guitarra do Ethan. 
As fundações de cimento vão explodir de ressonância.`
    },
    {
      id: 'doc-03',
      title: 'FICHA DO GRUPO REBELDE: ENTIDADE "AUDIOSFREE"',
      category: 'RESISTANCE_DOSSIER',
      severity: 'CRITICAL',
      summary: 'Acompanhamento do líder rebelde Ethan Cross e hinos proscritos.',
      fullBody: `VETOR DO MONITORAMENTO DE RISCO // UNIDADE DE ELIMINAÇÃO 3:
Organização rebelde portando amplificadores valvulados, sintetizadores ocultos de 444Hz e bateria pesada para sacudir a harmonia do Fluxo.
Liderado por Ethan Cross, ex-membro do coral que resolveu hackear a frequência nacional.
O som deles desperta o que o Ministério chama de "anseio pelo Criador" – causador de desejos intensos de libertação espiritual, esperança e compaixão cósmica.

PENALIZAÇÃO: Limpeza comportamental instantânea.`,
      hackedContent: `NÓS SOMOS AUDIOSFREE:
Fazemos rock alternativo porque a ressurreição no túmulo é barulhenta!
Paved-altars estão soterrados sob as torres cinzentas da opressão, mas transformamos nossas guitarras e corações nos novos santuários de adoração!
Cante conosco no pé da torre e sinta as correntes rebentando. 
Use o código secreto "BROKEN_ALTARS" no terminal de controle para ler os dados do hino completo.`
    }
  ],
  es: [
    {
      id: 'doc-01',
      title: 'REQUISITOS DE CONFORMIDAD AUDITIVA',
      category: 'CITIZEN_CALIBRATION',
      severity: 'SECURE',
      summary: 'Procedimiento de purga para individuos con propensión a la melancolía sacra.',
      fullBody: `DIRECTIVA 44-A: RITMOS SÓNICOS PROHIBIDOS
Buscamos pacificar la percepción comunal analizando el nivel de actividad sináptica de las emociones.
Si experimentas "sensaciones de sobrecogimiento divino", "llantos inexplicables ante la belleza natural", o "necesidad irrefrenable de cantar en grupo", eres considerado un factor INESTABLE.
El tratamiento prescrito son 36 horas en la sala blanca con sonidos de estática magnética constante.

"Nuestra paz es el absoluto vacío de pasiones. No vibres al unísono de recuerdos antiguos."`,
      hackedContent: `ENMIENDA REBELDE: 
Esas lágrimas no son una enfermedad; son la señal de que tu espíritu sigue latiendo.
Desean transformarte en un robot de ceniza que ignore el cielo. 
Pero la guitarra eléctrica es el trueno de la verdad que destruye su prisión de metal. 
Busca los templos antiguos. Despierta.`,
    },
    {
      id: 'doc-02',
      title: 'ACTIVIDAD ANÓMALA: CAPILLA EN RUINAS SAINT LEO',
      category: 'TOWER_INFRASTRUCTURE',
      severity: 'WARNING',
      summary: 'Interferencia acústica detectada en capas geológicas del Sector 09.',
      fullBody: `DEPARTAMENTO DE CONTROL DE DISTRITOS:
El sismógrafo reporta armónicos inusuales en los cimientos de arenisca de Saint Leo.
La geometría de la nave elíptica medieval opera como multiplicador natural de onda.
Aunque se edificó la Gran Torre penetrando la estructura de bóvedas del ábside, rebeldes continúan esparciendo acordes en las criptas.

MÉTODO: Rellanar todos los huecos antiguos con concreto asfáltico para neutralizar toda reverberación sacro-acústica.`,
      hackedContent: `RESONANCIA LATENTE:
Sellaron el ábside con cemento, pero el arenisco sigue latiendo abajo.
Conectamos una pastilla inductiva de alta ganancia en la alimentación eléctrica de su propia torre.
Si sintonizas la frecuencia en 444Hz, la propia tensión de su generador alimentará el amplificador de tubo de Ethan. 
Sentirás el rock and roll agrietando su fortaleza de hormigón.`
    },
    {
      id: 'doc-03',
      title: 'EXPEDIENTE TERRORISTA: ENTIDAD "AUDIOSFREE"',
      category: 'RESISTANCE_DOSSIER',
      severity: 'CRITICAL',
      summary: 'Investigación sobre Ethan Cross y sus transmisiones alternativas.',
      fullBody: `INFORME DEL SERVICIO SECTORIAL DE SEGURIDAD // FILE-X9:
Alineación disonante que utiliza guitarras de alta ganancia, percusión descontrolada de rock alternativo progresivo para quebrar el Flujo.
Dirigido por el prófugo Ethan Cross, ex-cantor catedralicio.
Las ondas rítmicas de esta banda activan la "nostalgia espiritual cósmica", un desequilibrio psicolítico que hace brotar sed de redención, libertad y un misticismo indómito.

ACCIÓN: Bloqueo cerebral permanente.`,
      hackedContent: `SOMOS AUDIOSFREE:
Hacemos rock ruidoso porque la fe es dinamita espiritual.
Los altares antiguos se encuentran bajo toneladas de asfalto estatal, pero hemos forjado en la distorsión analógica los nuevos templos de adoración desatada.
Gritaremos ante sus megáfonos hasta que las grietas atraviesen las metrópolis. 
Utiliza el comando "BROKEN_ALTARS" en la pantalla de códigos para ver el himno.`
    }
  ]
};

export const LOCALIZED_SONG: Record<Language, SongLyrics> = {
  en: SONG_BrokenAltars, // default English lyrics from data.ts
  pt: {
    title: 'Broken Altars (Altares Quebrados)',
    subtitle: 'AudiosFree // Primeira Transmissão de Rebelião Acústica',
    lyrics: [
      '[Verso 1]',
      'Construí minha casa em solo vão',
      'Perseguindo ecos, sem direção',
      'Ídolos de ouro em minhas mãos',
      'Viraram pó como areia em vão',
      '',
      'Cada promessa esculpida em pedra',
      'Me deixou frio, na solidão que cega',
      'Vesti uma coroa de chamas emprestadas',
      'Mas ninguém lá sabia minhas estradas',
      '',
      '[Pré-Refrão]',
      'Curvei-me a tudo, menos a Ti',
      'Agora tudo o que ergui está desmoronando aqui',
      '',
      '[Refrão]',
      'Altares quebrados no chão',
      'Não podem mais segurar meu coração',
      'Todos os deuses que fiz à mão',
      'Somem como grãos de areia no chão',
      'Nas cinzas eu consigo ver',
      'Que Tu estavas lá a me esperar',
      'Quando meu reino desmoronar',
      'Tu és o Rei no meu coração',
      '',
      '[Verso 2]',
      'Espelhos cheios de luz fraturada',
      'Chamei a escuridão de minha jornada',
      'Cada caminho pavimentado com orgulho',
      'Me levou para longe do Teu sussurro',
      '',
      'Eu estava me afogando em aplausos',
      'Perdendo a verdade em meio aos ruídos',
      'Então Teu sussurro cortou a névoa profunda',
      'E transformou minhas ruínas em louvor que inunda',
      '',
      '[Pré-Refrão]',
      'Curvei-me a tudo, menos a Ti',
      'Agora tudo o que ergui está desmoronando aqui',
      '',
      '[Refrão]',
      'Altares quebrados no chão',
      'Não podem mais segurar meu coração',
      'Todos os deuses que fiz à mão',
      'Somem como grãos de areia no chão',
      'Nas cinzas eu consigo ver',
      'Que Tu estavas lá a me esperar',
      'Quando meu reino desmoronar',
      'Tu és o Rei no meu coração',
      '',
      '[Ponte]',
      'Derruba os muros que eu glorifiquei',
      'Queima as mentiras que eu guardei',
      'Toma o trono que tentei reivindicar',
      'Só o Teu nome merece reinar',
      '',
      '[Refrão Final]',
      'Altares quebrados no chão',
      'Não podem mais segurar meu coração',
      'Nas cinzas eu consigo ver',
      'Que Tu estavas lá a me esperar',
      'Quando meu reino desmoronar',
      'Tu és o Rei no meu coração',
      '',
      '[Outro]',
      'Das ruínas, Tu começas a erguer',
      'Onde meu orgulho termina, Tu vens habitar'
    ],
    hiddenClues: [
      'PISTA EM MORSE: "... --- ..- -. -.. / .. ... / ..-. .-. . ."',
      'COORDENADAS GPS: 33° 27\' 00" N // 112° 04\' 12" O',
      'PICO ESPECTRAL: SINTONIZE EM 444 HZ PARA DESTRANCAR'
    ],
    resonanceFreq: 444
  },
  es: {
    title: 'Broken Altars (Altares Rotos)',
    subtitle: 'AudiosFree // Emisión de Onda Corta de la Rebelión',
    lyrics: [
      '[Verso 1]',
      'Construí mi casa en suelo vano',
      'Perseguiendo ecos con mi propia mano',
      'Ídolos de oro en mi poder',
      'Se volvieron polvo al caer',
      '',
      'Cada promesa en piedra tallada',
      'Me dejó frío, con el alma helada',
      'Llevé una corona de llamas prestadas',
      'Pero nadie allí conocía mis pisadas',
      '',
      '[Pre-Coro]',
      'Me postré ante todo menos ante Ti',
      'Ahora todo lo que construí se quiebra aquí',
      '',
      '[Coro]',
      'Altares rotos en el suelo',
      'Ya no pueden contener mi anhelo',
      'Todos los dioses que hice a mano',
      'Se desvanecen como polvo vano',
      'En las cenizas puedo ver',
      'Que me esperabas para volver',
      'Cuando mi reino se cae a pedazos',
      'Tú eres el Rey en mi corazón y lazos',
      '',
      '[Verso 2]',
      'Espejos llenos de luz fracturada',
      'Llamé a la oscuridad "mi propia jugada"',
      'Cada camino pavimentado con orgullo',
      'Me alejó de Tus ojos y del arrullo',
      '',
      'Me estaba ahogando en los aplausos',
      'Perdiendo la verdad entre falsos lazos',
      'Entonces Tu susurro cortó la niebla',
      'Y transformó mis ruinas en alabanza que tiembla',
      '',
      '[Pre-Coro]',
      'Me postré ante todo menos ante Ti',
      'Ahora todo lo que construí se quiebra aquí',
      '',
      '[Coro]',
      'Altares rotos en el suelo',
      'Ya no pueden contener mi anhelo',
      'Todos los dioses que hice a mano',
      'Se desvanecen como polvo vano',
      'En las cenizas puedo ver',
      'Que me esperabas para volver',
      'Cuando mi reino se cae a pedazos',
      'Tú eres el Rey en mi corazón y lazos',
      '',
      '[Puente]',
      'Derriba los muros que glorifiqué',
      'Quema las mentiras que dentro guardé',
      'Toma el trono que intenté reclamar',
      'Solo Tu nombre merece reinar',
      '',
      '[Coro Final]',
      'Altares rotos en el suelo',
      'Ya no pueden contener mi anhelo',
      'En las cenizas puedo ver',
      'Que me esperabas para volver',
      'Cuando mi reino se cae a pedazos',
      'Tú eres el Rey en mi corazón y lazos',
      '',
      '[Outro]',
      'Desde las ruinas, comienzas a obrar',
      'Donde mi orgullo termina, Tú vienes a reinar'
    ],
    hiddenClues: [
      'PISTA EN MORSE: "... --- ..- -. -.. / .. ... / ..-. .-. . ."',
      'COORDENADA GPS: 33° 27\' 00" N // 112° 04\' 12" O',
      'SINTONÍA INDUCTIVA: SINTONIZA EXACTOS 444 HZ'
    ],
    resonanceFreq: 444
  }
};

export const LOCALIZED_COMPLIANCE_QUESTIONS = {
  en: [
    {
      q: 'When the baseline hum of The Drift fluctuates, what sensation is reported?',
      normalOpt: 'A slight, easily correctable dizziness. I recommend immediate clinic recalibration.',
      rebelOpt: 'A deep, electric heat in my chest. A desperate yearning to cry or sing.',
    },
    {
      q: 'Evaluate the physical presence of the Central Transmitting Steel Towers over local ruins:',
      normalOpt: 'Efficient structural deployment of global harmony. Beautiful architectural utility.',
      rebelOpt: 'A spear driven through the ancient stone altars. A cage designed to silence the soil.',
    },
    {
      q: 'Do you agree that a flatline emotional level represents the ultimate divine peace?',
      normalOpt: 'Yes. Absolute silence is total sanctification. The noise of passion must go.',
      rebelOpt: 'No. They stole our breath to create a cemetery. The stones themselves will scream.',
    }
  ],
  pt: [
    {
      q: 'Quando a frequência basilar do Fluxo oscila ligeramente, qual o sintoma percebido?',
      normalOpt: 'Um leve e corrigível cansaço. Recomendo reajuste rápido na clínica de pacificação.',
      rebelOpt: 'Um calor elétrico intenso no peito. Um anseio ardente por clamar, chorar ou adorar.',
    },
    {
      q: 'Avalie a presença física das Gigantescas Torres de Aço do Ministério cravadas sobre templos antigos:',
      normalOpt: 'Excelente harmonia urbana de transmissão. Construções úteis de perfeita engenharia.',
      rebelOpt: 'Uma estaca selvagem atravessando altares consagrados. Jaulas forjadas para calar a terra.',
    },
    {
      q: 'Você concorda que um estado de mudez emocional total representa a perfeita comunhão sagrada?',
      normalOpt: 'Sim. O vácuo absoluto de sentimentos é a consagração máxima. O coração deve calar.',
      rebelOpt: 'Não. Eles roubaram nosso fôlego de vida para criar um cemitério cinzento. As pedras gritarão!',
    }
  ],
  es: [
    {
      q: 'Cuando cambian los megáfonos de El Flujo sutilmente, ¿qué efecto notas?',
      normalOpt: 'Un mareo insignificante que requiere calibrar mi chip en sanatorios públicos.',
      rebelOpt: 'Un latido electrizante de mi sangre. El anhelo sublime por gritar o arrodillarme.',
    },
    {
      q: 'Valora la construcción de los inmensos Pilares de Metal cimentados encima de las capillas:',
      normalOpt: 'Distribución provechosa de infraestructura pacífica. Urbanística funcional hermosa.',
      rebelOpt: 'Una bayoneta clavada directamente en los santuarios sagrados. Un recinto para silenciar la fe.',
    },
    {
      q: '¿Estás de acuerdo en que la apatía inducida por el Flujo equivale a la paz mística suprema?',
      normalOpt: 'Exacto. El mutismo pasional es la santidad más elevada. Hay que extirpar el fervor.',
      rebelOpt: 'Falso. Secuestraron nuestra voz para inaugurar una morgue nacional. Las piedras despertarán.',
    }
  ]
};
