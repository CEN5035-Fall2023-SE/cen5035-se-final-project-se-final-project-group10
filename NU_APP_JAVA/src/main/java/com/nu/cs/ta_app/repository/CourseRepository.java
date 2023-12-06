package com.nu.cs.ta_app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nu.cs.ta_app.model.Course;

public interface CourseRepository extends JpaRepository<Course, Integer> {
	
	Optional<Course> findById(Integer id);
	
	List<Course> findByDepartment(String department);

	List<Course> findAll();
	
	Optional<Course> findByCourseName(String courseName);
	
}
