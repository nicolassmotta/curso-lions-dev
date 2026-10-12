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

# Guia rápido · Módulo 04: Git e GitHub

<div class="intro">Resumo para consulta rápida. A explicação completa está nos slides e nos arquivos desta pasta.</div>

<div class="cols">

## Primeira configuração (uma vez por computador)
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"   # o mesmo da conta do GitHub
git config --global init.defaultBranch main      # todo repositório nasce com main
git config --global pull.rebase false            # git pull junta com merge
git config --global core.editor "code --wait"    # opcional: mensagens no VS Code
git config --list                                # confere tudo
# rede com proxy (laboratório): uma linha só, vale para https:// também
git config --global http.proxy http://usuario:senha@IP:PORTA   # senha com @ ou #? use %40 e %23
```

## Repositório local
```bash
git init                         # começa a versionar a pasta (uma vez, na pasta certa)
git status                       # o que mudou e em que branch você está
git diff                         # as linhas que mudaram (fora do palco)
git add arquivo.js               # põe um arquivo no "palco"
git add .                        # põe tudo no palco
git commit -m "cria menu da calculadora"
git log --oneline --graph        # histórico resumido (q para sair)
git show a1b2c3d                 # o que um commit mudou
```

## Repositório remoto (GitHub)
```bash
git remote add origin https://github.com/usuario/projeto.git
git remote -v                    # para onde o origin aponta
git remote set-url origin URL    # corrige a URL ("remote origin already exists")
git branch -M main
git push -u origin main          # primeira vez
git push                         # das próximas vezes
git pull                         # = git fetch + git merge
git clone https://github.com/usuario/projeto.git   # baixa um repositório inteiro
```
> O GitHub **não aceita a senha** no terminal: use um **Personal Access Token** (Settings > Developer settings > Tokens (classic), com o escopo **repo**). Ao colar, nada aparece na tela; no Ubuntu, colar é `Ctrl+Shift+V`.

## Branches e Pull Request
```bash
git branch                    # lista
git checkout -b raiz-quadrada # cria e muda (ou: git switch -c raiz-quadrada)
git checkout main             # volta (ou: git switch main)
git merge raiz-quadrada       # traz a branch para a atual
git branch -d raiz-quadrada   # apaga se já foi mesclada
git branch -D raiz-quadrada   # força a exclusão
git push origin --delete raiz-quadrada   # apaga a branch no GitHub
```
> No Pull Request: base `main` ← compare `sua-branch`. Para pedir revisão, o colega precisa ser colaborador (**Settings > Collaborators**) e aceitar o convite.

## Conflito
```
<<<<<<< HEAD
console.log("versão da branch onde você está")
=======
console.log("versão que está chegando")
>>>>>>> raiz-quadrada
```
```bash
git status                    # lista os arquivos em "both modified"
git add arquivo.js            # depois de escolher o código e apagar as marcações
git commit -m "resolve conflito"
git merge --abort             # desiste e volta a como estava antes do merge
```
No VS Code: **Current** mantém HEAD, **Incoming** aceita a mudança que chega, **Both** mantém ambas. No `git pull`, o marcador final usa um hash.

Conflito no Pull Request? Na **sua branch**: `git pull origin main`, resolva, `git add .`, `git commit` e `git push`. O PR se atualiza sozinho.

## Stash: guardar o trabalho pela metade
```bash
git stash          # guarda as mudanças não commitadas e limpa a pasta
git stash -u       # guarda também os arquivos novos (untracked)
git stash list     # o que está guardado (stash@{0} é o mais recente)
git stash pop      # devolve o último e tira da lista
```

## Desfazendo
| Situação | Comando |
|---|---|
| Descartar mudança no arquivo (não volta!) | `git restore arquivo.js` |
| Tirar do palco (mantém a mudança) | `git restore --staged arquivo.js` |
| Corrigir a mensagem do último commit | `git commit --amend -m "nova msg"` |
| Desfazer o último commit, mantendo as mudanças | `git reset --soft HEAD~1` |
| Desfazer um commit já enviado | `git revert a1b2c3d` |

> `--amend` e `reset` só antes do push. Push rejeitado depois deles? **Não** use `git push --force`.

## Fluxo do dia a dia
```bash
git checkout main && git pull       # 1. comece com a main atualizada
git checkout -b minha-tarefa        # 2. uma branch por tarefa
git add . && git commit -m "..."    # 3. commits pequenos
git push -u origin minha-tarefa     # 4. envia e abre o Pull Request
git checkout main && git pull       # 5. depois do merge, atualiza a main
git branch -d minha-tarefa          # 6. apaga a branch
```

## .gitignore e README
```
node_modules/
.env
```
O **README.md** explica o projeto: o que é, como instalar, como rodar e quem fez. Comandos vão dentro de um bloco com três crases, senão o GitHub junta as linhas.

## Boas mensagens de commit
✔ `trata divisão por zero` · `adiciona README`
✘ `update` · `arrumei` · `asdf`

## Armadilhas
- `git init` na pasta errada (na home inteira!) ou dentro de outro repositório. Confira com `pwd`.
- `src refspec main does not match any`: a branch se chama `master`. Rode `git branch -M main`.
- `push` rejeitado (`fetch first`): alguém enviou antes. Faça `git pull`, resolva e envie de novo.
- O terminal abriu um editor? **nano**: `Ctrl+O`, `Enter`, `Ctrl+X`. **vim**: `Esc`, `:wq`, `Enter`.
- Mexeu na `main` sem criar a branch? `git switch -c nova-branch` leva as mudanças junto.
- Commitou `node_modules`? Tire do Git com `git rm -r --cached node_modules` e adicione ao `.gitignore`. Commitou `.env`? **Troque as senhas**: apagar o arquivo não apaga o histórico.

</div>
<div class="rodape">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Guia rápido · Módulo 04</i>
</div>
