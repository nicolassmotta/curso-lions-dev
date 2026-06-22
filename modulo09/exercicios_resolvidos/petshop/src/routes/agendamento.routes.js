import { Router } from "express";

import AgendamentoController from "../controllers/agendamento.controller.js";

const router = Router();

router.post("/api/agendamento/cadastro", AgendamentoController.cadastrar);

export default router;
