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

# Atividade Prática - Frontend com IA

## Objetivo

Criar uma tela funcional para consumir uma rota do backend usando uma ferramenta de Inteligência Artificial. A atividade pode ser feita com IA via web, IA via terminal/editor ou uma plataforma visual.

O foco é integração. A tela precisa chamar uma rota real, enviar os dados corretos e mostrar sucesso ou erro.

## 1. Escolha da rota

Escolha uma rota `POST` do seu backend.

Exemplos:

```txt
POST /api/tarefas
POST /api/agendamentos
POST /api/produtos
POST /api/auth/login
```

Preencha antes de gerar o frontend:

```txt
Nome do projeto:
URL base:
Rota escolhida:
Método HTTP:
Campos do body:
Resposta de sucesso:
Resposta de erro:
A rota precisa de token? Sim/Não
```

## 2. Monte o prompt

Use este modelo e adapte com as informações reais da sua API:

```txt
Você é um desenvolvedor frontend e vai criar uma interface para consumir minha API.

1. Contexto do projeto:
[Explique o sistema em 2 a 5 linhas]

2. Stack desejada:
React + Vite, CSS puro e fetch.

3. Rota disponível:
Método:
Endpoint:
Body JSON:
Resposta de sucesso:
Resposta de erro:

4. Tela necessária:
[Descreva os campos, botões e mensagens]

5. Regras de interface:
- Validar campos obrigatórios.
- Mostrar loading enquanto envia.
- Mostrar mensagem de sucesso.
- Mostrar mensagem de erro.
- Manter visual simples e responsivo.

6. Organização:
- Criar service separado para chamadas HTTP.
- Separar componentes quando fizer sentido.

7. Restrições:
- Não inventar rotas.
- Não mudar nomes dos campos.
- Não usar bibliotecas além das pedidas.

Entregue:
- Estrutura de pastas.
- Código completo dos arquivos.
- Comandos para rodar.
- Explicação curta de como testar.
```

## 3. Crie e execute

Siga o fluxo:

1. Gere o frontend com a IA.
2. Copie ou aceite os arquivos no projeto.
3. Rode `npm install`, se necessário.
4. Rode o frontend.
5. Suba o backend.
6. Teste o formulário.
7. Abra o DevTools do navegador e confira a aba Network/Rede.

## 4. Correção de erros

Se der erro, registre:

```txt
Erro exibido:
Arquivo afetado:
O que eu esperava:
O que aconteceu:
Como foi corrigido:
```

Peça correção para a IA usando o erro completo, não apenas "não funcionou".

## 5. Entrega

Entregue:

- Print da tela funcionando.
- Prompt principal usado.
- Link ou pasta do frontend.
- Rota consumida.
- Print do request na aba Network/Rede ou do teste no Postman.
- Lista curta dos erros encontrados e como foram resolvidos.

## 6. Critérios de aceite

- O frontend roda sem erro no navegador.
- A tela possui campos compatíveis com o body da rota.
- A requisição é enviada para a URL correta.
- O frontend mostra mensagem de sucesso quando a API responde corretamente.
- O frontend mostra mensagem de erro quando a API retorna erro.
- O aluno sabe explicar qual rota está sendo chamada e quais dados estão sendo enviados.

---

<div style="text-align: center; color: #6B7280; font-size: 13px; margin-top: 50px;">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Atividade Prática: Frontend com IA - Módulo 11</i>
</div>
