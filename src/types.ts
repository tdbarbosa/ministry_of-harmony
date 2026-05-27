export interface Transmission {
  id: string;
  sender: 'MINISTRY OF HARMONY' | 'ETHAN CROSS' | 'RESISTANCE' | 'UNKNOWN SERVICE';
  timestamp: string;
  classification: 'UNRESTRICTED' | 'CLASSIFIED' | 'CORRUPTED' | 'ENCRYPTED';
  title: string;
  content: string;
  encryptedContent?: string;
  cipherCode?: string;
  isUnlocked?: boolean;
  isGlitchy?: boolean;
}

export interface InUniverseDoc {
  id: string;
  title: string;
  category: 'CITIZEN_CALIBRATION' | 'FREQUENCIES' | 'TOWER_INFRASTRUCTURE' | 'RESISTANCE_DOSSIER' | 'FORBIDDEN_SONGS';
  severity: 'SECURE' | 'WARNING' | 'CRITICAL' | 'ELEVATED';
  summary: string;
  fullBody: string;
  hackedContent?: string;
}

export interface SongLyrics {
  title: string;
  subtitle: string;
  lyrics: string[];
  hiddenClues: string[];
  resonanceFreq: number;
}

export interface TerminalLog {
  text: string;
  type: 'system' | 'hacker' | 'alert' | 'success' | 'input';
  time: string;
}
