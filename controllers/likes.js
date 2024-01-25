const Like = require('../models/PostLike')
const Post = require('../models/Post')
const ErrorResponse = require('../utils/ErrorResponse')


// Assuming the request body contains { postId: 'someValue', ...otherData }
// const liked = await Like.findOne({ userId: req.user._id, postId: req.body.postId });

//@URL Post/api/like
exports.createLike = async(req,res)=>{
    console.log('here in route')
    const liked = await Like.findOne({userId:req.user._id, postId:req.body.postId})
    if(liked)
        throw new ErrorResponse(403, ' You already liked the post')

    req.body.userId = req.user._id;
    const data = await Like.create(req.body)
    res.status(201).json({
        succes:true,
        data,
        message: 'Like added to the post'
    })
    
}

//@URL GET/api/like/:id
exports.remove = async(req,res)=>{
//     const data = await Like.findById(req.params.id)
//     await data.deleteOne()
//     res.status(202).json({
//         succes:true,
//         data:{}
//     })
// }

const data = await Like.findById(req.params.id);

if (!data) {
    return res.status(404).json({
        success: false,
        error: 'Like not found',
    });
}

await data.deleteOne();

res.status(202).json({
    success: true,
    data: {},
});
}

// I want to get specific "post" how many like it recived
// first i am getting the likes, after that, i am looking for the postId then i can look all the post with this id

//@URL GET/api/like/:postId/post
exports.getPostLikes = async(req,res)=>{
    const likes = await Like.find({postId: req.params.postId})
    const post = await Post.findById(req.params.postId)
    
    console.log(post)
    res.status(200).json({
        succes:true,
        count:likes.length,
        post
    })

}