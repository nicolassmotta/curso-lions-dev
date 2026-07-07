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
