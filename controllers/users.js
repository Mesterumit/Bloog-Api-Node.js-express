const Model = require('../models/User')
const Post = require('../models/Post')
const View = require('../models/view')
const Comment = require('../models/Comment')
const Like = require('../models/PostLike')
// @URL   GET/api/users
exports.list = async(req,res)=>{

    res.status(200).json(res.results)
}

// @URL   GET/api/users/:id
exports.read = async(req,res)=>{

    const data = await Model.findById(req.params.id)

    res.status(200).json({
        succes:true,
        data
    })
}

// @URL  POST / api/users/
exports.create = async(req,res)=>{

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

// @URL  PUT/api/users/:id
exports.update = async(req,res)=>{

    const data = await Model.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
    res.status(202).json({
        succes:true,
        data
    })
}


//  @URL  delete/api/users/:id
exports.delete = async(req,res)=>{

    const user = await Model.findById(req.params.id)
    await user.deleteOne()
    res.status(204).json({
        succes:true,
        data:{}
    })
}

//  get posts by userId
// @URL GET '/api/users/:userId/posts', 
exports.usersPost = async(req, res) => {
    // req.body.author = req.user._id
    const userId = req.params.id
    await View.create({postId:req.params.id, userId:req.user._id})
    const views = await View.find({postId:req.params.id})
    const comments = await Comment.find({postId:req.params.id}).populate('userId','email').select('content')
    const likes = await Like.find({postId:req.params.id}).populate('userId', 'email');
    const userPosts = await  Post.find({author:userId, likes:likes, comments:comments,views:views, likes:likes.length})

    res.status(200).json({
        userPosts

    });
};


