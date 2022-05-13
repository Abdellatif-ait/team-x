const mongoose= require("mongoose")

const categorySchema=mongoose.Schema({
    title:{
        type:mongoose.Schema.Types.String,
        require:true
    }
})

module.exports= mongoose.model("category",categorySchema)