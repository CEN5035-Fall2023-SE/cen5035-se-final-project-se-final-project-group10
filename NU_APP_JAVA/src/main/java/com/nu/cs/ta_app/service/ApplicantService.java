package com.nu.cs.ta_app.service;

import java.io.File;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.nu.cs.ta_app.Exception.ApplicationNotFoundException;
import com.nu.cs.ta_app.Exception.UserNotFoundException;
import com.nu.cs.ta_app.model.UserModel;
import com.nu.cs.ta_app.model.Applicant.TAApplication;
import com.nu.cs.ta_app.repository.TAApplicationRepository;
import com.nu.cs.ta_app.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ApplicantService {
	
	private final TAApplicationRepository taApplicationRepository;
	private final UserRepository userRepository;
	
	public String uploadFile(MultipartFile file) throws Exception {
		String randomString = randomFileNameGenerator();
		String finalFileName = "";
		  try {
		    if(file.isEmpty()) {
		      throw new Exception("Empty file");
		    }
		    File f = new File("ApplicantCV");
		    if(f.mkdir() || f.exists()){
		    	finalFileName = randomString + file.getOriginalFilename();
		    	Path destination = Paths.get("ApplicantCV").resolve(finalFileName).normalize().toAbsolutePath();
			    file.getInputStream();
			    Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
		    }
		    
		  } catch(Exception e) {
			  e.printStackTrace();
		    throw new Exception("Store exception");
		  }
		  return finalFileName;
		}
	
	public int saveApplication (TAApplication application) throws UserNotFoundException{
		UserModel user = userRepository.findById(application.getApplicant_id()).orElseThrow(() -> new UserNotFoundException("user not found"));
		TAApplication app = taApplicationRepository.save(application);
		return app.getApplication_id();
	}
	
	public String randomFileNameGenerator() {
		int leftLimit = 48; // numeral '0'
	    int rightLimit = 122; // letter 'z'
	    int targetStringLength = 15;
	    Random random = new Random();

	    String generatedString = random.ints(leftLimit, rightLimit + 1)
	      .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
	      .limit(targetStringLength)
	      .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
	      .toString();

	    System.out.println(generatedString);
	    return generatedString;
	}
	
	public List<TAApplication> getApplicantOffers(int applicant_id) {
		 List<TAApplication> offerList = taApplicationRepository.findAllByapplicant_id(applicant_id).orElseThrow(() -> new UserNotFoundException("User not found"));
		 return offerList;
	}

	public String acceptOffer(int applicant_id, int application_id) {
		int rowCount = taApplicationRepository.acceptOrDeclineApplication("Accepted",applicant_id, application_id);
		return Integer.toString(rowCount);
	}
	
	public String declineOffer(int applicant_id, int application_id) {
		int rowCount = taApplicationRepository.acceptOrDeclineApplication("Declined",applicant_id, application_id);
		return Integer.toString(rowCount);
	}
}
