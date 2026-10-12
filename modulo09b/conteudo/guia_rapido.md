<style>
  :root {
    --ld-preto: #000000;
    --ld-branco: #FFFFFF;
    --ld-laranja: #E16D34;
    --ld-laranja-suave: #FBEDE5;
    --ld-muted: #6B7280;
    --ld-bloco: #F7F7F8;
    --ld-codigo: #F0F0F2;
    --ld-borda: #E5E7EB;
  }

  body { font-family: 'Segoe UI', Helvetica, Arial, sans-serif; color: var(--ld-preto); font-size: 12px; }
  h1 { color: var(--ld-preto); font-size: 21px; font-weight: 700; border-bottom: 3px solid var(--ld-laranja); padding-bottom: 6px; margin: 0 0 6px; }
  h2 { color: var(--ld-preto); font-size: 14px; font-weight: 700; margin: 12px 0 5px; padding-left: 8px; border-left: 4px solid var(--ld-laranja); break-after: avoid; }
  p, li { font-size: 11.5px; line-height: 1.45; margin: 3px 0; }
  ul, ol { padding-left: 18px; margin: 3px 0; }
  a { color: var(--ld-laranja); text-decoration: none; }
  code { background-color: var(--ld-codigo) !important; color: var(--ld-preto) !important; font-weight: 600; padding: 1px 4px; border-radius: 3px; border: 1px solid var(--ld-borda); font-size: 10.5px; }
  pre { background-color: var(--ld-bloco) !important; border: 1px solid var(--ld-borda); border-left: 3px solid var(--ld-laranja); border-radius: 4px; padding: 6px 8px; margin: 5px 0; break-inside: avoid; white-space: pre-wrap; }
  pre code { border: 0; padding: 0; background: none !important; font-size: 10px; line-height: 1.35; font-weight: 500; }
  table { border-collapse: collapse; width: 100%; margin: 5px 0; font-size: 10.5px; break-inside: avoid; }
  th { background-color: var(--ld-preto); color: var(--ld-branco); padding: 4px 6px; text-align: left; }
  td { border: 1px solid var(--ld-borda); padding: 3px 6px; vertical-align: top; }
  tr:nth-child(even) { background-color: var(--ld-bloco); }
  blockquote { background-color: var(--ld-laranja-suave); border-left: 4px solid var(--ld-laranja); padding: 5px 10px; margin: 6px 0; border-radius: 0 4px 4px 0; color: var(--ld-preto); }
  blockquote p { margin: 0; }
  .cols { }
  .intro { color: var(--ld-muted); font-size: 11px; margin: 0 0 8px; }
  .rodape { text-align: center; color: var(--ld-muted); font-size: 11px; margin-top: 18px; }
</style>

# Guia rápido · Módulo 9B: Testes, Swagger e Debug da API

<div class="intro">Resumo para consulta rápida. A explicação completa está nos slides e nos arquivos desta pasta.</div>

<div class="cols">

## Preparando
```bash
npm install -D vitest supertest
```
```json
"scripts": { "test": "vitest run", "test:watch": "vitest" }
```
```js
// vitest.config.js
import { defineConfig } from "vitest/config"
export default defineConfig({
  test: { env: { JWT_SECRET: "segredo-so-para-testes", BCRYPT_SALT_ROUNDS: "4" } },
})
```

## Anatomia de um teste
```js
import { describe, it, expect } from "vitest"
import request from "supertest"
import app from "../src/app.js"     // app.js separado do server.js

describe("GET /api/usuarios/perfil", () => {
  it("sem token responde 401", async () => {
    const res = await request(app).get("/api/usuarios/perfil")
    expect(res.status).toBe(401)
    expect(res.body.message).toBe("Token não informado.")
  })
})
```

## Matchers
`toBe` (mesmo valor/referência) · `toEqual` (mesmo conteúdo) · `not.toBe` · `toBeInstanceOf(Error)` · `toHaveProperty("x")` · `toBeTypeOf("string")` · `toContain("x")` · `toHaveBeenCalled()` · `toHaveBeenCalledWith(id)`

## supertest
```js
await request(app).post("/api/auth/login").send({ email, senha })
await request(app).get("/api/usuarios/perfil").set("Authorization", `Bearer ${token}`)
res.status · res.body · res.text · res.headers
```

## Mock do repository (sem banco)
```js
import { vi, beforeEach } from "vitest"
import UsuarioRepository from "../src/repositories/usuario.repository.js"
vi.mock("../src/repositories/usuario.repository.js")
beforeEach(() => { vi.resetAllMocks() })

UsuarioRepository.buscarPorEmail.mockResolvedValue(null)
UsuarioRepository.criar.mockImplementation(async (d) => new Usuario(d))
```

## O que testar em cada rota
200/201 (e o que **não** pode vir, como a senha) · 400 · 401 · 403 · 404 · 409

## Swagger (OpenAPI)
```js
// npm install swagger-ui-express
import swaggerUi from "swagger-ui-express"
import openapi from "./docs/openapi.js"
app.get("/api/docs.json", (req, res) => res.json(openapi))
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openapi)) // antes do 404
```
No `openapi.js`: `info`, `servers`, `components.securitySchemes.bearerAuth` (`type: "http", scheme: "bearer"`), `paths` com `requestBody` e `responses`. Rota com token: `security: [{ bearerAuth: [] }]`. No navegador: **Try it out** e **Authorize** (cole só o token). Postman: Import → Link → `/api/docs.json`.

## Debug com breakpoints
| Jeito | Como |
|---|---|
| JavaScript Debug Terminal | seta do `+` do terminal → rode `npm start` ou `npx vitest run arquivo` |
| `.vscode/launch.json` | `"program": "${workspaceFolder}/src/server.js"`, `"envFile"` → **F5** |
| `node --inspect src/server.js` | `Ctrl+Shift+P` → Debug: Attach to Node Process |

**F5** continua · **F10** Step Over · **F11** Step Into · **Shift+F11** Step Out · breakpoint **condicional** e **logpoint** pelo clique direito na margem.

## Armadilhas
- Esqueceu o `await` no `request(...)`: o teste confere uma Promise.
- Rota que usa o banco sem mock: o teste espera e estoura o tempo (5 s).
- Mock vazando entre testes: `vi.resetAllMocks()` no `beforeEach`.
- Não teste o mock: confira o que a **API** respondeu.
- Express 5: sem body, `req.body` é `undefined` → use `req.body ?? {}` na validação.
- Breakpoint cinza e vazado: o VS Code não está conectado (terminal comum).
- Nunca rode `--inspect` em produção.

</div>

<div class="rodape">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Guia rápido · Módulo 9B</i>
</div>
