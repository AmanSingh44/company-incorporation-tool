import "dotenv/config"
import express from "express"
import cors from "cors"
import { prisma } from "./lib/prisma.js"
import routes from "./routes/company.route.js"
import errorHandler from "./middlewares/errorHandler.js"
import { APP_ORIGIN, PORT } from "./constants/env.js"

const app=express()

app.use(express.json())

app.use(express.urlencoded({extended:true}))
app.use(
    cors({
        origin:APP_ORIGIN,
        credentials:true
    })
)

app.use("/api",routes)

app.use(errorHandler)

app.listen(PORT,async()=>{
    console.log(`Server sucessfully running at port ${PORT}`);
})


