const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../config/jwt');

// Register a new user
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, bio } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Create user
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      bio: bio ? bio.trim() : '',
    });

    await user.save();

    // Generate token
    const token = jwt.sign({ userId: user._id }, secret, { expiresIn });

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Login user
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, secret, { expiresIn });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get current user
exports.getMe = async (req, res, next) => {
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      bio: req.user.bio,
    },
  });
};

// Update profile
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, bio } = req.body;

    if (!name || name.trim().length === 0) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name.trim(),
        bio: bio ? bio.trim() : '',
      },
      { new: true, select: '-password' }
    );

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        bio: updatedUser.bio,
      },
    });
  } catch (error) {
    next(error);
  }
};