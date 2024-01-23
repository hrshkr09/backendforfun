
//this file is for api errors

class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went  wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null; // study this
    this.message = message;
    this.success = false;
    this.errors = errors;

    //study this part
    if(stack){
        this.stack=stack
    }else{
        Error.captureStackTrace(this, this.constructor)
    }
  }
}


export {ApiError}