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

# Cheat sheet · Módulo 04: Git e GitHub

<div class="intro">Resumo para consulta rápida. A explicação completa está nos slides e nos arquivos desta pasta.</div>

<div class="cols">

## Primeira configuração
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
git config --list
# rede com proxy (laboratório):
git config --global http.proxy http://usuario:senha@IP:PORTA
git config --global https.proxy http://usuario:senha@IP:PORTA
```

## Repositório local
```bash
git init                         # começa a versionar a pasta
git status                       # o que mudou
git add .                        # põe tudo no "palco"
git commit -m "cria menu da calculadora"
git log --oneline                # histórico resumido
git diff                         # o que mudou (fora do palco)
```

## Repositório remoto (GitHub)
```bash
git remote add origin https://github.com/usuario/projeto.git
git branch -M main
git push -u origin main   # primeira vez
git push                  # das próximas vezes
git pull                  # traz as mudanças do remoto
git clone URL             # baixa um repositório inteiro
```
> O GitHub **não aceita senha** no terminal: use um **token** (Personal Access Token) no lugar dela.
> `master` e `main` são só nomes de branch; o GitHub usa `main` como padrão.

## Branches e Pull Request
```bash
git branch                    # lista
git checkout -b raiz-quadrada # cria e muda
git checkout main             # volta
git merge raiz-quadrada       # traz a branch para a atual
git branch -d raiz-quadrada   # apaga (já mesclada)
```
Fluxo: **branch** → commits → `git push -u origin raiz-quadrada` → **Pull Request** no GitHub → revisão → **merge** na `main` → `git pull` na sua máquina.

## Conflito
```
<<<<<<< HEAD
console.log("versão da main")
=======
console.log("versão da branch")
>>>>>>> raiz-quadrada
```
Escolha o que fica, apague os marcadores, depois `git add .` e `git commit`.

## Desfazendo
| Situação | Comando |
|---|---|
| Descartar mudança no arquivo | `git restore arquivo.js` |
| Tirar do palco (mantém a mudança) | `git restore --staged arquivo.js` |
| Corrigir a mensagem do último commit | `git commit --amend -m "nova msg"` |
| Desfazer um commit já enviado | `git revert a1b2c3d` |

## .gitignore e README
```
node_modules/
.env
```
O **README.md** explica o projeto: o que é, como instalar, como rodar e quem fez.

## Boas mensagens de commit
✔ `trata divisão por zero` · `adiciona README`
✘ `update` · `arrumei` · `asdf`

## Armadilhas
- `git init` na pasta errada (na home inteira!). Confira com `pwd`.
- Commitou `node_modules`? Adicione ao `.gitignore` e `git rm -r --cached node_modules`.
- Commitou o `.env`? **Troque as senhas e chaves**: apagar o arquivo não apaga o histórico.
- `push` rejeitado: alguém enviou antes. Faça `git pull`, resolva e envie de novo.

</div>

<div class="rodape">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Cheat sheet · Módulo 04</i>
</div>
