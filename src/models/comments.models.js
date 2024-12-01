import mongoose from "mongoose";
 const commentsSchema=new mongoose.Schema({
    content:{
        type:String,
        
    },
    vedio:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
 },{timeStamps:true})
 export const Comments=mongoose.model("Comments",commentsSchema)