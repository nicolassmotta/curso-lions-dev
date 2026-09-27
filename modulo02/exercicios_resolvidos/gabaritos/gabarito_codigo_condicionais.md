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

# Gabarito: Condicionais (if / else / lógicos)

**Lista:** `modulo02/lista_de_exercicios/if_else/codigo_condicionais.md`  
**Uso:** material de referência para correção. Outras soluções que produzam a mesma saída também são válidas.

---

## Parte 0

```js
// 1
let idade = 20;
if (idade >= 18) {
  console.log("Maior de idade");
}

// 2
let nota = 5;
if (nota >= 6) {
  console.log("Aprovado");
} else {
  console.log("Reprovado");
}

// 3
let numero = -4;
if (numero >= 0) {
  console.log("Positivo");
} else {
  console.log("Negativo");
}

// 4
let n = 7;
if (n % 2 === 0) {
  console.log("Par");
} else {
  console.log("Ímpar");
}

// 5
let a = 10;
let b = 3;
if (a > b) {
  console.log(a);
} else {
  console.log(b);
}

// 6
let saldo = 50;
let preco = 80;
if (saldo >= preco) {
  console.log("Pode comprar");
}

// 7
let senha = "1234";
if (senha === "1234") {
  console.log("Acesso liberado");
}

// 8
let temCarteira = true;
let idadeMotorista = 19;
if (temCarteira && idadeMotorista >= 18) {
  console.log("Pode dirigir");
}

// 9
let dia = "sabado";
if (dia === "sabado" || dia === "domingo") {
  console.log("Fim de semana");
}

// 10
let logado = false;
if (!logado) {
  console.log("Faça login");
}
```

> No item 3, o zero pode ser tratado como positivo ou ganhar um terceiro caso ("Zero"). Aceite as duas soluções se o aluno justificar.

---

## Parte 1

**1.** `if (idade >= 18)`

**2.** `else if (media >= 5)`. A condição `media < 7` já é garantida porque o primeiro `if` falhou.

**3.** `if (saldo >= preco && negativado !== "sim")`

---

## Parte 2

**4. O `=` traiçoeiro.** `numero = 10` é uma **atribuição**: guarda 10 em `numero` e o resultado (10) é considerado verdadeiro, então o `if` sempre entra. A correção é comparar:

```js
let numero = 3;

if (numero >= 10) {
  console.log("É maior ou igual a 10");
} else {
  console.log("É menor que 10");
}
```

**5. Faixa quebrada.** 30 também é maior que 0, então a primeira condição já é verdadeira e o `else if` nunca é avaliado. A condição mais específica precisa vir primeiro:

```js
let temp = 30;

if (temp > 25) {
  console.log("Quente");
} else if (temp > 0) {
  console.log("Acima de zero");
} else {
  console.log("Frio");
}
```

---

## Parte 3

| Linha | Saída | Motivo |
| ----- | ----- | ------ |
| (a) | `true` | `10 > 5` e `5 > 0` |
| (b) | `true` | `a < b` é falso, mas `ligado` é verdadeiro |
| (c) | `false` | negação de `true` |
| (d) | `false` | `===` compara tipo: número não é igual a string |
| (e) | `true` | `10 !== 5` é verdadeiro e `!false` é verdadeiro |

---

## Parte 4

**7. Classificador de IMC**

```js
import promptSync from "prompt-sync";
const prompt = promptSync();

let peso = Number(prompt("Peso (kg): "));
let altura = Number(prompt("Altura (m): "));
let imc = peso / (altura * altura);

console.log(`IMC: ${imc.toFixed(2)}`);

if (imc < 18.5) {
  console.log("Abaixo do peso");
} else if (imc < 25) {
  console.log("Peso normal");
} else if (imc < 30) {
  console.log("Sobrepeso");
} else {
  console.log("Obesidade");
}
```

> Usar `imc < 25` em vez de `imc <= 24.9` evita que valores como 24.95 fiquem sem categoria.

**8. Portão da Balada**

```js
let idade = Number(prompt("Idade: "));
let vip = prompt("Está na lista VIP? (sim/nao): ");

if (idade < 18) {
  console.log("Entrada não permitida");
} else if (idade >= 18 && vip === "sim") {
  console.log("Bem-vindo à área VIP!");
} else {
  console.log("Entrada liberada (área comum)");
}
```

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Gabarito: Condicionais - Módulo 02</i>
</div>
