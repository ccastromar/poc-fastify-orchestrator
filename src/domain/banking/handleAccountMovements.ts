
import { NormalizedIntent, ConversationRequest, HandlerResult } from '../../core/types';
import { callFargate } from '../../adapters/fargateAdapter';

export async function handleAccountMovements(
  normalized: NormalizedIntent,
  req: ConversationRequest
): Promise<HandlerResult> {
  const accountAlias = normalized.entities['account_alias'] as string | undefined;

  if (!accountAlias) {
    return { message: '¿Sobre qué cuenta quieres consultar los movimientos?' };
  }

  const result = await callFargate('ACCOUNT.MOVEMENTS', {
    sessionId: req.sessionId,
    accountAlias
  });

  const formatted = result.movements
    .map(m => `${m.date}: ${m.concept} (${m.amount} ${m.currency})`)
    .join(", ");

  return {
    message: `Los movimientos de tu cuenta son: ${formatted}`
  };

}

