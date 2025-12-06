
import { LlmResult, NormalizedIntent } from './types';

const INTENT_MAP: Record<string, string> = {
  'saldo_tarjeta': 'CARD.BALANCE',
  'consultar_saldo_tarjeta': 'CARD.BALANCE',
  'card_balance': 'CARD.BALANCE',
  'bloquear_tarjeta': 'CARD.BLOCK',
  'movimientos_cuenta': 'ACCOUNT.MOVEMENTS'
};

export function normalizeIntent(llm: LlmResult): NormalizedIntent {
  const raw = (llm.intent || '').toLowerCase();
  const mapped = INTENT_MAP[raw] || 'UNKNOWN';

  return {
    intent: mapped,
    entities: llm.entities ?? {},
    confidence: llm.confidence ?? 0
  };
}
