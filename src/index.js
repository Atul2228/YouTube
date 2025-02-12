import dotenv from "dotenv"
import connectDB from "./DB/index.js"
import {app} from "./app.js"

dotenv.config({
    path:"./.env"
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT|| 8000,()=>{
        console.log(`listening at Port ${process.env.PORT}`);
    })
}
)
.catch((error)=>{
    console.log(`error from src/index.js ${error}`)
})