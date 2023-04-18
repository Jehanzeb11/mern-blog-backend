const { createCat, getCat } = require("../controller/category")

const router = require("express").Router()

router.post("/",createCat)
router.get("/",getCat)

module.exports = router