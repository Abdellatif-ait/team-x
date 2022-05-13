const { invalideRouteHandler } =require('../utils/errorHandler') ;
const express =  require('express')
const {postLoginHandler,postRegisterHandler,postLogoutHandler}=require("../controllers/authController")
const router=express.Router();

router.post('/login',postLoginHandler)
router.post('/register',postRegisterHandler)
router.post('/logout',postLogoutHandler)
router.all('*',invalideRouteHandler)

module.exports=router