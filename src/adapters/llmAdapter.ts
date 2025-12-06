
import axios from 'axios';
import { LlmResult } from '../core/types';

export async function detectIntent(
  text: string,
  sessionId: string,
  metadata?: Record<string, unknown>
): Promise<LlmResult> {
  console.log(process.env.LLM_INTENT_ENDPOINT)
  const res = await axios.post(
    process.env.LLM_INTENT_ENDPOINT!,
    { text, sessionId, metadata }
  );
  return res.data;
}
