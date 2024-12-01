// class ApiError extends Error{
//     constructor(
//         message="Something went wrong",
//         statusCode,
//         errors=[],
//         stack=""
//     ){
//         super(message)
//         this.statusCode=statusCode
//         this.errors=errors
//         this.data=null
//         this.success=false
//         this.message=message


//         if(stack){
//             this.stack
//         }
//         else{
//             Error.captureStackTrace(this,this.constructor)
//         }

//     }
// }
// export {ApiError}


class ApiError extends Error{
    constructor(
        statusCode,
        message="Something went wrong",
        errors=[],
        stack=""
    ){
        super(message)
        this.statusCode=statusCode
        this.message=message
        this.errors=errors
        this.success=false
        this.data=null

        if(stack!=null){
            this.stac=stack
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }

    }
}

export {ApiError}