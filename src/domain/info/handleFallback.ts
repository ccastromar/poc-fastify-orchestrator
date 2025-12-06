
import { HandlerResult } from '../../core/types';

export async function handleFallback(): Promise<HandlerResult> {
  return { message: 'No he entendido tu solicitud, ¿puedes repetirla?' };
}
