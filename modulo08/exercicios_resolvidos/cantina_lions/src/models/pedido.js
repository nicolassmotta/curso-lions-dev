import mongoose from "mongoose";

const PedidoSchema = new mongoose.Schema({
  nomeCliente: {
    type: String,
    required: [true, "O nome do cliente é obrigatório."],
    trim: true,
  },
  item: {
    type: String,
    required: [true, "O item é obrigatório."],
    enum: {
      values: ["Salgado", "Suco", "Combo", "Bolo"],
      message: "O item deve ser Salgado, Suco, Combo ou Bolo.",
    },
  },
  quantidade: {
    type: Number,
    required: [true, "A quantidade é obrigatória."],
    min: [1, "A quantidade mínima é 1."],
  },
  formaPagamento: {
    type: String,
    required: [true, "A forma de pagamento é obrigatória."],
    enum: {
      values: ["Dinheiro", "Pix", "Cartão"],
      message: "A forma de pagamento deve ser Dinheiro, Pix ou Cartão.",
    },
  },
  observacao: {
    type: String,
  },
  valorUnitario: {
    type: Number,
  },
  valorTotal: {
    type: Number,
  },
  status: {
    type: String,
    default: "Pendente",
    enum: {
      values: ["Pendente", "Pago", "Entregue"],
      message: "O status deve ser Pendente, Pago ou Entregue.",
    },
  },
});

export default mongoose.model("Pedido", PedidoSchema);
