import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  dateOfBirth: { type: Date, required: true },
  nationalId: { type: String, required: true, unique: true, trim: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  address: {
    region: { type: String, required: true },
    villageTown: { type: String, required: true }
  },
  phoneNumber: { type: String, required: true, trim: true },
  emergencyContact: { type: String, required: true, trim: true },
  bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], required: true },
  knownMedicalConditions: { type: String, default: '' },
  assignedDoctor: { type: String, required: true, trim: true },
  admissionDate: { type: Date, required: true },
  dischargeDate: { type: Date }
}, { timestamps: true });

export default mongoose.model('Patient', patientSchema); 