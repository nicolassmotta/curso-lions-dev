export default function erroMiddleware(error, req, res, next) {
  if (error.name === "ValidationError") {
    const mensagens = [];

    for (const campo in error.errors) {
      mensagens.push(error.errors[campo].message);
    }

    return res.status(400).json({ message: mensagens.join(" ") });
  }

  if (error.name === "CastError") {
    return res.status(400).json({ message: "ID inválido." });
  }

  if (error.code === 11000) {
    const campo = Object.keys(error.keyPattern || error.keyValue || {})[0] || "campo";
    return res.status(409).json({ message: `${campo} já cadastrado.` });
  }

  const status = error.status || 500;
  const message = error.message || "Erro interno do servidor.";

  if (status >= 500) {
    console.error(error);
  }

  return res.status(status).json({ message });
}
