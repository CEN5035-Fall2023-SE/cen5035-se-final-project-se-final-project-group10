package com.nu.cs.ta_app.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nu.cs.ta_app.model.Course;
import com.nu.cs.ta_app.model.TAPosition;
import com.nu.cs.ta_app.repository.CourseRepository;
import com.nu.cs.ta_app.repository.TAOpenPositionsRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CourseService {
	private final CourseRepository courseRepository;
	private final TAOpenPositionsRepository taOpenPositionsRepository;
	
	public int saveCourse(Course course) {
		Course savedCourse = courseRepository.save(course);
		return savedCourse.getId();
	}
	
	public List<TAPosition> getCourses () {
		return taOpenPositionsRepository.findAll();
	}
	
	public List<Course> getCourseByDepartment(String department) {
		return courseRepository.findByDepartment(department);
	}
}
