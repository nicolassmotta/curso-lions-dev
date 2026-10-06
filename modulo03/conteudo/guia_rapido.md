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

# Guia rápido · Módulo 03: Calculadora e Clínica Médica

<div class="intro">Resumo para consulta rápida. A explicação completa está nos slides e nos arquivos desta pasta.</div>

<div class="cols">

## Do pedido ao código
1. **Requisitos:** o que o programa precisa fazer (e o que **não** precisa).
2. **Escopo:** dentro (as quatro operações, porcentagem, ver resultado, sair) × fora (científica, histórico em arquivo, interface gráfica).
3. **Fluxo:** desenhe o menu e o caminho de cada opção antes de programar.
4. **Validação:** o que acontece com entrada errada?
5. **Refatoração:** código repetido vira função.

## Menu em laço
```js
const prompt = require("prompt-sync")()
let resultado = 0
let opcao = ""

while (opcao !== "0") {
  console.log(`Resultado atual: ${resultado}`)
  console.log("1 - Somar  2 - Subtrair  0 - Sair")
  opcao = prompt("Escolha: ")

  switch (opcao) {
    case "1": {
      resultado += lerNumero("Número: ")
      break
    }
    case "2": {
      resultado -= lerNumero("Número: ")
      break
    }
    case "0":
      console.log("Até mais!")
      break
    default:
      console.log("Opção inválida.")
  }
}
```

## Validando a entrada
```js
function lerNumero(mensagem) {
  let valor = Number(prompt(mensagem))
  while (isNaN(valor)) {
    console.log("Digite um número válido.")
    valor = Number(prompt(mensagem))
  }
  return valor
}
```
- **Divisão por zero:** teste o divisor **antes** de dividir e avise o usuário.
- Chaves no `case` (`case "1": { ... }`) permitem declarar `let`/`const` sem conflito.

## Clínica médica (projeto 2)
```js
const pacientes = []
pacientes.push({ id: 1, nome: "Ana", idade: 30 })

const achado = pacientes.find((p) => p.id === 1)
const adultos = pacientes.filter((p) => p.idade >= 18)
```
- Cada registro é um **objeto**; a lista é um **array de objetos**.
- `find` devolve **um** item (ou `undefined`); `filter` devolve **um array**.

## Critérios de aceite (teste manual)
| Caso | Esperado |
|---|---|
| Entrada válida (`10`, `2.5`) | faz a conta |
| Texto (`abc`) | avisa e pede de novo |
| Divisor `0` | avisa e não divide |
| Opção inexistente (`9`) | "Opção inválida." |
| `0` no menu | encerra |

## Armadilhas
- `Number("")` é `0`, não `NaN`: ENTER sem digitar vira zero. Trate se o requisito pedir.
- O `prompt` devolve texto: compare a opção com `"1"`, não com `1`.
- Esqueceu o `break`? O código cai no próximo `case`.
- Requisito vago ("uma calculadora") gera expectativas diferentes: pergunte antes.

</div>

<div class="rodape">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Guia rápido · Módulo 03</i>
</div>
