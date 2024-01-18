const Comment = require('../models/Comment')
const Post = require('../models/Post')

//@URL GET/api/comments
exports.list = async(req,res)=>{
    res.status(200).json(res.results)
}

//@URL GET/api/comments/:id
exports.read = async(req,res)=>{
    const data = await Comment.findById(req.params.id)
    res.status(200).json({
        succes:true,
        data
    })
}
//@URL Post/api/comments/
exports.create = async(req,res)=>{
    req.body.userId = req.user._id
    const data = await Comment.create(req.body)
    res.status(201).json({
        succes:true,
        data
    })
}
//@URL Put/api/comments/:id
exports.update = async(req,res)=>{
    const data = await Comment.findByIdAndUpdate(req,params.id, req.body, {new:true, runValidators:true})
    res.status(202).json({
        succes:true,
        data
    })
}
//@URL Delete/api/comments/:id
exports.delete = async(req,res)=>{
    const data = await Comment.findById(req.params.id)
    await data.deleteOne()
    res.status(202).json({
        succes:true,
        data:{}
    })
}

// Use req.params.postId when the postId is part of the route parameters,
//  often used in routes where the postId is part of the URL.
// Assuming the route is defined as "/posts/:postId"
// and the URL is "/posts/someValue"
// geeting specific post comment
 
// @URL GET/api/comments/:postId/post
exports.getPostComments = async(req,res)=>{
    const comments = await Comment.find({postId:req.params.postId})
    const post = await Post.findById(req.params.postId) 
    res.status(200).json({
        succes:true,
        post,
        comments
    })

}