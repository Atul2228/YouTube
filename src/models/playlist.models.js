import mongoose from "mongoose";
 const playlistSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    vedios:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"
    }],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
 },{timeStamps:true})
 export const PlayList=mongoose.model("PlayList",playlistSchema)