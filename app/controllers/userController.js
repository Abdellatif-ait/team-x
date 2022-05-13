const User = require("../models/user");
const {errorMessage}=require('../utils/errorHandler')


async function getHandler(req,res){
    try {
        const users=await User.find();
        res.status(200).json({status:200,data:users,message:"Here's what I found:"})
    } catch (error) {
        res.status(500).json(errorMessage)
    }
}

module.exports={getHandler}