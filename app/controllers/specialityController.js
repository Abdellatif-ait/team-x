const Speciality=require('../models/speciality')
const {errorMessage}=require('../utils/errorHandler')

async function getHandler(_req,res){
    try {
        const specialities= await Speciality.find();
        res.status(200).json({status:200,data:specialities,message:"Here's what i found"})
    } catch (error) {
        res.status(500).json(errorMessage)
    }
}
async function postHandler(req,res){
    try {
        if(!req.body){
            res.status(400).json({status:400,message:"Invalid Input, check Your Input"})
            return;
        }
        const speciality=await Speciality.findOne({title:req.body.title})
        if(speciality){
            res.status(400).json({status:400,message:"speciality aleardy exist"})
            return;
        }
        const newSpeciality= new Speciality({
            title:req.body.title
        })
        await newSpeciality.save()
        res.status(201).json({status:201,data:newSpeciality,message:'Speciality created successfuly'})
    } catch (error) {
        res.status(500).json(errorMessage)      
    }
}
async function deleteHandler(req,res){
    try {
        const id= req.params.ID;
        await Speciality.deleteOne({_id:id})
        res.status(200).json({status:200,message:'deleted successfuly'})
    } catch (error) {
        res.status(500).json(errorMessage)      
    }
}

module.exports={getHandler,postHandler,deleteHandler}