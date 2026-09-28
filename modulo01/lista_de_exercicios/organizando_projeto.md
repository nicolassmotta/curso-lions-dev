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

# Desafio: Organizando o Projeto da Loja Lions

**Turma:** LionsDev  
**Tópicos:** navegação (`pwd`, `ls`, `cd`), organização de pastas (`mkdir`, `mv`, `cp`, `rm`), nomes com espaço, curingas (`*`), `npm init`, `npm install`, scripts do `package.json` e execução com `node`.

> **Pré-requisito:** ter feito a lista `codigo_terminal.md` e o desafio *Explorando o Espaço*. Todo o desafio é feito **só no terminal**, exceto o passo 7, que edita o `package.json` no VS Code.

---

## 1. Contexto

Um colega começou o projeto da **Loja Lions** e salvou tudo na mesma pasta, sem organização nenhuma: códigos, anotações, imagens e arquivos temporários misturados. Sua missão é arrumar a bagunça, instalar as dependências e deixar o projeto rodando.

---

## 2. Preparação: crie a bagunça

Copie e cole este bloco no terminal. Ele cria a pasta `loja-lions` no estado em que o colega deixou:

```bash
mkdir loja-lions
cd loja-lions
echo 'console.log("Loja Lions no ar!");' > index.js
echo 'export function somar(a, b) { return a + b; }' > calculo.js
echo "Ideias para a loja" > anotacoes.txt
echo "arroz, feijão, café" > "lista de compras.txt"
touch logo.png banner.png foto-produto.png
touch rascunho.tmp backup.tmp
mkdir "pasta nova" antigo
touch antigo/versao-velha.js
```

Confira o resultado com `ls`. Repare que `lista de compras.txt` e `pasta nova` têm espaços no nome.

---

## 3. Missão

Execute cada passo **de dentro da pasta `loja-lions`**, a menos que o passo diga o contrário.

### Passo 1: Reconhecer o terreno
Descubra em que pasta você está e liste tudo o que existe nela.

### Passo 2: Criar a estrutura
Crie as pastas `src`, `docs` e `imagens`.

### Passo 3: Mover as imagens de uma vez
Mova **todos** os arquivos `.png` para a pasta `imagens` usando **um único comando**.

> **Conceito novo: o curinga `*`.** No terminal, `*` significa "qualquer sequência de caracteres". O padrão `*.png` casa com todos os arquivos que terminam em `.png`. Assim, `mv *.png imagens/` move todos de uma vez.

### Passo 4: Organizar código e documentos
1. Mova `index.js` e `calculo.js` para `src`.
2. Mova `anotacoes.txt` para `docs`.
3. Mova `lista de compras.txt` para `docs` e, no mesmo comando, renomeie para `lista_compras.txt`.

### Passo 5: Limpar o que não serve
1. Apague todos os arquivos `.tmp` com um único comando.
2. Apague a pasta `antigo` e tudo o que tem dentro.
3. Renomeie a pasta `pasta nova` para `config`.

### Passo 6: Transformar em projeto Node
1. Crie o `package.json` aceitando as respostas padrão.
2. Instale o pacote `prompt-sync`.
3. Liste a pasta e explique o que são o `node_modules` e o `package-lock.json`, que apareceram sozinhos.
4. Mostre no terminal o conteúdo do `package.json` e encontre onde o `prompt-sync` foi registrado.

### Passo 7: Rodar o projeto
1. Rode o `src/index.js` com o Node. A saída deve ser `Loja Lions no ar!`.
2. Abra o `package.json` no VS Code (`code package.json`) e, dentro de `"scripts"`, adicione o script `"start": "node src/index.js"`.
3. Rode o projeto com `npm start`.

> **Conceito novo: scripts do npm.** O campo `"scripts"` do `package.json` guarda atalhos para comandos. Com `"start": "node src/index.js"`, qualquer pessoa que baixar o projeto roda tudo com `npm start`, sem precisar saber qual é o arquivo principal. Nos próximos módulos, é assim que as APIs serão iniciadas.

### Passo 8: Conferir
Volte uma pasta acima de `loja-lions` e liste o conteúdo de todas as subpastas de uma vez com `ls -R loja-lions`.

---

## 4. Estrutura final esperada

```
loja-lions/
├── config/
├── docs/
│   ├── anotacoes.txt
│   └── lista_compras.txt
├── imagens/
│   ├── banner.png
│   ├── foto-produto.png
│   └── logo.png
├── node_modules/
├── package-lock.json
├── package.json
└── src/
    ├── calculo.js
    └── index.js
```

---

## 5. Entregáveis

- A sequência completa de comandos usada, do passo 1 ao 8, na ordem.
- Um print da saída de `npm start`.
- Um print da saída de `ls -R loja-lions` (pode cortar a parte do `node_modules`, que é longa).
- A resposta do passo 6.3: para que servem `node_modules` e `package-lock.json`?

> **Dica:** antes de apagar qualquer coisa com `rm`, rode `ls` com o mesmo padrão (`ls *.tmp`) para conferir quais arquivos serão apagados. O `rm` não manda nada para a lixeira. Nomes com espaço precisam de aspas: `mv "pasta nova" config`.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Desafio Prático de Terminal - Módulo 01</i>
</div>
