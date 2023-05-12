const mongoose = require('mongoose');
const isEmail = require('../node_modules/validator/lib/isEmail');
const collection = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required!"],
        validate:[isEmail,"Enter valid email"],
    },
    message:{
        type:String,
    },
})

const feedbackmodel = mongoose.model('feedback',collection);


module.exports = feedbackmodel;