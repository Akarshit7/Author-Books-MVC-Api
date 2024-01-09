const dotenv = require('dotenv')
const {authors,books}  = require('./data/fakeData')
dotenv.config({
    path:'./config.env'
})

//just in case the server gets crash
process.on('uncaughtException', (err) => {
    console.log('Unhandled exception. Shutting down application....');
    console.log(err.name, err.message);
    process.exit(1);
  });

  const app = require('./app');

//starting the server 
const port = process.env.PORT || 3000;
const server = app.listen(port,()=>{
    console.log(`server started on port ${port}`)
})
