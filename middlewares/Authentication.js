const jwt = require('jsonwebtoken')
const User = require('../models/User')
const ErrorResponse = require('../utils/ErrorResponse')
const Profile = require('../models/Profile')


//  this protect method, checking if the user loggedin or not
exports.protect = async(req,res,next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        token = req.headers.authorization.split(' ')[1]

    if(!token)
    throw new ErrorResponse(401, 'Not authorize to access this router')

    // verifytoken
    // decod is an object that have the payload 
    //where we store the payload as an "id" in the user model to getToken method
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

exports.isAdminOrOwner=(model, filterName) =>async(req,res,next)=>{
    // in here, i am  looking for the profile with the profile's "id"
    const resource = await model.findOne({_id: req.params.id})
    // "resource" is giving the profile with "id, image, adress and userId"
    console.log("resource :" + resource)
    // "req.params.id" is giving the profile's id
    console.log(req.params.id)
    // in this if condition, i cehk the user and his role
    //"resource[filterName]" fro this part , it is coming from Profile's route
    // it is sending "Model of PRPFILE AND userId" , it is route go and check to see
    // so in here, it compares the "userId" in profile's object to the userId from user's login
    // resource :{
    //     _id: new ObjectId('65a5b1864bbab7ca06a9a545'), // profile id. ""req.params.id""
    //     image: 'profile-image.jpeg',
    //     adress: '10 howel st, MA,newtonville',            filterName become as userId from route
    //     userId: new ObjectId('658f8094e9b28f12fb0f447a'),resource[filterName].toString()===req.user._id.toString()
    //     __v: 0
    //   }
    if(req.user && (req.user.role === 'admin' || resource[filterName].toString()===req.user._id.toString())){
        return next()
    }else{
       throw new ErrorResponse(403, 'No Permission Admin login or account owner')
    }
   
}