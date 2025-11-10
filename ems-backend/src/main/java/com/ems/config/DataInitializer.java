package com.ems.config;

import com.ems.entity.Employee;
import com.ems.entity.User;
import com.ems.repository.EmployeeRepository;
import com.ems.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        initializeUsers();
        initializeEmployees();
    }

    private void initializeUsers() {
        if (userRepository.count() == 0) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setEmail("admin@ems.com");
            admin.setRole(User.Role.ADMIN);
            userRepository.save(admin);

            User user = new User();
            user.setUsername("user");
            user.setPassword(passwordEncoder.encode("user123"));
            user.setEmail("user@ems.com");
            user.setRole(User.Role.USER);
            userRepository.save(user);

            System.out.println("Default users created:");
            System.out.println("Admin - username: admin, password: admin123");
            System.out.println("User - username: user, password: user123");
        }
    }

    private void initializeEmployees() {
        if (employeeRepository.count() == 0) {
            List<Employee> employees = Arrays.asList(
                new Employee("John", "Doe", "john.doe@company.com", "+1234567890", "IT", "Software Engineer", 75000.0),
                new Employee("Jane", "Smith", "jane.smith@company.com", "+1234567891", "HR", "HR Manager", 65000.0),
                new Employee("Mike", "Johnson", "mike.johnson@company.com", "+1234567892", "Finance", "Financial Analyst", 70000.0),
                new Employee("Sarah", "Wilson", "sarah.wilson@company.com", "+1234567893", "Marketing", "Marketing Specialist", 60000.0),
                new Employee("David", "Brown", "david.brown@company.com", "+1234567894", "IT", "System Administrator", 68000.0),
                new Employee("Emily", "Davis", "emily.davis@company.com", "+1234567895", "Sales", "Sales Manager", 72000.0),
                new Employee("Robert", "Miller", "robert.miller@company.com", "+1234567896", "Operations", "Operations Manager", 80000.0),
                new Employee("Lisa", "Taylor", "lisa.taylor@company.com", "+1234567897", "IT", "Frontend Developer", 70000.0)
            );

            employeeRepository.saveAll(employees);
            System.out.println("Sample employees created");
        }
    }
}