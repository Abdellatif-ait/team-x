const express= require("express")
const router=express.Router();
const {getHandler,postHandler,deleteHandler}=require('../controllers/specialityController')
const { invalideRouteHandler } =require('../utils/errorHandler') ;
const isAdmin = require('../middlewares/isAdmin')


router.get('/',getHandler)
router.post('/',isAdmin,postHandler)
router.delete('/:ID',isAdmin,deleteHandler)
router.all('*',invalideRouteHandler)

module.exports=router