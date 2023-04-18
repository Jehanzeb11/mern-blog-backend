const User = require("../models/User");
const Post = require("../models/Post");

// create post

const createPost = async (req, res) => {
  try {
    const newpost = new Post(req.body);

    const post = await newpost.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update post

const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );

        res.status(200).json(updatedPost);
      } catch (error) {
        console.log(error);
      }
    } else {
      return res.status(401).json("You can only update your own posts");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete post

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.username === req.body.username) {
      try {
        await Post.findByIdAndDelete(req.params.id);

        res.status(200).json("post has been deleted");
      } catch (error) {
        console.log(error);
      }
    } else {
      return res.status(401).json("You can only delete your own posts");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// get user profile

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get all posts

const allPosts = async (req, res) => {
  try {
    const username = req.query.username;
    const catName = req.query.cat;

    let post;

    if (username) {
      post = await Post.find({ username });
    } else if (catName) {
      post = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    }else{
        post = await Post.find()
    }

    res.status(200).json(post)
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createPost, updatePost, deletePost, getPost, allPosts };
