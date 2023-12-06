package com.nu.cs.ta_app.controller;

import java.util.List;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nu.cs.ta_app.model.ApplicantModel;
import com.nu.cs.ta_app.model.InstructorFeedback;
import com.nu.cs.ta_app.service.AdminService;
import com.nu.cs.ta_app.service.InstructorService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/instructor")
@RequiredArgsConstructor
public class InstructorController {
	private final InstructorService instructorService;
	
	@GetMapping("/searchWithFirstName/{firstName}")
	public ResponseEntity<List<ApplicantModel>> findApplicantsByFirstName (@PathVariable String firstName) {
		List<ApplicantModel> ap = instructorService.findByFirstName(firstName);
		return ResponseEntity.ok(ap);
	}
	
	@GetMapping("/searchWithFullName/{firstName}/{lastName}")
	public ResponseEntity<List<ApplicantModel>> findApplicantsByFullName (@PathVariable String firstName, @PathVariable String lastName) {
		List<ApplicantModel> ap = instructorService.findByFullName(firstName, lastName);
		return ResponseEntity.ok(ap);
	}
	
	@PostMapping("/submitFeedback/")
	public ResponseEntity<Integer> submitFeedback (@RequestBody InstructorFeedback instructorFeedback) {
		Integer id= instructorService.submitFeedback(instructorFeedback);
		return ResponseEntity.ok(id);
	}
}
