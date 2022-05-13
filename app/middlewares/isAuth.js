const isAuth= (req,res,next)=>{
    if(req.session.isAuth&&req.session.id){
        next()
    }else{
        res.statis(403).json({status:403,message:"not authorized"})
    }
}