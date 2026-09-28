import { Router } from "express";
import MatriculaController from "../controllers/matricula.controller.js";
import autenticar from "../middlewares/autenticacao.middleware.js";

const router = Router();

router.use(autenticar);

router.post("/", MatriculaController.registrar);
router.get("/", MatriculaController.listarMinhas);

// Bônus: antes de "/:id", senão "busca" e "resumo" seriam lidos como ids
router.get("/busca", MatriculaController.buscarPorModalidade);
router.get("/resumo", MatriculaController.resumo);

router.get("/:id", MatriculaController.buscarMinha);
router.patch("/:id", MatriculaController.atualizarMinha);
router.delete("/:id", MatriculaController.removerMinha);

export default router;
