/*
 * ===================================================================
 * MODULO 09: BOILERPLATE E ESTRUTURA MVC PARA APIs NODE + EXPRESS
 * ===================================================================
 *
 * MVC significa:
 *
 *   M - Model
 *   V - View
 *   C - Controller
 *
 * Em APIs REST, normalmente nao temos "View" renderizando HTML.
 * A resposta da API costuma ser JSON.
 *
 * No boilerplate LionsDev, usamos a ideia do MVC para separar
 * responsabilidades e evitar que tudo fique concentrado no server.js:
 *
 *   Model       -> estrutura dos dados no banco
 *   Controller  -> entrada e saida HTTP
 *   Service     -> regra de negocio
 *   Repository  -> conversa com o banco
 *   Routes      -> endereco das rotas
 *   Middleware  -> funcoes que rodam antes das rotas
 *   Config      -> conexao e configuracoes globais
 */

// -------------------------------------------------------------------
// 1. ESTRUTURA DE PASTAS SUGERIDA
// -------------------------------------------------------------------

/*
 * projeto/
 * ├── src/
 * │   ├── app.js
 * │   ├── server.js
 * │   ├── config/
 * │   │   └── database.js
 * │   ├── controllers/
 * │   │   ├── auth.controller.js
 * │   │   └── usuario.controller.js
 * │   ├── middlewares/
 * │   │   ├── autenticacao.middleware.js
 * │   │   ├── erro.middleware.js
 * │   │   └── validarCampos.middleware.js
 * │   ├── models/
 * │   │   └── usuario.model.js
 * │   ├── repositories/
 * │   │   └── usuario.repository.js
 * │   ├── routes/
 * │   │   ├── auth.routes.js
 * │   │   └── usuario.routes.js
 * │   ├── services/
 * │   │   ├── auth.service.js
 * │   │   └── usuario.service.js
 * │   └── utils/
 * │       └── criarErro.js
 * ├── .env
 * ├── .env.example
 * └── package.json
 */

// -------------------------------------------------------------------
// 2. RESPONSABILIDADE DE CADA CAMADA
// -------------------------------------------------------------------

/*
 * routes/
 * Define o endereco e o metodo HTTP.
 *
 * Exemplo:
 *   POST /api/auth/login -> AuthController.login
 *
 * A rota nao deve ter regra de negocio grande.
 */

/*
 * controllers/
 * Recebe req e res.
 * Pega dados de req.body, req.params, req.query e chama o service.
 *
 * Exemplo:
 *
 * async function login(req, res, next) {
 *   try {
 *     const resultado = await AuthService.login(req.body);
 *     return res.status(200).json(resultado);
 *   } catch (error) {
 *     return next(error);
 *   }
 * }
 */

/*
 * services/
 * Onde mora a regra de negocio.
 *
 * Exemplo:
 *   - validar se email ja existe;
 *   - gerar hash da senha;
 *   - comparar senha no login;
 *   - gerar token JWT;
 *   - impedir atualizacao invalida.
 *
 * O service nao deve depender de req e res.
 */

/*
 * repositories/
 * Camada que conversa com o banco.
 *
 * Exemplo:
 *   Usuario.findOne({ email })
 *   Usuario.findById(id)
 *   Usuario.create(dados)
 *
 * Assim, se a regra de negocio precisar buscar usuario por email,
 * ela chama uma funcao com nome claro:
 *
 *   UsuarioRepository.buscarPorEmail(email)
 */

/*
 * models/
 * Define o Schema do Mongoose.
 *
 * Exemplo:
 *   nome, email, senhaHash, timestamps
 *
 * O model conhece a forma do documento no MongoDB.
 */

/*
 * middlewares/
 * Funcoes que rodam antes do controller.
 *
 * Exemplos:
 *   - validar campos obrigatorios;
 *   - verificar token JWT;
 *   - tratar erros da API.
 */

/*
 * config/
 * Configuracoes globais.
 *
 * Exemplo:
 *   - conexao com MongoDB;
 *   - leitura de variaveis de ambiente.
 */

// -------------------------------------------------------------------
// 3. FLUXO DE UMA REQUISICAO
// -------------------------------------------------------------------

/*
 * Exemplo: POST /api/auth/login
 *
 * 1. app.js
 *    A requisicao entra na aplicacao Express.
 *
 * 2. routes/auth.routes.js
 *    O Express encontra a rota POST /login.
 *
 * 3. middlewares/validarCampos.middleware.js
 *    Verifica se email e senha foram enviados.
 *
 * 4. controllers/auth.controller.js
 *    Recebe req.body e chama AuthService.login().
 *
 * 5. services/auth.service.js
 *    Busca usuario, compara senha e gera token.
 *
 * 6. repositories/usuario.repository.js
 *    Executa Usuario.findOne() no MongoDB.
 *
 * 7. models/usuario.model.js
 *    O Mongoose aplica estrutura e validacoes do Schema.
 *
 * 8. controller
 *    Envia resposta JSON para o cliente.
 */

// -------------------------------------------------------------------
// 4. REGRA PRATICA PARA NAO SE PERDER
// -------------------------------------------------------------------

/*
 * Pergunta: "Estou mexendo com req e res?"
 * Resposta: Controller.
 *
 * Pergunta: "Estou decidindo uma regra do sistema?"
 * Resposta: Service.
 *
 * Pergunta: "Estou fazendo find, create, update ou delete?"
 * Resposta: Repository.
 *
 * Pergunta: "Estou definindo campos e validacoes do MongoDB?"
 * Resposta: Model.
 *
 * Pergunta: "Estou protegendo uma rota antes dela chegar no controller?"
 * Resposta: Middleware.
 */

console.log("Conteudo: boilerplate + MVC deixam a API mais organizada e facil de manter.");
