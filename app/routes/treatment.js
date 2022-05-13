const { invalideRouteHandler } =require('../utils/errorHandler') ;
const express =  require('express')
const {getClientHandler,getDoctorHandler,postHandler,deleteHandler}=require('../controllers/treatmentController')
const router=express.Router();

router.get('/doctor/:ID',getDoctorHandler)
router.get('/client/:ID',getClientHandler)
router.post('/',postHandler)
router.delete('/',deleteHandler)

router.all('*',invalideRouteHandler)

module.exports=router