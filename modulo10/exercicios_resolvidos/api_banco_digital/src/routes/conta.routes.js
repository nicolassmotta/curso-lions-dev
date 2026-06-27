import { Router } from "express";

import ContaController from "../controllers/conta.controller.js";
import autenticar from "../middlewares/autenticacao.middleware.js";
import autorizar from "../middlewares/autorizacao.middleware.js";
import validarCampos from "../middlewares/validarCampos.middleware.js";

const router = Router();

router.use(autenticar);

router.post("/", validarCampos(["tipo"]), ContaController.solicitarAbertura);
router.get("/minhas", ContaController.listarMinhas);
router.get("/:id/extrato", ContaController.extrato);
router.get("/:id", ContaController.detalhar);
router.patch("/:id/status", autorizar(["gerente", "admin"]), validarCampos(["status"]), ContaController.atualizarStatus);

export default router;
