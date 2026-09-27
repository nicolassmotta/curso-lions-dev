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

# Gabarito: Introdução ao Debug

**Lista:** `modulo02/lista_de_exercicios/debug/codigo_debug.md`  
**Uso:** material de referência para correção. As mensagens de erro foram obtidas no Node.js 24.

---

## Parte 0

| Item | Primeira linha da mensagem | Tipo |
| ---- | -------------------------- | ---- |
| 1 | `ReferenceError: nomee is not defined` | ReferenceError |
| 2 | `TypeError: idade.toUpperCase is not a function` | TypeError |
| 3 | `TypeError: Assignment to constant variable.` | TypeError |
| 4 | `TypeError: lista.push2 is not a function` | TypeError |
| 5 | `TypeError: Cannot read properties of undefined (reading 'rua')` | TypeError |
| 6 | `ReferenceError: Cannot access 'x' before initialization` | ReferenceError |
| 7 | `SyntaxError: Invalid or unexpected token` | SyntaxError |
| 8 | `SyntaxError: Unexpected token '{'` | SyntaxError |
| 9 | `SyntaxError: Unexpected end of input` | SyntaxError |

**Item 10:** o `SyntaxError` é detectado antes de o programa começar, quando o Node lê o arquivo; por isso, nenhuma linha é executada, nem as que vêm antes do erro. `ReferenceError` e `TypeError` acontecem durante a execução: as linhas anteriores ao erro já foram executadas, e o programa para na linha do erro.

---

## Parte 1

**1. Inspecionando valores**

```js
let notas = [7, 8, 9];
let soma = 0;

for (let i = 0; i <= notas.length; i++) {
  soma = soma + notas[i];
  console.log("i:", i, "| notas[i]:", notas[i], "| soma:", soma);
}

console.log("Média:", soma / notas.length);
```

A soma vira `NaN` na quarta volta (`i = 3`): `notas[3]` não existe, vale `undefined`, e `24 + undefined` resulta em `NaN`. A correção é usar `i < notas.length`, o que dá `Média: 8`.

**2. Mensagem de erro útil**

```js
function mostrarRua(aluno) {
  if (!aluno.endereco) {
    console.log("Aluno sem endereço cadastrado.");
    return;
  }
  console.log("Rua:", aluno.endereco.rua);
}

mostrarRua({ nome: "Ana" });
mostrarRua({ nome: "Bia", endereco: { rua: "A" } });
```

---

## Parte 2

**3. Lendo o stack trace.** O erro aconteceu na **linha 2**, dentro de `calcularTotal`, ao ler `.length` de `pedido.itens`, que é `undefined`. A chamada veio de `finalizar` (linha 6), que por sua vez foi chamada na linha 10 com um objeto sem a propriedade `itens`. Correção da chamada:

```js
finalizar({ itens: ["caderno", "caneta"], preco: 10 }); // Total: 20
```

**4. A função que não devolve nada.** Falta o `return`. A expressão `n * 2` é calculada e descartada, e a função devolve `undefined`.

```js
function dobro(n) {
  return n * 2;
}

console.log(dobro(4)); // 8
```

**5. O desconto indevido.** `valor` é uma string, e a comparação `"95" > "100"` é feita caractere por caractere, como em ordem alfabética: `"9"` vem depois de `"1"`, então o resultado é `true`. A correção é converter para número antes de comparar:

```js
let valor = Number("95");
let desconto = 0;

if (valor > 100) {
  desconto = valor * 0.1;
}

console.log("Valor final:", valor - desconto); // Valor final: 95
```

---

## Parte 3

| Linha | Resultado | Motivo |
| ----- | --------- | ------ |
| (a) | `53` | `+` com string concatena |
| (b) | `2` | `-` converte a string em número |
| (c) | `0.30000000000000004` | imprecisão de ponto flutuante |
| (d) | `undefined` | a posição 5 não existe (não é erro) |
| (e) | `TypeError: Cannot read properties of null (reading 'length')` | `null` não tem propriedades |
| (f) | `NaN` | `"abc"` não é um número válido |

---

## Parte 4

**7. Depuração com breakpoint.** Valores de `aprovados` observados no breakpoint, antes do `if` de cada volta:

| Parada | `i` | aluno | `nota` | `aprovados` antes do `if` |
| ------ | --- | ----- | ------ | ------------------------- |
| 1 | 0 | Ana | 8 | 0 |
| 2 | 1 | Bruno | 5 | 1 |
| 3 | 2 | Carla | 7 | 1 |
| 4 | 3 | Davi | 9 | 1 |

Na parada 3, Carla tem nota 7 e deveria ser aprovada, mas `7 > 7` é falso e `aprovados` continua em 1. A saída final é `Aprovados: 2`. Correção: `if (alunos[i].nota >= 7)`, que resulta em `Aprovados: 3`.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Gabarito: Introdução ao Debug - Módulo 02</i>
</div>
