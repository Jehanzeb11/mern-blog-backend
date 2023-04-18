const { createPost, updatePost, deletePost, getPost, allPosts } = require("../controller/post")

const router = require("express").Router()


router.post("/",createPost)
router.put("/:id",updatePost)
router.delete("/:id",deletePost)
router.get("/:id",getPost)
router.get("/",allPosts)

module.exports = router