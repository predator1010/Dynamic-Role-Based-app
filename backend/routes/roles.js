import express from 'express';
import { body } from 'express-validator';
import { protect, authorize } from '../middleware/auth.js';
import {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
  getRoleById
} from '../controllers/roleController.js';

// Validation middleware
const roleValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 20 })
    .withMessage('Role name must be between 2 and 20 characters'),
  body('description')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Description must be between 5 and 100 characters'),
  body('permissions')
    .isArray()
    .withMessage('Permissions must be an array')
];

const router = express.Router();

// Public route - anyone can view roles
router.get('/', getRoles);

// Protected routes - require authentication
router.use(protect);

// Admin-only routes
router.post('/', authorize('Admin'), roleValidation, createRole);
router.get('/:id', authorize('Admin'), getRoleById);
router.put('/:id', authorize('Admin'), roleValidation, updateRole);
router.delete('/:id', authorize('Admin'), deleteRole);

export default router; 