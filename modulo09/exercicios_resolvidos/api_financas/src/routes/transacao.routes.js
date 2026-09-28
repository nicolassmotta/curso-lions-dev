import { Router } from "express";
import TransacaoController from "../controllers/transacao.controller.js";
import autenticar from "../middlewares/autenticacao.middleware.js";

const router = Router();

router.use(autenticar);

router.post("/", TransacaoController.registrar);
router.get("/", TransacaoController.listarMinhas);

// Antes de "/:id", senão "resumo" seria lido como um id
router.get("/resumo", TransacaoController.resumo);

router.get("/:id", TransacaoController.buscarMinha);
router.patch("/:id", TransacaoController.atualizarMinha);
router.delete("/:id", TransacaoController.removerMinha);

export default router;
