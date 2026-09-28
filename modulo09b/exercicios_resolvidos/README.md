# Módulo 9B: gabarito dos testes, do Swagger e do debug

Arquivos para copiar para a **raiz do boilerplate** ([boilerplate-lions-dev](https://github.com/nicolassmotta/boilerplate-lions-dev)):

| Arquivo | O que é |
|---|---|
| `tests/` | os testes dos slides (14) + `docs.test.js` (documentação) + `corpoVazio.test.js` (bug do body vazio) |
| `vitest.config.js` | `JWT_SECRET` e `BCRYPT_SALT_ROUNDS` só para os testes |
| `src/docs/openapi.js` | documentação OpenAPI de cadastro, login e perfil |
| `.vscode/launch.json` | configuração de debug (F5) |

## Como rodar

```bash
npm install -D vitest supertest
npm install swagger-ui-express
npm pkg set scripts.test="vitest run"
npm test
```

Para o Swagger, acrescente ao `src/app.js`, junto das outras rotas e **antes** do 404:

```js
import swaggerUi from "swagger-ui-express";
import openapi from "./docs/openapi.js";

app.get("/api/docs.json", (req, res) => res.json(openapi));
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openapi));
```

O `corpoVazio.test.js` **falha** até você corrigir o `validarCampos.middleware.js` com `const { nome, email, senha } = req.body ?? {};` (e o mesmo no `validarLogin`). É o caso real da aula: no Express 5, sem body, o `req.body` fica `undefined`.

Com tudo aplicado: 9 arquivos e 20 testes passando, sem banco de dados.
