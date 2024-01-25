const Model = require('../models/Post')
const User = require('../models/User')
const View = require('../models/view')
const Like = require('../models/PostLike')
const Comment = require('../models/Comment')

// @URL   GET/api/posts
exports.list = async(req,res)=>{

    res.status(200).json(res.results)
}

// evreytime, read the post, it will get a views
// @URL   GET/api/posts/:id
exports.read = async(req,res)=>{

    const data = await Model.findById(req.params.id).populate('author','first_name')
    await View.create({postId:req.params.id, userId:req.user._id})
    const views = await View.find({postId:req.params.id})
    const comments = await Comment.find({postId:req.params.id}).populate('userId','email').select('content')
    const likes = await Like.find({postId:req.params.id}).populate('userId', 'email');
    // const user = await   User.find({first_name:req.user.first_name})
    req.body.user= req.user._id
    res.status(200).json({
        succes:true,
        views: views.length,
        likes: likes.length,
        likes,
        comments,
        data
        
    })
}

// @URL  POST / api/post
exports.create = async(req,res)=>{

    // need to add "auther" authamaticly 
    // we store the user in "req.user" in "protect" method
    // we can get this user "id" who has posted this post
    req.body.author = req.user._id

    // if uploading file image added it to the req.body
    if(req.file){
        req.body.image =req.file.originalname
    }
    const data = await Model.create(req.body)
    res.status(201).json({
        succes:true,
        data
    })
}

// @URL  PUT/api/posts/:id
exports.update = async(req,res)=>{

     // if uploading file image added it to the req.body
     if(req.file){
        req.body.image =req.file.originalname
    }

    const data = await Model.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
    res.status(202).json({
        succes:true,
        data
    })
}


//  @URL  delete/api/posts/:id
exports.delete = async(req,res)=>{

    const user = await Model.findById(req.params.id)
    await user.deleteOne()
    res.status(204).json({
        succes:true,
        data:{}
    })
}

