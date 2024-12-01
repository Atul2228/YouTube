import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asynchandler.js";
import { Comments } from "../models/comments.models.js";
import { ApiResponse } from "../utils/ApiResponse";

const createNewComment=asyncHandler(async(req,res)=>{

    const owner=req.user._id
    const {content}=req.body
    const {videoId}=req.params
    
    if(content.trim()==="") throw new ApiError(401,"Please Provide content")

        const comment=await Comments.create({
            content:content,
            vedio:videoId,
            owner:owner
        })

        if(!comment) throw new ApiError(401,"Something went wront while creating comment")

            return res.status(201).json(
                new ApiResponse(201,comment,"comment created successfully")
            )


})

const deleteComment=asyncHandler(async(req,res)=>{
        const {commentId}=req.params
        const deletedComment=await Comments.findByIdAndDelete(commentId)
        if(!deletedComment) throw new ApiError(401,"Something went wrong while deleting comment")

        return res.status(201).json(
            new ApiResponse(201,deleteComment,"Comment deleted successfully")
        )

})

const replyToComment=asyncHandler(async(req,res)=>{

    const {commentId}=req.params
    


})

const getVideoComments=asyncHandler(async(req,res)=>{
    const {videoId}=req.params
    if(!videoId) throw new ApiError(401,"video id is required")
    const videoComments=await Comments.find({
        vedio:videoId
    })

    if(!videoComments) throw new ApiError(401,"No  comments for this video are available")
    
    return res.status(201).json(201,videoComments,"Video Comments Loaded Successfully")


})

export{
    createNewComment,
    deleteComment,
    replyToComment,
    getVideoComments
}

