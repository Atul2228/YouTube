import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app=express()
app.use(cors(
    {
        origin:process.env.ORIGIN,
        credentials:true
    }
 ))


app.use(express.json({limit:"16kb"}))
app.use(urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//import router

import userRouter from "./router/user.router.js"
import videoRouter from "./router/video.router.js"


//
app.use("/api/v1/user",userRouter)
app.use("/api/v1/video",videoRouter)



export {app}