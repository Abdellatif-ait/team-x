const Admin = require("../models/admin");


const isAdmin= async (req,res,next)=>{
    const id=req.session.id;
    const admin = await Admin.findOne({_id:id})
    if(!admin){
        res.status(403).json({status:403,message:'not authorized! only admin can do this request'})
        return
    }
    next()
}

module.exports=isAdmin