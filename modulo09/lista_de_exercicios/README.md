# Módulo 09: Lista de Exercícios

Exercícios de API com **autenticação (bcrypt + JWT)** e **arquitetura em camadas** (model, repository, service, controller e routes), a partir do **boilerplate LionsDev**: <https://github.com/nicolassmotta/boilerplate-lions-dev.git>

O boilerplate já traz a camada de `Usuario`, cadastro/login com bcrypt/JWT, o middleware `autenticar` e o tratamento central de erros. Em cada exercício o aluno **cria um novo recurso** e o amarra ao **dono** (usuário logado, via `req.usuario.id`).

## Lista de código

Comece por aqui. A lista tem exercícios de fixação, código para completar, bugs para corrigir, uma previsão de comportamento e um desafio no final.

| Lista | Foco | Arquivo |
| ----- | ---- | ------- |
| Autenticação e camadas | bcrypt, JWT, middleware, separação em camadas | [codigo_auth_mvc.md](codigo_auth_mvc.md) |

## Listas aplicadas

Projetos descritos em texto, em que o aluno interpreta o enunciado e escreve o código do zero.

| Lista | Foco | Arquivo |
| ----- | ---- | ------- |
| Tarefas: Meu To-Do | dono via token (básico) | [api_tarefas.md](api_tarefas.md) |
| Petshop: Meus Agendamentos | adaptação do M08 com login (básico) | [api_petshop_boilerplate.md](api_petshop_boilerplate.md) |
| Academia: Minhas Matrículas | adaptação do M08 com login (básico) | [api_academia_boilerplate.md](api_academia_boilerplate.md) |
| Finanças: Meu Controle de Gastos | cálculo de resumo (intermediário) | [api_financas.md](api_financas.md) |
| Biblioteca: Meu Acervo e Empréstimos | dois recursos, `ref`, estoque (avançado) | [api_biblioteca_boilerplate.md](api_biblioteca_boilerplate.md) |
| Lions Bet: Casa de Apostas com Admin | autorização por papel (desafio) | [api_lions_bet.md](api_lions_bet.md) |

As soluções de referência estão em `../exercicios_resolvidos/`, em uma pasta com o mesmo nome da lista (por exemplo, `api_tarefas.md` → `api_tarefas/`). Cada solução é um projeto completo sobre o boilerplate, com um README que lista os arquivos criados e alterados. A resposta da lista de código está em `../exercicios_resolvidos/codigo_auth_mvc.md`.

## Ordem sugerida

1. Resolva a lista de código para praticar hash, token, middleware e separação em camadas.
2. **Tarefas** (a mais simples; apresenta o padrão de dono via token).
3. **Petshop** e **Academia** (adaptação direta do Módulo 08).
4. **Finanças** (cálculo de resumo em JavaScript).
5. **Biblioteca** (dois recursos, `ObjectId`/`ref` e regra de estoque).
6. **Lions Bet** (o mais difícil: autorização por papel/admin).
