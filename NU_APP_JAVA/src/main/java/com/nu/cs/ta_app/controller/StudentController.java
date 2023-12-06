package com.nu.cs.ta_app.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/student")
public class StudentController {
	
	@GetMapping("/hello")
	public ResponseEntity<String> helloStudentController() {
		return new ResponseEntity<String>("Hello student",HttpStatus.OK);
	}
	
	@GetMapping("/hello2")
	public ResponseEntity<String> hello2StudentController() {
		return new ResponseEntity<String>("Hello student",HttpStatus.OK);
	}
}
