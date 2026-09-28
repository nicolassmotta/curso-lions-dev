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

# Guia de Erros Comuns

**Turma:** LionsDev  
**Use a partir do:** Módulo 02, e volte aqui sempre que o terminal ou o Postman mostrar um erro.

> As mensagens deste guia foram geradas rodando o código de verdade, no Node 24, Express 5, Mongoose 8 e jsonwebtoken 9. Procure no guia a **primeira linha** da mensagem que apareceu para você (use Ctrl+F).

---

## 1. Como ler uma mensagem de erro

```
file:///home/ana/loja/src/services/produto.service.js:14
  return produto.nome.toUpperCase();
                      ^

TypeError: Cannot read properties of undefined (reading 'toUpperCase')
    at listar (file:///home/ana/loja/src/services/produto.service.js:14:23)
    at file:///home/ana/loja/src/controllers/produto.controller.js:8:20
```

1. **A linha com o tipo do erro** (`TypeError: ...`) diz **o que** aconteceu. Leia essa primeiro.
2. **O primeiro caminho** (`produto.service.js:14`) diz **onde**: arquivo e número da linha. O `^` aponta a coluna.
3. **As linhas com `at`** mostram quem chamou quem. Procure a primeira que seja um arquivo **seu** (ignore as que têm `node_modules` ou `node:internal`).

> Não comece mudando código ao acaso. Leia a mensagem, abra o arquivo na linha indicada e coloque um `console.log` com os valores daquela linha.

---

## 2. JavaScript

| Mensagem | O que significa | Como resolver |
| -------- | --------------- | ------------- |
| `ReferenceError: valorTotal is not defined` | a variável não existe **naquele ponto** do código | confira se o nome está escrito igual (maiúsculas contam), se foi declarada antes e se não está dentro de outra função ou bloco |
| `TypeError: Cannot read properties of undefined (reading 'nome')` | você fez `algo.nome`, mas `algo` é `undefined` | descubra por que `algo` veio vazio: um `find` que não achou nada? um campo que não veio no `req.body`? um `await` esquecido? |
| `TypeError: Assignment to constant variable.` | tentou reatribuir uma variável `const` (ou uma variável **importada** de outro arquivo) | use `let` se o valor precisa mudar; para variável importada, mude o valor no arquivo que a declarou |
| `TypeError: number 1 is not a function` | chamou com `()` algo que não é função | confira o que foi passado: `lista.map(1)` em vez de `lista.map((x) => ...)`, ou um nome de variável igual ao de uma função |
| `SyntaxError: Unexpected end of input` | faltou fechar `}`, `)` ou `]` | o VS Code mostra os pares de chaves coloridos; o erro costuma estar **acima** da linha indicada |
| `SyntaxError: Unexpected token ...` | tem um caractere onde o JavaScript não esperava | vírgula sobrando ou faltando, aspas não fechadas, `=` no lugar de `===` dentro de `if` |
| resultado `NaN` | uma conta recebeu algo que não é número | `Number("3,14")` dá `NaN` (use ponto); valide com `isNaN(valor)` |
| `"5" + 1` dá `"51"` | somou texto com número | converta o que veio do `prompt` com `Number()` antes de somar |

---

## 3. Módulos (`import` / `export`)

| Mensagem | O que significa | Como resolver |
| -------- | --------------- | ------------- |
| `Error [ERR_MODULE_NOT_FOUND]: Cannot find module '.../y' imported from .../a.js` | o caminho do `import` não bate com um arquivo | confira o `./` ou `../` no começo e o **`.js` no final**; confira maiúsculas e minúsculas no nome do arquivo |
| `Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'express'` | o pacote não está instalado **nesta pasta** | rode `npm install` na pasta do projeto (onde está o `package.json`) |
| `SyntaxError: The requested module './y.js' does not provide an export named 'z'` | importou com chaves algo que não foi exportado com esse nome | `export default` importa **sem** chaves; `export function z` importa **com** chaves; confira o nome |
| `ReferenceError: require is not defined in ES module scope, you can use import instead` | usou `require` em um projeto com `"type": "module"` | troque por `import` |
| `Warning: Module type of file ... is not specified` | o `package.json` não tem `"type": "module"` | adicione `"type": "module"` no `package.json` |
| `Cannot use import statement outside a module` | o mesmo caso acima, em versões antigas do Node | adicione `"type": "module"` ou atualize o Node |

---

## 4. Terminal e npm

| Mensagem | O que significa | Como resolver |
| -------- | --------------- | ------------- |
| `npm error enoent Could not read package.json` | você está na pasta errada | `pwd` para ver onde está; `cd` até a pasta que tem o `package.json` |
| `node: command not found` / `'node' não é reconhecido` | o Node não está instalado ou o terminal foi aberto antes da instalação | instale o Node e **abra um terminal novo** |
| `npm error Missing script: "start"` | o `package.json` não tem o script | adicione `"start": "node src/server.js"` em `"scripts"` |
| `npm error code EJSONPARSE` | o `package.json` tem erro de digitação | vírgula sobrando ou faltando, aspas simples no lugar de duplas |
| `rm: cannot remove 'pasta': Is a directory` | `rm` sem `-r` não apaga pasta | `rm -r pasta` (com cuidado: não vai para a lixeira) |

---

## 5. Express

| Sintoma ou mensagem | O que significa | Como resolver |
| ------------------- | --------------- | ------------- |
| `Error: listen EADDRINUSE: address already in use :::3000` | já tem outro programa usando a porta 3000, quase sempre a mesma API aberta em outro terminal | feche o outro terminal (Ctrl+C) ou mude a porta no `.env` |
| resposta HTML `Cannot PUT /u` (status 404) | não existe rota com esse **método + caminho** | confira método (GET, POST...), caminho (`/produto` × `/produtos`), prefixo do `app.use("/api/...")` e se o arquivo de rotas foi registrado no `app.js` |
| `TypeError: Cannot destructure property 'nome' of 'req.body' as it is undefined.` | o corpo da requisição não foi lido | faltou `app.use(express.json())` **antes** das rotas, ou o Postman não está enviando **raw + JSON** |
| `Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client` | a rota respondeu duas vezes | coloque `return` antes de cada `res.status(...)` de erro, para a função parar ali |
| a requisição fica "carregando" para sempre | a rota nunca chamou `res.send`/`res.json` | toda rota precisa responder em todos os caminhos, inclusive dentro do `catch` |
| uma rota como `/busca` responde "não encontrado" | a rota `/:id` foi declarada antes e capturou `busca` como id | declare as rotas fixas (`/busca`, `/resumo`) **antes** de `/:id` |

---

## 6. MongoDB e Mongoose

| Mensagem | O que significa | Como resolver |
| -------- | --------------- | ------------- |
| ``MongooseError: The `uri` parameter to `openUri()` must be a string, got "undefined"`` | a `MONGO_URI` não foi lida do `.env` | confira se o `.env` está na pasta onde você roda o `npm start`, se o nome da variável é igual e se o `dotenv.config()` roda antes da conexão |
| `MongooseServerSelectionError: connect ECONNREFUSED ...` | o banco não respondeu | confira a URI; no Atlas, libere seu IP em **Network Access** (ou `0.0.0.0/0` para o Render) |
| `querySrv ENOTFOUND` | o endereço do cluster na URI está errado | copie a connection string de novo no Atlas |
| `bad auth : authentication failed` | usuário ou senha do banco errados na URI | confira o **usuário do banco** (Database Access), que é diferente do login do site do Atlas |
| `Operation ... buffering timed out after 10000ms` | a consulta rodou sem conexão com o banco | a conexão falhou antes; leia o primeiro erro do terminal e use `await` na conexão |
| ``ValidationError: ... nome: Path `nome` is required.`` | faltou campo obrigatório ou um valor quebrou uma regra do Schema (`enum`, `min`) | responda `400` com a mensagem; confira os nomes dos campos enviados |
| `CastError: Cast to ObjectId failed for value "abc" ...` | o id na URL não está no formato do MongoDB | responda `400` ("ID inválido"); copie o `_id` completo, com 24 caracteres |
| `E11000 duplicate key error ... dup key: { email: "a@a" }` | já existe um documento com esse valor em um campo `unique` | responda `409`; confira antes com `findOne` |
| `find` devolve `Query` em vez dos dados | faltou `await` | `const lista = await Modelo.find()` |
| atualização não muda nada ou volta o documento antigo | faltou `{ new: true }` | `findByIdAndUpdate(id, dados, { new: true, runValidators: true })` |

---

## 7. Autenticação (bcrypt e JWT)

| Mensagem | O que significa | Como resolver |
| -------- | --------------- | ------------- |
| `Error: secretOrPrivateKey must have a value` | o `JWT_SECRET` não foi lido | defina `JWT_SECRET` no `.env` (e no painel do Render) |
| `JsonWebTokenError: jwt malformed` | o texto enviado não é um token | envie `Authorization: Bearer TOKEN`, com o token inteiro e sem aspas |
| `JsonWebTokenError: invalid signature` | o token foi gerado com outro segredo | o `JWT_SECRET` do `sign` e do `verify` precisa ser o mesmo; um token da API local não vale na API do Render se os segredos forem diferentes |
| `TokenExpiredError: jwt expired` | o token venceu | faça login de novo; ajuste o `JWT_EXPIRES_IN` se precisar |
| login sempre aceita qualquer senha | faltou `await` no `bcrypt.compare` | sem `await`, ele devolve uma Promise, que sempre conta como verdadeira |
| `401` em rota que deveria funcionar | o token não chegou | no Postman, aba **Authorization** → **Bearer Token**; confira se a rota está protegida e o token é do mesmo ambiente |
| `403` | o token é válido, mas você não tem permissão | é o comportamento esperado para rota de admin ou recurso de outra pessoa |

---

## 8. Frontend consumindo a API

| Mensagem no console do navegador | O que significa | Como resolver |
| -------------------------------- | --------------- | ------------- |
| `... has been blocked by CORS policy` | o backend não autorizou o site a chamar a API | no backend: `npm install cors`, `import cors from "cors"` e `app.use(cors())` antes das rotas |
| `Failed to fetch` / `net::ERR_CONNECTION_REFUSED` | a API não está rodando ou a URL está errada | suba a API; confira a URL base (`localhost` só funciona na sua máquina) |
| a tela mostra `[object Object]` | tentou exibir um objeto como texto | mostre um campo (`produto.nome`) ou use `JSON.stringify` para depurar |
| os dados não aparecem, mas a API respondeu | a resposta tem outro formato | faça `console.log(resposta)`: muitas APIs do curso devolvem `{ produtos: [...] }`, e não o array direto |

---

## 9. Quando nada disso resolveu

1. Leia a mensagem inteira, de cima para baixo, e identifique arquivo e linha.
2. Coloque `console.log` antes da linha do erro para ver os valores reais.
3. Reduza o problema: comente partes do código até achar o trecho que quebra.
4. Pesquise a **primeira linha** da mensagem, entre aspas.
5. Ao pedir ajuda (a um colega, ao professor ou a uma IA), envie: o que você queria fazer, o código do trecho, a mensagem completa e o que você já tentou.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Material de Apoio: Guia de Erros Comuns</i>
</div>
