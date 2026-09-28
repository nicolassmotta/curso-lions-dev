import { Router } from "express";
import TarefaController from "../controllers/tarefa.controller.js";
import autenticar from "../middlewares/autenticacao.middleware.js";

const router = Router();

// Todas as rotas deste arquivo exigem token.
router.use(autenticar);

router.post("/", TarefaController.registrar);
router.get("/", TarefaController.listarMinhas);

// Bônus 3. Precisa vir ANTES de "/:id", senão o Express entende "resumo" como um id.
router.get("/resumo", TarefaController.resumo);

router.get("/:id", TarefaController.buscarMinha);
router.patch("/:id/concluir", TarefaController.concluirMinha);
router.patch("/:id", TarefaController.atualizarMinha);
router.delete("/:id", TarefaController.removerMinha);

export default router;
