import express from 'express';
import { body } from 'express-validator';
import { protect, authorize } from '../middleware/auth.js';
import {
  createPatient,
  getPatients,
  getPatient,
  updatePatient,
  deletePatient
} from '../controllers/patientController.js';

const router = express.Router();

const patientValidation = [
  body('fullName').isLength({ min: 2 }).withMessage('Full Name is required'),
  body('dateOfBirth').isISO8601().toDate().withMessage('Valid Date of Birth is required'),
  body('nationalId').notEmpty().withMessage('National ID is required'),
  body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Gender is required'),
  body('address.region').notEmpty().withMessage('Region is required'),
  body('address.villageTown').notEmpty().withMessage('Village/Town is required'),
  body('phoneNumber').notEmpty().withMessage('Phone Number is required'),
  body('emergencyContact').notEmpty().withMessage('Emergency Contact is required'),
  body('bloodGroup').isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).withMessage('Blood Group is required'),
  body('assignedDoctor').notEmpty().withMessage('Assigned Doctor is required'),
  body('admissionDate').isISO8601().toDate().withMessage('Admission Date is required')
];

router.post('/', protect, authorize('Admin', 'Editor'), patientValidation, createPatient);
router.put('/:id', protect, authorize('Admin', 'Editor'), patientValidation, updatePatient);
router.delete('/:id', protect, authorize('Admin', 'Editor'), deletePatient);

router.get('/', protect, getPatients);
router.get('/:id', protect, getPatient);

export default router; 