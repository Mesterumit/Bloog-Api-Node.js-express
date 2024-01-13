const User = require('../models/User')
const ErrorResponse = require('../utils/ErrorResponse')

// Mock data
// {
//     "first_name":"Umit",
//     "last_name":"Mester",
//     "email":"umit@gmail.com",
//     "password":"654321"
// }
// @URL  POST/api/auth/register
exports.register = async(req,res)=>{
  
    const user = await User.create(req.body)
    res.status(200).json({
        success: true,
        //  I am using the "getToken()" method that i have created in User models.
        //  wehen user register, he will have a token under his name whis has his "Id"
        token : user.getToken(),
        message: "User registered succesfully"
    })
 }




// @URL  POST/api/auth/login
exports.login = async(req,res)=>{
    const {email, password} = req.body
    if(!email || !password)
     throw new ErrorResponse(400,"Please provide Email and Password")

    // check for the user
    const user = await User.findOne({email})
    if(!user)
    throw new ErrorResponse(401,"Invaid credentials") 

  // cheking the password
 const isMatch = await user.matchPassword(password)
 if(!isMatch)
 throw new ErrorResponse(401, "Invalid credentials")

 res.status(200).json({
    success:true,
    token : user.getToken(),
    message: "User succesfully loggedin"
 })


}

// @URL ALL /api/auth/logout
exports.logout = async(re,res)=>{
    res.status(200).json({
        success: true,
        message:"Remove token from browser data"
    })
}

// @URL PUT/api/auth/details
//  @access private (req.user)
exports.updateDeatils =async (req,res)=>{
    //  so in that way i can control which field can be updated by user
    //  i do pass this object in update method
    const fieldsToUpdate={
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email

    }
    const user = await User.findByIdAndUpdate(req.user._id,fieldsToUpdate,{new:true, runValidators:true})
    res.status(200).json({
        success: true,
        data: user
    })
}
// Mock data from user
// {
//     "currentPassword":"123456",
//     "newPassword":"654321"
// }

// @URL PUT/api/auth/password
//  @access private (req.user)
//  i am updateing password in here
//  it is because it is it complicated 
exports.updatePassword = async(req,res)=>{
    const user = await User.findById(req.user._id)
    // check current password
    const currentPasswordMatch = await user.matchPassword(req.body.currentPassword)
    if(!currentPasswordMatch)throw new ErrorResponse(401, "Invalid cradentials")

    // Update teh password
    user.password = req.body.newPassword;
    // save to db
    // whenever this "save " method will run then , it will look for save methods
    //  in "USER" Models
    await user.save()
    res.status(200).json({
        success:true,
        data:user
    })
}

