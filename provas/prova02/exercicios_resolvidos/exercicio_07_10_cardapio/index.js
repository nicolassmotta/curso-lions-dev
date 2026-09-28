// API do cardápio (exercícios 7 a 10). Rode: npm install && npm start
import express from "express"
import pratosRoutes from "./routes/pratos.routes.js"
import { logar } from "./middlewares.js"

const app = express()
app.use(express.json())
app.use(logar)
app.use("/pratos", pratosRoutes)

app.listen(3000, () => console.log("API do cardápio na porta 3000"))
