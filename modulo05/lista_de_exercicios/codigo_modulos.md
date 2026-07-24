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

# Lista de Código: Módulos (import / export)

**Turma:** LionsDev  
**Tópicos:** `export default`, exports nomeados (`export`), `import`, caminhos relativos (`./` e extensão `.js`), e `"type": "module"` no `package.json`.

> Aqui você separa o código em arquivos e liga eles com `import`/`export`. Crie uma pasta com um `package.json` contendo `"type": "module"` e vá montando os arquivos conforme cada exercício pede.

---

## Parte 0 — Treino rápido (aquecimento)

Crie arquivos pequenos: um exporta, o outro importa.

1. No arquivo `soma.js`, escreva a função `somar(a, b)` e faça `export default somar`.
2. No `index.js`, faça `import somar from "./soma.js"` e imprima `somar(2, 3)`.
3. No `saudacao.js`, exporte por default uma função que retorna `"Olá!"`.
4. No `matematica.js`, use **export nomeado** de duas funções: `dobro` e `triplo`.
5. No `index.js`, importe nomeado: `import { dobro, triplo } from "./matematica.js"`.
6. Crie o `package.json` com `"type": "module"` (para o `import` funcionar no Node).
7. Exporte por default uma constante `PI = 3.14` de um arquivo `constantes.js`.
8. Importe `PI` no `index.js` e imprima a área de um círculo de raio 2.
9. Num export default, importe com um nome livre (ex.: `import minhaFuncao from "./soma.js"`).
10. Exporte por default um objeto `config = { versao: 1 }` e importe no `index.js`.

---

## Parte 1 — Complete o código

### 1. Exportando por default
Complete o arquivo `calculadora.js`.

```js
// calculadora.js
function calcular(a, b) {
  return a + b;
}

// TODO: exporte 'calcular' como export default
```

```js
// index.js
import calcular from "./calculadora.js";
console.log(calcular(4, 6)); // 10
```

### 2. Exports nomeados
Complete o arquivo `strings.js` exportando as duas funções.

```js
// strings.js
export function maiuscula(txt) {
  return txt.toUpperCase();
}
// TODO: exporte também 'minuscula' que retorna txt em minúsculo
```

```js
// index.js
import { maiuscula, minuscula } from "./strings.js";
console.log(maiuscula("oi")); // OI
console.log(minuscula("OI")); // oi
```

---

## Parte 2 — Ache o bug

### 3. Import quebrado
Este import dá erro no Node. Aponte os dois problemas.

```js
import somar from "soma";  // BUG (dois erros aqui)
console.log(somar(1, 2));
```

### 4. Default vs nomeado
O arquivo exporta com `export default`, mas o import usa chaves. Conserte.

```js
// util.js
export default function formatar(v) { return "R$ " + v; }

// index.js
import { formatar } from "./util.js";  // BUG
console.log(formatar(50));
```

---

## Parte 3 — Prever o resultado

### 5. Vai rodar ou dar erro?
Para cada caso, diga se funciona ou dá erro e por quê.

```
(a) import somar from "./soma.js";        // arquivo usa export default
(b) import somar from "./soma";           // sem extensão .js
(c) import { somar } from "./soma.js";    // arquivo usa export default
(d) import qualquerNome from "./soma.js"; // arquivo usa export default
```

---

## Parte 4 — Escreva do zero

### 6. Mini Projeto Modular (Desafio)
Monte um projeto com 4 arquivos separados:

- `operacoes.js`: exports nomeados de `somar`, `subtrair`, `multiplicar`, `dividir`.
- `formatador.js`: `export default` de `formatarReal(valor)` que retorna `"R$ " + valor`.
- `mensagens.js`: `export default` de um objeto `{ bemVindo: "Bem-vindo!", tchau: "Até logo!" }`.
- `index.js`: importa tudo, calcula `somar(10, 5)`, formata o resultado com `formatarReal` e imprime junto da mensagem de boas-vindas.

```
Saída esperada:
  Bem-vindo!
  Resultado: R$ 15
```

---

> **Dica:** pra importar um arquivo seu, o caminho precisa começar com `./` (ou `../`) e terminar com `.js`. Sem o `./`, o Node procura em `node_modules`; sem o `.js`, ele reclama. Lembre também que `export default` sai sem chaves na hora de importar, e os exports nomeados saem entre `{ }`.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Lista de Código: Módulos - Módulo 05</i>
</div>
