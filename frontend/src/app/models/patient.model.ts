export interface Patient {
  _id?: string;
  fullName: string;
  dateOfBirth: string;
  nationalId: string;
  gender: string;
  address: {
    region: string;
    villageTown: string;
  };
  phoneNumber: string;
  emergencyContact: string;
  bloodGroup: string;
  knownMedicalConditions?: string;
  assignedDoctor: string;
  admissionDate: string;
  dischargeDate?: string;
} 