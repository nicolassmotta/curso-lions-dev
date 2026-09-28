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

# Cheat sheet · Módulo 02: Fundamentos de JavaScript

<div class="intro">Resumo para consulta rápida. A explicação completa está nos slides e nos arquivos desta pasta.</div>

<div class="cols">

## Variáveis e tipos
```js
let idade = 20          // pode mudar
const nome = "Ana"      // não pode ser reatribuída
typeof "oi"             // "string"
typeof 42               // "number"
typeof true             // "boolean"
typeof undefined        // "undefined"
typeof null             // "object" (herança antiga do JS)
Array.isArray([1, 2])   // true (typeof [] é "object")
`Olá, ${nome}!`         // template string
```

## Entrada com prompt-sync
```js
const prompt = require("prompt-sync")()
const n = Number(prompt("Digite um número: ")) // prompt devolve TEXTO
isNaN(n)          // true se não virou número
parseInt("12.9")  // 12
parseFloat("2.5") // 2.5
```

## Operadores
`+ - * /` · `%` resto · `**` potência · `++` `--` · `+=`
`===` igual (valor **e** tipo) · `!==` diferente · `>` `>=` `<` `<=`
`&&` e · `||` ou · `!` não · ternário: `cond ? a : b`

**Falsy:** `false`, `0`, `""`, `null`, `undefined`, `NaN`. O resto é truthy.

## Decisão
```js
if (nota >= 7) {
  console.log("Aprovado")
} else if (nota >= 5) {
  console.log("Recuperação")
} else {
  console.log("Reprovado")
}

switch (opcao) {
  case "1": {
    console.log("Somar")
    break          // sem break, cai no próximo case
  }
  default:
    console.log("Opção inválida")
}
```

## Repetição
```js
for (let i = 0; i < 5; i++) { }
while (condicao) { }           // pode nem rodar
do { } while (condicao)        // roda pelo menos uma vez
for (const item of lista) { }  // cada valor do array
for (const chave in objeto) { }// cada chave do objeto
break     // sai do laço
continue  // pula para a próxima volta
```

## Arrays
| Método | Faz |
|---|---|
| `push(x)` / `pop()` | põe / tira no fim |
| `unshift(x)` / `shift()` | põe / tira no começo |
| `length` | tamanho |
| `includes(x)` / `indexOf(x)` | tem? / posição (−1 se não tem) |
| `slice(i, f)` | cópia de um pedaço |
| `splice(i, n)` | remove `n` itens a partir de `i` |
| `join(", ")` | vira texto |
| `sort((a, b) => a - b)` | ordena números |

## Strings
`length` · `toUpperCase()` · `toLowerCase()` · `trim()` · `split(" ")` · `includes("x")` · `slice(0, 3)` · `replace("a", "b")` · `texto[0]`

## Objetos
```js
const aluno = { nome: "Ana", nota: 8 }
aluno.nome            // "Ana"
aluno["nota"]         // 8
aluno.turma = "LD1"   // cria a chave
Object.keys(aluno)    // ["nome", "nota", "turma"]
```

## Funções
```js
function somar(a, b) {
  return a + b
}
const dobro = (n) => n * 2
function saudar(nome = "visitante") { return `Oi, ${nome}` }
```

## Debug no VS Code
Clique na margem para o **breakpoint** (bolinha vermelha) → **F5** → **F10** avança uma linha, **F11** entra na função. Veja os valores no painel **Variables**.

## Armadilhas
- `"2" + 3` → `"23"`. Converta a entrada com `Number()`.
- `=` atribui; `===` compara.
- `0.1 + 0.2` → `0.30000000000000004`. Para exibir: `toFixed(2)` (devolve **texto**).
- `[10, 9, 1].sort()` → `[1, 10, 9]`: sem comparador, ordena como texto.
- Sem ponto e vírgula, uma linha que começa com `(` ou `[` gruda na anterior.
- `const` com objeto: a variável não muda, mas as propriedades sim.
- `while` sem atualizar a condição = laço infinito (**Ctrl+C** para parar).

</div>

<div class="rodape">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Cheat sheet · Módulo 02</i>
</div>
