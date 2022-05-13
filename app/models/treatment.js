const mongoose= require("mongoose");

const treatmentSchema= new mongoose.Schema({
    userID:{
        type: mongoose.Schema.Types.String,
        required:true
    },
    doctorID:{
        type: mongoose.Schema.Types.String,
        required:true
    },
})
module.exports= mongoose.model("treatment",treatmentSchema)