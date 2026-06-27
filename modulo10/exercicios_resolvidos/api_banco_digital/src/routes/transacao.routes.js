import { Router } from "express";

import TransacaoController from "../controllers/transacao.controller.js";
import autenticar from "../middlewares/autenticacao.middleware.js";
import autorizar from "../middlewares/autorizacao.middleware.js";
import validarCampos from "../middlewares/validarCampos.middleware.js";

const router = Router();

router.use(autenticar);

router.post("/deposito", validarCampos(["contaId", "valorCentavos"]), TransacaoController.depositar);
router.post("/saque", validarCampos(["contaId", "valorCentavos"]), TransacaoController.sacar);
router.post("/transferencia", validarCampos(["contaOrigemId", "valorCentavos"]), TransacaoController.transferir);
router.get("/:id", TransacaoController.detalhar);
router.patch("/:id/aprovar", autorizar(["gerente", "admin"]), TransacaoController.aprovarPendente);
router.patch("/:id/recusar", autorizar(["gerente", "admin"]), TransacaoController.recusarPendente);
router.post("/:id/estorno", autorizar(["admin"]), TransacaoController.estornar);

export default router;
