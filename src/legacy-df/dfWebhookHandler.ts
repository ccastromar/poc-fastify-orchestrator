
import { FastifyReply, FastifyRequest } from 'fastify';

export async function handleDfWebhook(req: FastifyRequest, reply: FastifyReply) {
  return reply.send({ fulfillmentText: "Legacy DF placeholder" });
}
