import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: any;
  stats = {
    totalEmployees: 0,
    totalDepartments: 0,
    avgSalary: 0,
    recentHires: 0,
  };

  constructor(
    public authService: AuthService,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
    });

    this.loadDashboardStats();
  }

  loadDashboardStats(): void {
    this.employeeService.searchEmployees(0, 1).subscribe((response) => {
      this.stats.totalEmployees = response.totalElements;
      // For demo - you can replace with actual API calls
      this.stats.totalDepartments = 6;
      this.stats.avgSalary = 68500;
      this.stats.recentHires = 3;
    });
  }

  navigateToEmployees(): void {
    this.router.navigate(['/employees']);
  }

  navigateToAnalytics(): void {
    this.router.navigate(['/analytics']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
