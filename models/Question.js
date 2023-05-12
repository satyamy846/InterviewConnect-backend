const mongoose = require('mongoose');

const collection = new mongoose.Schema({
    qname:{
        type:String,
        required:[true,"Question name is required"],
    },
    answer:{
        type:String,
        required:[true,"Answer is required!"],
    },
    photo:[{
        type:String
    }],
    cname:{
        type: String,
        required:[true,"Catagory name is required!"],
    },
    tagname:{
        type: String,
        required:[true,"Tagname is required!"],
    },
    level:{
        type:String,
        required:[true,"Level is required!"]
    },
});

const questionmodel = mongoose.model('question',collection);

module.exports = questionmodel;