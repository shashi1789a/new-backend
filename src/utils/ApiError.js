class ApiError extends Error{
    constructor(
        statusCode,
        massage= "something went wrong",
        errors = [],
        stack = ""
    ){
        super(massage)
        this.statusCode = statusCode
        this.data = null
        this.massage
        this.success = false;
        this.errors = errors


        if(stack){
            this.stack = stack
        
        } else{
            Error.captureStackTrace(this, this.
                constructor)
        }

    }
} 


export {ApiError} 