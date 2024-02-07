const {Schema,model} =require('mongoose')
const slugify = require('slugify')


const PostSchema = new Schema({

title:{
    type:String,
    trim:true,
    required:[true, 'Post Title is required'],
    maxlength:[50, "Post Title can't be more than 50 characters"]
},
content:{
    type:String,
    trim:true,
    required:[true, 'content name is required']
},
image:{
    type:String,
    trim:true,
    default:"no-photo.jpg"
},
//  instead of id we can add something human readable
//  /api/paosts/new-post-2023
// i dont need to genaret it because i have a methond all the way down of this code for it
slug:String, 
published_date:Date,
status:{
    type:String,
    default:'unpublished',
    enum:['published','unpublished'],
},
category:{
    type:Schema.Types.ObjectId,
    ref:'Category',
    required:true
},
author:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true
    
}


},{timestamps:true})
//Create a slug
// console.log(slugify('A mon on the moon',{lower: true}))
// OutPUT is ('a-mon-on-the-moon) 
PostSchema.pre('save', function(next){
    this.slug = slugify(this.title,{lower:true})
    next()
})

// Add publish date
// this function will cehck if the publish date is updtae 
// if it is then it will update automaticly 
PostSchema.pre('save', function(next){
    if(this.status === 'published')
     this.published_date = new Date()
     
    else if(this.isModified('published')&& this.status === "published"){
        this.published_date = new Date()
    } 
     
    next()
})



module.exports = model('Post', PostSchema)



