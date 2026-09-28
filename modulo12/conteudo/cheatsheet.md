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

# Cheat sheet · Módulo 12: Projeto Final e Requisitos

<div class="intro">Resumo para consulta rápida. A explicação completa está nos slides e nos arquivos desta pasta.</div>

<div class="cols">

## O caminho
Entrevista com o cliente → requisitos → modelagem → backend → frontend → deploy → testes → README → apresentação.

## Simulação cliente-dev
- Papéis: **cliente** (tem o problema) e **dev** (descobre o que construir).
- Pergunta **aberta** ("como vocês controlam as encomendas hoje?") descobre o problema; **fechada** ("é por WhatsApp?") confirma detalhes.
- Pergunte: problema, quem usa, o que acontece hoje, o que é indispensável, o que pode esperar.

## Requisitos
| Tipo | Exemplo |
|---|---|
| Funcional (RF): o que o sistema faz | "O cliente cadastra uma encomenda com data de retirada." |
| Não funcional (RNF): como ele deve ser | "Senhas guardadas com hash." |
| Regra de negócio | "Encomenda só com 24 h de antecedência." |

Requisito **testável**: dá para dizer se foi cumprido. ✘ "O sistema deve ser rápido" ✔ "A listagem mostra as encomendas do dia."
**Escopo e prioridade:** obrigatório para a entrega · desejável · fora do escopo.

## Modelagem
- Entidades do **domínio** (Produto, Encomenda…). O `Usuario` do boilerplate **não conta**.
- Referência (guarda o `_id`) × embedding (documento dentro do outro).
- Cada entidade: campos, tipos, obrigatórios, relações.

## Backend
Boilerplate + um recurso por entidade:
```
models/encomenda.model.js
repositories/encomenda.repository.js
services/encomenda.service.js      ← regras de negócio aqui
controllers/encomenda.controller.js
routes/encomenda.routes.js          app.use("/api/encomendas", …)
```
Além do CRUD, **rotas de fluxo**: `PATCH /api/encomendas/:id/status`.

## Entrega mínima
- API REST com Express, MongoDB/Mongoose e **login com JWT** (senhas com bcrypt).
- Frontend (IA ou FlutterFlow) consumindo a API de verdade.
- Backend e frontend publicados no Render.
- Documento de requisitos, README, coleção do Postman e registro do uso de IA.

## README
Nome e problema · tecnologias · como rodar (`npm install`, `.env.example`, `npm start`) · rotas principais · URLs publicadas · equipe e divisão do trabalho · uso de IA.

## Rubrica (pesos)
| Critério | Peso |
|---|---|
| Backend | 20 |
| Autenticação | 15 |
| Frontend | 15 |
| Banco de dados | 10 |
| Deploy | 10 |
| Requisitos | 10 |
| Organização | 10 |
| Uso de IA | 5 |
| Apresentação | 5 |

## Apresentação
Problema → solução → demonstração ao vivo (login, fluxo principal, erro tratado) → arquitetura → o que aprenderam → próximos passos. Ensaie o tempo.

## Armadilhas
- `.env` vazado no GitHub: **troque** senha do banco e `JWT_SECRET`.
- Escopo grande demais: entregue o obrigatório funcionando antes do desejável.
- Deploy na última hora: publique cedo e vá atualizando.
- Divisão do trabalho só no fim: combine desde o kickoff (branches e PRs).

## Checklist final
- [ ] Login e rotas protegidas funcionando no Render
- [ ] Front consumindo a API publicada
- [ ] README completo e `.env.example`
- [ ] Coleção do Postman exportada
- [ ] Requisitos atualizados com o que foi entregue

</div>

<div class="rodape">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Cheat sheet · Módulo 12</i>
</div>
