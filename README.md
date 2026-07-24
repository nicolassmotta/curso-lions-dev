# 🦁 Curso Lions Dev

Repositório do curso **Do Zero ao Herói** da **LionsDev**.

Este repositório contém o material de apoio das aulas: conteúdo teórico comentado, exercícios dos slides, listas de exercícios, exercícios resolvidos, provas e orientações para o projeto final.

---

## 📋 Pré-requisitos

- Computador com sistema operacional **Linux (Ubuntu)**, **Windows** ou **macOS**

> 💡 **Dica:** Use o script [`ferramentas/setup_dev.sh`](ferramentas/setup_dev.sh) para instalar automaticamente as ferramentas necessárias no Ubuntu: Node.js, Git, VS Code, Postman, MongoDB Compass e extensões.

---

## 🗺️ Mapa dos Módulos

| #   | Módulo                         | Descrição                                                                                                                |
| --- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| 01  | **Introdução ao Ambiente**     | Node.js, NPM, `package.json`, terminal e primeiros comandos                                                              |
| 02  | **Fundamentos de JavaScript**  | Variáveis, tipos de dados, condicionais, loops, arrays, objetos, funções e entrada de dados                              |
| 03  | **Calculadora**                | Primeiro projeto: requisitos, fluxo da aplicação, validação de entrada e implementação com funções                       |
| 04  | **Git & GitHub**               | Controle de versão, branches, merge, conflitos, Pull Requests e colaboração                                              |
| 05  | **Módulos ES (Import/Export)** | Modularização do código com ES Modules                                                                                   |
| 06  | **Organização de Projetos**    | Estruturação de projetos com múltiplos arquivos e CRUD em memória                                                        |
| 07  | **APIs REST com Express**      | Criação de APIs RESTful com Express.js e dados em memória                                                                |
| 08  | **Banco de Dados (MongoDB)**   | Integração com MongoDB via Mongoose, modelos, rotas e exemplos de APIs conectadas ao banco                               |
| 09  | **Autenticação, JWT e MVC**    | Senhas com bcryptjs, autenticação com JWT, boilerplate LionsDev e APIs em camadas                                        |
| 10  | **Deploy com Render**          | Publicação de APIs no Render, variáveis de ambiente e projeto completo de API Banco Digital                              |
| 11  | **Frontend com IA e FlutterFlow** | Guia prático de frontend com IA, NoCode/LowCode com FlutterFlow, consumo real de APIs, API Calls e listagens dinâmicas |
| 12  | **Projeto Final e Requisitos** | Simulação cliente-dev, levantamento de requisitos, escopo, entidades, relações, frontend, backend, deploy e apresentação |

---

## 📝 Listas de Exercícios

Cada módulo tem um índice em `moduloXX/lista_de_exercicios/README.md` com duas trilhas de prática:

- **Listas de código** (`codigo_*.md`) — treino direto: drills de uma linha, código para completar, bugs para achar, previsão de saída e desafios para escrever do zero. **Comece por elas** para fixar a mecânica do conceito.
- **Listas aplicadas** — problemas de negócio em prosa, onde o aluno traduz o enunciado em código.

A regra é sempre **mecânica primeiro (código), aplicação depois**. Cada índice de módulo traz a ordem sugerida.

---

## 🧭 Materiais dos Módulos 11 e 12

Os módulos finais são mais orientados a integração, documentação e entrega de projeto. Eles não trazem novos exemplos de backend na raiz; o foco é consumir as APIs já criadas e organizar o projeto final.

| Módulo | Tipo | Arquivo | Conteúdo |
| ------ | ---- | ------- | -------- |
| 11 | Conteúdo | [frontend_com_ia.md](modulo11/conteudo/frontend_com_ia.md) | Como transformar rotas de API em telas usando IA, prompts, `fetch`/`axios`, JWT, erros e testes no navegador |
| 11 | Conteúdo | [flutterflow.md](modulo11/conteudo/flutterflow.md) | Desenvolvimento NoCode/LowCode com FlutterFlow, widgets, navegação, API Calls, Data Schema, Backend Query e Dynamic Children |
| 11 | Atividade | [frontend_com_ia.md](modulo11/lista_de_exercicios/frontend_com_ia.md) | Criar uma tela de cadastro a partir de uma rota `POST` real do backend |
| 11 | Atividade | [flutterflow_listagem_api.md](modulo11/lista_de_exercicios/flutterflow_listagem_api.md) | Criar uma tela de listagem no FlutterFlow consumindo uma rota `GET` real |
| 12 | Conteúdo | [README.md](modulo12/conteudo/README.md) | Visão geral do módulo, ordem de trabalho e resultado esperado do projeto final |
| 12 | Atividade | [simulacao_cliente_dev.md](modulo12/lista_de_exercicios/simulacao_cliente_dev.md) | Dinâmica de entrevista entre cliente e dev para descobrir problema, público, escopo e prioridades |
| 12 | Template | [levantamento_requisitos.md](modulo12/lista_de_exercicios/levantamento_requisitos.md) | Documento para transformar a entrevista em requisitos, entidades, telas/endpoints, regras e prioridades |
| 12 | Enunciado | [projeto_final.md](modulo12/lista_de_exercicios/projeto_final.md) | Regras do projeto final full-stack, tecnologias obrigatórias, escopo mínimo, README, testes, deploy e checklist |

---

## 📁 Estrutura de Pastas

Cada módulo **costuma** seguir a organização abaixo. O material teórico em `conteudo/` pode ser **arquivo `.js` comentado** (aula no estilo "código legível") ou **`.md`** (conteúdo teórico formatado para leitura e PDF).

```txt
moduloXX/
├── conteudo/              # Material teórico (.js comentado ou .md/.pdf formatado)
├── exercicios_slides/     # Exercícios feitos em aula (ao vivo)
├── lista_de_exercicios/   # Listas em PDF e Markdown para prática individual
└── exercicios_resolvidos/ # Gabarito e soluções de referência
```

> Nem todo módulo terá as quatro pastas ao mesmo tempo. Os módulos 11 e 12, por exemplo, concentram materiais em `conteudo/` e `lista_de_exercicios/`, porque são módulos de integração, frontend orientado por IA/NoCode, requisitos e projeto final.

> O repositório também possui a pasta `provas/` com materiais de avaliação.

### Convenções de Extensão

| Quando usar                                                                                             | Extensão                         |
| ------------------------------------------------------------------------------------------------------- | -------------------------------- |
| Material com regras de código, exemplos que você executa com `node`, ou "aula" em JavaScript comentado  | `.js`                            |
| Listas de exercícios, enunciados longos, templates, requisitos ou conteúdo que não precisa ser executado | `.md` (e PDFs onde já existirem) |

---

## 📦 Sobre as Dependências

As dependências dos exemplos gerais ficam centralizadas no `package.json` da raiz para simplificar o setup dos alunos: com um único `npm install` na raiz, as ferramentas principais ficam disponíveis para os módulos iniciais e intermediários.

Projetos completos pensados para deploy podem ter `package.json` próprio dentro da pasta do projeto. Esse é o caso do projeto completo de API Banco Digital em [`modulo10/exercicios_resolvidos/api_banco_digital`](modulo10/exercicios_resolvidos/api_banco_digital), porque ele precisa funcionar como uma API independente no Render.

Para exercícios de API com autenticação e MVC do Módulo 09 e para o projeto final do Módulo 12, use o **Boilerplate Lions Dev**:
<https://github.com/nicolassmotta/boilerplate-lions-dev.git>

O enunciado completo do projeto final está em [`modulo12/lista_de_exercicios/projeto_final.md`](modulo12/lista_de_exercicios/projeto_final.md), incluindo tecnologias obrigatórias, escopo mínimo e checklist de entrega.

Os Módulos 11 e 12 não adicionam novas dependências obrigatórias ao `package.json` da raiz. O frontend pode ser feito em uma pasta/projeto próprio, com React gerado com apoio de IA, FlutterFlow ou outra abordagem orientada em aula.

| Pacote         | Usado a partir de | Onde está declarado                              | Função                                              |
| -------------- | ----------------- | ------------------------------------------------ | --------------------------------------------------- |
| `prompt-sync`  | Módulo 02         | `package.json` da raiz                           | Capturar entrada de dados do usuário no terminal    |
| `express`      | Módulo 07         | `package.json` da raiz e projetos de API         | Framework para criação de APIs REST                 |
| `mongoose`     | Módulo 08         | `package.json` da raiz e projetos de API         | ODM para integração com MongoDB                     |
| `dotenv`       | Módulo 08         | `package.json` da raiz e projetos de API         | Carregar variáveis de ambiente de um arquivo `.env` |
| `bcryptjs`     | Módulo 09         | Projetos completos e boilerplates externos       | Gerar hash de senhas                                |
| `jsonwebtoken` | Módulo 09         | Projetos completos e boilerplates externos       | Criar e validar tokens JWT                          |

---

## 🧾 PDFs

Alguns materiais possuem versão em PDF junto ao Markdown. Quando houver PDF rastreado no Git com um `.md` correspondente, é possível regenerar os PDFs com:

```bash
npm run pdfs
```

O script usa a extensão `yzane.markdown-pdf` do VS Code e um navegador Chromium/Chrome/Edge instalado na máquina.

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

---

<div align="center">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta
</div>
