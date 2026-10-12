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

  body { font-family: 'Segoe UI', Helvetica, Arial, sans-serif; color: var(--ld-preto); font-size: 12px; }
  h1 { color: var(--ld-preto); font-size: 21px; font-weight: 700; border-bottom: 3px solid var(--ld-laranja); padding-bottom: 6px; margin: 0 0 6px; }
  h2 { color: var(--ld-preto); font-size: 14px; font-weight: 700; margin: 12px 0 5px; padding-left: 8px; border-left: 4px solid var(--ld-laranja); break-after: avoid; }
  p, li { font-size: 11.5px; line-height: 1.45; margin: 3px 0; }
  ul, ol { padding-left: 18px; margin: 3px 0; }
  a { color: var(--ld-laranja); text-decoration: none; }
  code { background-color: var(--ld-codigo) !important; color: var(--ld-preto) !important; font-weight: 600; padding: 1px 4px; border-radius: 3px; border: 1px solid var(--ld-borda); font-size: 10.5px; }
  pre { background-color: var(--ld-bloco) !important; border: 1px solid var(--ld-borda); border-left: 3px solid var(--ld-laranja); border-radius: 4px; padding: 6px 8px; margin: 5px 0; break-inside: avoid; white-space: pre-wrap; }
  pre code { border: 0; padding: 0; background: none !important; font-size: 10px; line-height: 1.35; font-weight: 500; }
  table { border-collapse: collapse; width: 100%; margin: 5px 0; font-size: 10.5px; break-inside: avoid; }
  th { background-color: var(--ld-preto); color: var(--ld-branco); padding: 4px 6px; text-align: left; }
  td { border: 1px solid var(--ld-borda); padding: 3px 6px; vertical-align: top; }
  tr:nth-child(even) { background-color: var(--ld-bloco); }
  blockquote { background-color: var(--ld-laranja-suave); border-left: 4px solid var(--ld-laranja); padding: 5px 10px; margin: 6px 0; border-radius: 0 4px 4px 0; color: var(--ld-preto); }
  blockquote p { margin: 0; }
  .cols { }
  .intro { color: var(--ld-muted); font-size: 11px; margin: 0 0 8px; }
  .rodape { text-align: center; color: var(--ld-muted); font-size: 11px; margin-top: 18px; }
</style>

# Guia rápido · Módulo 09: Autenticação, JWT e MVC (boilerplate)

<div class="intro">Resumo para consulta rápida. A explicação completa está nos slides e nos arquivos desta pasta.</div>

<div class="cols">

## Camadas do boilerplate
```
src/
├── app.js            configura o Express e as rotas
├── server.js         conecta no banco e sobe o servidor
├── config/database.js
├── routes/           caminho + middlewares + controller
├── middlewares/      autenticar, validarCampos, erro
├── controllers/      lê req, chama o service, responde
├── services/         regras de negócio
├── repositories/     conversa com o banco
├── models/           schemas do Mongoose
└── utils/criarErro.js
```
**Regra de ouro:** controller não fala com o banco; service não conhece `req`/`res`.

## Rotas
| Rota | Protegida? |
|---|---|
| `POST /api/auth/cadastro` | não |
| `POST /api/auth/login` | não |
| `GET / PATCH / DELETE /api/usuarios/perfil` | sim (token) |

## bcrypt
```js
const senhaHash = await bcrypt.hash(senha, 10)        // cadastro
const ok = await bcrypt.compare(senha, usuario.senhaHash) // login
```
No model: `senhaHash: { type: String, select: false }`. Para o login: `.select("+senhaHash")`. **Nunca** devolva a senha nem o hash.

## JWT
```js
const token = jwt.sign({ id: usuario._id, email: usuario.email },
  process.env.JWT_SECRET, { expiresIn: "1d" })
```
Header de toda rota protegida: `Authorization: Bearer <token>`.
O JWT é **assinado**, não criptografado: qualquer um lê o conteúdo. Nada sensível no payload.

## Middleware autenticar
```js
const authHeader = req.headers.authorization
if (!authHeader) return next(criarErro("Token não informado.", 401))
const [tipo, token] = authHeader.split(" ")
if (tipo !== "Bearer" || !token) return next(criarErro("Formato do token inválido.", 401))
const dados = jwt.verify(token, process.env.JWT_SECRET) // lança erro se inválido/expirado
req.usuario = { id: dados.id, email: dados.email }
next()
```

## Erros num lugar só
```js
throw criarErro("Email já cadastrado.", 409)   // no service
// middleware de erro: 4 parâmetros, registrado por último no app.js
function erroMiddleware(error, req, res, next) {
  return res.status(error.status || 500).json({ message: error.message })
}
```

## Autorização por papel
```js
papel: { type: String, enum: ["usuario", "admin"], default: "usuario" }
router.get("/", autenticar, autorizar("admin"), UsuarioController.listar)
```
- `autenticar` **antes** de `autorizar`.
- O papel vem do banco/token, **nunca** do body.
- O token guarda o papel antigo até expirar.

## Trocar a senha
`PATCH /api/usuarios/senha` com a senha atual e a nova. Senha atual errada → **400** (o usuário está logado; não é 401). O token antigo continua valendo até expirar (`iat`).

## Recurso com dono
```js
usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true }
// no controller/service:
const livro = await LivroRepository.criar({ ...dados, usuario: req.usuario.id })
const meus = await LivroRepository.listarPorUsuario(req.usuario.id)
```

## Status que importam
**400** dado inválido · **401** sem login ou token inválido · **403** logado, mas sem permissão · **404** não existe · **409** conflito (e-mail repetido)

## Armadilhas
- Dono vindo do body: qualquer um cria recurso em nome de outro.
- Esqueceu `select: false`: o hash vaza na resposta.
- `JWT_SECRET` fraco ou no GitHub: qualquer um gera tokens válidos.

</div>

<div class="rodape">
  <b>LionsDev</b> • Professor Nicolas Cardoso Motta<br>
  <i>Guia rápido · Módulo 09</i>
</div>
