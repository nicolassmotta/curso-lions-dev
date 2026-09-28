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

# Gabarito: Loja Modular

**Lista:** `modulo05/lista_de_exercicios/loja_modular/loja_modular.md`  
**Uso:** material de referência para correção. O código completo está nesta mesma pasta; rode com `npm install` e `npm start`.

---

## Estrutura da solução

```text
loja_modular/
|-- package.json
|-- index.js                      menu (único arquivo com prompt)
|-- dados.js                      export default do array produtos
|-- utils/
|   |-- formatar.js               export default formatarReal
|   `-- validacao.js              exports nomeados precoValido e quantidadeValida
`-- operacoes/
    |-- cadastrar_produto.js      guarda também o contador proximoId
    |-- listar_produtos.js
    |-- vender_produto.js
    |-- relatorio_estoque.js
    `-- repor_estoque.js          Parte 2
```

Quem importa quem:

| Arquivo | Importa |
| ------- | ------- |
| `index.js` | as 5 operações e o `prompt-sync` |
| `cadastrar_produto.js` | `dados.js`, `precoValido` e `quantidadeValida` |
| `listar_produtos.js` | `dados.js` e `formatarReal` |
| `vender_produto.js` | `dados.js`, `formatarReal` e `quantidadeValida` |
| `relatorio_estoque.js` | `dados.js` e `formatarReal` |
| `repor_estoque.js` | `dados.js` e `quantidadeValida` |

---

## Saída dos testes

```
1 - Caderno | R$ 18,90 | estoque: 10
2 - Caneta | R$ 3,50 | estoque: 40
Venda registrada: 3x Caderno = R$ 56,70
Estoque insuficiente. Disponível: 40.
Produto cadastrado.
Dados inválidos.
Produtos: 3 | Valor em estoque: R$ 632,30
Estoque de Mochila atualizado para 8.
1 - Caderno | R$ 18,90 | estoque: 7
2 - Caneta | R$ 3,50 | estoque: 40
3 - Mochila | R$ 120,00 | estoque: 8
```

As seis primeiras respostas são idênticas às do `loja.js` original, o que mostra que a modularização não mudou o comportamento.

---

## Respostas da seção 6

**1.** O `validacao.js` junta **várias** funções do mesmo assunto, e cada operação usa uma combinação diferente delas: o cadastro usa as duas, a venda e a reposição só usam `quantidadeValida`. Com exports nomeados, cada arquivo importa exatamente o que precisa (`import { quantidadeValida } from ...`). Os outros arquivos têm **uma** coisa principal, e o `export default` combina com isso.

**2.** No `cadastrar_produto.js`, que é o único arquivo que cria produtos e, portanto, o único que precisa alterar o contador. Uma variável importada é somente leitura para quem importa, então deixar `export let proximoId` no `dados.js` e fazer `proximoId++` no cadastro quebra com `TypeError: Assignment to constant variable.`. Na solução, o contador começa no maior `id` existente mais 1, para não repetir id se os dados iniciais mudarem.

> Outra solução válida: guardar o contador em um objeto exportado, como `export default { produtos, contador: { proximoId: 3 } }`, e fazer `dados.contador.proximoId++`. Funciona porque alterar uma **propriedade** de um objeto importado é permitido; o que não se pode é reatribuir a variável importada.

**3.** Um arquivo criado (`operacoes/repor_estoque.js`) e um alterado (`index.js`, com a opção 5 no menu e na lista de imports). `dados.js`, `utils/` e as outras quatro operações ficaram intactos. No `loja.js` original, a mudança cairia no mesmo arquivo de tudo o mais, entre funções que não têm nada a ver com reposição.

**4.** Não. A venda está em `vender_produto.js` e o relatório em `relatorio_estoque.js`. Como o Git só tem conflito quando duas branches mudam as **mesmas linhas**, cada pessoa trabalhando em um arquivo diferente faz o merge sem conflito. No arquivo único, as duas mexeriam no `loja.js`, e a chance de conflito seria bem maior. O único ponto comum é o `index.js`, que só muda quando entra uma opção nova no menu.

---

## Erros comuns na correção

| Sintoma | Causa | Correção |
| ------- | ----- | -------- |
| `ERR_MODULE_NOT_FOUND` em `operacoes/` | caminho `./dados.js` dentro da subpasta | usar `../dados.js` |
| `does not provide an export named 'formatarReal'` | `import { formatarReal }` de um export default | importar sem chaves |
| `TypeError: Assignment to constant variable.` | `proximoId++` em uma variável importada | mover o contador para o arquivo que o altera |
| `prompt is not defined` em uma operação | a operação ainda chama `prompt` | ler no `index.js` e passar por parâmetro |

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Gabarito: Loja Modular - Módulo 05</i>
</div>
