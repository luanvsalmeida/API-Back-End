const swaggerAutogen = require('swagger-autogen')();

let output = './swagger_doc.json';
let endpoints = [
    './routes/adminRoutes.js',
    './routes/authRoutes.js',    
    './routes/bookRoutes.js',
    './routes/customerRoutes.js',
    './routes/index.js',
    './routes/itemRoutes.js',
    './routes/orderRoutes.js'
]

swaggerAutogen(output, endpoints);