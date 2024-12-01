import { asyncHandler } from "../utils/asynchandler.js";
import{ApiError} from "../utils/ApiError.js"
import{ApiResponse} from "../utils/ApiResponse.js"
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const generateAccessTokenandRefreshToken=asyncHandler(async(_id)=>{

 try {

    const user=await User.findById(_id)

    const accessToken=user.generateAccessToken()
    const refreshToken= user.generateRefreshToken()

    user.refreshToken=refreshToken
    await user.save({validateBeforeSave:false})

    return {accessToken,refreshToken}
    
 } catch (error) {
    throw new ApiError(500,"Something went wrong while generating refreshToken")
    
 }

    

})
const register=asyncHandler(async(req,res)=>{

    const {username,email,password,fullName}=req.body

    if([username,email,password,fullName].some((field)=>{field?.trim()===""})){
        throw new ApiError(401,"All fields are required")
    }
  
    const userExisted=await User.findOne({
        $or:[{username},{email}]
        
    })
    
    if(userExisted){
        throw new ApiError(401,"User already exist")
    }


    // const avatarPath=req.files?.avatar[0]?.path
    const avatarPath=req.files.find(file=>file.fieldname === "avatar")?.path
    const coverImagePath=req.files.find(file=>file.fieldname === "coverImge")?.path

    if(!avatarPath){
        throw new ApiError(401,"avatar is required")
    }

    const avatar=await uploadOnCloudinary(avatarPath)
    const coverImage=await uploadOnCloudinary(coverImagePath)

    const user=await User.create({
        fullName,
        email,
        password,
        avatar:avatar.url,
        coverImage:coverImage?.url||"",
        username:username.toLowerCase()
    })

   const  userCreated=await User.findById(user._id).select(
    "-password -refreshToken"
   )
   if(!userCreated){
    throw new ApiError(500,"something went wrong while registering")
   }

   return res.status(201).json(
    new ApiResponse(
        201,
        "successfully registerd",
        userCreated
    )
   )
})

const loginUser=asyncHandler(async(req,res)=>{

    const {email,password}= req.body

    if(email==="" || password==="") throw new ApiError(401,"All fields are required")

    const user=User.findOne(email)

    if(!user)throw new ApiError(401,"User doesnot Exists With this email")

    const {accessToken,refreshToken}=generateAccessTokenandRefreshToken(user._id)

    const loggedInUser=await user.findById(user._id).select(
        " -password -refreshToken")


    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(201)
    .cookie(accessToken,"accessToken",options)
    .cookie(refreshToken,"refreshToken",options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )

})

const logoutUser=asyncHandler(async(req,res)=>{

    const user =await User.findById(req.user._id,{
        $unset :{
            refreshToken:1
        },
       
    }, {
        new:true
    }


   

)

const options={
    httpOnly:true,
    secure:ture

}


return res.status(201)
.clearCookie("accessToken",options)
.clearCookie("refreshToken",options)
.json(
    new ApiResponse(201,"Logged out successfully")
)



})

const getCurrentUser=asyncHandler(async(req,res)=>{
 

    return res.status(201)
    .json(
        new ApiResponse(201,req.user,"User loaded successfully")
    )
})

const updatePassword=asyncHandler(async(req,res)=>{

    const {oldPassword,newPassword,confirmPassword}=req.body

    const user =await findById(req.user._id)
    const passwordMatched=user.isPasswordCorrect(oldPassword)

    if(!passwordMatched) throw new ApiError(401,"Old Password is incorrect")

    if(newPassword!=confirmPassword) throw new ApiError(401,"new Password and confirm Password does not matched")

    // const changePassword=await User.findById(user._id,{
    //     $set:{
    //         password:newPassword
    //     }
    // })
    user.password = newPassword;
    user.save({ validateBeforeSave: false })

    return res.status(201).json(
        new ApiResponse(201,{},"Password changed successfully")
    )

})

const updateDetails=asyncHandler(async(req,res)=>{

    const {email,fullName}=req.body

    const user=await User.findById(req.user?._id,{
        $set:{
            fullName:fullName,
            email:email

        }
    },{
        new : true
    }).select("-password ")

    res.status(201).json(
        new ApiResponse(201,user,"Detail updated successfully")
    )




})

const updateAvatar=asyncHandler(async(req,res)=>{
    const avatarPath=req.files.find(file=>file.fieldname==="avatar")?.path
  

    if(!avatarPath)throw new ApiError(401,"avatar path is required")

    const avatar=await uploadOnCloudinary(avatarPath)
    if(!avatar.url) throw new ApiError(500,"Somthing went storing on cloudinary")
    const user =await User.findById(req.user?._id,{
        $set:{
            avatar:avatar.url
        }
    },{
        new:true
    }).select("-password")

    res.status(201,user,"avatar updated successfully")


})

const updateCoverImage=asyncHandler(async(req,res)=>{
    const coverImagePath=req.files.find(file=>file.fieldname==="coverImage")?.path
  

    if(!coverImagePath)throw new ApiError(401,"coverImage  Path  is required")

    const coverImage=await uploadOnCloudinary(avatarPath)
    if(!coverImage.url) throw new ApiError(500,"Somthing went storing on cloudinary")
    const user =await User.findById(req.user?._id,{
        $set:{
            coverImage:coverImage.url
        }
    },{
        new:true
    }).select("-password")

    res.status(201,user,"coverImage updated successfully")

})

const getUserChannelProfile=asyncHandler(async(req,res)=>{

})
 

const getWatchHistory=asyncHandler(async(req,res)=>{

})
export{register,loginUser,logoutUser,updateDetails,updatePassword,updateAvatar,updateCoverImage,getUserChannelProfile,getWatchHistory} 