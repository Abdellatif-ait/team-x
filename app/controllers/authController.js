const User=require('../models/user')
const bcrypt=require('bcrypt')
const {errorMessage}=require('../utils/errorHandler')


async function postLoginHandler(req,res){
    try {
        const {email,password}=req.body
        const user= await User.findOne({email:email});
        if(!user){
            res.status(404).json({status:404,message:"Invalid Input, check Your Input"})
            return;
        }
        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.status(403).json({status:403,message:"Invalid Input, check Your Input"})
            return;
        }
        req.session.isAuth=true,
        req.session.id=user._id;
        res.status(200).json({status:200,message:"Loged in successfuly"})
    } catch (error) {
        res.status(500).json(errorMessage)
    }
}
async function postRegisterHandler(req,res){
    try {
        if(!req.body){
            res.status(400).json({status:400,message:"Invalid Input, check Your Input"})
            return;
        }
        const {username,email,password}=req.body
        if(!(username&&email&&password)){
            res.status(400).json({status:400,message:"Invalid Input, check Your Input"})
            return;
        }
        const user= await User.findOne({email:email});
        if(user){
            res.status(400).json({status:400,message:"email already used! please check your input"})
            return;
        }
        if(password.length<8){
            res.status(400).json({status:400,message:"Invalid Input, check Your Input"})
            return;
        }
        const newPassword= await bcrypt.hash(password,10)
        const newUser= new User({
            email:email,
            username:username,
            password:newPassword
        });
        await newUser.save();
        res.status(201).json({status:201,data:newUser,message:"user created successfully"})
    } catch (error) {
        res.status(500).json(errorMessage)
    }
}
async function postLogoutHandler(req,res){
    req.session.destroy((err)=>{
        if(err){
            res.status(500).json(errorMessage)
            return
        }
        res.status(200).json({status:200,message:"logged out successfuly"})
    })
}

module.exports={postLoginHandler,postRegisterHandler,postLogoutHandler}