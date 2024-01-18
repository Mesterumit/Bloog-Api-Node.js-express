const View = require('../models/view')




exports.getUserViews = async(req,res)=>{
    const views = await View.find({userId:req.user._id}).populate('postId', 'title')
    // console.log(views)
    res.status(200).json({
        succes:true,
        views : views.length,
        views
    })
}