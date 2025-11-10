import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
})
export class AnalyticsComponent implements OnInit {
  departmentStats: any[] = [];
  loading = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadAnalytics();
  }

  loadAnalytics(): void {
    this.loading = true;
    // For demo - you can implement actual analytics API calls
    setTimeout(() => {
      this.departmentStats = [
        { department: 'IT', count: 3, avgSalary: 71000 },
        { department: 'HR', count: 1, avgSalary: 65000 },
        { department: 'Finance', count: 1, avgSalary: 70000 },
        { department: 'Marketing', count: 1, avgSalary: 60000 },
        { department: 'Sales', count: 1, avgSalary: 72000 },
        { department: 'Operations', count: 1, avgSalary: 80000 },
      ];
      this.loading = false;
    }, 1000);
  }
}
