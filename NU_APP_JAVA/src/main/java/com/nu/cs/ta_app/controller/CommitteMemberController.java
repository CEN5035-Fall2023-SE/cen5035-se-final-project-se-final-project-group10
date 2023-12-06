package com.nu.cs.ta_app.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nu.cs.ta_app.model.ApplicationDetails;
import com.nu.cs.ta_app.service.AdminService;
import com.nu.cs.ta_app.service.CommitteeMemberService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class CommitteMemberController {
	
	private final CommitteeMemberService commMemberService;
	
	@GetMapping("/search/{courseName}")
	public ResponseEntity<List<ApplicationDetails>> searchWithCourseName (@PathVariable String courseName) {
		return ResponseEntity.ok(commMemberService.searchWithCourseName(courseName));
	}
	
	@GetMapping("/search/{courseName}/{application_status}")
	public ResponseEntity<List<ApplicationDetails>> searchWithCourseName (@PathVariable String courseName, @PathVariable String application_status) {
		return ResponseEntity.ok(commMemberService.searchWithCourseNameAndApplicationStatus(courseName, application_status));
	}
}
