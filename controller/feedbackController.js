const feedbackmodel = require('../models/feedback');

const feedbackController = {
    async postFeedback(req,res,next){
        try{

            const data = await feedbackmodel.create(req.body);
            res.status(201).json({data:data});
        }
        catch(err){
            next(err);
        }
    },
    async showfeedback(req,res,next){
        try{

            const data = await feedbackmodel.find({});
            res.status(201).json({data:data});
        }
        catch(err){
            next(err);
        }
    }
}

module.exports = feedbackController;