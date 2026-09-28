import { Router } from "express";
import MaterialController from "../controllers/material.controller.js";
import autenticar from "../middlewares/autenticacao.middleware.js";

const router = Router();

router.use(autenticar);

router.post("/", MaterialController.registrar);
router.get("/", MaterialController.listarMeus);

// Antes de "/:id", senão "disponiveis" seria lido como um id
router.get("/disponiveis", MaterialController.listarDisponiveis);
router.get("/:id", MaterialController.buscarMeu);

export default router;
