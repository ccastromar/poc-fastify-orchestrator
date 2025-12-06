
import { NormalizedIntent, ConversationRequest, HandlerResult } from '../../core/types';
import { callFargate } from '../../adapters/fargateAdapter';

export async function handleCardBalance(
  normalized: NormalizedIntent,
  req: ConversationRequest
): Promise<HandlerResult> {
  const cardAlias = normalized.entities['card_alias'] as string | undefined;

  if (!cardAlias) {
    return { message: '¿Sobre qué tarjeta quieres consultar el saldo?' };
  }

  const result = await callFargate('CARD.BALANCE', {
    sessionId: req.sessionId,
    cardAlias
  });

  return {
    message: `El saldo de la tarjeta ${cardAlias} es ${result.saldo} euros.`,
    meta: { saldo: result.saldo }
  };
}

export async function handleCardBlock(
  normalized: NormalizedIntent,
  req: ConversationRequest
): Promise<HandlerResult> {
  const cardAlias = normalized.entities['card_alias'] as string | undefined;

  if (!cardAlias) {
    return { message: '¿Sobre qué tarjeta quieres consultar el saldo?' };
  }

  const result = await callFargate('CARD.BLOCK', {
    sessionId: req.sessionId,
    cardAlias
  });

  return {
    message: `La tarjeta ${cardAlias} se ha bloqueado correctamente.`,
    meta: { "ok":true }
  };
}
