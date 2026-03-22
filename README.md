# 🦁 Curso Lions Dev

Repositório oficial do curso de **Desenvolvimento Web Full Stack** da turma **Lions Startups/LionsDev**, ministrado pelo Professor **Nicolas Cardoso Motta**.

Este repositório contém todo o material de apoio das aulas: conteúdo teórico comentado, exercícios dos slides, listas de exercícios e exercícios resolvidos.

---

## 📋 Pré-requisitos

- Computador com sistema operacional **Linux (Ubuntu)**, **Windows** ou **macOS**
- Vontade de aprender! 🚀

> 💡 **Dica:** Use o script [`ferramentas/setup-dev.sh`](ferramentas/setup-dev.sh) para instalar automaticamente todas as ferramentas necessárias no Ubuntu (Node.js, Git, VS Code, Postman, MongoDB Compass e extensões).

---

## 🗺️ Mapa dos Módulos

| #  | Módulo | Descrição |
|----|--------|-----------|
| 01 | **Introdução ao Ambiente** | Node.js, NPM, `package.json`, terminal e primeiros comandos |
| 02 | **Fundamentos de JavaScript** | Variáveis, tipos de dados, condicionais, loops, arrays, objetos e entrada de dados |
| 03 | **Extração de Requisitos** | Exercício prático: transformar uma ideia em código (Jogo da Adivinhação) |
| 04 | **Git & GitHub** | Controle de versão, branches, merge, conflitos, Pull Requests e colaboração |
| 05 | **Funções e Switch/Case** | Declaração de funções, parâmetros, retorno e estrutura `switch` |
| 06 | **Módulos ES (Import/Export)** | Modularização do código com ES Modules |
| 07 | **Organização de Projetos** | Estruturação de projetos com múltiplos arquivos e CRUD em memória |
| 08 | **APIs REST com Express** | Criação de APIs RESTful com Express.js e dados em memória |
| 09 | **Banco de Dados (MongoDB)** | Integração com MongoDB via Mongoose, modelos e rotas |
| 10 | **Deploy** | Publicar a aplicação na nuvem com Render.com |

---

## 📁 Estrutura de Pastas

Cada módulo segue a seguinte organização:

```
ModuloXX/
├── conteudo/              # Material teórico (código comentado como "aula escrita")
├── exercicios_slides/     # Exercícios feitos em aula (ao vivo)
└── exercicios_resolvidos/ # Gabarito e soluções de referência
```

> Alguns módulos também possuem a pasta `lista_de_exercicios/` com listas em formato PDF e Markdown para prática individual.

---

## 📦 Sobre as Dependências

As dependências de **todos** os módulos estão centralizadas em um único `package.json` na raiz do projeto. Essa é uma decisão intencional para simplificar o setup dos alunos: com um único `npm install` na raiz, todas as ferramentas ficam disponíveis para qualquer módulo.

| Pacote | Usado a partir de | Função |
|--------|-------------------|--------|
| `prompt-sync` | Módulo 02 | Capturar entrada de dados do usuário no terminal |
| `express` | Módulo 08 | Framework para criação de APIs REST |
| `mongoose` | Módulo 09 | ODM para integração com MongoDB |
| `dotenv` | Módulo 09 | Carregar variáveis de ambiente de um arquivo `.env` |

---

## 📄 Licença

Este projeto está licenciado sob a licença ISC — veja o arquivo [LICENSE](LICENSE) para detalhes.

---

<div align="center">
  <b>Lions Startups/LionsDev</b> • Professor Nicolas Cardoso Motta
</div>
