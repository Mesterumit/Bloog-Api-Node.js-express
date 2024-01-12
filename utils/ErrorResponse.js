class ErrorResponse extends Error {
    constructor(statusCode, message){
        super(message);
        this.statusCode = statusCode;
    }
}
module.exports = ErrorResponse
// threoing error is just costumizing the error and throwing it, with the error code u like
// throw new ErrorResponse(404,'Not Found')

// const obj=  new ErrorResponse(404,'Not Found')
// console.log(obj.statuscode) // which is "404" or we can reach the message