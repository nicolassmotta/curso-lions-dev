# API Banco Digital LionsBank

Projeto resolvido do Módulo 09 com Express, MongoDB, Mongoose, bcryptjs, JWT, MVC, services, repositories e deploy no Render.

Esta solução implementa uma API bancária didática com cadastro, login, abertura de contas, transações, PIX, boletos, cartões, faturas, empréstimos e painel administrativo.

## Como Rodar

```bash
npm install
cp .env.example .env
npm start
```

Preencha o `.env` com sua connection string do MongoDB Atlas antes de rodar.

Para testar rotas administrativas, cadastre um usuário normalmente e altere o campo `papel` para `admin` no MongoDB Compass.

## Organização

```txt
src/
├── config/
├── controllers/
├── middlewares/
├── models/
├── repositories/
├── routes/
├── services/
└── utils/
```

Fluxo padrão:

```txt
route -> middleware -> controller -> service -> repository -> model
```

## Principais Rotas

### Autenticação

| Método | Rota                 | Descrição                  |
| ------ | -------------------- | -------------------------- |
| POST   | `/api/auth/cadastro` | Cadastra cliente           |
| POST   | `/api/auth/login`    | Retorna token JWT          |
| POST   | `/api/auth/logout`   | Simula logout              |

### Usuários e Contas

| Método | Rota                       | Descrição                         |
| ------ | -------------------------- | --------------------------------- |
| GET    | `/api/usuarios/perfil`     | Perfil logado                     |
| PATCH  | `/api/usuarios/perfil`     | Atualiza perfil                   |
| DELETE | `/api/usuarios/perfil`     | Encerramento lógico do cadastro   |
| GET    | `/api/usuarios`            | Lista usuários, gerente/admin     |
| PATCH  | `/api/usuarios/:id/status` | Bloqueia/desbloqueia, admin       |
| POST   | `/api/contas`              | Solicita abertura de conta        |
| GET    | `/api/contas/minhas`       | Lista minhas contas               |
| PATCH  | `/api/contas/:id/status`   | Aprova/bloqueia conta             |
| GET    | `/api/contas/:id/extrato`  | Extrato por conta                 |

### Operações

| Método | Rota                              | Descrição                  |
| ------ | --------------------------------- | -------------------------- |
| POST   | `/api/transacoes/deposito`        | Depósito                   |
| POST   | `/api/transacoes/saque`           | Saque com tarifa           |
| POST   | `/api/transacoes/transferencia`   | Transferência              |
| PATCH  | `/api/transacoes/:id/aprovar`     | Aprova transferência pendente |
| PATCH  | `/api/transacoes/:id/recusar`     | Recusa transferência pendente  |
| POST   | `/api/transacoes/:id/estorno`     | Estorno, admin             |
| POST   | `/api/pix/chaves`                 | Cadastra chave PIX         |
| POST   | `/api/pix/enviar`                 | Envia PIX                  |
| POST   | `/api/boletos`                    | Gera boleto                |
| POST   | `/api/boletos/:id/pagar`          | Paga boleto                |
| POST   | `/api/cartoes`                    | Solicita cartão            |
| POST   | `/api/cartoes/:id/compras`        | Registra compra            |
| POST   | `/api/cartoes/:id/fatura/pagar`   | Paga fatura                |
| POST   | `/api/emprestimos/simular`        | Simula empréstimo          |
| POST   | `/api/emprestimos`                | Solicita empréstimo        |
| PATCH  | `/api/emprestimos/:id/aprovar`    | Aprova empréstimo          |
| POST   | `/api/emprestimos/:id/parcelas/:numero/pagar` | Paga parcela |

## Regras Implementadas

- Senhas de usuários e cartões são salvas com hash.
- Usuário bloqueado ou encerrado não acessa rotas protegidas.
- Contas novas nascem como `pendente_aprovacao`.
- Conta precisa estar `ativa` para movimentar dinheiro.
- Poupança não aceita cheque especial.
- Saque cobra tarifa de R$ 2,50.
- Valores monetários são salvos em centavos.
- Transferência acima de R$ 5.000,00 fica pendente até aprovação de gerente/admin.
- Conta salário só transfere para conta do mesmo CPF.
- PIX respeita limite diário configurado no `.env`.
- Cartão de crédito consome limite e gera fatura.
- Pagamento de fatura libera limite.
- Empréstimo aprovado deposita o valor na conta.
- Parcela paga gera transação.
- Estorno só acontece sobre transação aprovada e muda a original para `estornada`.

## Deploy no Render

No Render:

- **Build Command:** `npm install`
- **Start Command:** `npm start`

Variáveis:

| Key                          | Value                              |
| ---------------------------- | ---------------------------------- |
| `MONGO_URI`                  | Connection string do MongoDB Atlas |
| `JWT_SECRET`                 | Chave grande e secreta             |
| `JWT_EXPIRES_IN`             | `1d`                               |
| `BCRYPT_SALT_ROUNDS`         | `10`                               |
| `LIMITE_PIX_DIARIO_CENTAVOS` | `500000`                           |
| `NODE_ENV`                   | `production`                       |

Não configure `PORT` no Render. A plataforma define essa variável automaticamente.
