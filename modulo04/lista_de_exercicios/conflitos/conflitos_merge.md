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

# Atividade Prática: Conflitos de Merge em Dupla

**Turma:** LionsDev  
**Tópicos:** branches, `git merge`, `git pull`, conflitos de merge, marcadores de conflito (`<<<<<<<`, `=======`, `>>>>>>>`), `git merge --abort` e resolução de conflitos no VS Code e no GitHub.

---

## 1. Contexto

Um conflito de merge acontece quando duas branches alteram **a mesma linha** de um arquivo e o Git não sabe qual versão manter. Conflitos não são erros: fazem parte do trabalho em equipe e aparecem sempre que duas pessoas mexem no mesmo trecho de código.

Nesta atividade, a dupla vai provocar conflitos de propósito, em um ambiente controlado, e resolvê-los de três formas: pelo terminal, pelo VS Code e pelo GitHub.

> **Pré-requisito:** ter feito a lista `codigo_git.md` e a atividade em dupla de `exercicios_slides/README.md` (repositório compartilhado, colaborador adicionado, branches e Pull Requests).

---

## 2. Preparação (Aluno A)

1. Crie no GitHub um repositório chamado `lionsdev-conflitos` e adicione o colega como colaborador (`Settings > Collaborators`).
2. Clone o repositório, crie o arquivo `index.js` com o conteúdo abaixo e envie para a `main`:

```js
console.log("Bem-vindo à loja!");
console.log("Horário: 8h às 18h");
```

```bash
git add index.js
git commit -m "Cria mensagem de boas-vindas"
git branch -M main
git push -u origin main
```

3. **Aluno B:** aceite o convite e clone o repositório.

---

## 3. Conflito 1: resolvendo pelo terminal e pelo VS Code

Os dois alunos vão alterar a **mesma linha** em branches diferentes.

**Aluno A:**

```bash
git checkout -b feature-nome-loja
```

Altere a primeira linha de `index.js` para `console.log("Bem-vindo à Loja Lions!");`, faça o commit e envie a branch. Em seguida, abra um Pull Request para a `main` e faça o merge no GitHub.

**Aluno B** (sem atualizar a `main` antes):

```bash
git checkout -b feature-saudacao
```

Altere a mesma linha para `console.log("Olá, seja bem-vindo!");` e faça o commit. Depois, traga para a sua branch as mudanças que já estão na `main` do GitHub:

```bash
git pull --no-rebase origin main
```

> A opção `--no-rebase` diz ao Git para juntar as branches com um merge. Sem ela, dependendo da instalação, o Git pode parar com a mensagem `fatal: Need to specify how to reconcile divergent branches`.

O Git vai responder com uma mensagem parecida com esta:

```
Auto-merging index.js
CONFLICT (content): Merge conflict in index.js
Automatic merge failed; fix conflicts and then commit the result.
```

Abra o `index.js`. O arquivo agora contém os **marcadores de conflito**:

```
<<<<<<< HEAD
console.log("Olá, seja bem-vindo!");
=======
console.log("Bem-vindo à Loja Lions!");
>>>>>>> 3f9c2ab (Altera nome da loja)
```

- Entre `<<<<<<< HEAD` e `=======` está a versão da **sua branch atual**.
- Entre `=======` e `>>>>>>>` está a versão que **está chegando** (no caso, da `main`). O texto depois de `>>>>>>>` pode ser o nome de uma branch ou o identificador de um commit.

**Tarefa:** a dupla deve conversar e decidir a mensagem final. Pode ser uma das duas versões ou uma combinação, por exemplo `console.log("Olá, bem-vindo à Loja Lions!");`.

Para resolver:

1. Apague os três marcadores (`<<<<<<<`, `=======` e `>>>>>>>`) e deixe só o código final. No VS Code, os botões **Accept Current Change**, **Accept Incoming Change** e **Accept Both Changes**, que aparecem acima do conflito, fazem isso automaticamente.
2. Confira com `git status`: o arquivo aparece em **Unmerged paths** como `both modified`.
3. Marque o conflito como resolvido e finalize o merge:

```bash
git add index.js
git commit -m "Resolve conflito na mensagem de boas-vindas"
git push origin feature-saudacao
```

4. Abra o Pull Request de `feature-saudacao` para a `main`. Agora ele não tem mais conflito e pode ser mesclado.

---

## 4. Conflito 2: resolvendo pelo GitHub

Agora é o **Aluno A** quem vai resolver. Invertam os papéis:

1. Os dois alunos atualizam a `main` local (`git checkout main` e `git pull origin main`).
2. Cada um cria uma branch e altera a **segunda linha** (`Horário: ...`) com um valor diferente. O Aluno B, por exemplo, usa `Horário: 9h às 19h` e o Aluno A usa `Horário: 8h às 20h`.
3. Os dois fazem commit, push e abrem um Pull Request para a `main`.
4. O Aluno B faz o merge do seu PR primeiro.
5. No PR do Aluno A, o GitHub vai mostrar o aviso **This branch has conflicts that must be resolved**. Clique em **Resolve conflicts**, edite o arquivo no navegador removendo os marcadores, clique em **Mark as resolved** e depois em **Commit merge**.
6. Faça o merge do PR.

---

## 5. Conflito 3: desistindo de um merge

Nem todo conflito precisa ser resolvido na hora. Se o merge começou e você percebeu que não é o momento certo, dá para voltar ao estado anterior.

1. Provoque um novo conflito, repetindo os passos da seção 3 com outra linha.
2. Quando aparecer a mensagem de conflito, rode:

```bash
git merge --abort
```

3. Confira com `git status` e abra o arquivo: o conteúdo voltou a ser o que era antes do merge, sem marcadores.

---

## 6. Perguntas para responder

1. Por que o Git não consegue resolver sozinho um conflito na mesma linha, mas consegue juntar alterações em linhas diferentes do mesmo arquivo?
2. O que significa cada um dos três marcadores de conflito?
3. O que acontece se você fizer `git add` e `git commit` sem apagar os marcadores? O código ainda funciona?
4. Qual hábito diminui a chance de conflitos no dia a dia? (Pense em quando atualizar a `main` e no tamanho das branches.)
5. Quando faz sentido usar `git merge --abort`?

---

## 7. Entrega

- Link do repositório `lionsdev-conflitos`.
- Print do terminal com a mensagem `CONFLICT (content)`.
- Print do arquivo com os marcadores de conflito no VS Code.
- Print da tela **Resolve conflicts** do GitHub.
- Respostas às perguntas da seção 6.

---

## 8. Critérios de aceite

- O histórico do repositório mostra os commits de merge que resolveram os conflitos.
- A versão final de `index.js` na `main` não contém nenhum marcador de conflito.
- Os dois integrantes resolveram pelo menos um conflito cada.
- A dupla sabe explicar o que causou cada conflito e como ele foi resolvido.

---

> **Dica:** antes de começar uma tarefa nova, atualize a `main` (`git pull origin main`) e crie a branch a partir dela. Branches pequenas e de vida curta geram menos conflitos. Quando um conflito aparecer, leia com calma os dois lados antes de apagar qualquer coisa: resolver um conflito é decidir qual código deve ficar, não só apagar marcadores.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Atividade Prática: Conflitos de Merge em Dupla - Módulo 04</i>
</div>
