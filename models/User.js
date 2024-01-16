const {Schema,model} =require('mongoose')
const {genSalt,hash, compare} = require('bcryptjs')
const jwt = require('jsonwebtoken')


const UserSchema = new Schema({

first_name:{
    type:String,
    trim:true,
    required:[true, 'First_name is required'], 
    unique:true
},
last_name:{
    type:String,
    trim:true,
    required:[true, 'Last_name is required'],
    unique:true
},
email:{
    type:String,
    trim:true,
    required:[true, 'Email is required'],
    unique:true,
    match :[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,'Please provide valid email'],
  
},
password:{
    type:String,
    trim:true,
    required:[true, 'Password is required'],
    minlength: 6,
   
},
role:{
    type:String,
    trim:true,
    enum :['admin','user'],
    default:'user'
   
},



},{timestamps:true})

UserSchema.pre('save',async function(next){
    //  we use "isModified" because in auth file
    //  we have have update methdo which update only, usrername, mail,lastname
    //  it doesnt update "password" so wehenever it is update other fiels , i dont want to hash the password again
    // i have a differnt methdo to update password in auth file
    if(!this.isModified('password')) next()
    const salt = await genSalt(10)
    this.password = await hash(this.password, salt)
    next()
})
// compare passsword
UserSchema.methods.matchPassword = async function(enteredPassword){
    return compare(enteredPassword, this.password)
}


// Generate JWT token 
UserSchema.methods.getToken= function (){
    //  the first argument is payload (we are checking that in Autherization middleware to protect routes)
    //and we are verifying the token and get the "decode" which has  "id" in it
    //  that i want to hide whitin the token
    // and this user will have an "_id"
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRE})
}
module.exports = model('User', UserSchema)