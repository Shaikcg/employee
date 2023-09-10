package net.cg.springboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import net.cg.springboot.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long>{
	

	@Query("SELECT e FROM Employee e WHERE CONCAT(e.firstName, ' ', e.lastName, ' ', e.id) LIKE %?1%")
	public List<Employee> search(String keyword);

}
