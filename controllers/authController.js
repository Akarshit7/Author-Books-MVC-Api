const jwt = require('jsonwebtoken');
const { userCredentials } = require("../data/loginData");
const { authors } = require('../data/fakeData');


const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const createSendToken = (id, statusCode, req, res) => {
    const token = signToken(id);
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
      secure: req.secure,
    };
    res.cookie('jwt', token, cookieOptions);

    res.status(statusCode).json({
      status: 'success',
      token: token,
      data: {
        id
      },
    });
  };


exports.login = async(req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password ){
        return res.status(400).json({
            status:'failed',
            message:"Please provide email and password"
        })
    }
    const author = authors.find(author=>author.email===email);
    if(!author || password!==userCredentials.password){
        return res.status(401).json({
            status:"failed",
            message:"Incorrect mail or Password"
        })
    }
    
    createSendToken(author.id, 200, req, res);


}


exports.protect= async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }
    else if(req.cookie && req.cookie.jwt ){
        token = req.cookie.jwt;
    }
    if(!token){
        return res.status(401).json({
            status:"failed",
            message:"You are not logged in! Please login to get access"
        })
    }

    const decoded = await jwt.verify(token,process.env.JWT_SECRET);
    const user = authors.find(author=>author.id===decoded.id);
    if(!user){
        return res.status(401).json({
            status:"failed",
            message:"You are not logged in! Please login to get access"
        })
    }
    req.userId = user.id;
    next();
}