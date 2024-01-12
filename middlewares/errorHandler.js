const ErrorResponse = require('../utils/ErrorResponse')

module.exports =(err, req, res,next)=>{
     let error ={...err}
   //    in order to concert the err object to an array
   // we have to wait then we can convert the all of the costume error to an array
     error.message = err.message;

console.log(error.message)
console.log(err.stack.red)
console.log(err)

// if (err.code) {
//    console.log(`Error Code: ${err.code}`); // Log the error code
//  }

     // Mongoose validation errors
     if(err.name === "ValidationError"){
      // console.log(err)
      //  we need to go in to object "error.errors" we need to have an "errors"
      //  because it is in the error and all of the error values are in the object of "errors"
      // we convert it onto an array so we can loop throug the array and only get the message that we have createed in user models
      // console.log(Object.values(error.errors).map(item => item.message))
      const message = Object.values(error.errors).map(item => item.message).join(', ')
      error =  new ErrorResponse(404, message)
     }

   //   Mongoose dublicate Key
   if (error.code === 11000) {
      // Handle the duplicate key error (e.g., send an error response)
      error = new ErrorResponse(404, "Duplicate field value entered")
   }

     res.status(error.statusCode || 500).json({
        succes: false,
        error: error.message || 'Server Error'
     })


}