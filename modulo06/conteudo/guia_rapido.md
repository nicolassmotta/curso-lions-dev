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

# Guia rápido · Módulo 06: Sistema de Cadastro e Busca (CRUD em memória)

<div class="intro">Resumo para consulta rápida. A explicação completa está nos slides e nos arquivos desta pasta.</div>

<div class="cols">

## CRUD
| Letra | Operação | Em JavaScript |
|---|---|---|
| **C**reate | cadastrar | `lista.push(novo)` |
| **R**ead | listar / buscar | `forEach`, `find`, `filter` |
| **U**pdate | atualizar | `find` + alterar campos |
| **D**elete | remover | `findIndex` + `splice` (ou `filter`) |

## Create com ID
```js
const contatos = []
let proximoId = 1

function cadastrar(nome, telefones) {
  const contato = { id: proximoId++, nome, telefones }
  contatos.push(contato)
  return contato
}
```
Outras formas de ID: `Date.now()` ou `crypto.randomUUID()` (texto único).

## Read
```js
function buscarPorId(id) {
  return contatos.find((c) => c.id === id)   // ou undefined
}
function buscarPorNome(termo) {
  return contatos.filter((c) =>
    c.nome.toLowerCase().includes(termo.toLowerCase()))
}
```

## Update e Delete
```js
function atualizar(id, novosDados) {
  const contato = buscarPorId(id)
  if (!contato) return null
  if (novosDados.nome) contato.nome = novosDados.nome
  if (novosDados.telefones && novosDados.telefones.length > 0) {
    contato.telefones = novosDados.telefones
  }
  return contato
}

function remover(id) {
  const i = contatos.findIndex((c) => c.id === id)
  if (i === -1) return false
  contatos.splice(i, 1)
  return true
}
```

## Métodos de array que resolvem quase tudo
| Método | Pergunta que responde | Devolve |
|---|---|---|
| `find` | qual é o item? | item ou `undefined` |
| `findIndex` | em que posição? | índice ou `-1` |
| `filter` | quais atendem? | novo array |
| `some` | existe algum? | `true`/`false` |
| `every` | todos atendem? | `true`/`false` |
| `map` | transformar cada um | novo array |
| `reduce` | juntar num valor só | qualquer valor |

```js
const nomes = contatos.map((c) => c.nome)
const temAna = contatos.some((c) => c.nome === "Ana")
const total = pedidos.reduce((soma, p) => soma + p.valor, 0)
```

## Relacionamentos
```js
const medicos = [{ id: 1, nome: "Dra. Bia" }]
const consultas = [{ id: 1, medicoId: 1, pacienteId: 3 }]
const doMedico = consultas.filter((c) => c.medicoId === 1)
```
O registro guarda o **id** do outro, não uma cópia.

## Organização em arquivos
`dados.js` (arrays, `export default { medicos, pacientes, consultas }`) · `contatos.js` (funções CRUD exportadas) · `index.js` (menu).

## Armadilhas
- O `prompt` devolve texto: `"1" === 1` é `false`. Converta com `Number()`.
- `find` devolveu `undefined`? Cheque antes de usar o resultado.
- `splice(-1, 1)` remove o **último** item. Sempre teste `i === -1` antes.
- `filter` não altera o array original: reatribua ou use `splice`.
- `if (novosDados.telefones.length)` quebra se `telefones` não veio.

## Projeto flashcards
Quem escolheu a lista **Flashcards**: baralhos e cartões com o mesmo CRUD. É a base da API do Módulo 7.

</div>

<div class="rodape">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Guia rápido · Módulo 06</i>
</div>
