const usermodel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CustomError = require('../utils/errorHandler');
const userController = {
    
        async signup(req,res,next){
            const {name,email,password} = req.body;
            try{
                //check if it is existing user or not
                const existinguser = await usermodel.findOne({email:email});
                if(existinguser){
                    return res.status(400).json({message:'User Already Exists'}).send(`User already exists`);
                }
                //encrypt the password
                const hashpassword = await bcrypt.hash(password,10);

                const result = await usermodel.create({
                    name:name,
                    email:email,
                    password:hashpassword
                });

                //generate the token 
                const token = await jwt.sign({email:result.email,id:req._id},process.env.SECRET_KEY,{expiresIn:'1h'});
                
                res.status(200).json({user:result,token:token});
                // console.log(result.email);

                
            }
            catch(err){
                next(new CustomError(err.message, 500, "Unable to Signup"));
                console.log(err);
            }
        },
        async login(req,res,next){
            const {email,password} = req.body;
            try{
                // console.log(password);
                //find the existing user
                const userDetails = await usermodel.findOne({email:email});
                console.log(userDetails);
                if(!userDetails){
                    return res.status(404).json({message:"User not found"});
                }
                //compare the encrypted password with the requested password
                const matchedpassword = await bcrypt.compare(password,userDetails.password);
                // console.log("sahja = " + matchedpassword);
                //invalid credential
                
                if(!matchedpassword){
                    // console.log("sha = " + matchedpassword)
                    return res.status(400).json({message:`User not found please login first`}).send("User not found");
                }
                    const token = jwt.sign({email:userDetails.email, id:req._id},process.env.SECRET_KEY,{expiresIn:'1h'});

                    res.status(201).json({message:'successfully login',user:userDetails,token:token}).send(`Login Successfully`);
                
            }
            catch(err){
                // console.log(err);
                next(new CustomError(err.message, 500, "Unable to Login"));
            }
        }
}

module.exports = userController;