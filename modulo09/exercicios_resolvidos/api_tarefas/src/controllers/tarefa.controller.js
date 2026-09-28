import TarefaService from "../services/tarefa.service.js";
import criarErro from "../utils/criarErro.js";

async function registrar(req, res, next) {
  try {
    const tarefa = await TarefaService.registrar(req.usuario.id, req.body);
    return res.status(201).json({ tarefa });
  } catch (error) {
    return next(error);
  }
}

async function listarMinhas(req, res, next) {
  try {
    // Bônus 1 e 2: filtros opcionais pela URL.
    // Query params chegam SEMPRE como texto, por isso convertemos "true"/"false".
    const filtro = {};

    if (req.query.concluida !== undefined) {
      if (req.query.concluida !== "true" && req.query.concluida !== "false") {
        throw criarErro("O filtro concluida deve ser true ou false.", 400);
      }
      filtro.concluida = req.query.concluida === "true";
    }

    if (req.query.prioridade !== undefined) {
      filtro.prioridade = req.query.prioridade;
    }

    const tarefas = await TarefaService.listarMinhas(req.usuario.id, filtro);
    return res.status(200).json({ tarefas });
  } catch (error) {
    return next(error);
  }
}

async function resumo(req, res, next) {
  try {
    const resultado = await TarefaService.resumoMeu(req.usuario.id);
    return res.status(200).json(resultado);
  } catch (error) {
    return next(error);
  }
}

async function buscarMinha(req, res, next) {
  try {
    const tarefa = await TarefaService.buscarMinha(req.usuario.id, req.params.id);
    return res.status(200).json({ tarefa });
  } catch (error) {
    return next(error);
  }
}

async function atualizarMinha(req, res, next) {
  try {
    const tarefa = await TarefaService.atualizarMinha(req.usuario.id, req.params.id, req.body);
    return res.status(200).json({ tarefa });
  } catch (error) {
    return next(error);
  }
}

async function concluirMinha(req, res, next) {
  try {
    const tarefa = await TarefaService.concluirMinha(req.usuario.id, req.params.id);
    return res.status(200).json({ tarefa });
  } catch (error) {
    return next(error);
  }
}

async function removerMinha(req, res, next) {
  try {
    const resultado = await TarefaService.removerMinha(req.usuario.id, req.params.id);
    return res.status(200).json(resultado);
  } catch (error) {
    return next(error);
  }
}

const TarefaController = {
  registrar,
  listarMinhas,
  resumo,
  buscarMinha,
  atualizarMinha,
  concluirMinha,
  removerMinha,
};

export default TarefaController;
