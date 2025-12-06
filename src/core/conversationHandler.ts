
import { ConversationRequest, HandlerResult } from './types';
import { detectIntent } from '../adapters/llmAdapter';
import { normalizeIntent } from './intentNormalizer';
import { dispatch } from './dispatcher';
import {performance} from "node:perf_hooks";

export async function handleConversation(
  req: ConversationRequest
): Promise<{ text: string; meta?: Record<string, unknown> }> {
  
  const t0 = performance.now();
  const t1 = performance.now();
  
  const llmResult = await detectIntent(req.text, req.sessionId, req.metadata);
  const t2 = performance.now();
  
  console.log(llmResult);
  const normalized = normalizeIntent(llmResult);
  const t3 = performance.now();
  
  console.log(normalized);
  const domainResult: HandlerResult = await dispatch(normalized, req);
  const t4 = performance.now();
  
  const total = t4-t0;
  const tLLM = t2-t1;
  const tNorm = t3-t2;
  const tDispatch = t4-t3;

  console.log({
    msg: "latency_breakdown",
    sessionId: req.sessionId,
    total_ms: total.toFixed(1),
    llm_ms: tLLM.toFixed(1),
    normalize_ms: tNorm.toFixed(1),
    dispatch_ms: tDispatch.toFixed(1)
  });

  console.log(domainResult);

  return {
    text: domainResult.message,
    meta: domainResult.meta
  };
}
