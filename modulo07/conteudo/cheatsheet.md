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

# Cheat sheet · Módulo 07: APIs REST com Express

<div class="intro">Resumo para consulta rápida. A explicação completa está nos slides e nos arquivos desta pasta.</div>

<div class="cols">

## Servidor mínimo
```js
// npm install express   |   package.json: "type": "module"
import express from "express"

const app = express()
app.use(express.json())   // sem isso, req.body fica undefined

app.get("/flashcards", (req, res) => {
  return res.status(200).json(flashcards)
})

app.listen(3000, () => console.log("API na porta 3000"))
```

## Rotas REST
| Método | Rota | Faz | Status de sucesso |
|---|---|---|---|
| GET | `/flashcards` | lista | 200 |
| GET | `/flashcards/:id` | busca um | 200 (404 se não achar) |
| POST | `/flashcards` | cria | 201 |
| PUT / PATCH | `/flashcards/:id` | atualiza tudo / parte | 200 |
| DELETE | `/flashcards/:id` | remove | 204 (sem body) |

Rotas no **plural**, sem verbo: `/flashcards`, não `/criarFlashcard`.

## Dados da requisição
```js
// GET /baralhos/3/flashcards?busca=let
req.params.id     // "3"  → texto! use Number(req.params.id)
req.query.busca   // "let"
req.body          // JSON enviado no POST/PUT/PATCH
```

## Respondendo
```js
return res.status(201).json(novo)
return res.status(404).json({ message: "Flashcard não encontrado." })
return res.status(204).send()
```
| Código | Quando |
|---|---|
| 200 OK · 201 Created · 204 No Content | deu certo |
| 400 Bad Request | dado inválido ou faltando |
| 404 Not Found | recurso não existe |
| 500 Internal Server Error | erro no servidor |

## Validando no começo da rota
```js
app.post("/flashcards", (req, res) => {
  const { pergunta, resposta } = req.body
  if (!pergunta || !resposta) {
    return res.status(400).json({ message: "Pergunta e resposta são obrigatórias." })
  }
  // ... cria e responde 201
})
```

## Middleware
```js
function logar(req, res, next) {
  console.log(req.method, req.url)
  next()                      // deixa seguir
}
app.use(logar)                // em todas as rotas
app.post("/flashcards", validar, criar)  // só nesta
```

## express.Router()
```js
// routes/flashcards.routes.js
import { Router } from "express"
const router = Router()
router.get("/", listar)        // o prefixo NÃO se repete aqui
router.get("/:id", buscar)
export default router

// index.js
app.use("/flashcards", router)
```

## Testando
Postman ou Insomnia: método, URL, aba **Body → raw → JSON**. Pelo terminal:
```bash
curl -X POST http://localhost:3000/flashcards \
  -H "Content-Type: application/json" \
  -d '{"pergunta":"O que é let?","resposta":"Variável que muda"}'
```

## Armadilhas
- Esqueceu `express.json()`: `req.body` é `undefined`.
- Esqueceu o `return` antes do `res`: *Cannot set headers after they are sent*.
- `req.params.id` é texto: `"3" === 3` é `false`.
- `!valor` barra o `0`. Para números, teste `valor === undefined`.
- Rota fixa (`/flashcards/busca`) depois de `/flashcards/:id` nunca é alcançada: `"busca"` vira o id.
- Reiniciou o servidor? Os dados em memória somem (Módulo 8 resolve).

</div>

<div class="rodape">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Cheat sheet · Módulo 07</i>
</div>
