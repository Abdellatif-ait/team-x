const mongoose= require('mongoose')
const Doctor=require("../models/doctor")
const bcrypt=require("bcrypt");
const {errorMessage} = require('../utils/errorHandler');

async function postHandler(req,res){
    try {
        if(!req.body){
            res.status(400).json({status:400,message:"Invalid Input, check Your Input"})
            return;
        }
        const {username,email,password,location,phoneNumber,speciality}=req.body;
        if(!(username&&email&&password&&location&&phoneNumber&&speciality)){
            res.status(400).json({status:400,message:"Invalid Input, check Your Input"})
            return;
        }
        const doctor=await Doctor.findOne({email:email});
        if(doctor){
            res.status(400).json({status:400,message:"email already used! please check your input"})
            return;
        }
        if(password.length<8){
            res.status(400).json({status:400,message:"Invalid Input, check Your Input"})
            return;
        }
        const newPassword=await bcrypt.hash(password,10);
        const newDoctor=new Doctor({
            username:username,
            email:email,
            password:newPassword,
            location:location,
            phoneNumber:phoneNumber,
            speciality:speciality
        })
        await newDoctor.save();
        res.status(201).json({status:201,data:newDoctor,message:'doctor added successfuly'})

    } catch (error) {
        res.status(500).json(errorMessage)
    }
}
async function getHandler(req,res){
    try {
        const doctors=await Doctor.find();
        res.status(200).json({status:200,data:doctors,message:"Doctors found:"})
    } catch (error) {
        res.status(500).json(errorMessage)
    }
}
async function getByIdHandler(req,res){
    try {
        const id=req.params.ID;
        const doctor=await Doctor.findOne({_id:id});
        if(!doctor){
            res.status(404).json({status:404,message:'doctor not found'})
            return
        }
        res.status(200).json({status:200,data:doctor,message:"Doctor found:"})
    } catch (error) {
        res.status(500).json(errorMessage)
    }
}
async function getBySpecialityHandler(req,res){
    try {
        const id=req.params.ID;
        const doctors=await Doctor.find({speciality:id});
        if(!doctors){
            res.status(404).json({status:404,message:'doctor not found'})
            return
        }
        res.status(200).json({status:200,data:doctors,message:"Doctors found:"})
    } catch (error) {
        res.status(500).json(errorMessage)
    }
}

module.exports={getHandler,getBySpecialityHandler,getByIdHandler,postHandler}