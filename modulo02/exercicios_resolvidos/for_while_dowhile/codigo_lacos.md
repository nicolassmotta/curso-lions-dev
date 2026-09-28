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

# Gabarito: Laços de Repetição

**Lista:** `modulo02/lista_de_exercicios/for_while_dowhile/codigo_lacos.md`  
**Uso:** material de referência para correção. Outras soluções que produzam a mesma saída também são válidas.

---

## Parte 0

```js
// 1
for (let i = 1; i <= 5; i++) {
  console.log(i);
}

// 2
for (let i = 10; i >= 1; i--) {
  console.log(i);
}

// 3
for (let i = 0; i <= 10; i += 2) {
  console.log(i);
}

// 4
for (let i = 1; i <= 10; i++) {
  console.log(`3 x ${i} = ${3 * i}`);
}

// 5
let soma = 0;
for (let i = 1; i <= 10; i++) {
  soma += i;
}
console.log(soma); // 55

// 6
let j = 1;
while (j <= 5) {
  console.log(j);
  j++;
}

// 7
let contagem = 3;
while (contagem >= 1) {
  console.log(contagem);
  contagem--;
}
console.log("Já!");

// 8
for (let i = 0; i < 3; i++) {
  console.log("LionsDev");
}

// 9
for (let i = 1; i <= 20; i++) {
  if (i % 5 === 0) {
    console.log(i);
  }
}

// 10
do {
  console.log("Rodou");
} while (false);
```

---

## Parte 1

**1.** `for (let i = 1; i <= 10; i++)`

**2.** `soma = soma + i;` (ou `soma += i;`). Resultado: `Soma total: 5050`.

**3.**

```js
let n = 5;

while (n > 0) {
  console.log(n);
  n--;
}
console.log("Fim!");
```

---

## Parte 2

**4. Loop Infinito.** `i` nunca muda, então `i < 5` é sempre verdadeiro. Falta o incremento:

```js
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
```

**5. Fora do intervalo.** O laço começa em `0`, o que gera a linha `7 x 0 = 0`. Com `i = 1` e `i <= 10`, a tabuada fica com as 10 linhas certas:

```js
for (let i = 1; i <= 10; i++) {
  console.log(`7 x ${i} = ${7 * i}`);
}
```

---

## Parte 3

```
0
2
4
valor: 3
```

O `for` avança de 2 em 2 enquanto `i < 6`. O `do...while` executa o bloco uma vez antes de testar a condição; como `k` passa a valer 2 e `2 > 3` é falso, o laço termina.

---

## Parte 4

**7. Média com Entrada Dinâmica**

```js
import promptSync from "prompt-sync";
const prompt = promptSync();

let quantidade = Number(prompt("Quantas notas? "));
let soma = 0;

for (let i = 1; i <= quantidade; i++) {
  let nota = Number(prompt(`Nota ${i}: `));
  soma += nota;
}

console.log("Média:", soma / quantidade);
```

**8. Caça ao Número Secreto**

```js
const secreto = 7;
let palpite;
let tentativas = 0;

do {
  palpite = Number(prompt("Palpite: "));
  tentativas++;

  if (palpite !== secreto) {
    console.log("Tente novamente");
  }
} while (palpite !== secreto);

console.log(`Você acertou! Tentativas: ${tentativas}`);
```

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Gabarito: Laços de Repetição - Módulo 02</i>
</div>
