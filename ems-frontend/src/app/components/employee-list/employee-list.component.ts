import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  standalone: true, // ✅ Add this
  imports: [CommonModule, RouterModule], // ✅ Add these imports
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => (this.employees = data),
      error: (err) => console.error('Error loading employees', err),
    });
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => this.loadEmployees(),
        error: (err) => console.error('Delete failed', err),
      });
    }
  }

  addEmployee() {
    this.router.navigate(['/add-employee']);
  }
}
