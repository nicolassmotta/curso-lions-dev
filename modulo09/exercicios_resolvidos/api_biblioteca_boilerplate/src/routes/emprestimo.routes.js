import { Router } from "express";
import EmprestimoController from "../controllers/emprestimo.controller.js";
import autenticar from "../middlewares/autenticacao.middleware.js";

const router = Router();

router.use(autenticar);

router.post("/", EmprestimoController.registrar);
router.get("/", EmprestimoController.listarMeus);

// Bônus 1. Antes de "/:id", senão "relatorio" seria lido como um id
router.get("/relatorio", EmprestimoController.relatorio);

router.get("/:id", EmprestimoController.buscarMeu);
router.patch("/:id/status", EmprestimoController.alterarStatus);
router.delete("/:id", EmprestimoController.removerMeu);

export default router;
