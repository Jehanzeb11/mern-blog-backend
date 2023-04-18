const User = require("../models/User")
const bcrypt = require("bcrypt")


// register user



const register = async (req,res)=>{
    try {
        const {username,email,password} = req.body

        const isExist = await User.findOne({username})
        const isExist2 = await User.findOne({email})

        if (isExist || isExist2) {
            return res.status(403).json("User already Exist with this email or name")
        }

const hashPass = await bcrypt.hash(password,10)
        const newUser = new User({username,email,password:hashPass})

        const user = await newUser.save()

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}




// login user



const login = async (req,res)=>{
    try {
        const {email} = req.body

        const  user = await User.findOne({email})
if (!user) {
    return res.status(403).json("Creadentail error Password or Email may incorrect")
}

const isValidate = await bcrypt.compare(req.body.password,user.password)

if (!isValidate) {
    return res.status(403).json("Creadentail error Password or Email may incorrect")
}


const {password,...others} = user._doc
        

res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
}




module.exports = {register,login}