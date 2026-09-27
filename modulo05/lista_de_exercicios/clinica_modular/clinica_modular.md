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

# Exercício Prático: Clínica Médica Modular

**Turma:** LionsDev  
**Tópicos:** ES Modules (`import`/`export`), `export default` e exports nomeados, separação de responsabilidades em arquivos, `"type": "module"` e reaproveitamento de código.

---

## 1. Contexto

No Módulo 03 você construiu o sistema de agendamento da clínica médica em um único arquivo. Funciona, mas à medida que o programa cresce, um arquivo só fica difícil de ler, testar e dividir com colegas.

Neste exercício você vai **reorganizar o mesmo sistema em vários arquivos**, sem mudar o comportamento. Cada arquivo terá uma única responsabilidade e se comunicará com os outros por `import`/`export`.

> Se você não tiver o projeto do Módulo 03 pronto, consulte o enunciado em `modulo03/conteudo/projeto_clinica_medica.md` e implemente as funções diretamente nos novos arquivos.

---

## 2. Estrutura do Projeto

Organize o projeto exatamente assim:

```text
clinica/
|-- package.json
|-- index.js
|-- dados.js
|-- validacao.js
`-- operacoes/
    |-- adicionar_consulta.js
    |-- listar_consultas.js
    |-- atualizar_consulta.js
    `-- cancelar_consulta.js
```

Requisitos:

* O `package.json` deve conter `"type": "module"`.
* Instale o `prompt-sync` com `npm install prompt-sync`.
* Cada arquivo tem uma única responsabilidade, descrita na seção 3.

---

## 3. Responsabilidade de Cada Arquivo

### 3.1 `dados.js`

Guarda o array de consultas e o exporta por default:

```js
const consultas = [];

export default consultas;
```

> O array é declarado com `const` e compartilhado entre os arquivos. Por isso, as operações devem **alterar o próprio array** (`push`, `splice` e atribuição em uma posição), nunca reatribuí-lo com `consultas = ...`.

### 3.2 `validacao.js`

Exporta **duas funções nomeadas**:

* `posicaoValida(numero)`: recebe o número digitado pelo usuário (começando em 1) e retorna `true` se ele for um número e existir uma consulta naquela posição; caso contrário, retorna `false`.
* `campoPreenchido(texto)`: retorna `true` se o texto não estiver vazio (desconsiderando espaços); caso contrário, retorna `false`.

### 3.3 `operacoes/`

Cada arquivo exporta **por default** uma função:

| Arquivo | Função | O que faz |
| ------- | ------ | --------- |
| `adicionar_consulta.js` | `adicionarConsulta(paciente, medico, data, hora)` | Valida que `paciente` e `medico` foram preenchidos, cria o objeto e o adiciona ao array. Retorna `true` se adicionou e `false` se algum campo obrigatório estava vazio. |
| `listar_consultas.js` | `listarConsultas()` | Mostra todas as consultas numeradas a partir de 1. Se não houver consultas, mostra "Nenhuma consulta agendada." |
| `atualizar_consulta.js` | `atualizarConsulta(numero, novosDados)` | Se o número for válido, substitui os dados da consulta e retorna `true`; caso contrário, retorna `false`. |
| `cancelar_consulta.js` | `cancelarConsulta(numero)` | Se o número for válido, remove a consulta com `splice` e retorna `true`; caso contrário, retorna `false`. |

As operações importam o array de `../dados.js` e as funções de validação de `../validacao.js`.

### 3.4 `index.js`

É o único arquivo que usa `prompt-sync`. Ele:

* mostra o menu (1: adicionar, 2: listar, 3: atualizar, 4: cancelar, 0: sair);
* lê os dados digitados pelo usuário;
* chama a operação correspondente;
* mostra a mensagem de sucesso ou de erro de acordo com o valor retornado pela operação.

> As funções de `operacoes/` não usam `prompt`. Elas recebem os dados por parâmetro e devolvem o resultado. Assim, elas podem ser reaproveitadas depois em uma API, no Módulo 07, sem nenhuma alteração.

---

## 4. Regras

1. O comportamento do programa deve ser o mesmo do Módulo 03, incluindo as validações.
2. Todo import de arquivo do projeto começa com `./` ou `../` e termina com `.js`.
3. Use `export default` nas operações e em `dados.js`, e exports nomeados em `validacao.js`.
4. Nenhum arquivo, além de `index.js`, pode usar `prompt`.

---

## 5. Testes Esperados

1. Liste as consultas com o sistema vazio e confira a mensagem "Nenhuma consulta agendada.".
2. Adicione duas consultas e liste: elas devem aparecer numeradas como 1 e 2.
3. Tente adicionar uma consulta com o paciente em branco: o sistema deve recusar.
4. Atualize a consulta 2 e liste para conferir a alteração.
5. Tente cancelar a consulta 5 (inexistente): o sistema deve avisar e não alterar a lista.
6. Cancele a consulta 1 e liste: sobra só uma consulta, agora numerada como 1.

---

## 6. Perguntas para Responder

1. Por que `validacao.js` usa exports nomeados, e as operações usam `export default`?
2. O que aconteceria se `cancelar_consulta.js` fizesse `consultas = consultas.filter(...)`?
3. Qual é a vantagem de as operações não usarem `prompt`?

---

## 7. Entrega

- Link do repositório no GitHub com a pasta `clinica/`.
- Print do programa executando os testes da seção 5.
- Respostas às perguntas da seção 6.

---

> **Dica:** comece criando `dados.js` e `validacao.js`, depois uma operação por vez. Teste cada operação importando-a em um arquivo `teste.js` antes de ligar tudo no menu do `index.js`. Se aparecer `ERR_MODULE_NOT_FOUND`, confira o caminho do import: `./` para a mesma pasta, `../` para a pasta acima e a extensão `.js` no final.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Exercício Prático: Clínica Médica Modular - Módulo 05</i>
</div>
