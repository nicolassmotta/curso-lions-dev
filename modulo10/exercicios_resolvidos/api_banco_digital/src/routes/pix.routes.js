import { Router } from "express";

import PixController from "../controllers/pix.controller.js";
import autenticar from "../middlewares/autenticacao.middleware.js";
import validarCampos from "../middlewares/validarCampos.middleware.js";

const router = Router();

router.use(autenticar);

router.post("/chaves", validarCampos(["contaId", "tipo"]), PixController.cadastrarChave);
router.get("/chaves", PixController.listarChaves);
router.delete("/chaves/:id", PixController.removerChave);
router.post("/enviar", validarCampos(["contaOrigemId", "chavePix", "valorCentavos"]), PixController.enviarPix);
router.get("/limites", PixController.consultarLimites);

export default router;
