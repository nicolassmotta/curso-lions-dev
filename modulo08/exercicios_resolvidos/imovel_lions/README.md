# Imovel Lions

Frontend React para consumir a API Express do projeto Imovel Lions.

## Como rodar

1. Instale as dependencias:

   ```bash
   npm install
   ```

2. Configure o backend em `.env` com `PORT=3000` e sua `MONGO_URI`.

3. Em um terminal, rode a API:

   ```bash
   npm run api
   ```

4. Em outro terminal, rode o frontend:

   ```bash
   npm run dev
   ```

O frontend abre em `http://localhost:8000/` e usa proxy para a API em `http://localhost:3000/`.

Se quiser usar outra porta para a API durante o desenvolvimento, defina `VITE_API_PROXY_TARGET` no `.env`, por exemplo:

```bash
VITE_API_PROXY_TARGET=http://localhost:4000
```
