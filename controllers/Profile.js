const Profile = require('../models/Profile')
const ErrorResponse = require('../utils/ErrorResponse')

// @URL Get/api/profile/
exports.list = async(req,res)=>{

    const data = await Profile.find()
    console.log(data)
    res.status(200).json({succes:true, data})
}
// @URL POST/api/profile/
exports.create =async(req,res)=>{

    // check if the user has a profile
    const profile = await Profile.findOne({userId: req.user._id})
    if(profile){
        throw new ErrorResponse(403, 'Alreday has a profile')
    }

    // Add the loggedin user info
    req.body.userId = req.user._id
    // add the image to the req.body
    if(req?.file){
        req.body.image = req.file.originalname
    }
    const data = await Profile.create(req.body)
    console.log(data)
    res.status(201).json({
        succes: true,
        data
    })

}
//@URL   GET/api/profile/:id
exports.read =async(req,res) =>{

   
    const data = await Profile.findById(req.params.id).populate('userId')

    res.status(200).json({
        succes: true,
        data
    })

}
// @URL PUT/api/profile/:id
exports.update =async(req,res) =>{

     // if uploading file image added it to the req.body
     if(req.file){
        req.body.image =req.file.originalname
    }
   console.log("profile id :" +req.params.id)
    const data = await Profile.findByIdAndUpdate(req.params.id, req.body,{new:true, runValidators:true})

    res.status(202).json({
        succes: true,
        data
    })

}

// @URL DELETE/api/profile/:id
exports.delete =async(req,res)=> {

   
    const data = await Profile.findById(req.params.id)
    await data.deleteOne()

    res.status(204).json({
        succes: true,
        data:{}
    })

}


