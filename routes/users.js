const router = require("express").Router()

const { updateProfile, deleteProfile, getUser } = require("../controller/user")

router.put("/:id",updateProfile)
router.delete("/:id",deleteProfile)
router.get("/:id",getUser)

module.exports = router