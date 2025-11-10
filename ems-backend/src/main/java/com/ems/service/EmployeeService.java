package com.ems.service;

import com.ems.entity.Employee;
import com.ems.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public Page<Employee> getAllEmployees(int page, int size, String search) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("firstName").ascending());
        
        if (search != null && !search.trim().isEmpty()) {
            return employeeRepository.searchEmployees(search.trim(), pageable);
        } else {
            return employeeRepository.findAll(pageable);
        }
    }

    public Employee getEmployeeById(Long id) {
        Optional<Employee> employee = employeeRepository.findById(id);
        return employee.orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
    }

    public Employee saveEmployee(Employee employee) {
        // Check if email already exists (for new employees)
        if (employee.getId() == null && employeeRepository.existsByEmail(employee.getEmail())) {
            throw new RuntimeException("Email already exists: " + employee.getEmail());
        }
        
        // For updates, check if email exists for other employees
        if (employee.getId() != null) {
            Employee existing = getEmployeeById(employee.getId());
            if (!existing.getEmail().equals(employee.getEmail()) && 
                employeeRepository.existsByEmail(employee.getEmail())) {
                throw new RuntimeException("Email already exists: " + employee.getEmail());
            }
        }
        
        return employeeRepository.save(employee);
    }

    public void deleteEmployee(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new RuntimeException("Employee not found with id: " + id);
        }
        employeeRepository.deleteById(id);
    }

    public List<String> getDistinctDepartments() {
        return employeeRepository.findDistinctDepartments();
    }

    public Page<Employee> getEmployeesByDepartment(String department, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("firstName").ascending());
        return employeeRepository.findByDepartment(department, pageable);
    }
}