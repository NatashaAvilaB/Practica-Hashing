import "dotenv/config"
import express from "express"
import morgan from "morgan"
import cors from "cors"
import indexRoutes from "./routes/index.routes.js"
import usersRoutes from "./routes/users.routes.js"
import loginRoutes from "./routes/login.routes.js"

const app = express()

app.use(cors())               // Permite peticiones desde el frontend
app.use(morgan("dev"))
app.use(express.json())

app.use(indexRoutes)
app.use(usersRoutes)
app.use(loginRoutes)

const PORT = 5000

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
