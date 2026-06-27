# Módulo 09 — Lista de Exercícios

Exercícios de API com **autenticação (bcrypt + JWT)** e **arquitetura em camadas** (model, repository, service, controller e routes), todos construídos a partir do **boilerplate LionsDev**:
<https://github.com/nicolassmotta/lionsdev-boilerplate>

O boilerplate já traz a camada de `Usuario`, cadastro/login com bcrypt/JWT, o middleware `autenticar` e o tratamento central de erros. Em todos os exercícios abaixo o aluno **cria um novo recurso** e o amarra ao **dono** (o usuário logado, via `req.usuario.id`), exatamente como no recurso `Livro` visto em aula.

> Conceitos usados: só o que já vimos até o Módulo 09. A maioria dos exercícios usa apenas o padrão "dono do recurso via token". **A exceção é a Lions Bet**, o desafio final da lista, que vai além e introduz **autorização por papel/cargo** (usuário × admin) com rotas públicas, de usuário e de admin.

## Exercícios adaptados do Módulo 08 (agora com login e dono)

| Exercício | Recurso | Nível | Arquivo |
| --------- | ------- | ----- | ------- |
| Petshop — Meus Agendamentos | `Agendamento` | Básico | [api_petshop_boilerplate.md](api_petshop_boilerplate.md) |
| Academia — Minhas Matrículas | `Matricula` | Básico | [api_academia_boilerplate.md](api_academia_boilerplate.md) |
| Biblioteca — Meu Acervo e Empréstimos | `Material` + `Emprestimo` | Avançado | [api_biblioteca_boilerplate.md](api_biblioteca_boilerplate.md) |

## Exercícios novos

| Exercício | Recurso | Nível | Arquivo |
| --------- | ------- | ----- | ------- |
| Tarefas — Meu To-Do | `Tarefa` | Básico | [api_tarefas.md](api_tarefas.md) |
| Finanças — Meu Controle de Gastos | `Transacao` | Intermediário | [api_financas.md](api_financas.md) |
| Lions Bet — Casa de Apostas com Admin | `Evento` + `Aposta` (+ papéis) | **Desafio (o mais difícil)** | [api_lions_bet.md](api_lions_bet.md) |

### Ordem sugerida

1. **Tarefas** (mais simples, fixa o padrão dono-via-token).
2. **Petshop** e **Academia** (adaptação direta do Módulo 08 com regra de valor no service).
3. **Finanças** (cálculo de resumo em JavaScript: entradas, saídas e saldo).
4. **Biblioteca** (dois recursos, `ObjectId`/`ref` e regra de estoque cruzando coleções).
5. **Lions Bet** (o mais difícil: autorização por papel/admin, rotas públicas × usuário × admin, carteira e liquidação de apostas cruzando coleções).

### Padrão de pastas (igual em todos)

```txt
src/
├── models/<recurso>.model.js
├── repositories/<recurso>.repository.js
├── services/<recurso>.service.js
├── controllers/<recurso>.controller.js
└── routes/<recurso>.routes.js     →  registrado no src/app.js antes do middleware 404
```
