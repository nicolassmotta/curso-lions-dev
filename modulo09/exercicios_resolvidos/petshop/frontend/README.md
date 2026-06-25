# Petshop · Frontend

Frontend em React (Vite) para disparar a requisição de cadastro de agendamento
(`POST /api/agendamento/cadastro`) do backend Node.js.

## Como rodar

1. **Suba o backend** (na pasta `petshop`):
   ```bash
   npm install
   npm start          # roda em http://localhost:3000
   ```

2. **Suba o frontend** (na pasta `petshop/frontend`):
   ```bash
   npm install
   npm run dev        # abre em http://localhost:5173
   ```

O Vite faz proxy de `/api` para `http://localhost:3000`, então não é preciso
configurar CORS no backend.
