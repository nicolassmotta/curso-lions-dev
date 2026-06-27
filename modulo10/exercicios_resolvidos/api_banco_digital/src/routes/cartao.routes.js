import { Router } from "express";

import CartaoController from "../controllers/cartao.controller.js";
import autenticar from "../middlewares/autenticacao.middleware.js";
import autorizar from "../middlewares/autorizacao.middleware.js";
import validarCampos from "../middlewares/validarCampos.middleware.js";

const router = Router();

router.use(autenticar);

router.post("/", validarCampos(["contaId", "tipo", "senhaCartao"]), CartaoController.solicitar);
router.get("/", CartaoController.listar);
router.patch("/:id/status", autorizar(["gerente", "admin"]), validarCampos(["status"]), CartaoController.atualizarStatus);
router.post("/:id/compras", validarCampos(["valorCentavos", "estabelecimento", "senhaCartao"]), CartaoController.registrarCompra);
router.get("/:id/fatura", CartaoController.consultarFatura);
router.post("/:id/fatura/pagar", CartaoController.pagarFatura);

export default router;
