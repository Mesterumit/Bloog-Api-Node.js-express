const swaggerAutogen = require('swagger-autogen')();

const doc={
    info:{
        title:'Blog platform API'
    }
}

const routes =['./index.js']
const outPutFile = './swagger.json';

swaggerAutogen(outPutFile,routes,doc)