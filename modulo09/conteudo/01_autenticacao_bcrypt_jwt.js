/*
 * ===================================================================
 * MÓDULO 09: AUTENTICAÇÃO COM BCRYPT E JWT
 * ===================================================================
 *
 * Neste módulo vamos resolver um problema muito comum:
 *
 *   Como criar usuários sem gravar a senha real deles no banco?
 *
 * A resposta tem duas partes:
 *
 *   1. bcrypt  -> protege a senha antes de salvar.
 *   2. JWT     -> cria um token para identificar quem fez login.
 *
 * No exemplo resolvido usamos a biblioteca "bcryptjs".
 * Ela implementa o algoritmo bcrypt e funciona bem com ES Modules:
 *
 *   npm install bcryptjs jsonwebtoken
 */

// -------------------------------------------------------------------
// 1. O PROBLEMA: SENHA PURA NO BANCO
// -------------------------------------------------------------------

/*
 * ERRADO:
 *
 * {
 *   nome: "Maria",
 *   email: "maria@email.com",
 *   senha: "123456"
 * }
 *
 * Se alguém acessar o banco, todas as senhas ficam expostas.
 * Por isso a senha pura nunca deve ser salva.
 */

// -------------------------------------------------------------------
// 2. A SOLUÇÃO: HASH DA SENHA
// -------------------------------------------------------------------

/*
 * Hash é uma transformação de mão única:
 *
 *   "123456"  ->  "$2b$10$k4P4..."
 *
 * A aplicação salva apenas o hash.
 * Quando o usuário tenta fazer login, comparamos:
 *
 *   senha digitada + hash salvo -> confere ou não confere?
 *
 * Repare: não precisamos "descriptografar" a senha.
 * Hash não é criptografia reversível.
 */

/*
 * Exemplo de cadastro:
 *
 * import bcrypt from "bcryptjs";
 *
 * const saltRounds = 10;
 * const senhaDigitada = "123456";
 *
 * const senhaHash = await bcrypt.hash(senhaDigitada, saltRounds);
 *
 * await Usuario.create({
 *   nome: "Maria",
 *   email: "maria@email.com",
 *   senhaHash
 * });
 */

/*
 * O que significa saltRounds?
 *
 * É o "custo" do hash. Quanto maior, mais demorado fica gerar o hash.
 * Para projetos de aula e APIs comuns, 10 é um bom ponto de partida.
 */

// -------------------------------------------------------------------
// 3. LOGIN: COMPARANDO SENHA DIGITADA COM HASH
// -------------------------------------------------------------------

/*
 * Exemplo de login:
 *
 * import bcrypt from "bcryptjs";
 *
 * const usuario = await Usuario.findOne({ email }).select("+senhaHash");
 *
 * if (!usuario) {
 *   return res.status(401).json({ message: "Email ou senha incorretos." });
 * }
 *
 * const senhaCorreta = await bcrypt.compare(senhaDigitada, usuario.senhaHash);
 *
 * if (!senhaCorreta) {
 *   return res.status(401).json({ message: "Email ou senha incorretos." });
 * }
 */

/*
 * Dica de segurança:
 *
 * No login, prefira uma mensagem genérica:
 *
 *   "Email ou senha incorretos."
 *
 * Assim a API não entrega se o problema foi o email inexistente
 * ou a senha errada.
 */

// -------------------------------------------------------------------
// 4. JWT: O TOKEN DE AUTENTICAÇÃO
// -------------------------------------------------------------------

/*
 * Depois que o login dá certo, a API cria um token JWT.
 *
 * JWT significa JSON Web Token.
 *
 * Ele é uma string assinada pelo servidor. A assinatura garante que:
 *
 *   - o token foi gerado pela nossa API;
 *   - o conteúdo não foi alterado pelo cliente;
 *   - o token pode ter prazo de expiração.
 */

/*
 * Exemplo de criação do token:
 *
 * import jwt from "jsonwebtoken";
 *
 * const token = jwt.sign(
 *   {
 *     id: usuario._id,
 *     email: usuario.email
 *   },
 *   process.env.JWT_SECRET,
 *   { expiresIn: "1d" }
 * );
 *
 * res.json({ token });
 */

/*
 * JWT_SECRET é uma chave secreta do servidor.
 *
 * Ela deve ficar no .env:
 *
 *   JWT_SECRET=minha_chave_super_secreta
 *
 * Nunca coloque JWT_SECRET direto no código e nunca envie para o GitHub.
 */

// -------------------------------------------------------------------
// 5. USANDO O TOKEN EM ROTAS PROTEGIDAS
// -------------------------------------------------------------------

/*
 * Depois do login, o cliente envia o token no cabeçalho Authorization:
 *
 *   Authorization: Bearer TOKEN_AQUI
 *
 * Esse formato é padrão em APIs:
 *
 *   Bearer = "portador"
 *
 * Ou seja: quem "porta" esse token consegue acessar as rotas protegidas
 * enquanto o token for valido.
 */

/*
 * Exemplo de middleware:
 *
 * import jwt from "jsonwebtoken";
 *
 * function autenticar(req, res, next) {
 *   const authHeader = req.headers.authorization;
 *
 *   if (!authHeader) {
 *     return res.status(401).json({ message: "Token não informado." });
 *   }
 *
 *   const [tipo, token] = authHeader.split(" ");
 *
 *   if (tipo !== "Bearer" || !token) {
 *     return res.status(401).json({ message: "Formato do token inválido." });
 *   }
 *
 *   try {
 *     const payload = jwt.verify(token, process.env.JWT_SECRET);
 *     req.usuario = payload;
 *     next();
 *   } catch (error) {
 *     return res.status(401).json({ message: "Token inválido ou expirado." });
 *   }
 * }
 */

// -------------------------------------------------------------------
// 6. FLUXO COMPLETO
// -------------------------------------------------------------------

/*
 * CADASTRO:
 *
 * 1. Usuário envia nome, email e senha.
 * 2. API valida os campos.
 * 3. API verifica se o email já existe.
 * 4. API gera senhaHash com bcrypt.
 * 5. API salva nome, email e senhaHash.
 * 6. API nunca retorna a senha nem o hash.
 *
 * LOGIN:
 *
 * 1. Usuário envia email e senha.
 * 2. API busca o usuário pelo email.
 * 3. API compara senha digitada com senhaHash.
 * 4. Se estiver correto, API gera um JWT.
 * 5. Cliente usa o token nas próximas requisições.
 *
 * ROTA PROTEGIDA:
 *
 * 1. Cliente envia Authorization: Bearer TOKEN.
 * 2. Middleware verifica o token.
 * 3. Se o token for válido, a rota continua.
 * 4. Se o token for inválido, a API responde 401.
 */

console.log("Conteúdo: bcrypt protege senhas; JWT protege rotas.");
