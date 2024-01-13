const jwt = require('jsonwebtoken')
const User = require('../models/User')
const ErrorResponse = require('../utils/ErrorResponse')


//  this protect method, checking if the user loggedin or not
exports.protect = async(req,res,next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        token = req.headers.authorization.split(' ')[1]

    if(!token)
    throw new ErrorResponse(401, 'Not authorize to access this router')

    // verifytoken
    // decod is an object that have the payload where we store the payload as an "id" in the user model to getToken method
    const decode = jwt.verify(token,process.env.JWT_SECRET)
    //  now all info about user is attached to the "req"
    req.user = await User.findById(decode.id)

    next()
} 

exports.authorize =(...roles)=>(req,res,next)=>{

    if(!roles.includes(req.user.role))
    throw new ErrorResponse(403, `User role ${req.user.role} is not authorized to access this route`)

    next()
}

exports.isAdminOrOwner =(req,res,next)=>{
    const userId = req.params?.id || null
    if(req.user && (req.user.role ==="admin" || req.user._id.toString() === userId))
       return next()
    else
    throw new ErrorResponse(403, "No Permission Admin login or account owner")

}