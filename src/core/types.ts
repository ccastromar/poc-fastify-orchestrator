
export interface ConversationRequest {
  text: string;
  sessionId: string;
  metadata?: Record<string, unknown>;
}

export interface LlmResult {
  intent: string;
  entities: Record<string, unknown>;
  confidence?: number;
}

export interface NormalizedIntent {
  intent: string;
  entities: Record<string, unknown>;
  confidence: number;
}

export interface HandlerResult {
  message: string;
  meta?: Record<string, unknown>;
}
