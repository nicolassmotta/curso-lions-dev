import { Router } from "express";

import AuthController from "../controllers/auth.controller.js";
import autenticar from "../middlewares/autenticacao.middleware.js";
import validarCampos from "../middlewares/validarCampos.middleware.js";

const router = Router();

router.post("/cadastro", validarCampos(["nome", "email", "cpf", "telefone", "senha"]), AuthController.cadastrar);
router.post("/login", validarCampos(["email", "senha"]), AuthController.login);
router.post("/logout", autenticar, AuthController.logout);

export default router;
