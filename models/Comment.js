const {Schema, model} = require("mongoose")

const commentSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    postId:{
        type:Schema.Types.ObjectId,
        ref:'Post',
        required:true
        },
    content:{
        type:String,
        required: true
    }
},{timestamps:true})

module.exports = model('Comment', commentSchema)