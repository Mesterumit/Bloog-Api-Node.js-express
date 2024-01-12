const morgan = require('morgan')
const fs = require('fs')

const [date, time] = new Date().toISOString().split('T')

// we need to have a "falgs:'a+' ", so we need to append teh file
// in that way, when we refresh the server , tje log file will be staying there
module.exports = morgan('combined',{
    stream: fs.createWriteStream(`./logs/${date}.log`,{flags:'a+'})
})