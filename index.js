require('colors');
require('dotenv').config();
var cors = require('cors')
//  we add "express-async-errors" , so we can cominicate the erorr class we have extened
//  and we dont need to have "try and catch"
require('express-async-errors')
const express = require('express')

const app =express()
const path = require('path');
// const User = require('./models/User');

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '127.0.0.1'
const MODE =process.env.MODE  || 'production';

// connection to db
require('./config/db')()



// Middlewares
//Parse JSON
app.use(express.json()) // we are having the "req.body" in that way
// using cors, so i can use this "api" for front end
// CROS ORIGIN RESOURCE SHARING
app.use(cors())
// loger
app.use(require('./middlewares/logger'))
//set static folder
// if we use the path (static('public)) ==> it is absolute path
// so we need a relative path, we can't uset (express.static('path))
// Serve static files including JavaScript files with correct MIME type
app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));


// app.use(async(req,res,next)=>{
//     // in postman
//     // url?seach[first_name]=te
//     // this will help us to find the user in search bar, and end point in url

//     // so i will do filter method to find string from firts letter of it
//     //  in here i will use mogodb pattern
//     // i will look patter whith in string
//     // when it comes to patterns for string need to regularexpration
//     // and regex are suportted by mongodb not mongoose
//     // normaly u can find the user by user's name info "User.find({first_name:'umit})"
//     const user = await User.find({first_name:{$regex:'^u', $options:'i'}}).select('first_name last_name email').sort('-createdAt')
//     // select is helping us to show only information we want to
//     // "-createdAt" is doing as DESCEN
//     // these all methos such as "regex, select, sort" are providing by mongoose
//     console.log("user :" + user)
//     next()
// })


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