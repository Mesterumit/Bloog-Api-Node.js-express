const {Schema, model} = require('mongoose')

const ProfileSchema = Schema({
    image:{
        type:String,
        trim:true,
        default:"no-photo.jpg"
    },
    adress:{
        type:String,
        required:true

    },
     userId:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
     }
})

module.exports= model('Profile', ProfileSchema)