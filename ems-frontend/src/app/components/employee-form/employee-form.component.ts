import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from '../../services/employee.service';
import {
  Employee,
  COUNTRY_CODES,
  extractCountryCode,
  formatPhoneNumber,
} from '../../models/employee.model';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  isEdit = false;
  loading = false;
  departments: string[] = [];
  positions: string[] = [];
  countryCodes = COUNTRY_CODES;
  hidePhoneHint = false;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EmployeeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {
    this.isEdit = !!data;
    this.employeeForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadFormData();
    this.loadFilters();

    // Watch for changes to update phone hint
    this.employeeForm.get('countryCode')?.valueChanges.subscribe(() => {
      this.updatePhoneHint();
    });

    this.employeeForm.get('phoneNumber')?.valueChanges.subscribe(() => {
      this.updatePhoneHint();
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      countryCode: ['+1', Validators.required], // Default to USA/Canada
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{8,15}$/)],
      ],
      department: ['', Validators.required],
      position: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
    });
  }

  loadFormData(): void {
    if (this.isEdit && this.data) {
      // Extract country code and phone number from existing data
      let countryCode = '+1';
      let phoneNumber = this.data.phoneNumber;

      // If we have a country code field from backend, use it
      if (this.data.countryCode) {
        countryCode = this.data.countryCode;
        phoneNumber = this.data.phoneNumber.replace(countryCode, '');
      } else {
        // Extract from phone number string
        const extracted = extractCountryCode(this.data.phoneNumber);
        countryCode = extracted.countryCode;
        phoneNumber = extracted.number;
      }

      this.employeeForm.patchValue({
        firstName: this.data.firstName,
        lastName: this.data.lastName,
        email: this.data.email,
        countryCode: countryCode,
        phoneNumber: phoneNumber,
        department: this.data.department,
        position: this.data.position,
        salary: this.data.salary,
      });
    }
  }

  loadFilters(): void {
    this.employeeService.getDepartments().subscribe((departments) => {
      this.departments = departments;
    });

    this.employeeService.getPositions().subscribe((positions) => {
      this.positions = positions;
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      this.loading = true;

      // Combine country code and phone number
      const formData = this.employeeForm.value;
      const employeeData: Employee = {
        ...formData,
        phoneNumber: `${formData.countryCode}${formData.phoneNumber}`,
        countryCode: formData.countryCode,
      };

      const operation = this.isEdit
        ? this.employeeService.updateEmployee(this.data.id!, employeeData)
        : this.employeeService.createEmployee(employeeData);

      operation.subscribe({
        next: (employee) => {
          this.loading = false;
          this.snackBar.open(
            `Employee ${this.isEdit ? 'updated' : 'created'} successfully!`,
            'Close',
            { duration: 3000 }
          );
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.loading = false;
          console.error('Error:', error);
          this.snackBar.open(
            `Error ${this.isEdit ? 'updating' : 'creating'} employee: ${
              error.message
            }`,
            'Close',
            { duration: 5000 }
          );
        },
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.employeeForm.controls).forEach((key) => {
      this.employeeForm.get(key)?.markAsTouched();
    });
  }

  // Helper method to get formatted phone number for display
  getFullPhoneNumber(): string {
    const countryCode = this.employeeForm.get('countryCode')?.value;
    const phoneNumber = this.employeeForm.get('phoneNumber')?.value;

    if (countryCode && phoneNumber) {
      return formatPhoneNumber(`${countryCode}${phoneNumber}`);
    }

    return '';
  }

  // Update phone hint based on selected country
  updatePhoneHint(): void {
    const countryCode = this.employeeForm.get('countryCode')?.value;
    let hint = '';

    switch (countryCode) {
      case '+1':
        hint = 'Format: 1234567890 (10 digits)';
        break;
      case '+44':
        hint = 'Format: 7123456789 (10 digits)';
        break;
      case '+91':
        hint = 'Format: 9876543210 (10 digits)';
        break;
      case '+61':
        hint = 'Format: 412345678 (9 digits)';
        break;
      case '+49':
        hint = 'Format: 15123456789 (11 digits)';
        break;
      default:
        hint = 'Enter phone number without country code';
    }

    // Update the hint in the form (you can display this in your template)
    this.hidePhoneHint =
      !countryCode || !this.employeeForm.get('phoneNumber')?.value;
  }

  // Get country name for display
  getSelectedCountryName(): string {
    const countryCode = this.employeeForm.get('countryCode')?.value;
    const country = this.countryCodes.find((c) => c.code === countryCode);
    return country ? `${country.flag} ${country.name}` : '';
  }

  get title(): string {
    return this.isEdit ? 'Edit Employee' : 'Add New Employee';
  }

  get buttonText(): string {
    return this.isEdit ? 'Update Employee' : 'Create Employee';
  }

  // Validation helpers for template
  get firstName() {
    return this.employeeForm.get('firstName');
  }
  get lastName() {
    return this.employeeForm.get('lastName');
  }
  get email() {
    return this.employeeForm.get('email');
  }
  get countryCode() {
    return this.employeeForm.get('countryCode');
  }
  get phoneNumber() {
    return this.employeeForm.get('phoneNumber');
  }
  get department() {
    return this.employeeForm.get('department');
  }
  get position() {
    return this.employeeForm.get('position');
  }
  get salary() {
    return this.employeeForm.get('salary');
  }
}
