import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import produto from "./produto.js"

dotenv.config()
const app = express()
const PORT = 3000

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB conectado com sucesso!`)
    } catch (error) {
        console.log(`Erro ao conectar o MongoDB`, error)   
    }
}

connectDB()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('API esta rodando!')
})

app.post('/', async (req, res) => {
    try {
        const novoProduto = await produto.create(req.body)
        res.status(201).json(novoProduto)
    } catch (error) {
        res.status(400).json({ message: `Erro ao criar um novo produto`, error: error.message})
    }
})

app.listen(PORT, () => console.log(`O servidor esta rodando na porta ${PORT}`))