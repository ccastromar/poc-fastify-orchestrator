curl -X POST http://localhost:8080/conversation/dcx \
  -H "Content-Type: application/json" \
  -d '{
    "text": "quiero saber el saldo de mi tarjeta visa oro",
    "metadata": {
      "channel": "genesys-voice",
      "language": "es-ES",
      "customerId": "987654"
    },
    "sessionInfo": {
      "session": "projects/xxx/locations/eu/agents/xxx/sessions/s1234"
    }
  }'

