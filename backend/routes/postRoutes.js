const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const {
  createPost,
  getPosts,
  getUserProfile,
  deletePost
} = require('../controllers/postController');

// Public routes
router.get('/', getPosts);
router.get('/:userId', getUserProfile);

// Protected routes
router.post('/', authenticateToken, createPost);
router.delete('/:postId', authenticateToken, deletePost);

module.exports = router;