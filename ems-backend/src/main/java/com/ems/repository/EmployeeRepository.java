package com.ems.repository;

import com.ems.entity.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    
    @Query("SELECT e FROM Employee e WHERE " +
           "LOWER(e.firstName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(e.lastName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(e.email) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(e.department) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(e.position) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<Employee> searchEmployees(@Param("search") String search, Pageable pageable);
    
    @Query("SELECT DISTINCT e.department FROM Employee e ORDER BY e.department")
    List<String> findDistinctDepartments();
    
    boolean existsByEmail(String email);
    
    Page<Employee> findByDepartment(String department, Pageable pageable);
}