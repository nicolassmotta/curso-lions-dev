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

# Guia rápido · Módulo 10: Deploy com Render

<div class="intro">Resumo para consulta rápida. A explicação completa está nos slides e nos arquivos desta pasta.</div>

<div class="cols">

## O caminho de uma requisição
Nome (`api.meusite.com`) → **DNS** devolve o IP → conexão **HTTPS** (dados criptografados) → servidor → resposta.

## Checklist antes do deploy
- [ ] Porta: `app.listen(process.env.PORT || 3000)`
- [ ] `"start": "node src/server.js"` no `package.json`
- [ ] Dependências de produção em `dependencies` (não em `devDependencies`)
- [ ] `.env` no `.gitignore` e `.env.example` no repositório
- [ ] Rota de saúde:
```js
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" })
})
```
- [ ] Atlas: Network Access liberado para o Render (`0.0.0.0/0`, com senha forte)

## Opção 1: render.yaml (Blueprint)
```yaml
services:
  - type: web
    name: api-banco-digital
    runtime: node
    plan: free
    buildCommand: "npm install"
    startCommand: "npm start"
    autoDeploy: true
    envVars:
      - key: MONGO_URI
        sync: false          # você digita o valor no painel
      - key: JWT_SECRET
        generateValue: true  # o Render gera um valor aleatório
```
No painel: **New → Blueprint** → escolha o repositório.

## Opção 2: configuração manual
**New → Web Service** → repositório → Build Command `npm install` → Start Command `npm start` → **Environment**: `MONGO_URI`, `JWT_SECRET`.

## Depois de publicar
1. Abra `https://sua-api.onrender.com/health` → `{"status":"ok"}`.
2. Teste as rotas no Postman trocando `localhost:3000` pela URL pública.
3. Algo errado? Aba **Logs** do serviço.
4. Com `autoDeploy`, cada `git push` na `main` publica de novo.

## Local x produção
| | Local | Render |
|---|---|---|
| Porta | 3000 | `process.env.PORT` |
| Variáveis | arquivo `.env` | painel Environment |
| Sistema | Windows/Mac/Linux | Linux (maiúsculas importam!) |
| Endereço | `http://localhost` | `https://...onrender.com` |

## Plano free: cold start
Sem tráfego por cerca de 15 minutos, o serviço dorme. A primeira requisição acorda o servidor e pode levar perto de um minuto. O frontend precisa mostrar "carregando".

## Frontend no navegador (CORS)
```js
// npm install cors
import cors from "cors"
app.use(cors())   // permite que páginas de outros domínios chamem a API
```

## Erros comuns
| Sintoma | Causa |
|---|---|
| Deploy falha no build | pacote faltando em `dependencies` |
| *Port scan timeout* / sem resposta | porta fixa no `listen` |
| `MONGO_URI` undefined | variável não cadastrada ou com outro nome |
| *Cannot find module './Config.js'* | nome com maiúscula diferente (Linux diferencia) |
| Conexão com o banco expira | IP não liberado no Atlas |

## Segurança em produção
Segredos só no painel · `JWT_SECRET` longo e aleatório · nada de `--inspect` · respostas de erro sem detalhes internos.

</div>

<div class="rodape">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Guia rápido · Módulo 10</i>
</div>
