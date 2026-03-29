import mongoose from "mongoose"

const produtoSchema = new mongoose.Schema ({
    nome: String,
    preco: Number
})

export default mongoose.model(`produto`, produtoSchema)