import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  patients: Patient[] = [];
  patientForm: FormGroup;
  editing: boolean = false;
  selectedPatientId: string | null = null;
  message: string = '';
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    public authService: AuthService
  ) {
    this.patientForm = this.fb.group({
      fullName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      nationalId: ['', Validators.required],
      gender: ['', Validators.required],
      address: this.fb.group({
        region: ['', Validators.required],
        villageTown: ['', Validators.required]
      }),
      phoneNumber: ['', Validators.required],
      emergencyContact: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      knownMedicalConditions: [''],
      assignedDoctor: ['', Validators.required],
      admissionDate: ['', Validators.required],
      dischargeDate: ['']
    });
  }

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients() {
    this.patientService.getPatients().subscribe({
      next: (data) => this.patients = data,
      error: (err) => this.error = err.error?.message || 'Failed to load patients'
    });
  }

  onSubmit() {
    if (this.patientForm.invalid) return;
    const patient = this.patientForm.value;
    if (this.editing && this.selectedPatientId) {
      this.patientService.updatePatient(this.selectedPatientId, patient).subscribe({
        next: (res) => {
          this.message = res.message;
          this.loadPatients();
          this.cancelEdit();
        },
        error: (err) => this.error = err.error?.message || 'Update failed'
      });
    } else {
      this.patientService.createPatient(patient).subscribe({
        next: (res) => {
          this.message = res.message;
          this.loadPatients();
          this.patientForm.reset();
        },
        error: (err) => this.error = err.error?.message || 'Creation failed'
      });
    }
  }

  editPatient(patient: Patient) {
    this.editing = true;
    this.selectedPatientId = patient._id || null;
    this.patientForm.patchValue(patient);
  }

  cancelEdit() {
    this.editing = false;
    this.selectedPatientId = null;
    this.patientForm.reset();
  }

  deletePatient(id: string) {
    if (confirm('Are you sure you want to delete this patient?')) {
      this.patientService.deletePatient(id).subscribe({
        next: (res) => {
          this.message = res.message;
          this.loadPatients();
        },
        error: (err) => this.error = err.error?.message || 'Delete failed'
      });
    }
  }

  canEditOrDelete(): boolean {
    return this.authService.hasRole('Admin') || this.authService.hasRole('Editor');
  }
} 