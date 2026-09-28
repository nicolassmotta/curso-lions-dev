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

# Gabarito: Organizando o Projeto da Loja Lions

**Lista:** `modulo01/lista_de_exercicios/organizando_projeto.md`  
**Uso:** material de referência para correção. Outras sequências de comandos que cheguem à mesma estrutura final também são válidas.

---

## Sequência completa

```bash
# Passo 1: reconhecer o terreno
pwd
ls

# Passo 2: criar a estrutura
mkdir src docs imagens

# Passo 3: mover todas as imagens com o curinga
mv *.png imagens/

# Passo 4: organizar código e documentos
mv index.js calculo.js src/
mv anotacoes.txt docs/
mv "lista de compras.txt" docs/lista_compras.txt

# Passo 5: limpar
ls *.tmp          # confere antes de apagar
rm *.tmp
rm -r antigo
mv "pasta nova" config

# Passo 6: transformar em projeto Node
npm init -y
npm install prompt-sync
ls
cat package.json

# Passo 7: rodar
node src/index.js
code package.json   # adicionar o script "start" (veja abaixo)
npm start

# Passo 8: conferir
cd ..
ls -R loja-lions
```

---

## Comentários por passo

**Passo 3.** O terminal troca `*.png` pela lista `banner.png foto-produto.png logo.png` antes de rodar o `mv`. Para o `mv`, é como se o aluno tivesse digitado os três nomes.

**Passo 4.3.** O `mv` move e renomeia ao mesmo tempo quando o destino inclui um nome de arquivo (`docs/lista_compras.txt`). As aspas são obrigatórias por causa dos espaços no nome original. Também vale `mv lista\ de\ compras.txt docs/lista_compras.txt`.

**Passo 5.** `rm *.tmp` apaga os dois temporários. `rm antigo` sem `-r` falharia com `Is a directory`. Renomear uma pasta usa o mesmo `mv` de renomear arquivo.

**Passo 6.3.**

- `node_modules/`: pasta onde o npm baixa o código dos pacotes instalados (o `prompt-sync` e as dependências dele). Ela não vai para o Git: qualquer pessoa recria a pasta com `npm install`.
- `package-lock.json`: registra a versão **exata** de cada pacote instalado. Garante que quem rodar `npm install` depois receba as mesmas versões. É gerado automaticamente e não se edita à mão.

**Passo 6.4.** O `prompt-sync` aparece no `package.json` dentro de `"dependencies"`:

```json
"dependencies": {
  "prompt-sync": "^4.2.0"
}
```

**Passo 7.2.** Trecho do `package.json` depois da edição:

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "node src/index.js"
}
```

> Não esqueça a vírgula no fim da linha do `"test"`: sem ela, o JSON fica inválido e o `npm start` falha com `EJSONPARSE`. Pelo terminal, `npm pkg set scripts.start="node src/index.js"` faz a mesma edição sem abrir o arquivo.

Saída do `npm start`:

```
> loja-lions@1.0.0 start
> node src/index.js

Loja Lions no ar!
```

**Passo 8.** Saída do `ls -R loja-lions` (sem o conteúdo do `node_modules`):

```
loja-lions:
config  docs  imagens  node_modules  package.json  package-lock.json  src

loja-lions/config:

loja-lions/docs:
anotacoes.txt  lista_compras.txt

loja-lions/imagens:
banner.png  foto-produto.png  logo.png

loja-lions/src:
calculo.js  index.js
```

---

## Erros comuns na correção

| Erro | O que acontece | Correção |
| ---- | -------------- | -------- |
| `mv lista de compras.txt docs/` | o terminal entende três arquivos: `lista`, `de` e `compras.txt` | usar aspas no nome |
| `rm antigo` | `rm: cannot remove 'antigo': Is a directory` | `rm -r antigo` |
| rodar `npm install` fora da pasta `loja-lions` | o npm cria `node_modules` e `package.json` no lugar errado | conferir com `pwd` antes |
| `node index.js` depois do passo 4 | `Cannot find module` | o arquivo agora está em `src/index.js` |

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Gabarito: Organizando o Projeto da Loja Lions - Módulo 01</i>
</div>
