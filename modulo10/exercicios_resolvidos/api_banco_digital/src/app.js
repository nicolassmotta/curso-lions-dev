import express from "express";

import adminRoutes from "./routes/admin.routes.js";
import authRoutes from "./routes/auth.routes.js";
import boletoRoutes from "./routes/boleto.routes.js";
import cartaoRoutes from "./routes/cartao.routes.js";
import contaRoutes from "./routes/conta.routes.js";
import emprestimoRoutes from "./routes/emprestimo.routes.js";
import pixRoutes from "./routes/pix.routes.js";
import transacaoRoutes from "./routes/transacao.routes.js";
import usuarioRoutes from "./routes/usuario.routes.js";
import erroMiddleware from "./middlewares/erro.middleware.js";
import criarErro from "./utils/criarErro.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "API LionsBank está rodando.",
    modulos: ["auth", "usuarios", "contas", "transacoes", "pix", "boletos", "cartoes", "emprestimos", "admin"],
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/contas", contaRoutes);
app.use("/api/transacoes", transacaoRoutes);
app.use("/api/pix", pixRoutes);
app.use("/api/boletos", boletoRoutes);
app.use("/api/cartoes", cartaoRoutes);
app.use("/api/emprestimos", emprestimoRoutes);
app.use("/api/admin", adminRoutes);

app.use((req, res, next) => {
  return next(criarErro("Rota não encontrada.", 404));
});

app.use(erroMiddleware);

export default app;
