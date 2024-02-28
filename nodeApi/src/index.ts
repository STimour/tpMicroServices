import express from "express"
import dotenv from "dotenv"
import "dotenv/config"
import cors from "cors"
import bodyParser from "body-parser"
import { Dialect, Sequelize } from "sequelize"
import { voiture } from "./model/voiture"
import { user } from "./model/user"
import { authRouter } from "./routes/userRout"
import { voitureRouter } from "./routes/voitureRout"


dotenv.config()



export const sequelize = new Sequelize(
  process.env.DB_STRING!,
  {
    dialect: "postgres" as Dialect,
  }
)

user()
voiture()

//sequelize.sync({force: true}).then(() => 
//    console.log('Base de données synchronisée et remis à zéro')
//)
sequelize.sync().then(() => 
    console.log('Base de données synchronisée')
)


const app = express()
const PORT = process.env.PORT || 3030

app.use(cors())
app.use(express.json())

const apiRouter = express.Router()
app.use("/api", apiRouter)

apiRouter.use("/user", authRouter)
apiRouter.use("/voitures", voitureRouter)

app.listen(PORT, () => {
  console.log(`Le serveur fonctionne sur le port ${PORT}`)
})
