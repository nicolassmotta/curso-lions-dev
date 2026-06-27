import { Router } from "express";

import EmprestimoController from "../controllers/emprestimo.controller.js";
import autenticar from "../middlewares/autenticacao.middleware.js";
import autorizar from "../middlewares/autorizacao.middleware.js";
import validarCampos from "../middlewares/validarCampos.middleware.js";

const router = Router();

router.use(autenticar);

router.post("/simular", validarCampos(["valorSolicitadoCentavos", "quantidadeParcelas"]), EmprestimoController.simular);
router.post("/", validarCampos(["contaId", "valorSolicitadoCentavos", "quantidadeParcelas"]), EmprestimoController.solicitar);
router.get("/", EmprestimoController.listar);
router.get("/:id", EmprestimoController.detalhar);
router.patch("/:id/aprovar", autorizar(["gerente", "admin"]), EmprestimoController.aprovar);
router.patch("/:id/reprovar", autorizar(["gerente", "admin"]), EmprestimoController.reprovar);
router.post("/:id/parcelas/:numero/pagar", EmprestimoController.pagarParcela);

export default router;
