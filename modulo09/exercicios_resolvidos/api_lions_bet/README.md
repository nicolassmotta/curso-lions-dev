# Resposta: API da Lions Bet (Casa de Apostas com Admin)

Enunciado: [`lista_de_exercicios/api_lions_bet.md`](../../lista_de_exercicios/api_lions_bet.md)

Projeto completo, construído sobre o [Boilerplate Lions Dev](https://github.com/nicolassmotta/boilerplate-lions-dev). Inclui a parte obrigatória e os desafios bônus, marcados com `Bônus` nos comentários.

## Como rodar

```bash
npm install
cp .env.example .env   # preencha MONGO_URI e JWT_SECRET
npm start
```

## Arquivos criados nesta lista

- `src/controllers/aposta.controller.js`
- `src/controllers/evento.controller.js`
- `src/middlewares/apenasAdmin.middleware.js`
- `src/models/aposta.model.js`
- `src/models/evento.model.js`
- `src/repositories/aposta.repository.js`
- `src/repositories/evento.repository.js`
- `src/routes/aposta.routes.js`
- `src/routes/evento.routes.js`
- `src/services/aposta.service.js`
- `src/services/evento.service.js`

## Arquivos do boilerplate que foram alterados

- `src/app.js`
- `src/controllers/usuario.controller.js`
- `src/middlewares/autenticacao.middleware.js`
- `src/models/usuario.model.js`
- `src/repositories/usuario.repository.js`
- `src/routes/usuario.routes.js`
- `src/services/auth.service.js`
- `src/services/usuario.service.js`
