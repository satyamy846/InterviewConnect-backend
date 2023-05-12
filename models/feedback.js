const mongoose = require('mongoose');

const collection = new mongoose.Schema({
    name:{
        type:String,

    },
    email:{
        type:String,
        required:[true,"Email is required!"],
    },
    message:{
        type:String,
    },
})

const feedbackmodel = mongoose.model('feedback',collection);


module.exports = feedbackmodel;