import { Router } from "express";

import BoletoController from "../controllers/boleto.controller.js";
import autenticar from "../middlewares/autenticacao.middleware.js";
import validarCampos from "../middlewares/validarCampos.middleware.js";

const router = Router();

router.use(autenticar);

router.post("/", validarCampos(["contaId", "beneficiario", "valorCentavos", "dataVencimento"]), BoletoController.gerar);
router.get("/", BoletoController.listar);
router.get("/:id", BoletoController.detalhar);
router.post("/:id/pagar", BoletoController.pagar);
router.patch("/:id/cancelar", BoletoController.cancelar);

export default router;
