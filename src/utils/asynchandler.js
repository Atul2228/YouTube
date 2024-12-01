const asyncHandler=(handlerMethod)=>{
    return(req,res,next)=>{
        Promise.resolve(handlerMethod(req,res)).catch((error)=>next(error))

    }

}
export {asyncHandler}


