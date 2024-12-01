import mongoose from "mongoose";
import { DB_Name } from "../constants.js";
const connectDB=async()=>{
    try {
        const connectionInstanc=await mongoose.connect(`${process.env.DB_URI}/${DB_Name}`)
        console.log(`database connected || ${connectionInstanc}`);
        
    } catch (error) {
        console.log(`error is ${error}`);
        process.exit(1)
        
        
    }
}
export default connectDB
