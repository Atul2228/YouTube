import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema=new mongoose.Schema({
username:{
    type:String,
    required:true,
    unique:true
},
fullName:{
    type:String,
    required:true,

},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true
},
avatar:{
    type:String,
    required:true

},
coverImage:{
    type:String,

},
watchHistory:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Vedio"
}],
refreshToken:{
    type:String
}

},{timestamsp:true})

userSchema.pre("save",async function(next){
    if(!this.isModified) return next()
    this.password= bcrypt.hash(this.password,10)
    next()
})
userSchema.methods.isPasswordCorrect= async function(password){
    if(!password) return null
    return await bcrypt.compare(password,this.password)
    
}

userSchema.methods.generateAccessToken=async function(){
    jwt.sign({
       _id:this._id
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY

    })

}

userSchema.methods.generateRefreshToken=async function(){
    jwt.sign({
       _id:this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY

    })

}



export const User=mongoose.model("User",userSchema)