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

  body { font-family: 'Segoe UI', Helvetica, Arial, sans-serif; color: var(--ld-preto); }
  h1, h2, h3, h4 { color: var(--ld-preto); font-weight: 700; }
  h1 { border-bottom: 3px solid var(--ld-laranja); padding-bottom: 10px; font-size: 26px; letter-spacing: -0.01em; }
  h2 { margin-top: 28px; padding-left: 12px; border-left: 4px solid var(--ld-laranja); }
  h3 { margin-top: 22px; }
  p, li { line-height: 1.65; font-size: 15px; }
  a { color: var(--ld-laranja); text-decoration: none; }
  a:hover { text-decoration: underline; }
  strong { color: var(--ld-preto); }
  hr { border: 0; border-top: 2px solid rgba(225, 109, 52, 0.35); margin: 26px 0; }
  blockquote { background-color: var(--ld-bloco); border-left: 4px solid var(--ld-laranja); padding: 12px 16px; margin: 16px 0; color: var(--ld-preto); border-radius: 0 6px 6px 0; }
  code { background-color: var(--ld-codigo) !important; color: var(--ld-preto) !important; font-weight: 600; padding: 2px 6px; border-radius: 4px; border: 1px solid var(--ld-borda); }
  pre code { border: 0; padding: 0; }
  table { border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 14px; }
  th { background-color: var(--ld-preto); color: var(--ld-branco); padding: 10px 12px; text-align: left; }
  td { border: 1px solid var(--ld-borda); padding: 8px 12px; }
  tr:nth-child(even) { background-color: var(--ld-bloco); }

  @media print {
    @page { margin: 1.5cm; }
    body { font-size: 11pt; }
    .no-print { display: none; }
  }
</style>

# Gabarito: Projeto Integrado (Full Stack)

**Lista:** `modulo12/lista_de_exercicios/codigo_projeto_integrado.md`  
**Uso:** material de referência para correção. Outras soluções que produzam o mesmo resultado também são válidas.

---

## Parte 0

```js
// 1. Model (módulo 08)
import mongoose from "mongoose";

const TarefaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  concluida: { type: Boolean, default: false },
});
const Tarefa = mongoose.model("Tarefa", TarefaSchema);

// 2. Rota (módulos 07 e 08)
app.get("/tarefas", async (req, res) => {
  const tarefas = await Tarefa.find();
  res.status(200).json(tarefas);
});

// 3. Create (módulos 07 e 08)
app.post("/tarefas", async (req, res) => {
  try {
    const tarefa = await Tarefa.create(req.body);
    res.status(201).json(tarefa);
  } catch (erro) {
    res.status(400).json({ message: erro.message });
  }
});

// 4. Auth (módulo 09)
const senhaHash = await bcrypt.hash(senha, 10);

// 5. Token (módulo 09)
const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

// 6. Middleware (módulo 09)
app.get("/perfil", autenticar, (req, res) => {
  res.json({ id: req.usuario.id });
});

// 7. Env (módulo 10)
const PORT = process.env.PORT || 3000;
```

**8.** No **service**. Gerar o hash é uma regra de negócio ("a senha nunca é salva pura"). O controller só recebe e responde, e o repository só grava o que recebe.

**9.** (módulo 11) "Crie uma tela de listagem de tarefas que faz `GET https://minha-api.onrender.com/tarefas`. A resposta é um array de `{ _id, titulo, concluida }`. Mostre cada tarefa em um card com o título e um selo 'Concluída' ou 'Pendente'. Use as cores preto, branco e laranja, layout responsivo."

**10.** (módulo 10) No painel do Render: `MONGO_URI` e `JWT_SECRET`, e também `JWT_EXPIRES_IN` ou `BCRYPT_SALT_ROUNDS` se o projeto usar. O `PORT` não precisa ser configurado porque o próprio Render define a variável `PORT` e espera que a aplicação escute nela.

---

## Parte 1

### 1. Ligando controller e service

```js
async function getTarefas(req, res) {
  const tarefas = await TarefaService.listarTarefas();
  res.status(200).json(tarefas);
}
```

### 2. Rota protegida

```js
router.get("/perfil", autenticar, perfilController);
```

> O Express executa as funções da rota na ordem. O `autenticar` roda primeiro, e o `perfilController` só roda se o middleware chamar `next()`.

---

## Parte 2

### 3. O frontend não recebe nada

Siga o caminho do dado, da tela até o banco:

1. **O frontend aponta para outra API.** A tela chama `localhost:3000`, enquanto os dados foram criados na API do Render (ou o contrário). Confira a URL base usada no `fetch`.
2. **A API aponta para outro banco.** A `MONGO_URI` do Render pode ser diferente da local, ou ter outro nome de banco no final (`/loja` e `/loja_teste` são bancos diferentes). Os dados existem, mas em outro lugar.
3. **O filtro por dono esconde os registros.** Se o repository faz `Tarefa.find({ usuario: req.usuario.id })`, só aparecem as tarefas do usuário logado. Tarefas criadas por outro usuário, ou antes de existir o campo `usuario`, não voltam.

> Outras causas: nome da coleção diferente (model `Tarefa` gera a coleção `tarefas`), ou uma rota que responde `[]` fixo, esquecida de algum teste.

### 4. Rota protegida barra todo mundo

1. **O token não está sendo enviado.** Veja a aba Network do navegador: a requisição precisa ter o cabeçalho `Authorization: Bearer <token>`. Erros comuns: esquecer o `"Bearer "`, esquecer o espaço, ou ler o token do `localStorage` com uma chave diferente da usada para salvar.
2. **Segredos diferentes.** O `jwt.verify` precisa usar o mesmo `JWT_SECRET` do `jwt.sign`. Se o token foi gerado na API local e enviado para a API do Render (ou o segredo foi trocado), a verificação falha.
3. **Token expirado.** Com `expiresIn: "1h"`, depois de uma hora todo pedido volta 401. Faça login de novo e compare o `exp` do payload (decodifique em jwt.io).

> Para ver a causa exata, imprima `erro.message` no `catch` do middleware: `invalid signature` indica segredo diferente, e `jwt expired` indica token vencido.

---

## Parte 3

### 5. A jornada de uma requisição

```
Frontend (fetch POST /tarefas)
  -> app.js / routes: o Express recebe a requisição e encontra a rota POST /tarefas
  -> middleware autenticar: valida o token e preenche req.usuario
  -> controller: lê req.body e req.usuario e chama o service
  -> service: aplica as regras (título obrigatório, dono da tarefa = usuário logado)
  -> repository: chama Tarefa.create(), e o model valida o schema e grava no MongoDB
  -> resposta: o documento criado volta pelo service e controller, que responde 201 com JSON para o frontend
```

---

## Parte 4

### 6. Aplicação Full Stack

Não existe resposta única: cada equipe escolhe o próprio tema. Como referência de código:

- **API completa em camadas, com autenticação, regras de negócio e deploy:** [`modulo10/exercicios_resolvidos/api_banco_digital`](../../modulo10/exercicios_resolvidos/api_banco_digital).
- **Ponto de partida do backend:** o Boilerplate Lions Dev (<https://github.com/nicolassmotta/boilerplate-lions-dev>).
- **Frontend consumindo a API:** [`modulo09/exercicios_resolvidos/petshop/frontend`](../../modulo09/exercicios_resolvidos/petshop/frontend).

Checklist de correção, na ordem do enunciado:

| # | O que conferir |
| - | -------------- |
| 1 | Entidades e rotas documentadas no README |
| 2 | Schemas com `required`, `enum`, `min`/`max` onde fizer sentido |
| 3 | CRUD completo, com camadas separadas (nenhum `find` no controller, nenhum `req` no service) |
| 4 | Senha só como hash, login devolvendo token, rotas privadas com middleware |
| 5 | Nenhum segredo no código; `.env` no `.gitignore`; script `start` |
| 6 | API publicada no Render respondendo (teste `GET /health` ou a rota raiz) |
| 7 | Frontend publicado consumindo a URL do Render, e não `localhost` |
| 8 | Roteiro de teste: cadastro, login, criar, listar, editar e excluir pela tela |

Os requisitos mínimos completos estão em [`projeto_final.md`](../lista_de_exercicios/projeto_final.md).

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Gabarito: Projeto Integrado (Full Stack) - Módulo 12</i>
</div>
