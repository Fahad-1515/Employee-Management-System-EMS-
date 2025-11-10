export interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  department: string;
  position: string;
  salary: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface EmployeeResponse {
  content: Employee[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface EmployeeSearchCriteria {
  department?: string;
  position?: string;
  minSalary?: number;
  maxSalary?: number;
  searchTerm?: string;
}
