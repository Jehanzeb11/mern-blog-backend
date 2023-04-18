const Category = require("../models/Category")

const createCat = async (req,res)=>{
    try {
        const newCat = new Category(req.body)

        const savedCat = await newCat.save()

        res.status(200).json(savedCat)

    } catch (error) {
        res.status(500).json(error)
    }
}






const getCat = async (req,res)=>{
    try {
const cat = await Category.find()

        res.status(200).json(cat)

    } catch (error) {
        res.status(500).json(error)
    }
}



module.exports = {createCat,getCat}