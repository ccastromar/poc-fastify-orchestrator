import Fastify from "fastify";

const app = Fastify({ logger: true });

app.post("/intent", async (req, reply) => {
  const body: any = req.body;
  const text: string = (body?.text || "").toLowerCase();

  // Reglas súper simples para el mock:
  if (text.includes("saldo") && text.includes("tarjeta")) {
    return reply.send({
      intent: "saldo_tarjeta",
      entities: {
        card_alias: extractCardAlias(text) || "desconocida"
      },
      confidence: 0.92
    });
  }

  if (text.includes("movimientos") && text.includes("cuenta")) {
    return reply.send({
      intent: "movimientos_cuenta",
      entities: {
        account_alias: extractAccountAlias(text) || "desconocida"
      },
      confidence: 0.92
    });
  }

  if (text.includes("bloquear") && text.includes("tarjeta")) {
    return reply.send({
      intent: "bloquear_tarjeta",
      entities: {
        card_alias: extractCardAlias(text) || "desconocida"
      },
      confidence: 0.88
    });
  }

  // Intent genérico
  return reply.send({
    intent: "unknown",
    entities: {},
    confidence: 0.4
  });
});

// Función auxiliar muy simple para extraer alias de tarjeta
function extractCardAlias(text: string): string | null {
  const words = text.split(/\s+/);
  const index = words.findIndex(w => w === "tarjeta");
  return index >= 0 && words[index + 1] ? words[index + 1] : null;
}

// Función auxiliar muy simple para extraer alias de cuenta
function extractAccountAlias(text: string): string | null {
  const words = text.split(/\s+/);
  const index = words.findIndex(w => w === "cuenta");
  return index >= 0 && words[index + 1] ? words[index + 1] : null;
}

app.listen({ port: 9000, host: "0.0.0.0" }).then(() => {
  console.log("Mock LLM escuchando en http://localhost:9000/intent");
});

