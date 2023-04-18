const bcrypt = require("bcrypt")
const User = require("../models/User")
const Post = require("../models/Post")


// update profile


const updateProfile = async (req,res)=>{
        if (req.body.userId === req.params.id) {
            if (req.body.password) {
                req.body.password = await bcrypt.hash(req.body.password,10)
            }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body,
        },{new:true})

        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json(error)
    }
}else{
    return res.status(401).json("You can update Only Your Profile")
}
   
}





// delete profile



const deleteProfile = async (req,res)=>{
    if (req.body.userId === req.params.id) {
        try {
    const user = await User.findById(req.params.id)
try {

await Post.deleteMany({username:user.username})

await User.findByIdAndDelete(req.params.id)

    res.status(200).json("User has been deleted")

} catch (error) {
    res.status(500).json(error)
}

} catch (error) {

return res.status(404).json("User not Found")
}

}else{
return res.status(401).json("You can delete Only Your Profile")
}
 

}



// get user profile 



const getUser = async (req,res)=>{
try {
    const user = await User.findById(req.params.id)
    const {password,...others} = user._doc
    res.status(200).json(others)
} catch (error) {
    res.status(500).json(error)   
}
}





module.exports = {updateProfile,deleteProfile,getUser}