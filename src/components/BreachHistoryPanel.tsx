import { Trash2, AlertOctagon, History, ShieldAlert, Sparkles, Trophy } from 'lucide-react';
import { Language } from '../i18n';

export interface BreachRecord {
  id: string;
  timestamp: string;
  frequency: number;
  type: 'frequency_match' | 'console_override' | 'compliance_rebellion' | 'manual_awaken';
  description: string;
}

interface BreachHistoryPanelProps {
  history: BreachRecord[];
  onClear: () => void;
  language: Language;
}

export default function BreachHistoryPanel({ history, onClear, language }: BreachHistoryPanelProps) {
  const isPt = language === 'pt';
  const isEs = language === 'es';

  const titleText = isPt ? 'REGISTRO DE INTRUSÕES CRÍTICAS' : isEs ? 'HISTORIAL DE INVASIÓN CRÍTICA' : 'BREACH HISTORY LOG';
  const subtitleText = isPt ? 'Histórico de soberania e quebras do firewall' : isEs ? 'Registro de disrupciones de seguridad' : 'Decrypted records of central firewall bypasses';
  const emptyText = isPt ? 'Nenhuma invasão ativa registrada na memória local.' : isEs ? 'Ninguna intrusión registrada en el almacenamiento local.' : 'No active intrusions recorded in memory.';
  const clearBtnText = isPt ? 'Limpar Registros' : isEs ? 'Borrar Historial' : 'Purge Archives';

  // Label types
  const getBadgeStyle = (type: string) => {
    switch (type) {
      case 'frequency_match':
        return 'bg-amber-950/40 text-amber-400 border border-amber-500/30';
      case 'console_override':
        return 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/35';
      case 'compliance_rebellion':
        return 'bg-red-950/40 text-red-400 border border-red-500/30';
      default:
        return 'bg-blue-950/40 text-blue-400 border border-blue-500/30';
    }
  };

  const getTypeLabel = (type: string) => {
    if (isPt) {
      if (type === 'frequency_match') return 'SINTONIA';
      if (type === 'console_override') return 'CONSOLE';
      if (type === 'compliance_rebellion') return 'COMPLIANCE';
      return 'CALIBRADOR';
    } else if (isEs) {
      if (type === 'frequency_match') return 'SINTONÍA';
      if (type === 'console_override') return 'CONSOLA';
      if (type === 'compliance_rebellion') return 'CUESTIONARIO';
      return 'CALIBRADOR';
    } else {
      if (type === 'frequency_match') return 'FREQ LOCK';
      if (type === 'console_override') return 'OVERRIDE';
      if (type === 'compliance_rebellion') return 'REBEL QUIZ';
      return 'MANUAL DET';
    }
  };

  return (
    <div id="historical-breach-log" className="p-4 rounded-lg bg-black/60 border border-zinc-900 font-mono text-[10px] space-y-3 relative overflow-hidden box-glow-red transition-all duration-700">
      
      {/* Visual background static layout */}
      <div className="absolute right-2 top-2 opacity-5 select-none pointer-events-none">
        <History className="w-16 h-16 text-rose-500" />
      </div>

      <div className="flex justify-between items-center pb-2 border-b border-zinc-900 select-none">
        <div className="flex items-center gap-1.5">
          <History className="w-4 h-4 text-brand-accent-red animate-pulse" />
          <div>
            <span className="font-extrabold text-[#dc2626] tracking-wider uppercase block">
              {titleText}
            </span>
            <span className="text-[8px] text-zinc-550 block">
              {subtitleText}
            </span>
          </div>
        </div>
        
        {history.length > 0 && (
          <button
            onClick={onClear}
            className="p-1 px-1.5 rounded bg-zinc-900 hover:bg-red-950/40 border border-zinc-800 hover:border-brand-accent-red/50 text-zinc-500 hover:text-red-400 transition-all duration-300 flex items-center gap-1 select-none cursor-pointer text-[8px]"
          >
            <Trash2 className="w-3 h-3" />
            <span>{clearBtnText}</span>
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="py-6 text-center text-zinc-650 flex flex-col items-center justify-center space-y-1.5 select-none">
          <ShieldAlert className="w-6 h-6 text-zinc-700 animate-pulse" />
          <p className="text-[9px] lowercase italic px-3">
            {emptyText}
          </p>
        </div>
      ) : (
        <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-800">
          {history.map((record, rIdx) => (
            <div 
              key={record.id}
              className="p-2 bg-gradient-to-r from-zinc-950/90 to-zinc-900/40 rounded border border-zinc-900/70 hover:border-zinc-800 flex flex-col gap-1 transition-all"
            >
              <div className="flex justify-between items-center text-[8.5px]">
                <span className="text-zinc-600">
                  {record.timestamp}
                </span>
                <span className={`px-1 rounded text-[7.5px] font-bold ${getBadgeStyle(record.type)}`}>
                  {getTypeLabel(record.type)}
                </span>
              </div>
              <p className="text-gray-300 text-[9px] leading-relaxed">
                {record.description}
              </p>
              <div className="flex justify-between items-center text-[7.5px] text-zinc-550 border-t border-zinc-950 pt-1 mt-0.5">
                <span>FREQ: {record.frequency} HZ</span>
                <span className="text-brand-gold font-bold">● ONLINE OVERRIDE_REFILL</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Progress stats snippet */}
      {history.length > 0 && (
        <div className="pt-2 border-t border-zinc-900 text-[8px] flex justify-between select-none text-zinc-550">
          <span className="flex items-center gap-1 text-brand-gold">
            <Trophy className="w-2.5 h-2.5 text-brand-gold animate-bounce" />
            <span>{isPt ? 'REBELIÃO INTENSIFICADA' : isEs ? 'REBELDÍA INTENSIFICADA' : 'REBELLION ESCALATED'}</span>
          </span>
          <span>{history.length} {isPt ? 'EVENTOS DETECTADOS' : isEs ? 'EVENTOS DETECTADOS' : 'EVENTS LOGGED'}</span>
        </div>
      )}

    </div>
  );
}
