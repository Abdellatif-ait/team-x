const Treatment= require('../models/treatment')
const User=require("../models/user")
const Doctor=require("../models/doctor")
const {errorMessage}=require('../utils/errorHandler')

async function getClientHandler(req,res){
    try {
        const doctorID= req.params.ID
        const treatments=await Treatment.find({doctorID:doctorID})
        let users=[]
        for await (let treatment of treatments){
            const user=await User.findOne({_id:treatment.userID})
            users.push({
                username:user.username,
                email:user.email,
            })  
        }
        res.status(200).json({status:200,data:users,message:'here is what i found'})
    } catch (error) {
        res.status(500).json(errorMessage)
    }
}
async function getDoctorHandler(req,res){
    try {
        const userID= req.params.ID
        const treatments=await Treatment.find({userID:userID})
        var doctors=[]
        for await (let treatment of treatments){
            const doctor=await Doctor.findOne({_id:treatment.doctorID})
            doctors.push({
                username:doctor.username,
                email:doctor.email,
                speciality:doctor.speciality,
                phoneNumber:doctor.phoneNumber
            })
            console.log("2",doctors)
        }
        console.log("3",doctors)
        res.status(200).json({status:200,data:doctors,message:'here is what i found'})
    } catch (error) {
        res.status(500).json(errorMessage)
    }
}
async function postHandler(req,res){
    try {
        const {doctorID,userID}=req.body;
        const treatment=new Treatment({
            doctorID:doctorID,
            userID:userID
        })
        await treatment.save();
        res.status(201).json({staus:201,data:treatment,message:"Treatment added successfuly"})
    } catch (error) {
        res.status(500).json(errorMessage)   
    }
}
async function deleteHandler(req,res){
    try {
        const id=req.body.id
        await Treatment.deleteOne({_id:id});
        res.status(201).json({status:201,message:'treatment deleted successfuly'})
    } catch (error) {
        res.status(500).json(errorMessage)   
    }
}

module.exports={getClientHandler,getDoctorHandler,postHandler,deleteHandler}