const mongoose = require('mongoose');

const collection = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
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