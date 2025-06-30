import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User.js';
import Role from '../models/Role.js';

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Find the role
    const userRole = await Role.findOne({ name: role });
    if (!userRole) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Create user
    const user = await User.create({
      fullName,
      email,
      password,
      role: userRole._id
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: userRole,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email }).populate('role');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('role');
    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Initialize demo users
// @route   POST /api/auth/init-demo
// @access  Public
const initializeDemoUsers = async (req, res) => {
  try {
    // Initialize roles first
    await Role.initializeRoles();
    
    const roles = await Role.find();
    const adminRole = roles.find(r => r.name === 'Admin');
    const editorRole = roles.find(r => r.name === 'Editor');
    const viewerRole = roles.find(r => r.name === 'Viewer');

    // Create demo users
    const demoUsers = [
      {
        fullName: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123',
        role: adminRole._id
      },
      {
        fullName: 'Editor User',
        email: 'editor@example.com',
        password: 'editor123',
        role: editorRole._id
      },
      {
        fullName: 'Viewer User',
        email: 'viewer@example.com',
        password: 'viewer123',
        role: viewerRole._id
      }
    ];

    for (const userData of demoUsers) {
      const existingUser = await User.findOne({ email: userData.email });
      if (!existingUser) {
        await User.create(userData);
      }
    }

    res.json({ message: 'Demo users initialized successfully' });
  } catch (error) {
    console.error('Initialize demo users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export {
  register,
  login,
  getProfile,
  initializeDemoUsers
}; 