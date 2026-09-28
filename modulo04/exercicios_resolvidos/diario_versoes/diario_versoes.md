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

# Gabarito: Diário de Versões

**Lista:** `modulo04/lista_de_exercicios/diario_versoes/diario_versoes.md`  
**Uso:** material de referência para correção. Os códigos dos commits (como `4900631`) mudam em cada máquina; o que importa é a ordem e o conteúdo dos commits.

---

## Sequência completa

```bash
# Preparação
mkdir lanchonete-lions
cd lanchonete-lions
git init
code cardapio.js              # cola o código do enunciado e salva
node cardapio.js
git add cardapio.js
git commit -m "Cria cardápio da lanchonete"

# Passo 1: .gitignore
mkdir node_modules
touch node_modules/pacote.js
echo "SENHA_BANCO=123456" > .env
git status
echo "node_modules" > .gitignore
echo ".env" >> .gitignore
git status
git add .gitignore
git commit -m "Adiciona .gitignore"

# Passo 2: ver a mudança antes de commitar
code cardapio.js              # preço 28 e item "Suco natural"
git diff
git add cardapio.js
git commit -m "Aumenta preço do X-Burger e adiciona suco natural"

# Passo 3: descartar edição errada
code cardapio.js              # apaga o for e salva
node cardapio.js              # não imprime nada
git restore cardapio.js
node cardapio.js              # voltou a funcionar

# Passo 4: tirar do stage
echo "anotação qualquer" > rascunho.txt
git add .
git status
git restore --staged rascunho.txt
git status
ls
rm rascunho.txt

# Passo 5: ler o histórico
git log --oneline
git show 4900631              # use o código do commit do passo 2

# Passo 6: desfazer um commit
code cardapio.js              # multiplica todos os preços por 10
git add cardapio.js
git commit -m "Atualiza preços"
node cardapio.js              # preços absurdos
git revert HEAD               # salva a mensagem pronta no editor
node cardapio.js              # preços normais de novo
git log --oneline
```

> No passo 1, o `>>` **acrescenta** uma linha ao arquivo; um segundo `>` apagaria o `node_modules` que já estava lá. Criar o `.gitignore` pelo VS Code também vale.

---

## Saídas esperadas

**Passo 1**, `git status --short` antes e depois do `.gitignore`:

```
?? .env
?? node_modules/
```

```
?? .gitignore
```

**Passo 2**, `git diff`:

```diff
@@ -1,7 +1,8 @@
 const cardapio = [
-  { item: "X-Burger", preco: 25 },
+  { item: "X-Burger", preco: 28 },
   { item: "Batata frita", preco: 15 },
   { item: "Refrigerante", preco: 8 },
+  { item: "Suco natural", preco: 10 },
 ];
```

**Passo 4**, `git status --short` antes e depois do `restore --staged`:

```
A  rascunho.txt
```

```
?? rascunho.txt
```

**Entrega**, `git log --oneline` final:

```
a323743 Revert "Atualiza preços"
d6b0ffc Atualiza preços
4900631 Aumenta preço do X-Burger e adiciona suco natural
32131c7 Adiciona .gitignore
3f60a95 Cria cardápio da lanchonete
```

Saída final de `node cardapio.js`:

```
X-Burger: R$ 28
Batata frita: R$ 15
Refrigerante: R$ 8
Suco natural: R$ 10
```

---

## Respostas da seção 4

**1.** Antes, o `git status` listava `.env` e `node_modules/` como arquivos não rastreados. Depois, os dois somem e só aparece o próprio `.gitignore`, que é um arquivo novo e precisa ser commitado.

**2.** O que vai para o Git fica no histórico para sempre, mesmo que o arquivo seja apagado depois. Repositórios privados podem virar públicos, ganhar novos colaboradores ou vazar. A senha deve morar só no ambiente (o `.env` local ou o painel do servidor).

**3.** Uma linha com `-` e duas com `+`. O Git compara linhas inteiras: ele não sabe que "só o número mudou", então mostra a linha antiga saindo (`- ... 25`) e a nova entrando (`+ ... 28`). A outra linha com `+` é o suco, que é uma linha nova.

**4.**

| Comando | O que faz | O arquivo muda? |
| ------- | --------- | --------------- |
| `git restore arquivo` | descarta as mudanças não commitadas e volta ao último commit | sim, o conteúdo volta ao que era |
| `git restore --staged arquivo` | tira o arquivo do stage (desfaz o `git add`) | não, as mudanças continuam na pasta |

**5.** Sim. O `git revert` não apaga commits: ele cria um commit **novo** com a mudança contrária. O histórico fica honesto ("errei aqui, corrigi aqui"), e ninguém que já tenha baixado o repositório perde nada.

**6.** A segunda. `ajustes` não diz o que mudou nem por quê, e obriga a abrir o `git show` para descobrir. Uma boa mensagem começa com um verbo e diz o que o commit faz. Assim o `git log --oneline` vira um resumo legível do projeto, e fica fácil achar qual commit reverter quando algo quebra.

---

## Erros comuns na correção

| Situação | Causa | Correção |
| -------- | ----- | -------- |
| `.env` aparece em um commit | o aluno rodou `git add .` antes de criar o `.gitignore` | `git rm --cached .env`, commitar e depois trocar a senha |
| terminal "travado" em tela preta no `revert` | o editor padrão é o Vim | digitar `:wq` e Enter, ou usar `git revert HEAD --no-edit` |
| `git restore` "não fez nada" | a mudança já tinha sido commitada | para mudança commitada, usar `git revert` |
| 4 commits no log em vez de 5 | o revert foi feito com `git reset` ou o erro não foi commitado | refazer o passo 6 com commit e `git revert HEAD` |

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Gabarito: Diário de Versões - Módulo 04</i>
</div>
