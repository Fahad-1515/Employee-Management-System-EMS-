import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

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
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^\+?[0-9]{10,15}$/)],
      ],
      department: ['', Validators.required],
      position: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
    });
  }

  loadFormData(): void {
    if (this.isEdit && this.data) {
      this.employeeForm.patchValue({
        firstName: this.data.firstName,
        lastName: this.data.lastName,
        email: this.data.email,
        phoneNumber: this.data.phoneNumber,
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
      const employeeData: Employee = this.employeeForm.value;

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
          this.snackBar.open(
            `Error ${this.isEdit ? 'updating' : 'creating'} employee`,
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

  get title(): string {
    return this.isEdit ? 'Edit Employee' : 'Add New Employee';
  }

  get buttonText(): string {
    return this.isEdit ? 'Update Employee' : 'Create Employee';
  }
}
