const mongoose = require('mongoose'); 
const Post = require('../models/Post');
const User = require('../models/User');


// Create a new post
exports.createPost = async (req, res, next) => {
  try {
    const { content } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: 'Post content is required' });
    }

    if (content.length > 1000) {
      return res.status(400).json({ message: 'Post content must be 1000 characters or less' });
    }

    const post = new Post({
      content: content.trim(),
      author: req.user._id,
    });

    await post.save();
    await post.populate('author', 'name email bio');

    res.status(201).json({
      message: 'Post created successfully',
      post: {
        id: post._id,
        content: post.content,
        author: {
          id: post.author._id,
          name: post.author.name,
          email: post.author.email,
          bio: post.author.bio,
        },
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get all posts (feed)
exports.getPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .populate('author', 'name email bio')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments();

    const formattedPosts = posts.map(post => ({
      id: post._id,
      content: post.content,
      author: {
        id: post.author._id,
        name: post.author.name,
        email: post.author.email,
        bio: post.author.bio,
      },
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }));

    res.json({
      posts: formattedPosts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalPosts: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get user profile and posts
exports.getUserProfile = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find({ author: userId })
      .populate('author', 'name email bio')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPosts = await Post.countDocuments({ author: userId });

    const formattedPosts = posts.map(post => ({
      id: post._id,
      content: post.content,
      author: {
        id: post.author._id,
        name: post.author.name,
        email: post.author.email,
        bio: post.author.bio,
      },
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }));

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        createdAt: user.createdAt,
      },
      posts: formattedPosts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalPosts / limit),
        totalPosts,
        hasNext: page < Math.ceil(totalPosts / limit),
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Delete post
exports.deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await Post.findByIdAndDelete(postId);

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    next(error);
  }
};