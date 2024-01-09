const express = require('express');
const xssClean = require('xss-clean');
const cookieParser = require('cookie-parser');
const authorRouter = require('./routes/authorRoutes');
const bookRouter = require('./routes/bookRoutes')


const app = express();

//body parser , reading data from body into req.body
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

//data sanitization against XSS
app.use(xssClean());

//Routes
app.use('/api/v1/authors',authorRouter)
app.use('/api/v1/books',bookRouter)

//for all the other requested data will send an error 

app.all('*',(req,res,next)=>{
    res.status(404).json({
        status:'fail',
        message: `Can't find ${req.originalUrl} on this server`,
    });
})



module.exports = app;