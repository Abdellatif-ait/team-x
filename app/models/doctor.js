const mongoose= require("mongoose");

const doctorSchema= new mongoose.Schema({
    username:{
        type: mongoose.Schema.Types.String,
        required:true
    },
    email:{
        type: mongoose.Schema.Types.String,
        required:true
    },
    password:{
        type: mongoose.Schema.Types.String,
        required:true
    },
    location:{
        type: mongoose.Schema.Types.String,
    },
    phoneNumber:{
        type: mongoose.Schema.Types.Number,
    },
    speciality:{
        type:mongoose.Schema.Types.String,
        required:true
    }
})

module.exports= mongoose.model("doctor",doctorSchema)