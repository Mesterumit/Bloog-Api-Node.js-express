const {Schema, model} = require("mongoose")


const likeSchema = new Schema({
userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
       },
postId:{
        type:Schema.Types.ObjectId,
        ref:'Post',
        required:true
      }
})

module.exports = model('Like',likeSchema  )