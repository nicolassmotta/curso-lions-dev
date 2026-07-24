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

# Lista de Código: Git e Versionamento

**Turma:** LionsDev  
**Tópicos:** `git init`, `git status`, `git add`, `git commit`, branches (`git branch`, `git checkout`), `git merge` e repositório remoto (`git remote add`, `git push`).

> Cada item é um comando Git pra rodar de verdade. Crie uma pasta de teste, dê `git init` e pratique ali, porque versionamento se aprende usando. Veja o efeito de cada comando antes de ir pro próximo.

---

## Parte 0 — Treino rápido (aquecimento)

Rode num repositório de teste. Um comando, um efeito, siga.

1. Inicie o versionamento na pasta atual (`git init`).
2. Veja o estado atual dos arquivos (`git status`).
3. Adicione o arquivo `index.js` para a área de stage (`git add`).
4. Adicione todos os arquivos de uma vez (`git add .`).
5. Faça um commit com a mensagem "primeiro commit" (`git commit -m`).
6. Veja o histórico de commits (`git log`).
7. Crie uma branch chamada `feature-login` (`git branch`).
8. Troque para a branch `feature-login` (`git checkout`).
9. Crie e já troque para a branch `feature-cadastro` num comando só (`git checkout -b`).
10. Volte para a branch `main` (`git checkout main`).

---

## Parte 1 — Complete o comando

Complete a lacuna.

1. Salvar as mudanças com mensagem: `git commit ____ "ajuste no menu"`
2. Criar e entrar numa branch nova: `git checkout ____ nova-tela`
3. Juntar a branch `feature-login` na `main` (estando na `main`): `git ____ feature-login`
4. Conectar seu repositório ao remoto: `git remote add origin ____`
5. Enviar a branch `main` para o remoto pela primeira vez: `git push ____ origin main`

---

## Parte 2 — Ache o erro

Cada situação tem um problema. Explique o que fazer.

1. O aluno editou 3 arquivos e rodou `git commit -m "mudanças"` direto. Por que nada foi commitado? O que faltou?
2. Ele quis criar uma branch mas digitou `git branch` sozinho, sem nome. O que acontece?
3. Ele fez commit na branch errada (`main` em vez de `feature`). Sem apagar nada, qual comando o leva para a branch certa antes de continuar?
4. `git push` deu erro de "no upstream branch". Qual flag resolve no primeiro push?

---

## Parte 3 — Prever o resultado

Sem rodar, responda em que branch você termina e o que o `git status` mostraria.

```bash
git init
git checkout -b desenvolvimento
touch novo.js
git add novo.js
git commit -m "add novo.js"
git checkout main
```

Depois deste `git checkout main`, o arquivo `novo.js` aparece na pasta? Por quê?

---

## Parte 4 — Desafio de fluxo

### Fluxo completo de uma feature
Descreva (e execute) a sequência de comandos para o cenário abaixo, do início ao fim:

1. Iniciar um repositório numa pasta nova.
2. Criar um `README.md` e fazer o primeiro commit na `main`.
3. Criar a branch `feature-contato` e trocar para ela.
4. Criar o arquivo `contato.js`, adicionar e commitar.
5. Voltar para a `main` e fazer o merge da `feature-contato`.
6. Conectar a um repositório remoto no GitHub e dar push da `main`.

Entregue a lista de comandos, em ordem.

---

> **Dica:** o ciclo básico é sempre modificar, `git add`, `git commit`. O `git add` decide o que entra no próximo commit; sem ele, o commit não enxerga suas mudanças. Rode `git status` o tempo todo, ele te diz em que pé você está.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Lista de Código: Git e Versionamento - Módulo 04</i>
</div>
