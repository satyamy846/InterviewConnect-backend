const mongoose = require('mongoose');
const isEmail = require('../node_modules/validator/lib/isEmail');

const collection = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        lowercase:true,
        validate:[isEmail,"Enter Valid Email"],
    },
    password:{
        type:String,
        required:true,
    },
    admin:{
        type:Boolean,
        default:false,
    }
})

const usermodel = mongoose.model('user',collection);


module.exports = usermodel;