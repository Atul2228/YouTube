import { asyncHandler } from "../utils/asynchandler.js";

import { Like } from "../models/likes.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const togglerVideoLike=asyncHandler(async(req,res)=>{
    const {videoId}=req.params
    const likedBy=req.user._id

    const videoLike=await Like.findByIdAndDelete({
        video:videoId,
        likedBy:likedBy
    })
    if(!videoLike){
       const liked= await Like.create({
            video:videoId,
            likedBy:likedBy
        })

        return true
    }
    return false



})

const toggleCommentLike=asyncHandler(async(req,res)=>{
    const {commentId}=req.params

   
    const likedBy=req.user._id

    const videoLike=await Like.findByIdAndDelete({
        comment:commentId,
        likedBy:likedBy
    })
    if(!videoLike){
       const liked= await Like.create({
        comment:commentId,
        likedBy:likedBy
        })

        return true
    }
    return false



    


})
const getLikedVideos=asyncHandler(async(req,res)=>{
    const likedBy=req.user._id
    const likedVideos=await Like.find({
        likedBy:likedBy,
        video:{ $exists: true }
    })

     return res.status(201).json(
        new ApiResponse(201,likedVideos,"All liked videos are fetched")
     )



})

export {
    toggleCommentLike,
    togglerVideoLike,
    getLikedVideos
}