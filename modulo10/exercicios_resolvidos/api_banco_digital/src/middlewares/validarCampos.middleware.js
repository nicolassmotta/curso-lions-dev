import criarErro from "../utils/criarErro.js";

export default function validarCampos(camposObrigatorios = []) {
  return function validarCamposMiddleware(req, res, next) {
    const camposFaltando = camposObrigatorios.filter((campo) => req.body[campo] === undefined || req.body[campo] === null || req.body[campo] === "");

    if (camposFaltando.length > 0) {
      return next(criarErro(`Campos obrigatórios: ${camposFaltando.join(", ")}.`, 400));
    }

    return next();
  };
}
