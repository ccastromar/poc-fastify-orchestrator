
import { NormalizedIntent, ConversationRequest, HandlerResult } from './types';
import { handleCardBalance, handleCardBlock } from '../domain/banking/handleCardBalance';
import { handleAccountMovements} from '../domain/banking/handleAccountMovements';
import { handleFallback } from '../domain/info/handleFallback';

type HandlerFn = (
  normalized: NormalizedIntent,
  req: ConversationRequest
) => Promise<HandlerResult>;

const registry: Record<string, HandlerFn> = {
  'CARD.BALANCE': handleCardBalance,
  'CARD.BLOCK': handleCardBlock,
  'ACCOUNT.MOVEMENTS': handleAccountMovements,
  'UNKNOWN': handleFallback
};

export async function dispatch(
  normalized: NormalizedIntent,
  req: ConversationRequest
): Promise<HandlerResult> {
  const handler = registry[normalized.intent] ?? handleFallback;
  return handler(normalized, req);
}
