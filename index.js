require('colors');
require('dotenv').config();
//  we add "express-async-errors" , so we can cominicate the erorr class we have extened
//  and we dont need to have "try and catch"
require('express-async-errors')
const express = require('express')
const app =express()
const path = require('path')

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '127.0.0.1'
const MODE =process.env.MODE  || 'production';

// connection to db
require('./config/db')()


// Middlewares
//Parse JSON
app.use(express.json()) // we are having the "req.body" in that way
// loger
app.use(require('./middlewares/logger'))
//set static folder
// if we use the path (static('public)) ==> it is absolute path
// so we need a relative path, we can't uset (express.static('path))
app.use(express.static(path.join(__dirname,'public')))


// App Routes
app.use('/api', require('./routes'))

//Error Handler
app.use(require('./middlewares/errorHandler'))


//Run the server
const server = app.listen(PORT, console.log(`Server is running in ${MODE} mode on http://${HOST}:${PORT}`.blue.underline))
// unHandle rejectios
process.on('unhandledRejection', (error, promise)=>{
    console.log(`Error : ${error.message}`.red);
    server.close(()=>{
        console.log(`Server Stopped!!`.red.underline)
        process.exit(1);
    })
})