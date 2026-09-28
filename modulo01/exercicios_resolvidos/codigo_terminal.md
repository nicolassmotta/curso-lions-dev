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

# Gabarito: Terminal e Primeiros Passos

**Lista:** `modulo01/lista_de_exercicios/codigo_terminal.md`  
**Uso:** material de referência para correção. Outras sequências de comandos que cheguem ao mesmo resultado também são válidas.

---

## Parte 0

```bash
pwd                      # 1. mostra o caminho da pasta atual
ls                       # 2. lista o conteúdo da pasta atual
mkdir projeto            # 3. cria a pasta
cd projeto               # 4. entra na pasta
touch index.js           # 5. cria o arquivo vazio
echo "Lions" > nota.txt  # 6. cria o arquivo já com o texto
cat nota.txt             # 7. imprime: Lions
cp nota.txt nota_backup.txt   # 8. copia
mv nota_backup.txt copia.txt  # 9. mv também serve para renomear
cd ..                    # 10. volta uma pasta
```

> No item 6, o `>` **sobrescreve** o arquivo. Para acrescentar uma linha no final sem apagar o que já existe, use `>>`.

---

## Parte 1

1. `mkdir src`
2. `cd src`
3. `touch app.js`
4. `cat app.js`
5. `node app.js`
6. `npm install prompt-sync` (ou a forma curta `npm i prompt-sync`)

---

## Parte 2

**1.** O terminal separa os argumentos por espaço, então `mkdir Nova Pasta` cria **duas** pastas: `Nova` e `Pasta`. Corrija com aspas ou com barra invertida:

```bash
mkdir "Nova Pasta"
# ou
mkdir Nova\ Pasta
```

**2.** `rm` sozinho não apaga pastas. Ele responde `rm: cannot remove 'lixo': Is a directory`. Falta a flag `-r` (recursivo), que apaga a pasta e tudo dentro dela:

```bash
rm -r lixo
```

> Cuidado: `rm` não manda nada para a lixeira. O que foi apagado não volta.

**3.** No Linux, o comando e o argumento precisam de espaço entre eles: `cd ..`. O `cd..` junto só funciona no `cmd` do Windows.

**4.** Os comandos do npm são em inglês: `npm init` (ou `npm init -y` para aceitar as respostas padrão e criar o `package.json` direto).

---

## Parte 3

Estado final:

```
loja/
├── produtos.js
└── dados/
    └── lista.json   (contém: [])
```

O último `ls` roda dentro de `loja` (o `cd ..` voltou de `dados` para `loja`) e mostra:

```
dados  produtos.js
```

---

## Parte 4

### Monte a estrutura

```bash
mkdir meu-app
cd meu-app
touch index.js
npm init -y
mkdir src
touch src/funcoes.js
mkdir src/dados
echo "ok" > src/dados/config.txt
```

> Também vale `mkdir -p src/dados`, que cria `src` e `dados` de uma vez. A flag `-p` cria as pastas intermediárias que faltarem.

Para conferir: `ls`, `ls src` e `cat src/dados/config.txt` (deve imprimir `ok`).

### Rode seu primeiro código

```bash
echo 'console.log("App no ar!");' > index.js
node index.js
# App no ar!
```

> O texto do `echo` usa aspas simples por fora porque o código JavaScript usa aspas duplas por dentro. Se preferir, abra o `index.js` no VS Code (`code index.js`) e escreva a linha lá.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Gabarito: Terminal e Primeiros Passos - Módulo 01</i>
</div>
