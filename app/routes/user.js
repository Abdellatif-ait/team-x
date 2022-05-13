const express= require("express")
const { invalideRouteHandler } =require('../utils/errorHandler') ;
const router=express.Router();
const {getHandler}=require("../controllers/userController")


router.get('/',getHandler)
//router.delete('/delete',deleteUser)
//router.put('/update',updateUser)
router.all('*',invalideRouteHandler)


module.exports=router