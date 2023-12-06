package com.nu.cs.ta_app.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nu.cs.ta_app.model.Course;
import com.nu.cs.ta_app.model.TAPosition;
import com.nu.cs.ta_app.service.CourseService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/course")
@RequiredArgsConstructor
public class CourseController {
	private final CourseService courseService;
	
	@PostMapping("/save")
	public ResponseEntity<Integer> saveCourse (@RequestBody Course course) {
		int courseId = courseService.saveCourse(course);
		return ResponseEntity.ok(courseId);
	}
	
	@GetMapping("/getCourses")
	public ResponseEntity<List<TAPosition>> getCourses () {
		return ResponseEntity.ok(courseService.getCourses());
		// return ResponseEntity.ok(courseService.getCoursesByDeparment(department));
	}
	
	@GetMapping("/getCourses/{department}")
	public ResponseEntity<List<Course>> getCoursesByDepartment (@PathVariable String department) {
		return ResponseEntity.ok(courseService.getCourseByDepartment(department));
		// return ResponseEntity.ok(courseService.getCoursesByDeparment(department));
	}
}
