import { Router } from "express";

import UsuarioController from "../controllers/usuario.controller.js";
import autenticar from "../middlewares/autenticacao.middleware.js";
import autorizar from "../middlewares/autorizacao.middleware.js";
import validarCampos from "../middlewares/validarCampos.middleware.js";

const router = Router();

router.use(autenticar);

router.get("/perfil", UsuarioController.perfil);
router.patch("/perfil", UsuarioController.atualizarPerfil);
router.delete("/perfil", UsuarioController.encerrarPerfil);
router.get("/", autorizar(["gerente", "admin"]), UsuarioController.listar);
router.patch("/:id/status", autorizar(["admin"]), validarCampos(["status"]), UsuarioController.alterarStatus);

export default router;
