const {connect} = require('mongoose')

const db = async()=>{
    try{
        const mongo = await connect(process.env.MONGODB)
        console.log(`Database connected : ${mongo.connection.host}`.yellow.underline)

    }catch(err){
        console.log(`DB coulcn't connected, Error : ${err.message}`.red)
    }
}
module.exports = db