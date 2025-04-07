const Post = require('../models/post');

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
};

// Create a new post
const createPost = async (req, res) => {
  try {
    const { title, content, eventId, user } = req.body;

    const newPost = new Post({ title, content, eventId, user });
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error });
  }
};

module.exports = {
  getAllPosts,
  createPost,
};
