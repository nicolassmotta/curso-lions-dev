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

# Gabarito: Variáveis, Tipos e Entrada de Dados

**Lista:** `modulo02/lista_de_exercicios/variaveis_tipos_io/codigo_variaveis_io.md`  
**Uso:** material de referência para correção. Outras soluções que produzam a mesma saída também são válidas.

---

## Parte 0

```js
import promptSync from "prompt-sync";
const prompt = promptSync();

// 1
let nome = "Ana";
console.log(nome);

// 2
let idade = 20;
console.log(`Tenho ${idade} anos`);

// 3
let a = 7;
let b = 3;
console.log(a + b); // 10

// 4
console.log(10 % 3); // 1

// 5
let preco = 100;
console.log(preco * 0.9); // 90

// 6
let texto = "15";
console.log(Number(texto) + 5); // 20

// 7
const PI = 3.14;
let raio = 2;
console.log(PI * raio * raio); // 12.56

// 8
console.log(typeof true); // boolean
console.log(typeof "oi"); // string

// 9
let numero = Number(prompt("Digite um número: "));
console.log(numero * 2);

// 10
let temperatura = 25;
console.log(`Hoje faz ${temperatura} graus`);
```

---

## Parte 1

**1. Cadastro de Aluno**

```js
let nome = "Ana";
let idade = 22;
const curso = "LionsDev";

console.log(`${nome} tem ${idade} anos e estuda no ${curso}.`);
```

**2. Área do Terreno**

```js
const largura = 8;
const comprimento = 5;
let area = largura * comprimento;

console.log(`A área do terreno é ${area} m².`);
```

**3. Conversão de Temperatura**

```js
let celsius = prompt("Digite a temperatura em Celsius: ");
let fahrenheit = Number(celsius) * 1.8 + 32;

console.log(`${celsius}°C equivalem a ${fahrenheit}°F.`);
```

---

## Parte 2

**4. Soma que não soma.** O `prompt` devolve texto, e o operador `+` entre duas strings concatena (`"10" + "5"` vira `"105"`). A correção é converter as entradas:

```js
let a = Number(prompt("Primeiro número: "));
let b = Number(prompt("Segundo número: "));

let soma = a + b;
console.log("A soma é: " + soma);
```

**5. Constante teimosa.** O erro está na linha `saldo = saldo + 50;`: não é possível reatribuir uma `const` (`TypeError: Assignment to constant variable.`). A correção é declarar com `let`:

```js
let saldo = 100;
saldo = saldo + 50;
console.log("Novo saldo:", saldo); // Novo saldo: 150
```

---

## Parte 3

| Linha | Saída | Motivo |
| ----- | ----- | ------ |
| (a) | `15` | soma de números |
| (b) | `105` | string + número concatena |
| (c) | `number` | |
| (d) | `string` | |
| (e) | `15` | `Number("10")` converte antes da soma |

---

## Parte 4

**7. Calculadora de Gorjeta**

```js
let conta = Number(prompt("Valor da conta: "));
let porcentagem = Number(prompt("Gorjeta (%): "));

let gorjeta = conta * (porcentagem / 100);
let total = conta + gorjeta;

console.log(`Gorjeta: R$ ${gorjeta}`);
console.log(`Total a pagar: R$ ${total}`);
```

**8. Ficha do Personagem**

```js
let nome = prompt("Nome: ");
let classe = prompt("Classe: ");
let nivel = Number(prompt("Nível: "));

let pontosDeVida = nivel * 20;

console.log(`[${nome}] ${classe} Nv.${nivel} | HP: ${pontosDeVida}`);
```

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Gabarito: Variáveis, Tipos e Entrada de Dados - Módulo 02</i>
</div>
