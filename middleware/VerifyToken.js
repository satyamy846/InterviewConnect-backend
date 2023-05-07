const jwt = require('jsonwebtoken');
const CustomError = require("../utils/errorHandler");

const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token){
        return next(CustomError(401,"Unauthorized user"));
    }

    jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
        if(err) return next(CustomError(403,"Token is not Valid!"));
        req.user = user;
        // console.log(req.user);
        next();
    })
}

const verifyUser = (req,res,next)=>{
    verifyToken(req,res,next, ()=>{
        if(req.user.id === req.params.id) next();
        else{
            return next(CustomError(403,"You are not authorized user")); 
        } 
    })
}


const verifyAdmin = (request,response,next)=>{
    // console.log(request.user);
    verifyToken(request,response,next, ()=>{
        // console.log(request.user.admin);
        if(request.user.admin) {
            console.log("Hello");
            next()
        }
        else{
            return next(CustomError(403,"You are not authorized admin")); 
        } 
    })
}
module.exports = {verifyToken,verifyUser,verifyAdmin};