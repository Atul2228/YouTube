import mongoose from "mongoose";
 const likeSchema=new mongoose.Schema({

    Comment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comments"
    },
    video:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"
    },
    likedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
 },{timeStamps:true})
 export const Like=mongoose.model("Like",likeSchema)

