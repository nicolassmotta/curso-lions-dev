import { Router } from "express";
import ApostaController from "../controllers/aposta.controller.js";
import apenasAdmin from "../middlewares/apenasAdmin.middleware.js";
import autenticar from "../middlewares/autenticacao.middleware.js";

const router = Router();

// Tudo aqui exige login.
router.use(autenticar);

router.post("/", ApostaController.apostar);
router.get("/", ApostaController.listarMinhas);

// Admin. autenticar já rodou no router.use acima.
router.get("/admin/todas", apenasAdmin, ApostaController.listarTodas);

router.get("/:id", ApostaController.buscarMinha);

export default router;
