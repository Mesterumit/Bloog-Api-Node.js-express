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
    const decode = jwt.verify(token.process.env.JWT_SECRET)
    //  now al info about user in "req"
    req.user = await User.findById(decode.id)

    next()
} 

exports.authorize =(...roles)=>(req,res,next)=>{

    if(!roles.includes(req.body.role))
    throw new ErrorResponse(403, `User role ${req.body.role} is not authorized to access this route`)

    next()
}

exports.isAdminOrOwner =(req,res,next)=>{
    const userId = req.params?.id || null
    if(req.user && (req.user.role ==="admin" || req.user._id === userId))
       return next()
    else
    throw new ErrorResponse(403, "No Permission Admin login or account owner")

}