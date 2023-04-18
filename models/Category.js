const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
name:{
    type:String,
    requireD:true
}
},{timestamps:true})


module.exports = mongoose.model("Category",categorySchema)