package com.nu.cs.ta_app.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.nu.cs.ta_app.model.FileEntity;
import com.nu.cs.ta_app.model.Applicant.TAApplication;
import com.nu.cs.ta_app.repository.FileEntityRepository;
import com.nu.cs.ta_app.service.ApplicantService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/applicant")
@RequiredArgsConstructor
public class ApplicantController {
	private final ApplicantService applicantService;
	
	private final FileEntityRepository fileEntityRepository;
	@PostMapping(value = "/uploadFile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<Long> uploadFile(@RequestParam("myFile") MultipartFile file) throws Exception{
		// System.out.println(String.format("File name '%s' uploaded successfully.", file.getOriginalFilename()));
		
		FileEntity fileEntity = new FileEntity();
		fileEntity.setFileName(file.getOriginalFilename());
		fileEntity.setContentType(file.getContentType());
		fileEntity.setData(file.getBytes());
		FileEntity savedFile = fileEntityRepository.save(fileEntity);
		System.out.println("saved file id::"+savedFile.getId());
		
	  // String fileName = applicantService.uploadFile(file);
	  return new ResponseEntity<>(savedFile.getId(), HttpStatus.OK);
	}
	
	@PostMapping("/apply")
	public ResponseEntity<Integer> saveApplication(@RequestBody TAApplication application) {
		if (application.getApplication_status() == null) {
			application.setApplication_status("In Review");
		}
		int application_id = applicantService.saveApplication(application);
		return ResponseEntity.ok(application_id);
	}
	
	@GetMapping("/getOffers/{applicant_id}")
	public ResponseEntity<List<TAApplication>> getApplicantOffers(@PathVariable int applicant_id) {
		return ResponseEntity.ok(applicantService.getApplicantOffers(applicant_id));
	}
	
	@PutMapping("/acceptOffer/{applicant_id}/{application_id}")
	public String acceptOffer(@PathVariable int applicant_id, @PathVariable int application_id) {
		return applicantService.acceptOffer(applicant_id, application_id);
	}
	
	@PutMapping("/declineOffer/{applicant_id}/{application_id}")
	public String declineOffer(@PathVariable int applicant_id, @PathVariable int application_id) {
		return applicantService.declineOffer(applicant_id, application_id);
	}
}
