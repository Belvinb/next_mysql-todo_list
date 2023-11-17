import express from "express"
import mysql from "mysql"
import dotenv from "dotenv"
import cors from "cors"

import to_doRouter from "./routes/to_doRoutes.js"
const app = express()

app.use(cors())

app.use(express.json())

dotenv.config()

export const  db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:process.env.MYSQLPWD ,
    database:"to_do"
})

// export default db

app.get("/",(req,res)=>{
    res.send("Hello from backend")
})

app.use("/todo",to_doRouter)

app.listen(process.env.PORT,()=>{
    console.log("connected to backend");
})