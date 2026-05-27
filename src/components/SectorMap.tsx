import React, { useState, useEffect, useRef } from 'react';
import { MapPin, ShieldAlert, Radio, Landmark, Ghost, Trash2, Send, CheckCircle2, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../i18n';

interface CoordinatePin {
  id: string;
  x: number; // percentage width
  y: number; // percentage height
  lat: number;
  lng: number;
  label: string;
  note: string;
  category: 'altar' | 'ministry' | 'tunnel' | 'safehouse' | 'beacon';
  isUserCreated: boolean;
  timestamp?: string;
}

interface SectorMapProps {
  frequency: number;
  isUnlocked: boolean;
  language: Language;
  onPinAdded?: (label: string, lat: number, lng: number) => void;
}

const LOCAL_MAP_TRANSLATIONS = {
  en: {
    jammedTitle: "COGNITIVE LOCKING // MAP OVERRIDE SENSOR OFFLINE",
    jammedDesc: "The Ministry has flooded Sector 09 with military-grade emotional suppression frequencies (The Drift). Coordinate channels are fully scrambled.",
    jammedAction: "CALIBRATE ACOUSTIC SWEEP TO 444HZ OR 777HZ TO DISRUPT FEED OVERLOAD AND REVEAL RECON GRID.",
    activeMapTitle: "SECTOR 09 TACTICAL INTERACTIVE DIRECTORY",
    activeMapSub: "Reconnaissance scan of sanctuary ley lines and signal amplifiers. Click anywhere inside the grid layout to establish a new cognitive emergency transmitter beacon.",
    coordLabels: "ACTIVE FEED COORDINATES",
    preloadedPins: "HISTORIC ENCLAVES & TRANSMISSION TOWERS",
    userPins: "ACTIVE RESISTANCE BEACONS",
    addPinTitle: "DEPLOY EMERGENCY RESISTANCE SENSOR",
    inputName: "Beacon Identifier (e.g. ST LEO-A)",
    inputNamePlaceholder: "Node name...",
    inputNote: "Encrypted Log Entry",
    inputNotePlaceholder: "Message to transmitting survivors...",
    inputCategory: "Sensor Sub-Class",
    btnDeploy: "INJECT SIGNAL TRANSMITTER",
    btnCancel: "ABORT",
    emptyUserPins: "No active emergency transmitters. Click the spatial grid layout above to deploy a signal.",
    clearUserPins: "RESET REBEL NODES",
    customPinSuccess: "REBELLION BEACON ESTABLISHED: Radio sync validated at",
    altarDesc: "Soverign ruins of St. Leo. Heavy sandstone structures that resist base frequency waves.",
    ministryDesc: "Central Ministry Control Antenna. Source of the drenching baseline drone.",
    tunnelDesc: "Decommissioned mining line. Headquarters of the AudiosFree musical print movement.",
    nodeCopied: "[COORDINATES EXTRACTED TO TERMINAL SECURE RING]"
  },
  pt: {
    jammedTitle: "BLOQUEIO COGNITIVO // RECEPTOR DE MAPA MONITORADO OFFLINE",
    jammedDesc: "O Ministério inundou o Setor 09 com ondas de supressão emocional em nível militar (O Fluxo). Todos os canais de coordenadas geográficas estão embaralhados.",
    jammedAction: "VARIAR FREQUÊNCIA PARA 444HZ OU 777HZ NO CALIBRADOR PARA GERAR INTERFERÊNCIA E REVELAR A GRADE DE RECONHECIMENTO.",
    activeMapTitle: "DIRETÓRIO TÁTICO INTERATIVO - SETOR 09",
    activeMapSub: "Varredura de reconhecimento das linhas sagradas e amplificadores de sinal. Clique em qualquer ponto da grade para estabelecer uma baliza de transmissão de emergência.",
    coordLabels: "COORDENADAS DO CANAL ATIVO",
    preloadedPins: "ENCLAVES HISTÓRICAS & TORRES DO MINISTÉRIO",
    userPins: "NOSSOS TRANSMISSORES DE SINAL ATIVOS",
    addPinTitle: "LANÇAR TRANSMISSOR DE EMERGÊNCIA",
    inputName: "Identificação do Transmissor (ex: ST LEO-A)",
    inputNamePlaceholder: "Nome do ponto...",
    inputNote: "Log de Segurança Encriptado",
    inputNotePlaceholder: "Mensagem codificada aos sobreviventes...",
    inputCategory: "Canal de Inserção",
    btnDeploy: "INJETAR CANAL DE TRANSMISSÃO",
    btnCancel: "ABORTAR",
    emptyUserPins: "Nenhuma baliza ativa no perímetro. Toque no mapa 2D acima para injetar um sinal.",
    clearUserPins: "RESETAR TRANSMISSORES",
    customPinSuccess: "TRANSMISSOR REBELDE DEPLOYED: Sincronismo aceito em",
    altarDesc: "Ruínas sagradas da Capela de St. Leo. Arenito denso que irradia reverberações profundas contra a apatia.",
    ministryDesc: "Antena Central do Ministério. Fonte principal do drone de anestesia neural.",
    tunnelDesc: "Antiga mina de ferro desativada. QG da resistência AudiosFree e depósito de fita k7.",
    nodeCopied: "[COORDENADAS COPIADAS PARA O SISTEMA DE INTELIGÊNCIA]"
  },
  es: {
    jammedTitle: "BLOQUEO COGNITIVO // SENSOR DE MAPEO FUERA DE SERVICIO",
    jammedDesc: "El Ministerio mantiene el Sector 09 cubierto con frecuencias militares de letargo conductual (El Flujo). Las redes topográficas permanecen desalineadas.",
    jammedAction: "AJUSTA TU SINTONIZADOR DE AUDIO EXACTAMENTE A 444HZ O 777HZ PARA ANULAR EL SECUESTRO COGNITIVO Y LIMPIAR EL RADAR.",
    activeMapTitle: "DIRECTORIO TÁCTICO INTERACTIVO - SECTOR 09",
    activeMapSub: "Escaneo del terreno rebelde y torres transmisoras. Haz clic en cualquier lugar dentro de las coordenadas para inyectar una baliza táctica de AudiosFree.",
    coordLabels: "LECTURA DE COORDENADAS COGNITIVAS",
    preloadedPins: "ENCLAVES HISTÓRICOS Y TORRES CONTROLADAS",
    userPins: "NUESTRAS BALIZAS DE TRANSMISIÓN",
    addPinTitle: "DESPLEGAR TRANSMISOR ACOPLADO",
    inputName: "Identificador de Baliza (ej. ST LEO-A)",
    inputNamePlaceholder: "Nombre del nodo...",
    inputNote: "Registro Codificado / Nota",
    inputNotePlaceholder: "Mensaje de esperanza para la red de sobrevivientes...",
    inputCategory: "Subtipo de Baliza",
    btnDeploy: "INYECTAR BALIZA DE REPRESALIA",
    btnCancel: "ALINEAR",
    emptyUserPins: "Sin balizas de emergencia activas. Pulsa el radar interactivo de arriba para fijar una.",
    clearUserPins: "REINICIAR BALIZAS",
    customPinSuccess: "BALIZA INYECTADA: Enlace de radio verificado en",
    altarDesc: "Capilla histórica de Saint Leo destruida. Sus muros refractan el zumbido militar.",
    ministryDesc: "Torre Central de Antenas del Ministerio. Origen del sopor anestésico flatline.",
    tunnelDesc: "Galerías mineras abandonadas. Imprenta clandestina del audiotape subversivo de rock.",
    nodeCopied: "[COORDENADAS DE EXPEDICIÓN DESVIADAS A CONSOLA]"
  }
};

export default function SectorMap({
  frequency,
  isUnlocked,
  language,
  onPinAdded
}: SectorMapProps) {
  const isJammed = !isUnlocked && frequency !== 444 && frequency !== 777;
  const mt = LOCAL_MAP_TRANSLATIONS[language] || LOCAL_MAP_TRANSLATIONS.en;

  const [pins, setPins] = useState<CoordinatePin[]>(() => {
    const historicalPins: CoordinatePin[] = [
      {
        id: 'hist-1',
        x: 44.5,
        y: 62.1,
        lat: 33.45,
        lng: -112.07,
        label: language === 'pt' ? "Ruínas de Saint Leo" : language === 'es' ? "Capilla Sant Leo" : "Saint Leo Ruins",
        note: mt.altarDesc,
        category: 'altar',
        isUserCreated: false
      },
      {
        id: 'hist-2',
        x: 65.2,
        y: 35.4,
        lat: 33.48,
        lng: -112.04,
        label: language === 'pt' ? "Antena Central do Ministério" : language === 'es' ? "Central del Ministerio" : "Ministry Central Array",
        note: mt.ministryDesc,
        category: 'ministry',
        isUserCreated: false
      },
      {
        id: 'hist-3',
        x: 22.1,
        y: 78.4,
        lat: 33.42,
        lng: -112.11,
        label: language === 'pt' ? "Túnel de Mineração 09" : language === 'es' ? "Pasaje Subterráneo 09" : "Mining Tunnel 09 HQ",
        note: mt.tunnelDesc,
        category: 'tunnel',
        isUserCreated: false
      }
    ];

    try {
      const stored = localStorage.getItem('audiosfree_map_pins');
      if (stored) {
        const parsed = JSON.parse(stored);
        return [...historicalPins, ...parsed];
      }
    } catch (e) {
      console.error(e);
    }
    return historicalPins;
  });

  const [selectedPin, setSelectedPin] = useState<CoordinatePin | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [clickCoords, setClickCoords] = useState<{ x: number; y: number } | null>(null);
  const [newLabel, setNewLabel] = useState('');
  const [newNote, setNewNote] = useState('');
  const [newCategory, setNewCategory] = useState<'safehouse' | 'beacon'>('beacon');
  const [copiedText, setCopiedText] = useState(false);

  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Automatically update selected pin descriptions if language updates
  useEffect(() => {
    if (selectedPin && !selectedPin.isUserCreated) {
      const updated = pins.find(p => p.id === selectedPin.id);
      if (updated) setSelectedPin(updated);
    }
  }, [language, pins]);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isJammed || showAddForm) return;

    if (mapContainerRef.current) {
      const rect = mapContainerRef.current.getBoundingClientRect();
      const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
      const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

      setClickCoords({ x: xPercent, y: yPercent });
      setNewLabel('');
      setNewNote('');
      setShowAddForm(true);
      setSelectedPin(null);
    }
  };

  const handleDeployPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clickCoords || !newLabel.trim()) return;

    // Map percentages to arbitrary fake geological lat/long of Sector 09
    // Sector 09 spans roughly Lat: [33.40, 33.50], Lng: [-112.15, -112.00]
    const calculatedLat = parseFloat((33.50 - (clickCoords.y / 100) * 0.10).toFixed(4));
    const calculatedLng = parseFloat((-112.15 + (clickCoords.x / 100) * 0.15).toFixed(4));

    const newPin: CoordinatePin = {
      id: Math.random().toString(36).substring(2, 9),
      x: parseFloat(clickCoords.x.toFixed(1)),
      y: parseFloat(clickCoords.y.toFixed(1)),
      lat: calculatedLat,
      lng: calculatedLng,
      label: newLabel.trim(),
      note: newNote.trim() || (language === 'pt' ? "Receptor tático ativo operando em 444Hz." : language === 'es' ? "Transmisor de retransmisión activo." : "Sovereign signal relay online."),
      category: newCategory,
      isUserCreated: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedUserPins = pins.filter(p => p.isUserCreated);
    const updatedAll = [...pins, newPin];
    setPins(updatedAll);

    // Save only user created pins to localStorage
    try {
      localStorage.setItem('audiosfree_map_pins', JSON.stringify([...updatedUserPins, newPin]));
    } catch (err) {
      console.error(err);
    }

    setSelectedPin(newPin);
    setShowAddForm(false);
    setClickCoords(null);

    // Trigger parent log
    onPinAdded?.(newPin.label, calculatedLat, calculatedLng);
  };

  const handleClearUserPins = () => {
    const historicalOnly = pins.filter(p => !p.isUserCreated);
    setPins(historicalOnly);
    setSelectedPin(null);
    try {
      localStorage.removeItem('audiosfree_map_pins');
    } catch (e) {}
  };

  const handleCopyCoords = (pin: CoordinatePin) => {
    const coordStr = `${pin.lat}, ${pin.lng}`;
    navigator.clipboard.writeText(coordStr).then(() => {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    });
  };

  return (
    <div className={`p-5 md:p-6 bg-brand-slate/90 backdrop-blur-md rounded-lg border transition-all duration-700 select-none overflow-hidden ${
      isUnlocked ? 'border-brand-gold/30 box-glow-gold' : 'border-zinc-900 hover:border-brand-dark-brick/40 box-glow-red'
    }`}>
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-900 pb-3 mb-4 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <Radio className={`w-4 h-4 ${isJammed ? 'text-red-600 animate-pulse' : 'text-brand-gold animate-bounce'}`} />
            <h3 className={`font-mono text-xs uppercase tracking-widest ${isUnlocked ? 'text-brand-gold' : 'text-red-500'}`}>
              [05] SEC-09 TELEMETRY GRID
            </h3>
          </div>
          <h4 className="font-serif text-lg font-bold text-zinc-100 tracking-wide mt-1">
            {isJammed ? "SECTOR 09 COGNITIVE SCANNER" : mt.activeMapTitle}
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded text-[8px] font-mono tracking-wider transition-colors border uppercase ${
            isJammed 
              ? 'bg-rose-950/40 text-rose-500 border-red-900' 
              : 'bg-yellow-950/40 text-brand-gold border-brand-gold/40'
          }`}>
            FEED: {isJammed ? "SCRAMBLED" : "BYPASS_TUNED"}
          </span>
          <span className="font-mono text-[9px] text-zinc-500 font-bold">
            LATENCY: {isJammed ? "999ms" : "12ms"}
          </span>
        </div>
      </div>

      {/* COMPACT MAP DESCRIPTION OR WARNING */}
      <p className="font-sans text-xs text-zinc-400 font-light mb-4 leading-relaxed">
        {isJammed ? mt.jammedDesc : mt.activeMapSub}
      </p>

      {/* CORE DISPLAY (JAMMED STATE / ACTIVE MAP CANVAS FRAME) */}
      <div className="relative">
        {/* Radar Map container */}
        <div 
          ref={mapContainerRef}
          onClick={handleMapClick}
          className={`aspect-[16/9] w-full rounded-lg relative overflow-hidden transition-all duration-1000 border border-zinc-900 bg-black ${
            isJammed 
              ? 'cursor-not-allowed border-red-950 bg-radial-vignette-jammed' 
              : 'cursor-crosshair hover:bg-zinc-950/30 transition shadow-inner'
          }`}
        >
          {/* STATIC BACKGROUND NOISE SECTORS ENHANCED GRAPHICS IN SPA CONTAINER */}
          {isJammed ? (
            /* JAMMED SCAN OVERLAYS WITH HEAVY INTERFERENCE */
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20 bg-black/60 backdrop-blur-[1px]">
              <motion.div
                animate={{ scale: [1, 1.05, 1], rotate: [0, 1, 0, -1, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="mb-3 p-3 rounded-full bg-red-950/40 border border-red-500/30 flex items-center justify-center text-red-500"
              >
                <ShieldAlert className="w-8 h-8 animate-pulse text-red-500" />
              </motion.div>
              <h5 className="font-mono text-red-500 text-xs font-black uppercase tracking-widest text-glow-red border-b border-red-950 pb-1.5 mb-2 px-4">
                {mt.jammedTitle}
              </h5>
              <p className="max-w-md font-mono text-[9px] text-zinc-5 w-5/6 text-zinc-400 hover:text-white leading-normal uppercase">
                {mt.jammedAction}
              </p>
              
              {/* Fake vertical scrambled coordinate lines */}
              <div className="absolute left-1/4 top-0 bottom-0 w-px bg-red-900/10" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-red-500/20 animate-pulse" />
              <div className="absolute left-3/4 top-0 bottom-0 w-px bg-red-900/10" />
              <div className="absolute top-1/3 left-0 right-0 h-px bg-red-900/15" />
              <div className="absolute top-2/3 left-0 right-0 h-px bg-red-900/15" />
              <div className="absolute inset-0 scanlines opacity-50 pointer-events-none" />
            </div>
          ) : (
            /* BYPASSED DETECTOR TACTICAL HUD MAP */
            <>
              {/* Radar Grids & concentric coordinates circles */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-0 right-0 top-0 bottom-0 bg-grid-pattern opacity-10" />
                
                {/* Tactical grid indices labels */}
                <div className="absolute left-2 top-2 font-mono text-[8px] text-zinc-650 flex flex-col gap-1 uppercase">
                  <span>SEC_09_SECTOR_MAP</span>
                  <span>GRID: CON_GOLD_33.4</span>
                </div>
                
                <div className="absolute right-2 bottom-2 font-mono text-[8px] text-brand-gold/60">
                  REF_LOC: COGNITIVE_BEACONS
                </div>

                {/* Radar Concentric Rings */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-gold/5 w-[15%]" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-gold/10 w-[40%] animate-pulse" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-gold/5 w-[70%]" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-gold/5 w-[95%]" />

                {/* Sweeping radar scanner effect */}
                <div className="absolute inset-0 bg-gradient-radial-radar origin-center animate-spin-radar pointer-events-none opacity-20" />
              </div>

              {/* DRAW PRE-EXISTING & CUSTOM USER PINS */}
              {pins.map((pin) => {
                const isSelected = selectedPin?.id === pin.id;
                
                let icon = <MapPin className="w-3.5 h-3.5 text-brand-gold" />;
                let glowColor = 'shadow-brand-gold/40 border-brand-gold/60';
                
                if (pin.category === 'ministry') {
                  icon = <Landmark className="w-3.5 h-3.5 text-rose-500" />;
                  glowColor = 'shadow-red-500/50 border-red-500/40 bg-red-950/80';
                } else if (pin.category === 'altar') {
                  icon = <Radio className="w-3.5 h-3.5 text-yellow-400" />;
                  glowColor = 'shadow-yellow-400/50 border-yellow-400/50 bg-black/60';
                } else if (pin.category === 'tunnel') {
                  icon = <Ghost className="w-3.5 h-3.5 text-emerald-400" />;
                  glowColor = 'shadow-emerald-400/50 border-emerald-400/50 bg-emerald-950/80';
                } else {
                  // User created/emergent beacons
                  icon = <Navigation className="w-3 h-3 text-brand-gold rotate-45 animate-bounce" />;
                  glowColor = 'shadow-brand-gold/60 border-brand-gold animate-pulse bg-zinc-950/95';
                }

                return (
                  <button
                    key={pin.id}
                    title={pin.label}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPin(pin);
                      setShowAddForm(false);
                    }}
                    style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full border shadow-md flex items-center justify-center transition-all z-10 cursor-pointer active:scale-90 hover:scale-125 ${
                      isSelected ? 'scale-130 border-white ring-2 ring-brand-gold/40 z-20' : glowColor
                    }`}
                  >
                    {icon}
                    
                    {/* Tiny visual label for important items always visible */}
                    <span className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/80 font-mono text-[7.5px] px-1 py-0.5 rounded border border-zinc-800 text-zinc-300 font-semibold uppercase tracking-wider whitespace-nowrap opacity-0 md:opacity-100 group-hover:opacity-100 transition-opacity">
                      {pin.label}
                    </span>

                    {/* Outer glowing pulsing halo around user transmitters */}
                    {pin.isUserCreated && (
                      <span className="absolute -inset-1 rounded-full bg-brand-gold/20 animate-ping -z-10" />
                    )}
                  </button>
                );
              })}

              {/* FAKE RADAR GLITCH STICKERS */}
              {Math.random() > 0.8 && (
                <div className="absolute right-10 top-1/4 font-mono text-[8px] text-zinc-650 tracking-widest uppercase opacity-30 select-none animate-pulse">
                  **OVERRIDE FEED SIGNAL INJECTED**
                </div>
              )}

              {/* COMPOSITION CROSS-HAIR GUIDE WHEN MARKING CUSTOM PLACE */}
              {clickCoords && showAddForm && (
                <div 
                  style={{ left: `${clickCoords.x}%`, top: `${clickCoords.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10"
                >
                  <div className="w-8 h-8 rounded-full border border-dashed border-brand-gold animate-spin" />
                  <div className="w-1 h-1 rounded-full bg-brand-gold absolute" />
                </div>
              )}
            </>
          )}
        </div>

        {/* SCANLINES GRADIENT FOR COMPOSITES */}
        <div className="absolute inset-0 scanlines opacity-5 pointer-events-none" />
      </div>

      {/* LOWER PANEL: PIN DETAILS CARD & INPUT MODAL DETAILS */}
      <div className="mt-4">
        <AnimatePresence mode="wait">
          {/* PLACE A NEW PIN FLOW */}
          {showAddForm && clickCoords && !isJammed && (
            <motion.form
              key="add-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleDeployPin}
              className="p-4 rounded-lg bg-zinc-950/80 border border-brand-gold/30 space-y-3 font-mono text-xs text-zinc-300 box-glow-gold"
            >
              <h5 className="font-bold text-brand-gold text-[10px] uppercase tracking-widest border-b border-zinc-900 pb-1.5 flex items-center gap-1.5">
                <Send className="w-3 h-3 text-brand-gold animate-bounce" />
                {mt.addPinTitle}
              </h5>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
                {/* LEFT: FORM INPUTS */}
                <div className="md:col-span-8 space-y-3">
                  <div>
                    <label className="block text-[9px] text-zinc-500 uppercase mb-1">{mt.inputName}</label>
                    <input 
                      type="text"
                      className="w-full bg-black border border-zinc-800 rounded px-2.5 py-1.5 font-mono text-[10px] text-white focus:outline-none focus:border-brand-gold"
                      required
                      maxLength={24}
                      value={newLabel}
                      onChange={(e) => setNewLabel(e.target.value)}
                      placeholder={mt.inputNamePlaceholder}
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] text-zinc-500 uppercase mb-1">{mt.inputNote}</label>
                    <textarea 
                      className="w-full bg-black border border-zinc-800 rounded px-2.5 py-1.5 font-mono text-[10px] text-white focus:outline-none focus:border-brand-gold h-16 resize-none"
                      maxLength={140}
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder={mt.inputNotePlaceholder}
                    />
                  </div>
                </div>

                {/* RIGHT: TYPE SELECT & GEOLOGICAL DATA CARD */}
                <div className="md:col-span-4 space-y-3">
                  <div>
                    <label className="block text-[9px] text-zinc-500 uppercase mb-1">{mt.inputCategory}</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as 'safehouse' | 'beacon')}
                      className="w-full bg-black border border-zinc-800 rounded px-2.5 py-1.5 font-mono text-[10px] text-white focus:outline-none focus:border-brand-gold cursor-pointer"
                    >
                      <option value="beacon">📡 RELAY BEACON</option>
                      <option value="safehouse">🏡 REBEL OUTPOST</option>
                    </select>
                  </div>

                  {/* READOUT Fake Geo Data info */}
                  <div className="p-2.5 bg-black/40 border border-zinc-900 rounded space-y-1 text-[8.5px] leading-relaxed text-zinc-500">
                    <div>SCAN_X: {clickCoords.x.toFixed(2)}%</div>
                    <div>SCAN_Y: {clickCoords.y.toFixed(2)}%</div>
                    <div>EST_COORDS: {(33.50 - (clickCoords.y / 100) * 0.10).toFixed(4)}, {(-112.15 + (clickCoords.x / 100) * 0.15).toFixed(4)}</div>
                  </div>
                </div>
              </div>

              {/* ACTION BTNS */}
              <div className="flex gap-2 justify-end border-t border-zinc-900 pt-2 bg-gradient-to-r from-transparent to-black/30">
                <button
                  type="button"
                  onClick={() => { setShowAddForm(false); setClickCoords(null); }}
                  className="px-3 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {mt.btnCancel}
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-brand-gold text-black font-bold rounded text-[10px] uppercase tracking-wider hover:bg-yellow-400 active:scale-95 transition-all cursor-pointer"
                >
                  {mt.btnDeploy}
                </button>
              </div>
            </motion.form>
          )}

          {/* ACTIVE SELECTED NODE DETAILS */}
          {selectedPin && !showAddForm && (
            <motion.div
              key="selected-details"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`p-4 rounded-lg bg-black/45 border font-mono text-xs text-zinc-300 space-y-2 relative block select-text ${
                selectedPin.isUserCreated 
                  ? 'border-brand-gold/25' 
                  : selectedPin.category === 'ministry' 
                    ? 'border-red-500/25' 
                    : 'border-zinc-800'
              }`}
            >
              <div className="flex items-start justify-between border-b border-zinc-900/60 pb-2 gap-3">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className={`px-1.5 py-0.2 rounded text-[7.5px] font-bold ${
                      selectedPin.isUserCreated 
                        ? 'bg-amber-950/40 text-brand-gold border border-brand-gold/20' 
                        : selectedPin.category === 'ministry' 
                          ? 'bg-rose-950/40 text-red-500 border border-red-900/30' 
                          : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                    }`}>
                      {selectedPin.category.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-bold text-white uppercase sm:text-xs">
                      {selectedPin.label}
                    </span>
                  </div>
                  
                  {/* LAT AND LNG */}
                  <div className="text-[9px] text-zinc-500 mt-1 flex items-center gap-2">
                    <span>COORDS: <strong className="text-zinc-400 cursor-pointer hover:text-white underline" onClick={() => handleCopyCoords(selectedPin)}>{selectedPin.lat}, {selectedPin.lng}</strong></span>
                    {selectedPin.timestamp && <span className="text-zinc-650">// INJECT_TIME: {selectedPin.timestamp}</span>}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => handleCopyCoords(selectedPin)}
                    className="p-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors text-[9px] active:scale-95 cursor-pointer uppercase flex items-center gap-1"
                  >
                    {copiedText ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : "COPY"}
                  </button>

                  {selectedPin.isUserCreated && (
                    <button
                      onClick={() => {
                        const remaining = pins.filter(p => p.id !== selectedPin.id);
                        setPins(remaining);
                        setSelectedPin(null);
                        const userOnly = remaining.filter(p => p.isUserCreated);
                        try {
                          localStorage.setItem('audiosfree_map_pins', JSON.stringify(userOnly));
                        } catch (err) {}
                      }}
                      className="p-1 rounded bg-zinc-950 border border-red-950 text-red-400 hover:bg-rose-950/30 transition-colors active:scale-95 cursor-pointer"
                      title="Decommission Beacon"
                    >
                      <Trash2 className="w-3 w-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Lore entry quote / user encrypted log description */}
              <p className="text-[10.5px] leading-relaxed text-zinc-300 italic py-1 font-sans">
                "{selectedPin.note}"
              </p>

              {copiedText && (
                <div className="text-[8.5px] text-emerald-400 animate-pulse text-right">
                  {mt.nodeCopied}
                </div>
              )}
            </motion.div>
          )}

          {/* EMPTY USER DEFINED SIGNALS AND SYSTEM CODES */}
          {!selectedPin && !showAddForm && (
            <div className="p-4 rounded-lg bg-black/20 border border-zinc-900/60 font-mono text-[10.5px] text-zinc-500 flex flex-col sm:flex-row sm:items-center sm:justify-between whitespace-normal leading-relaxed gap-3">
              <span className="font-light italic">
                {isJammed 
                  ? "GRID CHANNELS DEGRADED // CALIBRATE FREQUENCY TO EXTRAPOLATE COGNITIVE MAP SITES" 
                  : mt.emptyUserPins
                }
              </span>
              
              {!isJammed && pins.some(p => p.isUserCreated) && (
                <button
                  onClick={handleClearUserPins}
                  className="flex items-center gap-1.5 px-2 py-1 bg-red-950/20 hover:bg-rose-950/40 text-red-400 rounded border border-red-900/50 cursor-pointer text-[9px] font-bold uppercase transition-transform active:scale-95"
                >
                  <Trash2 className="w-3 h-3 text-red-400" />
                  {mt.clearUserPins}
                </button>
              )}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
