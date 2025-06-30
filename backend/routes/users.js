import express from 'express';
import { body } from 'express-validator';
import { protect, authorize, hasPermission } from '../middleware/auth.js';
import {
  getUsers,
  updateUserRole,
  getUserById,
  deleteUser
} from '../controllers/userController.js';

// Validation middleware
const updateRoleValidation = [
  body('role')
    .isIn(['Admin', 'Editor', 'Viewer'])
    .withMessage('Role must be Admin, Editor, or Viewer')
];

const router = express.Router();

// Routes - All routes require authentication and admin role
router.use(protect);
router.use(authorize('Admin'));

router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id/role', updateRoleValidation, updateUserRole);
router.delete('/:id', deleteUser);

export default router; 