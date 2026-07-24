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

# Desafio: Comandos Básicos no Terminal - Explorando o Espaço 🚀

**Turma:** LionsDev  
**Tópicos:** Terminal Linux, Navegação de Diretórios, Manipulação de Arquivos e Pastas (`mkdir`, `cd`, `rm`, `cp`, `echo`).

---

### Objetivo

Representar uma **estação espacial fictícia** através de diretórios usando comandos Linux básicos, onde cada cômodo será um caminho no sistema de arquivos.

---

### 1. Criar a Estação

Crie um diretório principal chamado `EstacaoEspacial`. Este será a raiz de toda a estrutura da estação.

### 2. Construir os Módulos

Dentro de `EstacaoEspacial`, crie diretórios para as diferentes seções da estação espacial:
- `Habitacao`
- `Laboratorio`
- `Hangar`

### 3. Quartos da Habitação

Dentro de `Habitacao`, crie quartos numerados: `Quarto1`, `Quarto2` e `Quarto3`.

### 4. Áreas de Pesquisa

Dentro de `Laboratorio`, crie duas áreas de pesquisa chamadas `Pesquisa1` e `Pesquisa2`.

### 5. Baias do Hangar

Dentro de `Hangar`, crie espaços para três naves espaciais: `Nave1`, `Nave2` e `Nave3`.

### 6. Descomissionar o Hangar

Remova o diretório `Hangar` e todo o seu conteúdo da estação espacial.

### 7. Mensagem de Boas-Vindas

Dentro da raiz de `EstacaoEspacial`, crie um arquivo chamado `BoasVindas.txt` contendo a mensagem: **"Bem-vindos à Estação Espacial!"**.

### 8. Distribuir a Mensagem

Faça uma cópia do arquivo `BoasVindas.txt` para dentro do diretório `Laboratorio`.

### 9. Personalizar a Mensagem (BÔNUS)

Altere o conteúdo do arquivo `BoasVindas.txt` que está dentro de `Laboratorio` para: **"Bem-vindos à Estação Espacial! Este é o laboratório!"**.

---

> **Dica:** Execute os comandos na ordem apresentada e lembre-se de navegar entre os diretórios corretos antes de executar cada comando. Se cometer algum erro, utilize os comandos necessários para corrigi-lo antes de prosseguir.

---

### Entregáveis

Apresente a sequência completa de comandos de terminal Linux utilizados para criar a estação espacial, seus módulos, quartos, áreas de pesquisa, hangar e realizar todas as movimentações e manipulações solicitadas. Certifique-se de que os diretórios e arquivos estão organizados conforme as instruções fornecidas.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Desafio Prático de Terminal Linux - Módulo 01</i>
</div>
