const { invalideRouteHandler } =require('../utils/errorHandler') ;
const {getHandler,getBySpecialityHandler,getByIdHandler,postHandler}=require('../controllers/doctorController')
const express =  require('express')

const router=express.Router();

router.get('/',getHandler)
router.get('/:ID',getByIdHandler)
router.get('/speciality/:ID',getBySpecialityHandler)
router.get('/',getHandler)
router.post('/',postHandler)
//router.delete('/delete',deleteHandler)
//router.put('/update',updateHandler)
router.all('*',invalideRouteHandler)

module.exports=router