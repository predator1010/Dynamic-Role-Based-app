const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { protect, authorize, hasPermission } = require('../middleware/auth');
const {
  getUsers,
  updateUserRole,
  getUserById,
  deleteUser
} = require('../controllers/userController');

// Validation middleware
const updateRoleValidation = [
  body('role')
    .isIn(['Admin', 'Editor', 'Viewer'])
    .withMessage('Role must be Admin, Editor, or Viewer')
];

// Routes - All routes require authentication and admin role
router.use(protect);
router.use(authorize('Admin'));

router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id/role', updateRoleValidation, updateUserRole);
router.delete('/:id', deleteUser);

module.exports = router; 