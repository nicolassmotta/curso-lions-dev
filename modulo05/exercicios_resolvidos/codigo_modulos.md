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

# Gabarito: Módulos (import / export)

**Lista:** `modulo05/lista_de_exercicios/codigo_modulos.md`  
**Uso:** material de referência para correção. Outras soluções que produzam a mesma saída também são válidas.

---

## Parte 0

**1.** `package.json`

```json
{
  "name": "lista-modulos",
  "version": "1.0.0",
  "type": "module"
}
```

**2 a 10.** Um arquivo por bloco:

```js
// soma.js (item 2)
function somar(a, b) {
  return a + b;
}

export default somar;
```

```js
// saudacao.js (item 4)
export default function saudacao() {
  return "Olá!";
}
```

```js
// matematica.js (item 5)
export function dobro(n) {
  return n * 2;
}

export function triplo(n) {
  return n * 3;
}
```

```js
// constantes.js (item 7)
const PI = 3.14;
export default PI;
```

```js
// config.js (item 10)
const config = { versao: 1 };
export default config;
```

```js
// index.js (itens 3, 6, 8, 9 e 10)
import somar from "./soma.js";
import saudacao from "./saudacao.js";
import { dobro, triplo } from "./matematica.js";
import PI from "./constantes.js";
import minhaFuncao from "./soma.js";
import config from "./config.js";

console.log(somar(2, 3)); // 5
console.log(saudacao()); // Olá!
console.log(dobro(4), triplo(4)); // 8 12
console.log(PI * 2 * 2); // área do círculo de raio 2: 12.56
console.log(minhaFuncao(10, 1)); // 11
console.log(config.versao); // 1
```

> No item 9, o nome usado no `import` de um **export default** é escolhido por quem importa. O arquivo exporta "a coisa principal", não um nome. Por isso `minhaFuncao` funciona igual a `somar`.

---

## Parte 1

### 1. Exportando por default

```js
// calculadora.js
function calcular(a, b) {
  return a + b;
}

export default calcular;
```

### 2. Exports nomeados

```js
// strings.js
export function maiuscula(txt) {
  return txt.toUpperCase();
}

export function minuscula(txt) {
  return txt.toLowerCase();
}
```

---

## Parte 2

### 3. Import quebrado

Os dois erros estão no caminho `"soma"`:

1. **Falta o `./`.** Sem ele, o Node procura um **pacote** chamado `soma` dentro de `node_modules`, e não um arquivo do projeto.
2. **Falta a extensão `.js`.** Com `"type": "module"`, o Node não completa a extensão sozinho.

```js
import somar from "./soma.js";
console.log(somar(1, 2)); // 3
```

### 4. Default vs nomeado

O `export default` é importado **sem** chaves. Com chaves, o Node procura um export nomeado chamado `formatar`, que não existe, e dá o erro `does not provide an export named 'formatar'`.

```js
// index.js
import formatar from "./util.js";
console.log(formatar(50)); // R$ 50
```

---

## Parte 3

| Caso | Resultado | Por quê |
| ---- | --------- | ------- |
| (a) | funciona | caminho relativo com `.js` e import sem chaves para export default |
| (b) | erro | sem a extensão `.js` o Node não encontra o arquivo (`ERR_MODULE_NOT_FOUND`) |
| (c) | erro | as chaves pedem um export **nomeado** `somar`, mas o arquivo só tem export default |
| (d) | funciona | o export default pode ser importado com qualquer nome |

---

## Parte 4

### 6. Mini Projeto Modular

```js
// operacoes.js
export function somar(a, b) {
  return a + b;
}

export function subtrair(a, b) {
  return a - b;
}

export function multiplicar(a, b) {
  return a * b;
}

export function dividir(a, b) {
  return a / b;
}
```

```js
// formatador.js
function formatarReal(valor) {
  return "R$ " + valor;
}

export default formatarReal;
```

```js
// mensagens.js
const mensagens = {
  bemVindo: "Bem-vindo!",
  tchau: "Até logo!",
};

export default mensagens;
```

```js
// index.js
import { somar } from "./operacoes.js";
import formatarReal from "./formatador.js";
import mensagens from "./mensagens.js";

const resultado = somar(10, 5);

console.log(mensagens.bemVindo);
console.log("Resultado: " + formatarReal(resultado));
```

Saída:

```
Bem-vindo!
Resultado: R$ 15
```

> O `index.js` importa só o `somar`, porque é a única operação usada. Com exports nomeados, você escolhe exatamente o que trazer de cada arquivo.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Gabarito: Módulos (import / export) - Módulo 05</i>
</div>
