const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
  getRoleById
} = require('../controllers/roleController');

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

// Public route - anyone can view roles
router.get('/', getRoles);

// Protected routes - require authentication
router.use(protect);

// Admin-only routes
router.post('/', authorize('Admin'), roleValidation, createRole);
router.get('/:id', authorize('Admin'), getRoleById);
router.put('/:id', authorize('Admin'), roleValidation, updateRole);
router.delete('/:id', authorize('Admin'), deleteRole);

module.exports = router; 