import { Router } from "express";

import AdminController from "../controllers/admin.controller.js";
import autenticar from "../middlewares/autenticacao.middleware.js";
import autorizar from "../middlewares/autorizacao.middleware.js";

const router = Router();

router.use(autenticar);
router.use(autorizar(["gerente", "admin"]));

router.get("/resumo", AdminController.resumo);
router.get("/transacoes", AdminController.listarTransacoes);
router.get("/contas-pendentes", AdminController.contasPendentes);
router.get("/emprestimos-pendentes", AdminController.emprestimosPendentes);

export default router;
