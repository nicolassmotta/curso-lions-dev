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

# Lista de Código: Condicionais (if / else / lógicos)

**Turma:** LionsDev  
**Tópicos:** operadores de comparação (`>`, `<`, `>=`, `<=`, `===`, `!==`), operadores lógicos (`&&`, `||`, `!`), `if`, `else if`, `else` e entrada de dados.

> Nesta lista você escreve o código, não só pensa nele. Cada item mostra o que preencher e a saída certa pra conferir. Nos que pedem entrada, comece o arquivo com `import promptSync from "prompt-sync"; const prompt = promptSync();`.

---

## Parte 0 — Treino rápido (aquecimento)

Aquece o reflexo do `if`. Cada item resolve em poucas linhas.

1. Crie `idade = 20`. Use `if` para imprimir **"Maior de idade"** se `idade` for maior que 18.
2. Crie `nota = 5`. Imprima **"Aprovado"** se `nota` for maior ou igual a 6; senão **"Reprovado"**.
3. Crie `numero = -4`. Imprima **"Positivo"** ou **"Negativo"**.
4. Crie `numero = 7`. Imprima **"Par"** se `numero % 2 === 0`; senão **"Ímpar"**.
5. Crie `a = 10` e `b = 3`. Imprima o **maior** dos dois.
6. Crie `saldo = 50` e `preco = 80`. Imprima **"Pode comprar"** só se `saldo >= preco`.
7. Crie `senha = "1234"`. Imprima **"Acesso liberado"** se `senha === "1234"`.
8. Crie `temCarteira = true` e `idade = 19`. Imprima **"Pode dirigir"** se tiver carteira E idade for `>= 18`.
9. Crie `dia = "sabado"`. Imprima **"Fim de semana"** se `dia` for `"sabado"` OU `"domingo"`.
10. Crie `logado = false`. Imprima **"Faça login"** se não estiver logado (use `!`).

---

## Parte 1 — Complete o código

### 1. Maior de Idade
Complete a condição para imprimir a mensagem certa.

```js
let idade = Number(prompt("Sua idade: "));

if (/* TODO: idade for 18 ou mais */) {
  console.log("Acesso permitido.");
} else {
  console.log("Acesso negado: menor de idade.");
}
// entrada 20 -> Acesso permitido.
// entrada 15 -> Acesso negado: menor de idade.
```

### 2. Aprovado, Recuperação ou Reprovado
Complete o `else if`. Regras: média `>= 7` aprovado; `>= 5` e `< 7` recuperação; abaixo disso reprovado.

```js
let media = Number(prompt("Média do aluno: "));

if (media >= 7) {
  console.log("Aprovado");
} else if (/* TODO */) {
  console.log("Recuperação");
} else {
  console.log("Reprovado");
}
// 8 -> Aprovado | 6 -> Recuperação | 3 -> Reprovado
```

### 3. Liberação de Compra
Só aprova a compra se o cliente tem saldo E não está com o nome negativado. Complete a condição usando operadores lógicos.

```js
let saldo = Number(prompt("Saldo: "));
let preco = Number(prompt("Preço do produto: "));
let negativado = prompt("Está negativado? (sim/nao): ");

if (/* TODO: saldo >= preço E negativado diferente de "sim" */) {
  console.log("Compra aprovada!");
} else {
  console.log("Compra negada.");
}
```

---

## Parte 2 — Ache o bug

### 4. O `=` traiçoeiro
Este código sempre imprime "É maior", mesmo com números pequenos. Encontre e corrija o erro.

```js
let numero = 3;

if (numero = 10) {   // BUG
  console.log("É maior ou igual a 10");
} else {
  console.log("É menor que 10");
}
// Esperado com numero = 3 -> É menor que 10
```

### 5. Faixa quebrada
Deveria classificar a temperatura, mas "Quente" nunca aparece. Explique por que e conserte a ordem/condições.

```js
let temp = 30;

if (temp > 0) {
  console.log("Acima de zero");
} else if (temp > 25) {
  console.log("Quente");     // nunca executa
} else {
  console.log("Frio");
}
// Esperado com temp = 30 -> Quente
```

---

## Parte 3 — Prever a saída

### 6. Verdadeiro ou Falso?
Sem rodar, diga o que cada linha imprime.

```js
let a = 10;
let b = 5;
let ligado = true;

console.log(a > b && b > 0);      // (a)
console.log(a < b || ligado);     // (b)
console.log(!ligado);             // (c)
console.log(a === "10");          // (d)
console.log(a !== b && !false);   // (e)
```

---

## Parte 4 — Escreva do zero

### 7. Classificador de IMC
Peça peso e altura, calcule o IMC (`peso / (altura * altura)`) e imprima a categoria:

| IMC | Categoria |
|-----|-----------|
| abaixo de 18.5 | Abaixo do peso |
| 18.5 a 24.9 | Peso normal |
| 25 a 29.9 | Sobrepeso |
| 30 ou mais | Obesidade |

```
Exemplo: peso 80, altura 1.80 -> IMC 24.69 -> Peso normal
```

### 8. Portão da Balada (Desafio)
Peça idade e se a pessoa está na lista VIP (sim/nao). Regras:
- Menor de 18 → "Entrada não permitida".
- 18 ou mais e na lista VIP → "Bem-vindo à área VIP!".
- 18 ou mais e fora da lista → "Entrada liberada (área comum)".

Resolva usando `if/else if/else` combinado com operadores lógicos.

---

> **Dica:** `=` atribui, `===` compara. Em condição você quase sempre quer `===` ou `!==`. E a ordem do `if / else if` conta: assim que uma condição dá verdadeira, o JavaScript executa ela e ignora o resto.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Lista de Código: Condicionais - Módulo 02</i>
</div>
