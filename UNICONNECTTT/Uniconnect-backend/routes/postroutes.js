const express = require('express');
const router = express.Router();
const { getAllPosts, createPost } = require('../controllers/postcontrollers');

router.get('/', getAllPosts);
router.post('/', createPost);

module.exports = router;
