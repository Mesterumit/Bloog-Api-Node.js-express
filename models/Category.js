const {Schema,model} =require('mongoose')

const CategorySchema = new Schema({

name:{
    type:String,
    trim:true,
    required:[true, 'Ctagory name is required']
}


},{timestamps:true})

module.exports = model('Category', CategorySchema)