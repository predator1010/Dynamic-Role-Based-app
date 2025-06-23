import express from 'express';
import { body } from 'express-validator';
import { protect } from '../middleware/auth.js';
import {
  register,
  login,
  getProfile,
  initializeDemoUsers
} from '../controllers/authController.js';

// Validation middleware
const registerValidation = [
  body('fullName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Full name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('role')
    .isIn(['Admin', 'Editor', 'Viewer'])
    .withMessage('Role must be Admin, Editor, or Viewer')
];

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const router = express.Router();

// Routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/profile', protect, getProfile);
router.post('/init-demo', initializeDemoUsers);

export default router; 