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

# Exercício Prático: Loja Modular

**Turma:** LionsDev  
**Tópicos:** ES Modules (`import`/`export`), `export default` e exports nomeados no mesmo projeto, subpastas e caminhos com `../`, variáveis compartilhadas entre módulos e adição de funcionalidade em um projeto já modularizado.

> **Pré-requisito:** ter feito a lista `codigo_modulos.md` e a *Clínica Médica Modular*. Aqui o ponto de partida não é um projeto seu: é um programa pronto, escrito em um arquivo só, que você vai desmontar.

---

## 1. Contexto

A papelaria **Loja Lions** controla o estoque com o programa abaixo. Ele funciona, mas tudo está no mesmo arquivo: dados, formatação, validação, regras de venda e menu. Quando duas pessoas mexem nele ao mesmo tempo, o conflito no Git é garantido.

Sua tarefa tem duas partes:

1. **Modularizar:** separar o programa em arquivos, **sem mudar o comportamento**.
2. **Evoluir:** adicionar uma funcionalidade nova e perceber quantos arquivos precisou tocar.

---

## 2. O programa original (`loja.js`)

Copie o código para uma pasta nova, crie o `package.json` com `"type": "module"`, instale o `prompt-sync` e rode com `node loja.js` para conhecer o comportamento **antes** de mudar qualquer coisa.

```js
import promptSync from "prompt-sync";
const prompt = promptSync();

const produtos = [
  { id: 1, nome: "Caderno", preco: 18.9, estoque: 10 },
  { id: 2, nome: "Caneta", preco: 3.5, estoque: 40 },
];
let proximoId = 3;

function formatarReal(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

function precoValido(preco) {
  return !isNaN(preco) && preco > 0;
}

function quantidadeValida(quantidade) {
  return Number.isInteger(quantidade) && quantidade > 0;
}

function cadastrarProduto(nome, preco, estoque) {
  if (nome.trim() === "" || !precoValido(preco) || !quantidadeValida(estoque)) {
    return false;
  }
  produtos.push({ id: proximoId, nome: nome.trim(), preco, estoque });
  proximoId++;
  return true;
}

function listarProdutos() {
  if (produtos.length === 0) {
    console.log("Nenhum produto cadastrado.");
    return;
  }
  for (const produto of produtos) {
    console.log(`${produto.id} - ${produto.nome} | ${formatarReal(produto.preco)} | estoque: ${produto.estoque}`);
  }
}

function venderProduto(id, quantidade) {
  const produto = produtos.find((p) => p.id === id);
  if (!produto) {
    return "Produto não encontrado.";
  }
  if (!quantidadeValida(quantidade)) {
    return "Quantidade inválida.";
  }
  if (quantidade > produto.estoque) {
    return `Estoque insuficiente. Disponível: ${produto.estoque}.`;
  }
  produto.estoque -= quantidade;
  return `Venda registrada: ${quantidade}x ${produto.nome} = ${formatarReal(produto.preco * quantidade)}`;
}

function relatorioEstoque() {
  let total = 0;
  for (const produto of produtos) {
    total += produto.preco * produto.estoque;
  }
  console.log(`Produtos: ${produtos.length} | Valor em estoque: ${formatarReal(total)}`);
}

let opcao = "";

while (opcao !== "0") {
  console.log("\n1 - Cadastrar produto\n2 - Listar produtos\n3 - Vender\n4 - Relatório de estoque\n0 - Sair");
  opcao = prompt("Opção: ");

  if (opcao === "1") {
    const nome = prompt("Nome: ");
    const preco = Number(prompt("Preço: "));
    const estoque = Number(prompt("Estoque inicial: "));
    if (cadastrarProduto(nome, preco, estoque)) {
      console.log("Produto cadastrado.");
    } else {
      console.log("Dados inválidos.");
    }
  } else if (opcao === "2") {
    listarProdutos();
  } else if (opcao === "3") {
    const id = Number(prompt("ID do produto: "));
    const quantidade = Number(prompt("Quantidade: "));
    console.log(venderProduto(id, quantidade));
  } else if (opcao === "4") {
    relatorioEstoque();
  } else if (opcao === "0") {
    console.log("Loja fechada. Até logo!");
  } else {
    console.log("Opção inválida.");
  }
}
```

---

## 3. Parte 1: Modularizar

Organize o projeto exatamente assim:

```text
loja/
|-- package.json
|-- index.js
|-- dados.js
|-- utils/
|   |-- formatar.js
|   `-- validacao.js
`-- operacoes/
    |-- cadastrar_produto.js
    |-- listar_produtos.js
    |-- vender_produto.js
    `-- relatorio_estoque.js
```

| Arquivo | Responsabilidade | Tipo de export |
| ------- | ---------------- | -------------- |
| `dados.js` | o array `produtos` | `export default` |
| `utils/formatar.js` | `formatarReal(valor)` | `export default` |
| `utils/validacao.js` | `precoValido(preco)` e `quantidadeValida(quantidade)` | **nomeados** |
| `operacoes/*.js` | uma função de operação por arquivo | `export default` |
| `index.js` | só o menu: lê o teclado, chama as operações e mostra o resultado | não exporta nada |

Regras:

1. **Nenhuma função muda de comportamento.** Mesmas mensagens, mesmos retornos.
2. Só o `index.js` usa `prompt`. As operações recebem os dados por parâmetro.
3. Os arquivos de `operacoes/` e `utils/` importam o que precisam com `../`, por exemplo `import produtos from "../dados.js";`.

### 3.1 A pegadinha do `proximoId`

No programa original, `proximoId` é um `let` que a função de cadastro incrementa. Se você colocar `export let proximoId = 3;` no `dados.js` e fizer `proximoId++` no `cadastrar_produto.js`, o programa quebra com:

```
TypeError: Assignment to constant variable.
```

> **Por quê?** Uma variável importada é **somente leitura** para quem importa, mesmo que tenha sido declarada com `let`. Só o próprio arquivo que declarou pode mudar o valor. Decida onde o contador deve morar para não cair nesse erro e explique sua escolha na entrega.

---

## 4. Parte 2: Evoluir

Com o projeto modularizado, adicione a opção **`5 - Repor estoque`**:

* Cria o arquivo `operacoes/repor_estoque.js` com `reporEstoque(id, quantidade)`.
* Se o produto não existir, retorna `"Produto não encontrado."`.
* Se a quantidade não for um inteiro maior que zero, retorna `"Quantidade inválida."` (reaproveite `quantidadeValida`).
* Senão, soma a quantidade ao estoque e retorna `"Estoque de <nome> atualizado para <novo estoque>."`.

Depois de pronto, anote **quais arquivos você precisou alterar** e quais ficaram intactos.

---

## 5. Testes Esperados

Rode o original e o modular com a mesma sequência e compare as saídas, que devem ser idênticas:

1. Listar produtos.
2. Vender `3` unidades do produto `1` (esperado: `Venda registrada: 3x Caderno = R$ 56,70`).
3. Vender `100` unidades do produto `2` (esperado: `Estoque insuficiente. Disponível: 40.`).
4. Cadastrar `Mochila`, preço `120`, estoque `3`.
5. Cadastrar um produto com nome vazio (esperado: `Dados inválidos.`).
6. Relatório de estoque (esperado: `Produtos: 3 | Valor em estoque: R$ 632,30`).

Só no modular: repor `5` unidades do produto `3` e listar de novo (a Mochila deve ficar com estoque `8`).

---

## 6. Perguntas para responder

1. Por que `validacao.js` usa exports nomeados e os outros arquivos usam `export default`?
2. Onde você deixou o `proximoId` e por que ali?
3. Na Parte 2, quantos arquivos foram criados e quantos foram alterados? Compare com o que seria preciso no `loja.js` original.
4. Se duas pessoas trabalhassem ao mesmo tempo, uma na venda e outra no relatório, elas mexeriam no mesmo arquivo? O que isso muda na hora do merge no Git?

---

## 7. Entrega

- O projeto modularizado com a opção 5 funcionando.
- A saída dos testes da seção 5.
- As respostas da seção 6.

> **Dica:** modularize **um arquivo por vez** e rode o programa depois de cada passo. Se aparecer `ERR_MODULE_NOT_FOUND`, confira o `./` ou `../` no começo e o `.js` no final do caminho. Se aparecer `does not provide an export named`, confira se está importando com chaves algo que foi exportado por default (ou o contrário).

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Exercício Prático: Loja Modular - Módulo 05</i>
</div>
