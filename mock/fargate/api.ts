import Fastify from "fastify";

const app = Fastify({ logger: true });

//
// 1. Endpoint: consultar saldo de tarjeta
// ---------------------------------------
app.post("/CARD.BALANCE", async (req, reply) => {
  const body: any = req.body;
  const cardAlias = body?.cardAlias ?? "desconocida";

  // Respuesta simulada
  return reply.send({
    cardAlias,
    saldo: generarSaldoMock(cardAlias),
    currency: "EUR"
  });
});

//
// 2. Endpoint: bloquear tarjeta
// ---------------------------------------
app.post("/CARD.BLOCK", async (req, reply) => {
  const body: any = req.body;
  const cardAlias = body?.cardAlias ?? "desconocida";

  return reply.send({
    status: "OK",
    message: `Tarjeta ${cardAlias} bloqueada correctamente`,
    timestamp: new Date().toISOString()
  });
});

//
// 3. Endpoint: movimientos de cuenta
// ---------------------------------------
app.post("/ACCOUNT.MOVEMENTS", async (req, reply) => {
  return reply.send({
    movements: [
      {
        date: "2024-02-01",
        concept: "Pago supermercado",
        amount: -42.13,
        currency: "EUR"
      },
      {
        date: "2024-01-29",
        concept: "Ingreso nómina",
        amount: 1860.55,
        currency: "EUR"
      },
      {
        date: "2024-01-25",
        concept: "Café",
        amount: -2.10,
        currency: "EUR"
      }
    ]
  });
});

//
// 4. Default handler (cualquier endpoint desconocido)
// ---------------------------------------
app.all("/*", async (req, reply) => {
  return reply.status(404).send({
    error: "Unknown operation",
    path: req.url
  });
});


//
// Función helper: generar un saldo aleatorio estable
//
function generarSaldoMock(card: string): number {
  // Semilla simple para que siempre genere el mismo saldo por alias
  let hash = 0;
  for (let i = 0; i < card.length; i++) {
    hash = (hash << 5) - hash + card.charCodeAt(i);
    hash |= 0;
  }
  const base = Math.abs(hash % 5000);
  return Number((base + 50).toFixed(2));
}

//
// Arrancar mock
//
app.listen({ port: 9100, host: "0.0.0.0" }).then(() => {
  console.log("Mock Fargate escuchando en http://localhost:9100");
});
