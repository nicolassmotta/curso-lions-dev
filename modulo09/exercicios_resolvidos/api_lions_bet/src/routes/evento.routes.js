import { Router } from "express";
import EventoController from "../controllers/evento.controller.js";
import apenasAdmin from "../middlewares/apenasAdmin.middleware.js";
import autenticar from "../middlewares/autenticacao.middleware.js";

const router = Router();

// Sem router.use(autenticar): parte das rotas é pública.
// Os middlewares são aplicados rota a rota.

// Públicas (vitrine)
router.get("/", EventoController.listarAbertos);

// Admin. Estas rotas têm dois segmentos, então não colidem com "/:id".
router.get("/admin/todos", autenticar, apenasAdmin, EventoController.listarTodos);
router.get("/admin/relatorio", autenticar, apenasAdmin, EventoController.relatorio); // Bônus 3

router.get("/:id", EventoController.buscarPorId);

// Admin
router.post("/", autenticar, apenasAdmin, EventoController.criar);
router.patch("/:id/encerrar", autenticar, apenasAdmin, EventoController.encerrar);
router.patch("/:id", autenticar, apenasAdmin, EventoController.atualizarOdds);

export default router;
