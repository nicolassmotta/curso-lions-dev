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

# Lista de Código: Introdução ao Debug

**Turma:** LionsDev  
**Tópicos:** leitura de mensagens de erro (`SyntaxError`, `ReferenceError`, `TypeError`), leitura do stack trace, erros de lógica, `console.log` para inspecionar valores e breakpoints no VS Code.

> Todo programador passa mais tempo lendo e corrigindo código do que escrevendo código novo. Nesta lista você pratica o processo de depuração: ler a mensagem de erro, encontrar a linha indicada, formular uma hipótese, inspecionar os valores e só então corrigir. Resolva cada item em um arquivo `.js` e execute com o Node.

---

## Parte 0: Exercícios de fixação

Para cada trecho, execute o código, copie a primeira linha da mensagem de erro e identifique o **tipo** do erro (`SyntaxError`, `ReferenceError` ou `TypeError`).

1. `console.log(nomee);` (a variável declarada se chama `nome`).
2. `let idade = 20; idade.toUpperCase();`
3. `const total = 10; total = 20;`
4. `let lista = [1, 2]; lista.push2(3);`
5. `let aluno = { nome: "Ana" }; console.log(aluno.endereco.rua);`
6. `console.log(x); let x = 5;`
7. `let texto = "oi;` (as aspas não foram fechadas).
8. Um `if` sem o parêntese de fechamento: `if (n > 3 { ... }`.
9. Uma função sem a chave de fechamento `}`.
10. Explique, com suas palavras, a diferença entre um erro que impede o programa de começar (`SyntaxError`) e um erro que acontece no meio da execução (`ReferenceError` e `TypeError`).

---

## Parte 1: Complete o código

### 1. Inspecionando valores com `console.log`
A média abaixo está saindo errada. Complete os `console.log` para mostrar, a cada volta do laço, o valor de `i`, o valor de `notas[i]` e a soma parcial.

```js
let notas = [7, 8, 9];
let soma = 0;

for (let i = 0; i <= notas.length; i++) {
  soma = soma + notas[i];
  console.log(/* TODO: mostre i, notas[i] e soma */);
}

console.log("Média:", soma / notas.length);
```

Depois de executar, responda: em qual volta do laço a soma passa a ser `NaN`? Por quê?

### 2. Mensagem de erro útil
Complete a função para que, em vez de o programa quebrar com `TypeError`, ela mostre uma mensagem clara quando o aluno não tiver endereço.

```js
function mostrarRua(aluno) {
  if (/* TODO: teste se aluno.endereco não existe */) {
    console.log("Aluno sem endereço cadastrado.");
    return;
  }
  console.log("Rua:", aluno.endereco.rua);
}

mostrarRua({ nome: "Ana" });                          // Aluno sem endereço cadastrado.
mostrarRua({ nome: "Bia", endereco: { rua: "A" } }); // Rua: A
```

---

## Parte 2: Ache o bug

### 3. Lendo o stack trace
Ao executar o arquivo `pedido.js` abaixo, o Node mostra o erro a seguir. Responda: qual linha causou o erro, qual função estava executando e qual chamada levou até ela? Depois, corrija a chamada.

```js
// pedido.js
function calcularTotal(pedido) {
  return pedido.itens.length * pedido.preco;
}

function finalizar(pedido) {
  const total = calcularTotal(pedido);
  console.log("Total:", total);
}

finalizar({ preco: 10 });
```

```
pedido.js:2
  return pedido.itens.length * pedido.preco;
                      ^

TypeError: Cannot read properties of undefined (reading 'length')
    at calcularTotal (pedido.js:2:23)
    at finalizar (pedido.js:6:17)
    at Object.<anonymous> (pedido.js:10:1)
```

> O stack trace é lido de cima para baixo: a primeira linha `at` mostra onde o erro aconteceu; as seguintes mostram o caminho de chamadas que levou até ali.

### 4. A função que não devolve nada
O programa deveria imprimir `8`, mas imprime `undefined`. Não há mensagem de erro. Encontre o problema.

```js
function dobro(n) {
  n * 2;
}

console.log(dobro(4)); // Esperado: 8
```

### 5. O desconto indevido
Só compras acima de R$ 100 deveriam ganhar 10% de desconto. Uma compra de R$ 95 não deveria ter desconto, mas o programa aplica. Use `console.log` para descobrir o valor da condição e corrija.

```js
let valor = "95"; // valor digitado pelo usuário
let desconto = 0;

if (valor > "100") {
  desconto = valor * 0.1;
}

console.log("Valor final:", valor - desconto); // Esperado: 95 | Obtido: 85.5
```

> Dica: imprima `valor > "100"` e `typeof valor` antes do `if`. Compare o resultado de `"95" > "100"` com o de `95 > 100`.

---

## Parte 3: Prever o resultado

### 6. Erro ou valor inesperado?
Sem executar, diga o que cada linha produz: um valor (qual?) ou um erro (qual tipo?). Depois execute para conferir.

```js
console.log("5" + 3);        // (a)
console.log("5" - 3);        // (b)
console.log(0.1 + 0.2);      // (c)
console.log([1, 2, 3][5]);   // (d)
console.log(null.length);    // (e)
console.log(Number("abc"));  // (f)
```

---

## Parte 4: Depure do zero

### 7. Depuração com breakpoint no VS Code
O programa abaixo deveria contar quantos alunos foram aprovados (nota maior ou igual a 7), mas mostra um número errado.

```js
let alunos = [
  { nome: "Ana", nota: 8 },
  { nome: "Bruno", nota: 5 },
  { nome: "Carla", nota: 7 },
  { nome: "Davi", nota: 9 },
];

let aprovados = 0;

for (let i = 0; i < alunos.length; i++) {
  if (alunos[i].nota > 7) {
    aprovados++;
  }
}

console.log("Aprovados:", aprovados); // Esperado: 3
```

1. Abra o arquivo no VS Code e clique à esquerda do número da linha do `if` para criar um **breakpoint** (aparece um ponto vermelho).
2. Abra o painel **Run and Debug** (`Ctrl+Shift+D`) e inicie a depuração com **Node.js**.
3. A cada parada no breakpoint, observe no painel **Variables** os valores de `i`, `alunos[i].nota` e `aprovados`. Use **Continue** (`F5`) para ir à próxima volta.
4. Anote em qual aluno o resultado da condição foi diferente do esperado.
5. Corrija o código e confirme a saída `Aprovados: 3`.

Entregue: o valor observado de `aprovados` em cada parada, a linha do erro e a correção.

---

> **Dica:** siga sempre o mesmo roteiro. (1) Leia a mensagem inteira: o tipo do erro e a linha indicada já dizem muito. (2) Vá até a linha e confira os valores envolvidos. (3) Formule uma hipótese ("acho que `notas[i]` está `undefined`"). (4) Confirme a hipótese com `console.log` ou breakpoint. (5) Corrija e execute de novo. Erros de lógica não geram mensagem: nesses casos, compare o valor esperado com o valor obtido em cada etapa.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Lista de Código: Introdução ao Debug - Módulo 02</i>
</div>
