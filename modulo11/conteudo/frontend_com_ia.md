# Guia Prático - Frontend com Inteligência Artificial

## 1. Contexto

Como o foco principal do curso foi backend, usaremos Inteligência Artificial para acelerar a criação de uma primeira versão do frontend. A IA pode gerar telas, componentes, services, estilos e ajudar a corrigir erros, mas o aluno continua responsável por entender as rotas, testar as requisições e ajustar o código ao backend criado em aula.

O frontend representa a parte visual: telas, botões, formulários e mensagens. O backend recebe requests, aplica regras de negócio, conversa com o banco de dados e devolve responses. O frontend criado com IA precisa respeitar essa lógica.

## 2. Antes de pedir qualquer tela

Tenha estas informações do backend:

- URL base, por exemplo `http://localhost:3000`.
- Rotas disponíveis, como `POST /api/auth/login` ou `GET /api/tarefas`.
- Método HTTP de cada rota: `GET`, `POST`, `PUT`, `PATCH` ou `DELETE`.
- Campos enviados no body.
- Exemplo de resposta de sucesso e de erro.
- Rotas que exigem token JWT.
- Tecnologia desejada para o frontend, por exemplo React com Vite.

> A IA não adivinha corretamente o seu projeto. Ela precisa receber contexto: rotas, métodos HTTP, exemplos de body, respostas esperadas, validações e estilo visual desejado.

## 3. Do backend para o frontend

| Conceito | Como aparece no frontend |
| -------- | ------------------------ |
| Cliente-servidor | O navegador é o cliente. Ele envia requests para o servidor Express. |
| HTTP | O frontend usa `fetch` ou `axios` para enviar `GET`, `POST`, `PUT`, `PATCH` e `DELETE`. |
| API REST | Cada tela ou formulário consome endpoints específicos da API. |
| Body | Os campos digitados no formulário são enviados em JSON. |
| Status code | O frontend mostra sucesso, erro de validação, não autorizado ou não encontrado. |
| JWT | Quando houver login, o token precisa ser salvo e enviado no header `Authorization`. |

## 4. Três formas de usar IA para criar frontend

| Método | Como funciona | Melhor uso | Exemplos |
| ------ | ------------- | ---------- | -------- |
| IA via web | Você cola as rotas em um chat e pede o código. | Primeiro contato, exercícios pequenos e geração de arquivos separados. | ChatGPT, Claude, Gemini, DeepSeek, Qwen, Mistral. |
| IA via terminal/editor | Um agente trabalha dentro da pasta do projeto, lê arquivos e edita código. | Projetos maiores, ajustes em código existente e correção de erros. | Codex CLI, Claude Code, Gemini CLI, Aider, Cursor, Windsurf. |
| Plataformas visuais | Você descreve a aplicação e a plataforma gera telas/componentes. | Protótipos rápidos, dashboards e MVPs. | FlutterFlow, Lovable, v0, Bolt.new, Replit Agent. |

Regra prática: se você ainda não tem projeto frontend, comece pela IA via web ou por uma plataforma visual. Se você já tem uma pasta React criada e quer alterar arquivos reais, use terminal ou editor com agente.

## 5. Método 1 - IA via web

Nesse método, você usa a IA pelo navegador. A vantagem é a simplicidade; a desvantagem é que você precisa copiar os arquivos gerados para a pasta correta.

Passo a passo:

1. Abra a IA escolhida no navegador.
2. Explique que o backend já existe e que o frontend deve apenas consumir as rotas.
3. Informe a tecnologia desejada.
4. Cole as rotas da API com método, endpoint, body e resposta esperada.
5. Peça separação por responsabilidade: `services`, `components`, `pages` e estilos.
6. Copie os arquivos para o projeto.
7. Instale dependências, execute e teste cada formulário.

Prompt base:

```txt
Você é um desenvolvedor frontend sênior e precisa me ajudar a criar um frontend em React com Vite.

Contexto:
- Eu já tenho um backend em Node.js + Express.
- O curso não irá aprofundar uma linguagem frontend agora, então preciso de um frontend simples, funcional e didático.
- O frontend deve consumir exatamente as rotas abaixo, sem inventar endpoints.
- Separe os arquivos para eu copiar no meu projeto.

Tecnologias desejadas:
- React + Vite
- CSS puro
- fetch para as requisições

Rotas da API:
1) POST http://localhost:3000/api/agendamentos
Body JSON:
{
  "nomePet": "Rex",
  "especie": "Cachorro",
  "nomeDono": "Nicolas",
  "telefoneDono": "42999999999",
  "servico": "Banho",
  "data": "2026-06-28"
}

Resposta de sucesso:
{
  "mensagem": "Agendamento criado com sucesso!",
  "agendamento": { ... }
}

O que eu quero que você gere:
- Estrutura de pastas.
- Código completo de cada arquivo.
- Um formulário para cadastro de agendamento.
- Mensagem de sucesso e mensagem de erro.
- Validação simples para campos obrigatórios.
- Estilização simples e organizada.
- Instruções para rodar com npm install e npm run dev.
```

## 6. Como pedir correção

Quando o código gerado não funcionar, não mande apenas "deu erro". A IA precisa ver o erro, o arquivo e o comportamento esperado.

```txt
O frontend gerado apresentou erro.

Erro exibido no terminal ou navegador:
[cole aqui o erro completo]

Arquivo onde parece estar o problema:
[cole o arquivo ou trecho relevante]

Comportamento esperado:
Ao clicar em cadastrar, o formulário deve enviar POST para
http://localhost:3000/api/agendamentos e exibir a mensagem retornada pela API.

Corrija o problema, explique a causa e me devolva apenas os arquivos que precisam ser alterados.
```

Ponto importante: a IA pode inventar nomes de campos. Sempre compare o body enviado pelo frontend com o body esperado pelo controller/service da API.

## 7. Método 2 - IA via terminal ou editor

No método via terminal/editor, a IA funciona como um agente dentro da pasta do projeto. Ela pode ler arquivos locais, sugerir alterações, criar componentes, instalar dependências e executar comandos, dependendo da ferramenta.

Use esse método quando:

- O projeto já existe e a IA precisa respeitar a estrutura atual.
- Há muitos arquivos e copiar tudo manualmente seria ruim.
- O erro depende de vários arquivos ao mesmo tempo.
- Você quer criar services, componentes e estilos diretamente na pasta do projeto.
- É necessário rodar comandos como `npm install`, `npm run dev` ou `npm run build`.

Fluxo recomendado:

1. Abra o terminal na pasta do projeto frontend.
2. Faça backup ou commit antes de alterações grandes.
3. Abra a ferramenta escolhida.
4. Explique a tarefa com precisão.
5. Peça um plano antes das edições.
6. Revise os arquivos alterados.
7. Rode o projeto e teste cada rota.

Prompt para agente:

```txt
Analise este projeto React e crie uma tela de cadastro para consumir minha API.

Regras:
- Não altere arquivos desnecessários.
- Antes de editar, liste o plano de alterações.
- Use a estrutura atual do projeto.
- Crie um service separado para chamadas HTTP.
- Não invente rotas.

Backend:
Base URL: http://localhost:3000
Rota: POST /api/agendamentos
Body: nomePet, especie, nomeDono, telefoneDono, servico, data

Tela esperada:
- Formulário com todos os campos.
- Validação de campo obrigatório.
- Mensagem de sucesso usando o campo mensagem da API.
- Mensagem de erro caso a API retorne 400.
- Visual simples, responsivo e organizado.

Depois de alterar, me diga quais arquivos foram criados ou modificados e como testar.
```

## 8. Método 3 - plataformas visuais

Plataformas visuais permitem descrever a aplicação e gerar uma interface rapidamente. Elas ajudam a validar uma ideia e montar protótipos, mas ainda podem errar URL, campo, autenticação ou regra de integração.

Prompt para plataforma visual:

```txt
Crie uma aplicação web simples para consumir minha API de agendamentos.

Contexto:
- Sou aluno de backend e já tenho uma API em Node.js + Express.
- Preciso apenas de um frontend para cadastrar agendamentos.
- A aplicação deve ser didática, limpa e fácil de entender.

Tela 1: Cadastro de agendamento
Campos:
- Nome do pet
- Espécie
- Nome do dono
- Telefone do dono
- Serviço
- Data

Integração com API:
- Método: POST
- URL: http://localhost:3000/api/agendamentos
- Body JSON: nomePet, especie, nomeDono, telefoneDono, servico, data
- Mostrar mensagem de sucesso retornada pela API.
- Mostrar erro caso algum campo esteja faltando.

Design:
- Layout centralizado.
- Formulário simples.
- Responsivo para celular e computador.
- Visual moderno, mas sem exageros.

Importante:
- Não invente novas rotas.
- Mantenha nomes de campos iguais aos do backend.
```

## 9. Como transformar rotas em telas

| Tipo de rota | Exemplo | Tela ou componente provável |
| ------------ | ------- | --------------------------- |
| POST de cadastro | `POST /api/agendamentos` | Formulário de cadastro. |
| GET de listagem | `GET /api/agendamentos` | Tabela, cards ou lista. |
| GET por id | `GET /api/agendamentos/:id` | Tela de detalhes. |
| PUT/PATCH | `PATCH /api/agendamentos/:id` | Formulário de edição ou ação específica. |
| DELETE | `DELETE /api/agendamentos/:id` | Botão de excluir com confirmação. |
| POST de login | `POST /api/auth/login` | Tela de login, armazenamento de token e redirecionamento. |
| GET protegido | `GET /api/usuarios/perfil` | Tela que envia `Authorization: Bearer TOKEN`. |

## 10. Como testar

1. Abra o backend e confirme a porta.
2. Teste a rota no Postman.
3. Abra o frontend.
4. Preencha o formulário com dados válidos.
5. Abra o DevTools do navegador e confira a aba Network/Rede.
6. Verifique URL, método HTTP, headers e body.
7. Veja o status code retornado.
8. Confira no banco se o registro foi criado quando necessário.

Erros comuns:

| Erro | Causa provável | Como resolver |
| ---- | -------------- | ------------- |
| `Failed to fetch` | Backend desligado, URL errada ou CORS. | Subir backend, conferir porta e configurar CORS. |
| `404 Not Found` | Endpoint escrito diferente do backend. | Comparar frontend com arquivo de routes. |
| `400 Bad Request` | Campos faltando ou nomes diferentes. | Conferir controller/service e ajustar inputs. |
| `401 Unauthorized` | Token não enviado ou inválido. | Enviar `Authorization: Bearer TOKEN`. |
| Tela branca | Erro de JavaScript ou import quebrado. | Abrir console e corrigir o arquivo indicado. |

## 11. Boas práticas

- Leia o código gerado antes de copiar.
- Teste uma rota por vez.
- Não aceite endpoint inventado.
- Peça explicação curta do código.
- Use Git antes de alterações grandes.
- Mantenha a API documentada.
- Prefira prompts incrementais.
- Nunca cole credenciais reais, tokens, senhas ou `.env` completo em ferramentas de IA.

Frase guia: a IA pode gerar o primeiro rascunho do frontend, mas quem valida se ele está correto é você.
