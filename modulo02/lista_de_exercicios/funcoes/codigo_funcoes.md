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

# Lista de Código: Funções (e Switch)

**Turma:** LionsDev  
**Tópicos:** declaração de função, parâmetros, `return`, arrow functions, reutilização e estrutura `switch/case`.

> Aqui o foco é escrever função. Cada item dá o contrato (nome, parâmetros, retorno) e exemplos de entrada e saída. Sua função tem que passar em todos os exemplos.

---

## Parte 0 — Treino rápido (aquecimento)

Escreva cada função e chame ela com um `console.log` pra ver o retorno.

1. Escreva uma função `ola()` que **retorna** a string `"Olá!"`.
2. Escreva `dobro(n)` que retorna `n * 2`.
3. Escreva `soma(a, b)` que retorna `a + b`.
4. Escreva `saudacao(nome)` que retorna `"Bem-vindo, NOME"`.
5. Escreva `quadrado(n)` como **arrow function** que retorna `n * n`.
6. Escreva `ehPar(n)` que retorna `true` se `n` for par e `false` se for ímpar.
7. Escreva `maior(a, b)` que retorna o **maior** dos dois.
8. Escreva `mediaDeDois(a, b)` que retorna a **média** de dois números.
9. Escreva `converterParaReal(valor)` que retorna a string `"R$ VALOR"`.
10. Escreva `saudacaoDia(dia)` que usa `switch` e retorna `"Segunda"`, `"Terça"`... para `1`, `2`... e `"Dia inválido"` no `default`.

---

## Parte 1 — Complete o código

### 1. Dobro
Complete o corpo da função. Ela deve retornar (não imprimir) o dobro do número.

```js
function dobro(numero) {
  // TODO: retorne o dobro
}

console.log(dobro(5));  // 10
console.log(dobro(21)); // 42
```

### 2. Saudação Personalizada
Complete a função com dois parâmetros.

```js
function saudacao(nome, curso) {
  // TODO: retorne "Olá NOME, bem-vindo ao CURSO!"
}

console.log(saudacao("Ana", "LionsDev"));
// Olá Ana, bem-vindo ao LionsDev!
```

### 3. Arrow Function
Reescreva a função abaixo como arrow function chamada `areaRetangulo`.

```js
// versão tradicional (referência)
function areaRetanguloTradicional(base, altura) {
  return base * altura;
}

// TODO: const areaRetangulo = (base, altura) => ...
console.log(areaRetangulo(4, 3)); // 12
```

---

## Parte 2 — Ache o bug

### 4. Função que não devolve nada
`console.log(soma(2, 3))` imprime `undefined`. Explique por quê e conserte.

```js
function soma(a, b) {
  console.log(a + b);  // BUG: pense na diferença entre imprimir e retornar
}

let resultado = soma(2, 3);
console.log("Resultado:", resultado); // Esperado: Resultado: 5
```

### 5. Switch sem freio
Esta função sempre retorna "Rota padrão", ou imprime demais. Encontre o que falta no `switch`.

```js
function nomeDoDia(dia) {
  switch (dia) {
    case 1:
      return "Domingo";
    case 2:
      return "Segunda";
    case 3:
      return "Terça";
    default:
      return "Dia inválido";
  }
}
// Dica: teste nomeDoDia(2) e verifique se cada case está correto.
// (Se você usar console.log dentro sem 'break/return', o que acontece?)
```

---

## Parte 3 — Prever a saída

### 6. Ordem de execução
Sem rodar, diga o que aparece e em que ordem.

```js
function quadrado(n) {
  return n * n;
}

console.log("Início");
console.log(quadrado(3) + quadrado(4));
let x = quadrado(5);
console.log("x vale", x);
console.log("Fim");
```

---

## Parte 4 — Escreva do zero

### 7. Conjunto de Funções Matemáticas
Escreva quatro funções: `somar(a, b)`, `subtrair(a, b)`, `multiplicar(a, b)` e `dividir(a, b)`. Todas devem retornar o resultado. Em `dividir`, se `b` for `0`, retorne a string `"Erro: divisão por zero"`.

```
somar(2, 3)        -> 5
subtrair(10, 4)    -> 6
multiplicar(3, 3)  -> 9
dividir(10, 2)     -> 5
dividir(10, 0)     -> "Erro: divisão por zero"
```

### 8. Calculadora com Switch (Desafio)
Escreva `calculadora(operacao, num1, num2)` onde `operacao` é uma string (`"+"`, `"-"`, `"*"`, `"/"`). Use `switch` para decidir a conta e reutilize as funções do exercício 7. Retorne o resultado; para operação desconhecida, retorne `"Operação inválida"`.

```
calculadora("+", 4, 6)  -> 10
calculadora("*", 5, 2)  -> 10
calculadora("/", 8, 0)  -> "Erro: divisão por zero"
calculadora("%", 4, 2)  -> "Operação inválida"
```

Depois, peça `operacao`, `num1` e `num2` pelo terminal com `prompt-sync` e imprima o resultado da `calculadora`.

---

> **Dica:** `return` devolve um valor pra quem chamou (dá pra guardar em variável e reaproveitar); `console.log` só mostra na tela e a função continua retornando `undefined`. Na dúvida: se outro trecho precisa usar o resultado, use `return`.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Lista de Código: Funções e Switch - Módulo 02</i>
</div>
