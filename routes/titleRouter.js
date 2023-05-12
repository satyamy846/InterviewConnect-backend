const titleController = require('../controller/titleController');
const express = require('express');
// const {verifyAdmin,verifyToken,verifyUser} = require('../middleware/VerifyToken');
const router = express.Router();
const auth = require('../middleware/auth');
// Post One title
// router.get('/checkAuth',verifyToken,(req,res,next)=>{
//     res.send("You are authenticated");
// });

// router.get('/checkAdmin',auth.authenticate,(req,res,next)=>{
//     res.send("You are authorized admin");
// })

router.post('/add-title',auth.authenticate,titleController.posttitle);
//Fetch all the title by it's catagory
router.get('/get-title',titleController.gettitleBycatagory);
//update the title with their ID
router.put('/update-title/:id',auth.authenticate,titleController.updatetitle);
//delete the title with their ID
router.delete('/delete-title/:id',auth.authenticate,titleController.deletetitle);

module.exports = router;