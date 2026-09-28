// Router permite criar um conjunto separado de rotas de usuário.
import { Router } from "express";

// Controller com as ações relacionadas aos usuários.
import UsuarioController from "../controllers/usuario.controller.js";

// Middleware que valida o token JWT.
import autenticar from "../middlewares/autenticacao.middleware.js";

// Lions Bet: middleware de autorização (só admin passa).
import apenasAdmin from "../middlewares/apenasAdmin.middleware.js";

// Criamos o roteador de usuários.
const router = Router();

// Colocamos o middleware "autenticar" diretamente nas rotas protegidas.
// A ordem importa: primeiro autentica, depois chama o controller.

// GET /api/usuarios/perfil
// Retorna os dados do usuário logado.
router.get("/perfil", autenticar, UsuarioController.perfil);

// PATCH /api/usuarios/perfil
// Atualiza nome e/ou senha do usuário logado.
router.patch("/perfil", autenticar, UsuarioController.atualizarPerfil);

// DELETE /api/usuarios/perfil
// Remove a conta do usuário logado.
router.delete("/perfil", autenticar, UsuarioController.removerMinhaConta);

// Lions Bet: carteira do usuário logado.
router.get("/carteira", autenticar, UsuarioController.verCarteira);
router.post("/carteira/deposito", autenticar, UsuarioController.depositar);

// Lions Bet: lista de todos os usuários, só para admin.
// autenticar vem primeiro: apenasAdmin precisa do req.usuario.tipo.
router.get("/", autenticar, apenasAdmin, UsuarioController.listar);

// Exportamos o roteador para o app.js.
export default router;
