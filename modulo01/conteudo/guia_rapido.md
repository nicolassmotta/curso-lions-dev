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

# Guia rápido · Módulo 01: Introdução à Programação e Ambiente

<div class="intro">Resumo para consulta rápida. A explicação completa está nos slides e nos arquivos desta pasta.</div>

<div class="cols">

## Instalar o Node.js (Ubuntu)
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
node -v     # versão do Node
npm -v      # versão do npm
```
> Use sempre a versão **LTS**. Em outubro de 2026 a LTS passa da 24 para a 26.

## Terminal
| Comando | O que faz |
|---|---|
| `pwd` | mostra a pasta atual |
| `ls` / `ls -la` | lista (com ocultos e detalhes) |
| `cd pasta` / `cd ..` / `cd ~` | entra / volta uma / vai para a home |
| `mkdir nome` | cria pasta (`mkdir "Minha Pasta"` com aspas) |
| `touch app.js` | cria arquivo vazio |
| `cat arquivo.txt` | mostra o conteúdo |
| `rm arquivo` / `rm -r pasta` | apaga (sem lixeira!) |
| `clear` | limpa a tela |

**Tab** completa nomes · **↑** repete comandos · **Ctrl+C** interrompe o programa.

## npm e package.json
```bash
npm init -y              # cria o package.json
npm install prompt-sync  # instala e registra em dependencies
npm uninstall pacote     # remove
npm install              # reinstala tudo do package.json
npm start                # roda o script "start"
npm run dev              # roda qualquer outro script
```
- `node_modules/`: os pacotes baixados. **Nunca** vai para o Git.
- `package.json`: nome, versão, `scripts` e `dependencies` do projeto.

## Rodando JavaScript
```bash
node app.js    # executa o arquivo
node           # abre o REPL (teste rápido); sai com .exit
```

## VS Code
| Atalho | Ação |
|---|---|
| `Ctrl+S` | salvar (o Node roda o arquivo **salvo**) |
| `Ctrl+`` ` | abrir/fechar o terminal integrado |
| `Ctrl+Shift+P` | paleta de comandos |
| `Ctrl+B` | mostrar/esconder a barra lateral |
| `Ctrl+Shift+X` | extensões |
| `Ctrl+/` | comentar a linha |
| `Alt+↑` / `Alt+↓` | mover a linha |
| `Ctrl+W` | fechar a aba |

## Como a web funciona
**Cliente** (navegador, app) faz uma **requisição** → **servidor** processa → devolve uma **resposta**. O frontend é o que o usuário vê; o backend guarda os dados e as regras. Neste curso, o backend é feito com **Node.js**.

## Armadilhas
- **Cannot find module**: o terminal está na pasta errada ou o nome do arquivo está diferente. Confira com `pwd` e `ls`.
- `mkdir Minha Pasta` cria **duas** pastas. Use aspas ou evite espaços.
- Arquivo não salvo = código antigo rodando.
- `npm install` fora da pasta do projeto cria `node_modules` no lugar errado.

</div>

<div class="rodape">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Guia rápido · Módulo 01</i>
</div>
