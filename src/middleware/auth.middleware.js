import { asyncHandler } from "../utils/asynchandler.js";
import jwt from "jsonwebtoken"
// import {User} from "../models/user.models.js"
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";


const JWTverify=asyncHandler(async(req,res,next)=>{
  
  try {
    const  {token}=req.cookies?.accessToken || req.header("Autherisation")?.replace(Bearer,"")
    if(!token)throw new ApiError(401,"Unautherised Access")


    const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    const user=await  User.findById(decodedToken?._id).select(
        "-password -refreshToken")

        if(!user) throw new ApiError(401,"Invalid Access Token")
            req.user=user
        next()
    
  } catch (error) {
    throw new ApiError(400,error?.message|| "invalid accessToken")
    
  }
 



})

export {JWTverify}