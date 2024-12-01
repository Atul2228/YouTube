import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Video } from "../models/video.models.js";

const videoUpload=asyncHandler(async(req,res)=>{
    // form data
    // should not be null
    // video path
    // should not be null
    //thumbnail 
    // should not be null
    // duration

    const{title,description}=req.body

    if([title,description].some((field)=>{field?.trim()===""}))
    {
        throw new ApiError(401,"title and description is required")
    }
        const videoFil = req.files.find(file => file.fieldname === 'videoFile');
    const thumbnailFil = req.files.find(file => file.fieldname === 'thumbnail');
        const videoPath = videoFil?.path;
    const thumbnailPath = thumbnailFil?.path;

    if(videoPath==="" ){

 throw new ApiError(401,"video is required")

    }
    if(thumbnailPath===""){
        throw new ApiError(401,"thumbnail is required")

    }

    const videoFile=await uploadOnCloudinary(videoPath)
    const thumbnail=await uploadOnCloudinary(thumbnailPath)
    const videoDurationInSeconds=videoFile.duration
    

console.log(`Duration: ${minutes} minutes and ${seconds} seconds`);
    
   const duration =(videoDurationInSeconds / 100).toFixed(2);
  
    const video=await Video.create({
        title,
        description,
        videoFile:videoFile.url,
        thumbnail:thumbnail.url,
        duration
    })

    const videoUploaded=await Video.findById(video._id)

    if(!videoUploaded){
        throw new ApiError(500,"something went wrong while uploading video")
    }

    res.status(201).json(
        new ApiResponse(201,"video uploaded successfull",videoUploaded)
    )
})

const deletVideo=asyncHandler(async(req,res)=>{
    const {ownerId}=req.user._id
    const {videoId}=req.params
    const userOwner=await Video.findOne({
        owner:ownerId,
        _id:videoId
    
    })
    if(!userOwner) throw new ApiError(401,"You are not the owner of Video")
    
    const deletedVideo=await Video.findByIdAndDelete(videoId)

    if(!deletedVideo) throw new ApiError(201,"Video does not exist")





  res.status(201).json(201,deletedVideo,"Video Deleted Successfully")
})

const updateVideo=asyncHandler(async(req,res)=>{

    const {title,description}=req.body
    const {videoId}=req.params

    if(title==="" && description==="") throw new ApiError(201,"title and description are required")

    const updateVideo=await Video.updateOne(videoId,{
        $set:{
            title:title,
            description:description
        }
    },{
        new :true
    })



 res.status(201).json(201,updateVideo,"Video Update Successfully")

})

export{
    videoUpload,
    deletVideo,
    updateVideo
}



