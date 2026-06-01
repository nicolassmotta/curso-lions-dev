# 🦁 Curso Lions Dev

Repositório do curso **Do Zero ao Herói** da **LionsDev**.

Este repositório contém todo o material de apoio das aulas: conteúdo teórico comentado, exercícios dos slides, listas de exercícios e exercícios resolvidos.

---

## 📋 Pré-requisitos

- Computador com sistema operacional **Linux (Ubuntu)**, **Windows** ou **macOS**

> 💡 **Dica:** Use o script [`ferramentas/setup_dev.sh`](ferramentas/setup_dev.sh) para instalar automaticamente todas as ferramentas necessárias no Ubuntu (Node.js, Git, VS Code, Postman, MongoDB Compass e extensões).

---

## 🗺️ Mapa dos Módulos

| #   | Módulo                         | Descrição                                                                                                                |
| --- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| 01  | **Introdução ao Ambiente**     | Node.js, NPM, `package.json`, terminal e primeiros comandos                                                              |
| 02  | **Fundamentos de JavaScript**  | Variáveis, tipos de dados, condicionais, loops, arrays, objetos e entrada de dados                                       |
| 03  | **Calculadora**                | Primeiro projeto: requisitos e fluxo em `conteudo/*.md`, implementação com funções em `exercicios_slides/calculadora.js` |
| 04  | **Git & GitHub**               | Controle de versão, branches, merge, conflitos, Pull Requests e colaboração                                              |
| 05  | **Módulos ES (Import/Export)** | Modularização do código com ES Modules                                                                                   |
| 06  | **Organização de Projetos**    | Estruturação de projetos com múltiplos arquivos e CRUD em memória                                                        |
| 07  | **APIs REST com Express**      | Criação de APIs RESTful com Express.js e dados em memória                                                                |
| 08  | **Banco de Dados (MongoDB)**   | Integração com MongoDB via Mongoose, modelos e rotas                                                                     |
| 09  | **Autenticação, MVC e Deploy** | Senhas com bcrypt, autenticação com JWT, APIs em camadas e publicação no Render.com                                      |

---

## 📁 Estrutura de Pastas

Cada módulo **costuma** seguir a organização abaixo. O material teórico em `conteudo/` pode ser **arquivo `.js` comentado** (aula no estilo "código legível") ou **`.md`** (conteúdo teórico formatado com PDF).

```
moduloXX/
├── conteudo/              # Material teórico (.js comentado ou .md/.pdf formatado)
├── exercicios_slides/     # Exercícios feitos em aula (ao vivo)
├── lista_de_exercicios/   # Listas em PDF e Markdown para prática individual
└── exercicios_resolvidos/ # Gabarito e soluções de referência
```

> Nem todo módulo terá as quatro pastas ao mesmo tempo. Exemplo: o **Módulo 03** tem `conteudo/` e `exercicios_slides/`; o gabarito da calculadora em aula fica no próprio `exercicios_slides/calculadora.js`.

> O repositório também possui a pasta `provas/` com materiais de avaliação.

### Convenções de extensão (`.js` e `.md`)

| Quando usar                                                                                             | Extensão                         |
| ------------------------------------------------------------------------------------------------------- | -------------------------------- |
| Material com regras de código, exemplos que você executa com `node`, ou “aula” em JavaScript comentado  | `.js`                            |
| Listas de exercícios, enunciados longos em texto ou conteúdo que não precisa ser arquivo-fonte do curso | `.md` (e PDFs onde já existirem) |

---

## 📦 Sobre as Dependências

As dependências dos exemplos gerais ficam centralizadas no `package.json` da raiz para simplificar o setup dos alunos: com um único `npm install` na raiz, as ferramentas principais ficam disponíveis para os módulos iniciais e intermediários.

Projetos completos pensados para deploy podem ter `package.json` próprio dentro da pasta do projeto. Esse é o caso do projeto final resolvido do Módulo 09 em `modulo09/exercicios_resolvidos/api_banco_digital`, porque ele precisa funcionar como uma API independente no Render. Para novos exercícios de API com autenticação e MVC, use o boilerplate externo: <https://github.com/nicolassmotta/lionsdev-boilerplate>.

| Pacote         | Usado a partir de | Onde está declarado                         | Função                                              |
| -------------- | ----------------- | ------------------------------------------- | --------------------------------------------------- |
| `prompt-sync`  | Módulo 02         | `package.json` da raiz                      | Capturar entrada de dados do usuário no terminal    |
| `express`      | Módulo 07         | `package.json` da raiz e projetos de API    | Framework para criação de APIs REST                 |
| `mongoose`     | Módulo 08         | `package.json` da raiz e projetos de API    | ODM para integração com MongoDB                     |
| `dotenv`       | Módulo 08         | `package.json` da raiz e projetos de API    | Carregar variáveis de ambiente de um arquivo `.env` |
| `bcryptjs`     | Módulo 09         | Projeto final e boilerplate externo         | Gerar hash de senhas                                |
| `jsonwebtoken` | Módulo 09         | Projeto final e boilerplate externo         | Criar e validar tokens JWT                          |

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT — veja o arquivo [LICENSE](LICENSE) para detalhes.

---

<div align="center">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta
</div>
