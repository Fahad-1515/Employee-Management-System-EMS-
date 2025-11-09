import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
  standalone: true, // ✅ Add this
  imports: [CommonModule, ReactiveFormsModule], // ✅ Add these imports
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const employee: Employee = this.employeeForm.value;

    this.employeeService.createEmployee(employee).subscribe({
      next: () => {
        alert('✅ Employee added successfully!');
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        console.error('Error adding employee', err);
        alert('❌ Failed to add employee.');
        this.isSubmitting = false;
      },
    });
  }
}
