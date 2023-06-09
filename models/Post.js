const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    title: {
        type:String,
        required:true,
        unique :true
    },
    desc: {
        type:String,
        required:true,
        unique:true
    },
    photo: {
        type:String,
        required:true,
    },
    username: {
        type:String,
        required:true,
    },
    categories:{
        type:Array,
        required:false
    }
},{timestamps:true})


module.exports = mongoose.model("Post",postSchema)