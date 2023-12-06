package com.nu.cs.ta_app.controller;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

import org.springframework.core.io.Resource;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.nu.cs.ta_app.model.AdminFeedbackModel;
import com.nu.cs.ta_app.model.ApplicantModel;
import com.nu.cs.ta_app.model.ApplicationDetails;
import com.nu.cs.ta_app.model.FileEntity;
import com.nu.cs.ta_app.model.TAPosition;
import com.nu.cs.ta_app.model.Applicant.TAApplication;
import com.nu.cs.ta_app.repository.FileEntityRepository;
import com.nu.cs.ta_app.service.AdminService;
import com.nu.cs.ta_app.service.InstructorService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {
	
	private final AdminService adminService;
	private final InstructorService instructorService;
	private final FileEntityRepository fileEntityRepository;
	
	@PostMapping("/openTAPositions/open")
	public int openTAPositionsForCourse (@RequestBody TAPosition taPosition) {
		return adminService.openTAPositionsFor(taPosition);
	}
	
	@GetMapping("/search/{courseName}")
	public ResponseEntity<List<ApplicationDetails>> searchWithCourseName (@PathVariable String courseName) {
		return ResponseEntity.ok(adminService.searchWithCourseName(courseName));
	}
	
	@GetMapping("/search/{courseName}/{application_status}")
	public ResponseEntity<List<ApplicationDetails>> searchWithCourseName (@PathVariable String courseName, @PathVariable String application_status) {
		return ResponseEntity.ok(adminService.searchWithCourseNameAndApplicationStatus(courseName, application_status));
	}
	
	@PostMapping("/changeApplicationStatus/{status}")
	public int changeApplicationStatus (@PathVariable String status, @RequestBody ApplicationDetails applicationDetails) {
		String app_status = status;
		if (status.equalsIgnoreCase("Reject")) {
			app_status = "Rejected";
		}
		if (status.equalsIgnoreCase("Send Offer")) {
			app_status = "Offer Sent";
		}
		return adminService.changeApplicationStatus(applicationDetails, app_status);
	}
	
//	@GetMapping(path = "/download/{name}")
//    public ResponseEntity<Resource> download
//          (@PathVariable("name") String name) throws IOException {
//
//        File file = new File("ApplicantCV/"+name);
//        Path path = Paths.get(file.getAbsolutePath());
//        ByteArrayResource resource = 
//               new ByteArrayResource(Files.readAllBytes(path));
//
//        return ResponseEntity.ok().headers(this.headers(name))
//              .contentLength(file.length())
//                .contentType(MediaType
//                 .parseMediaType("application/octet-stream"))
//             .body(resource);
//    }
//	
//	private HttpHeaders headers(String name) {
//		HttpHeaders header = new HttpHeaders();
//		header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + name);
//		header.add("Cache-Control", "no-cache, no-store, must-revalidate");
//		header.add("Pragma", "no-cache");
//		header.add("Expires", "0");
//		return header;
//
//	}

	
//	@GetMapping(path = "/download/{name}")
//	public ResponseEntity<String> download (@PathVariable("name") String name) throws IOException {
//		// Path path = Paths.get("ApplicantCV/"+name);
//		File file = new File("ApplicantCV/"+name);
////		String arr = Files.readString(path, StandardCharsets.ISO_8859_1);
////		return ResponseEntity.ok(arr);
//		
//		BufferedReader reader = new BufferedReader(new FileReader(file));
//		StringBuilder stringBuilder = new StringBuilder();
//		char[] buffer = new char[10];
//		while (reader.read(buffer) != -1) {
//			stringBuilder.append(new String(buffer));
//			buffer = new char[10];
//		}
//		reader.close();
//
//		String content = stringBuilder.toString();
//		System.out.println(content);
//		return ResponseEntity.ok(content);
//	}
	
	@GetMapping(path="/download/{id}")
	public ResponseEntity<byte[]> getFile(@PathVariable Long id) {
	 
	   FileEntity fileEntity = fileEntityRepository.findById(id).get();
	 
	   HttpHeaders header = new HttpHeaders();
	   header.setContentType(MediaType.valueOf(fileEntity.getContentType()));
	   header.setContentLength(fileEntity.getData().length);
	   header.set("Content-Disposition", "attachment; filename=" + fileEntity.getFileName());
	 
	   return new ResponseEntity<>(fileEntity.getData(), header, HttpStatus.OK);
	}
	
	@GetMapping("/searchWithFirstName/{firstName}")
	public ResponseEntity<List<AdminFeedbackModel>> findApplicantsByFirstName (@PathVariable String firstName) {
		List<AdminFeedbackModel> afm = adminService.findByFirstName(firstName);
		return ResponseEntity.ok(afm);
	}
	
	@GetMapping("/searchWithFullName/{firstName}/{lastName}")
	public ResponseEntity<List<AdminFeedbackModel>> findApplicantsByFullName (@PathVariable String firstName, @PathVariable String lastName) {
		List<AdminFeedbackModel> afm = adminService.findByFullName(firstName, lastName);
		return ResponseEntity.ok(afm);
	}
}
