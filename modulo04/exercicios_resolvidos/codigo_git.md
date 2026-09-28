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

# Gabarito: Git e Versionamento

**Lista:** `modulo04/lista_de_exercicios/codigo_git.md`  
**Uso:** material de referência para correção. Outras sequências de comandos que cheguem ao mesmo resultado também são válidas.

---

## Parte 0

```bash
git init                         # 1. cria o repositório (pasta oculta .git)
git status                       # 2. mostra branch atual e estado dos arquivos
touch index.js
git add index.js                 # 3. coloca o index.js na área de stage
touch a.js b.js
git add .                        # 4. adiciona tudo que mudou na pasta atual
git commit -m "primeiro commit"  # 5. salva o que está no stage
git log                          # 6. histórico (use git log --oneline para ver resumido)
git branch feature-login         # 7. cria a branch, mas continua na atual
git checkout feature-login       # 8. troca de branch
git checkout -b feature-cadastro # 9. cria e troca em um comando só
git checkout main                # 10. volta para a main
```

> Nas versões novas do Git, `git switch feature-login` e `git switch -c feature-cadastro` fazem o mesmo que o `checkout` nos itens 8 e 9. Os dois jeitos funcionam.

---

## Parte 1

1. `git commit -m "ajuste no menu"`
2. `git checkout -b nova-tela`
3. `git merge feature-login`
4. `git remote add origin https://github.com/usuario/repositorio.git` (a URL copiada do repositório no GitHub)
5. `git push -u origin main`

> No item 5, o `-u` (ou `--set-upstream`) liga a `main` local à `main` do remoto. Depois disso, basta digitar `git push` e `git pull`.

---

## Parte 2

**1.** Faltou o `git add`. O commit só salva o que está na área de stage, e os 3 arquivos editados ainda não estavam lá. O Git responde algo como `no changes added to commit`.

```bash
git add .
git commit -m "mudanças"
```

**2.** Nada é criado. `git branch` sem nome apenas **lista** as branches existentes e marca a atual com `*`. Para criar, é preciso informar o nome: `git branch nome-da-branch`.

**3.** `git checkout -b feature` (ou `git switch -c feature`). As mudanças que ainda não foram commitadas não pertencem a nenhuma branch: elas estão na pasta de trabalho e acompanham você na troca. Depois é só commitar na `feature`:

```bash
git checkout -b feature
git add .
git commit -m "trabalho na branch certa"
```

**4.** O Git não sabe para qual branch do remoto enviar, porque a branch local ainda não está ligada a nenhuma. No primeiro push, use `-u`:

```bash
git push -u origin main
```

---

## Parte 3

Você termina na branch **`main`**, e o `git status` mostra que não há nada para commitar:

```
On branch main
nothing to commit, working tree clean
```

O arquivo `novo.js` **não aparece** na pasta. Ele só foi commitado na branch `desenvolvimento`. Ao trocar para a `main`, o Git deixa a pasta exatamente como a `main` está, e a `main` nunca recebeu esse commit. O arquivo não foi apagado: ao voltar para `desenvolvimento` (`git checkout desenvolvimento`), ele reaparece.

---

## Parte 4

### Fluxo completo de uma feature

```bash
# 1. repositório novo
mkdir projeto-contato
cd projeto-contato
git init

# 2. primeiro commit na main
echo "# Projeto Contato" > README.md
git add README.md
git commit -m "primeiro commit"

# 3. branch da feature
git checkout -b feature-contato

# 4. trabalho na feature
touch contato.js
git add contato.js
git commit -m "adiciona contato.js"

# 5. merge na main
git checkout main
git merge feature-contato

# 6. enviar para o GitHub (crie antes um repositório VAZIO, sem README)
git remote add origin https://github.com/usuario/projeto-contato.git
git push -u origin main
```

> No passo 6, crie o repositório no GitHub **sem** marcar "Add a README file". Se o remoto já tiver um commit que o seu repositório local não tem, o primeiro `push` é recusado.
>
> Para conferir o resultado: `git log --oneline` mostra os dois commits na `main`, e a página do repositório no GitHub mostra o `README.md` e o `contato.js`.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Gabarito: Git e Versionamento - Módulo 04</i>
</div>
