const res = require("express/lib/response")

const errorMessage={status:500,message:"something went wrong! try later"}
function invalideRouteHandler(res,res){
    res.status(400).json({status:400,message:"we cant handle this request"})
}
module.exports={errorMessage,invalideRouteHandler}