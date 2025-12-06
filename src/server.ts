
import Fastify from 'fastify';
import { handleConversation } from './core/conversationHandler';
import { handleDfWebhook } from './legacy-df/dfWebhookHandler';

import * as dotenv from "dotenv";
dotenv.config();


const app = Fastify({ logger: true });

app.post('/df-webhook', handleDfWebhook);

app.post('/conversation/dcx', async (req, reply) => {
  const body: any = req.body;
  const userInput =
    body?.text ||
    body?.sessionInfo?.parameters?.user_input ||
    '';
  const sessionId =
    body?.sessionInfo?.session || 'unknown-session';

  const result = await handleConversation({
    text: userInput,
    sessionId
  });

  return reply.send({
    fulfillment_response: {
      messages: [
        { text: { text: [result.text] } }
      ]
    }
  });
});

app.listen({ port: 8080, host: '0.0.0.0' })
  .catch(err => {
    app.log.error(err);
    process.exit(1);
  });
