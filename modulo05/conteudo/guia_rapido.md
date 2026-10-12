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

  body { font-family: 'Segoe UI', Helvetica, Arial, sans-serif; color: var(--ld-preto); font-size: 12px; }
  h1 { color: var(--ld-preto); font-size: 21px; font-weight: 700; border-bottom: 3px solid var(--ld-laranja); padding-bottom: 6px; margin: 0 0 6px; }
  h2 { color: var(--ld-preto); font-size: 14px; font-weight: 700; margin: 12px 0 5px; padding-left: 8px; border-left: 4px solid var(--ld-laranja); break-after: avoid; }
  p, li { font-size: 11.5px; line-height: 1.45; margin: 3px 0; }
  ul, ol { padding-left: 18px; margin: 3px 0; }
  a { color: var(--ld-laranja); text-decoration: none; }
  code { background-color: var(--ld-codigo) !important; color: var(--ld-preto) !important; font-weight: 600; padding: 1px 4px; border-radius: 3px; border: 1px solid var(--ld-borda); font-size: 10.5px; }
  pre { background-color: var(--ld-bloco) !important; border: 1px solid var(--ld-borda); border-left: 3px solid var(--ld-laranja); border-radius: 4px; padding: 6px 8px; margin: 5px 0; break-inside: avoid; white-space: pre-wrap; }
  pre code { border: 0; padding: 0; background: none !important; font-size: 10px; line-height: 1.35; font-weight: 500; }
  table { border-collapse: collapse; width: 100%; margin: 5px 0; font-size: 10.5px; break-inside: avoid; }
  th { background-color: var(--ld-preto); color: var(--ld-branco); padding: 4px 6px; text-align: left; }
  td { border: 1px solid var(--ld-borda); padding: 3px 6px; vertical-align: top; }
  tr:nth-child(even) { background-color: var(--ld-bloco); }
  blockquote { background-color: var(--ld-laranja-suave); border-left: 4px solid var(--ld-laranja); padding: 5px 10px; margin: 6px 0; border-radius: 0 4px 4px 0; color: var(--ld-preto); }
  blockquote p { margin: 0; }
  .cols { }
  .intro { color: var(--ld-muted); font-size: 11px; margin: 0 0 8px; }
  .rodape { text-align: center; color: var(--ld-muted); font-size: 11px; margin-top: 18px; }
</style>

# Guia rápido · Módulo 05: Modularização (CommonJS e ES Modules)

<div class="intro">Resumo para consulta rápida. A explicação completa está nos slides e nos arquivos desta pasta.</div>

<div class="cols">

## Por que módulos?
Cada arquivo cuida de **uma responsabilidade** e exporta só o que os outros precisam. Fica mais fácil de ler, testar e trabalhar em equipe.

## CommonJS x ES Modules
| | CommonJS (CJS) | ES Modules (ESM) |
|---|---|---|
| Exportar | `module.exports = soma` | `export default soma` |
| Importar | `const soma = require("./soma")` | `import soma from "./soma.js"` |
| Ativar | padrão do Node | `"type": "module"` no `package.json` |
| Extensão | opcional | **obrigatória** (`.js`) |

Neste curso, a partir daqui, usamos **ESM**.

## Padrão x nomeado
```js
// operacoes.js
export default function somar(a, b) { return a + b }
export function subtrair(a, b) { return a - b }
export const PI = 3.14

// index.js
import somar, { subtrair, PI } from "./operacoes.js"
import { subtrair as menos } from "./operacoes.js"  // apelido
import * as ops from "./operacoes.js"               // tudo num objeto
```
- **default:** um por arquivo; importa com o nome que quiser.
- **nomeado:** vários por arquivo; importa com **chaves** e o **nome exato**.

## Módulos nativos
```js
import fs from "node:fs"
import path from "node:path"
import os from "node:os"
```

## Caminhos
| Caminho | Procura |
|---|---|
| `./arquivo.js` | na mesma pasta |
| `../utils/arquivo.js` | uma pasta acima |
| `express` (sem `./`) | um pacote em `node_modules` |

## Calculadora modularizada
```
calculadora/
├── package.json      ("type": "module")
├── index.js          menu e laço
├── entrada.js        export function lerNumero
└── operacoes.js      export function somar, subtrair…
```

## Mensagens de erro
| Erro | Causa provável |
|---|---|
| `Cannot use import statement outside a module` | falta `"type": "module"` |
| `require is not defined in ES module scope` | misturou `require` num projeto ESM |
| `ERR_MODULE_NOT_FOUND` | caminho errado ou sem `.js` |
| `does not provide an export named 'x'` | importou nomeado, mas o arquivo exporta default (ou o nome está diferente) |

## Armadilhas
- `import soma from "./soma"` (sem `.js`) quebra no ESM.
- Chaves no import de um `export default` → erro de export inexistente.
- Esqueceu `./`? O Node procura um **pacote** com esse nome.

</div>

<div class="rodape">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Guia rápido · Módulo 05</i>
</div>
