const Doctor = require("../models/doctor");

const isDoctor=(req,res,next)=>{
    const id=req.session.id;
    const doctor = await Doctor.findOne({_id:id})
    if(!doctor){
        res.status(403).json({status:403,message:'not authorized! only admin can do this request'})
        return
    }
    next()
}
module.exports=isDoctor