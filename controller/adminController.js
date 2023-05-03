const adminmodel = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AdminController = {
    
        async signup(req,res,next){
            const {name,email,password} = req.body;
            try{
                //check if it is existing admin or not
                const existingadmin = await adminmodel.findOne({email:email});
                if(existingadmin){
                    return res.status(400).json({message:'admin Already Exists'}).send(`admin already exists`);
                }
                //encrypt the password
                const hashpassword = await bcrypt.hash(password,10);

                const result = await adminmodel.create({
                    name:name,
                    email:email,
                    password:hashpassword
                });

                //generate the token 
                const token = await jwt.sign({email:result.email,id:req._id},process.env.SECRET_KEY,{expiresIn:'1h'});
                
                res.status(200).json({admin:result,token:token});
                // console.log(result.email);

                
            }
            catch(err){
                console.log(err);
            }
        },
        async login(req,res){
            const {email,password} = req.body;
            try{
                //find the existing admin
                if(email === '' || email==null || password === '' || password == null){
                    return res.status(404).json({message:`Fields are required`});
                }
                const existingadmin = await adminmodel.findOne({email:email});
                //compare the encrypted password with the requested password
                if(!existingadmin){
                    return res.status(404).json({message:`User not found`})
                }
                console.log("password = "+ password);
                const matchedpassword = await bcrypt.compare(password,existingadmin.password);
                //invalid credential
                if(!matchedpassword){
                    return res.status(404).json({message:`Invalid Credential`})
                }
                    
                        const token = await jwt.sign({email:existingadmin.email,id:req._id},process.env.SECRET_KEY,{expiresIn:'1h'});
                        res.status(201).json({message:'successfully login',admin:existingadmin,token:token}).send(`Login Successfully`);
                    
                
                    
                
            }
            catch(err){
                console.log(err);
            }
        }
}

module.exports = AdminController;