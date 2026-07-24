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

# Lista de Código: Terminal e Primeiros Passos

**Turma:** LionsDev  
**Tópicos:** navegação no terminal (`pwd`, `ls`, `cd`), manipulação de arquivos e pastas (`mkdir`, `touch`, `echo`, `cp`, `mv`, `rm`, `cat`) e execução de código com `node` e `npm`.

> Cada item é um comando pra você digitar no terminal e ver o que acontece. Faça um de cada vez. A ideia é ganhar fluência antes dos desafios em prosa.

---

## Parte 0 — Treino rápido (aquecimento)

Um comando por vez. Digite, veja o resultado e siga pro próximo.

1. Descubra em qual pasta você está agora (`pwd`).
2. Liste os arquivos da pasta atual (`ls`).
3. Crie uma pasta chamada `projeto`.
4. Entre na pasta `projeto` (`cd`).
5. Crie um arquivo vazio chamado `index.js` (`touch`).
6. Crie um arquivo `nota.txt` com o texto "Lions" dentro (`echo "Lions" > nota.txt`).
7. Mostre o conteúdo de `nota.txt` no terminal (`cat`).
8. Copie `nota.txt` para `nota_backup.txt` (`cp`).
9. Renomeie `nota_backup.txt` para `copia.txt` (`mv`).
10. Volte uma pasta acima (`cd ..`).

---

## Parte 1 — Complete o comando

Complete a lacuna para o comando fazer o que a descrição pede.

1. Criar a pasta `src`: `______ src`
2. Entrar na pasta `src`: `cd ______`
3. Criar o arquivo `app.js`: `touch ______`
4. Ver o conteúdo do arquivo `app.js`: `______ app.js`
5. Rodar o arquivo `app.js` com Node: `______ app.js`
6. Instalar o pacote `prompt-sync`: `npm ______ prompt-sync`

---

## Parte 2 — Ache o erro

Cada comando abaixo tem um problema. Explique e corrija.

1. Para criar a pasta `Nova Pasta` (com espaço): `mkdir Nova Pasta`. O que acontece de errado?
2. Para apagar a pasta `lixo` e tudo dentro dela: `rm lixo`. Por que falha? Qual flag falta?
3. Para entrar na pasta anterior o aluno digitou: `cd..`. O que corrigir?
4. Para iniciar um projeto Node ele digitou: `npm iniciar`. Qual o comando certo?

---

## Parte 3 — Prever o resultado

Sem rodar, descreva o estado final (o que existe e onde) depois desta sequência.

```bash
mkdir loja
cd loja
touch produtos.js
mkdir dados
cd dados
echo "[]" > lista.json
cd ..
ls
```

O que o último `ls` mostra?

---

## Parte 4 — Desafio de sequência

### Monte a estrutura
Usando apenas comandos de terminal, crie exatamente esta estrutura a partir de uma pasta vazia. Entregue a sequência de comandos usada.

```
meu-app/
├── index.js
├── package.json   (criado com: npm init -y)
└── src/
    ├── funcoes.js
    └── dados/
        └── config.txt   (contendo o texto "ok")
```

### Rode seu primeiro código
Dentro de `meu-app`, faça o arquivo `index.js` imprimir `"App no ar!"`. Depois rode ele com Node e confirme a saída no terminal.

---

> **Dica:** nome com espaço precisa de aspas (`"Nova Pasta"`) ou barra de escape. Para apagar pasta com conteúdo, use `rm -r`. E cuidado: o terminal diferencia maiúscula de minúscula, então `App.js` e `app.js` são arquivos diferentes.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Lista de Código: Terminal e Primeiros Passos - Módulo 01</i>
</div>
