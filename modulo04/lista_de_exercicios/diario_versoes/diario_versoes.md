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

# Atividade Prática: Diário de Versões

**Turma:** LionsDev  
**Tópicos:** `.gitignore`, `git diff`, `git restore`, `git restore --staged`, `git log --oneline`, `git show`, `git revert` e boas mensagens de commit.

---

## 1. Contexto

Até aqui, o Git foi usado para **salvar** versões. Nesta atividade individual, você vai usar o Git para **ler** o histórico e **desfazer** erros: ver o que mudou antes de commitar, descartar uma edição errada, tirar um arquivo do stage e desfazer um commit que já foi feito.

O projeto é o cardápio da **Lanchonete Lions**, um arquivo JavaScript simples. O foco não é o código, e sim o que o Git faz com ele.

> **Pré-requisito:** ter feito a lista `codigo_git.md`. Faça tudo em uma pasta nova, fora de qualquer outro repositório.

---

## 2. Preparação

```bash
mkdir lanchonete-lions
cd lanchonete-lions
git init
```

Crie o arquivo `cardapio.js` com o conteúdo abaixo (pelo VS Code, com `code cardapio.js`):

```js
const cardapio = [
  { item: "X-Burger", preco: 25 },
  { item: "Batata frita", preco: 15 },
  { item: "Refrigerante", preco: 8 },
];

for (const produto of cardapio) {
  console.log(`${produto.item}: R$ ${produto.preco}`);
}
```

Rode com `node cardapio.js`, confira a saída e faça o primeiro commit com a mensagem `Cria cardápio da lanchonete`.

---

## 3. Missão

### Passo 1: O que não deve ir para o Git

Crie os arquivos abaixo, que simulam coisas que **nunca** devem ser versionadas:

```bash
mkdir node_modules
touch node_modules/pacote.js
echo "SENHA_BANCO=123456" > .env
```

Rode `git status` e anote o que aparece. Depois, crie um arquivo `.gitignore` com duas linhas, `node_modules` e `.env`, e rode `git status` de novo. Commite **apenas** o `.gitignore`.

> **Conceito novo: `.gitignore`.** É um arquivo de texto com a lista do que o Git deve ignorar. O que está nele some do `git status` e não entra no `git add .`. O `node_modules` é recriado por qualquer um com `npm install`, e o `.env` guarda senhas: nenhum dos dois pode ir para o GitHub.

### Passo 2: Ver o que mudou antes de commitar

Mude o preço do X-Burger para `28` e adicione um item novo: `{ item: "Suco natural", preco: 10 }`. **Antes** de fazer `git add`, rode:

```bash
git diff
```

Identifique no resultado as linhas que começam com `-` e com `+`. Depois, adicione e commite com uma mensagem que diga **o que** mudou.

> **Conceito novo: `git diff`.** Mostra as diferenças entre o arquivo salvo no último commit e o arquivo atual. Linhas com `-` foram removidas e linhas com `+` foram adicionadas (uma linha alterada aparece como uma remoção seguida de uma adição). Depois do `git add`, o `git diff` fica vazio: para ver o que está no stage, use `git diff --staged`.

### Passo 3: Descartar uma edição errada

Simule um acidente: abra o `cardapio.js`, **apague o `for` inteiro** e salve. Rode o arquivo e veja que ele não imprime mais nada.

Sem apertar Ctrl+Z e sem reescrever nada, recupere a versão do último commit com:

```bash
git restore cardapio.js
```

Rode o arquivo de novo para conferir.

> **Conceito novo: `git restore`.** Descarta as mudanças **não commitadas** de um arquivo e o devolve ao estado do último commit. Cuidado: o que foi descartado não volta, porque nunca foi salvo no Git.

### Passo 4: Tirar um arquivo do stage

Crie um arquivo `rascunho.txt` com qualquer texto e rode `git add .`. Confira com `git status`: o rascunho entrou no stage sem querer.

Tire o arquivo do stage **sem apagá-lo**:

```bash
git restore --staged rascunho.txt
```

Confira com `git status` e com `ls` que o arquivo continua na pasta, mas fora do stage. Depois, apague o `rascunho.txt`.

### Passo 5: Ler o histórico

```bash
git log --oneline
```

Escolha o commit do passo 2 e veja exatamente o que ele mudou com `git show <código>`, usando o código de 7 caracteres que aparece no começo da linha.

### Passo 6: Desfazer um commit

Simule um erro que chegou a ser commitado: multiplique **todos** os preços por 10 (25 vira 250, e assim por diante) e commite com a mensagem `Atualiza preços`.

Rode o arquivo: os preços estão absurdos. Desfaça esse commit com:

```bash
git revert HEAD
```

O Git abre o editor com uma mensagem pronta (`Revert "Atualiza preços"`). Salve e feche. Rode o arquivo e confira que os preços voltaram. Depois, veja o histórico com `git log --oneline`.

> **Conceito novo: `git revert`.** Cria um **commit novo** que faz o contrário de um commit anterior. O commit errado continua no histórico, seguido do commit que o desfaz. `HEAD` quer dizer "o último commit". Em projetos compartilhados, é assim que se desfaz algo que já foi enviado ao GitHub, porque ninguém perde histórico.
>
> Se o editor que abrir for o Vim (tela preta no terminal), digite `:wq` e aperte Enter para salvar e sair. Para já aceitar a mensagem pronta sem abrir o editor, use `git revert HEAD --no-edit`.

---

## 4. Perguntas para responder

1. No passo 1, o que o `git status` mostrava antes e depois do `.gitignore`?
2. Por que o `.env` com a senha nunca deve ir para o GitHub, mesmo em um repositório privado?
3. No passo 2, quantas linhas com `-` e quantas com `+` o `git diff` mostrou? Por que a troca de preço aparece como uma remoção e uma adição?
4. Qual é a diferença entre `git restore arquivo` e `git restore --staged arquivo`?
5. Depois do passo 6, o commit `Atualiza preços` ainda aparece no `git log`? Por quê?
6. Compare as mensagens `ajustes` e `Aumenta preço do X-Burger e adiciona suco natural`. Qual ajuda mais quem lê o histórico daqui a seis meses? Por quê?

---

## 5. Entrega

- A saída final de `git log --oneline` (esperado: 5 commits).
- A saída do `git diff` do passo 2.
- As respostas da seção 4.

## 6. Critérios de aceite

- O histórico tem, nesta ordem: criação do cardápio, `.gitignore`, mudança de preço e item novo, `Atualiza preços` e o `Revert "Atualiza preços"`.
- O `.env`, o `node_modules` e o `rascunho.txt` não aparecem em nenhum commit.
- A versão final do `cardapio.js` tem os preços normais e o suco natural.

> **Dica:** antes de qualquer comando que desfaz algo, rode `git status` e `git diff` para saber exatamente o que vai mudar. O Git quase sempre mostra no próprio `git status` o comando para desfazer cada situação.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Atividade Prática: Diário de Versões - Módulo 04</i>
</div>
