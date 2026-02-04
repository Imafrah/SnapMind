
export enum AppState {
  EMPTY = 'EMPTY',
  LOADING_CAPTURE = 'LOADING_CAPTURE',
  READY = 'READY',
  THINKING = 'THINKING',
  ERROR = 'ERROR'
}

export interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}

export interface AppStateData {
  status: AppState;
  screenshot: string | null;
  history: ChatMessage[];
  error: string | null;
}
