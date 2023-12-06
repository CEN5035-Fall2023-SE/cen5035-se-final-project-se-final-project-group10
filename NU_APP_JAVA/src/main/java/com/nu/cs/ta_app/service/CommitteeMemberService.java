package com.nu.cs.ta_app.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.nu.cs.ta_app.Exception.ApplicationNotFoundException;
import com.nu.cs.ta_app.Exception.CourseNotFoundException;
import com.nu.cs.ta_app.model.ApplicationDetails;
import com.nu.cs.ta_app.model.Course;
import com.nu.cs.ta_app.model.TAPosition;
import com.nu.cs.ta_app.model.UserModel;
import com.nu.cs.ta_app.model.Applicant.TAApplication;
import com.nu.cs.ta_app.repository.CourseRepository;
import com.nu.cs.ta_app.repository.TAApplicationRepository;
import com.nu.cs.ta_app.repository.TAOpenPositionsRepository;
import com.nu.cs.ta_app.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommitteeMemberService {
	
	private final TAOpenPositionsRepository taOpenPositionsRepository;
	private final  CourseRepository courseRepository;
	private final TAApplicationRepository taApplicationRepository;
	private final UserRepository userRepository;
	
	
	public List<ApplicationDetails> searchWithCourseName (String courseName) {
		List<TAApplication> listOfApplications= taApplicationRepository.findAllByCourseNameForMember(courseName);
		List <ApplicationDetails> applicationDetails = new ArrayList();
		if (listOfApplications.isEmpty()) {
			throw new ApplicationNotFoundException("Applications not found");
		} else {
			for (TAApplication application : listOfApplications) {
				ApplicationDetails appDetails = new ApplicationDetails();
				UserModel user = userRepository.findById(application.getApplicant_id()).orElseThrow(() -> new ApplicationNotFoundException("Application not found"));
				appDetails.setApplicant_id(application.getApplicant_id());
				appDetails.setFirstName(user.getFirstname());
				appDetails.setLastName(user.getLastname());
				appDetails.setApplication_id(application.getApplication_id());
				appDetails.setApplication_status(application.getApplication_status());
				appDetails.setApplyFor(application.getApplyFor());
				appDetails.setCvFileId(application.getCvFileId());
				appDetails.setExperienceInCourse(application.getExperienceInCourse());
				appDetails.setPriorExperience(application.getPriorExperience());
				appDetails.setFromDate(application.getFromDate());
				appDetails.setToDate(application.getToDate());
				appDetails.setOffer_accepted(application.getOffer_accepted());
				applicationDetails.add(appDetails);
			}
		}
		return applicationDetails;
		
		}
	
	public List<ApplicationDetails> searchWithCourseNameAndApplicationStatus (String courseName, String application_status) {
		List<TAApplication> listOfApplications= taApplicationRepository.findAllByCourseNameAndApplicationStatus(courseName, application_status);
		List <ApplicationDetails> applicationDetails = new ArrayList();
		if (listOfApplications.isEmpty()) {
			throw new ApplicationNotFoundException("Applications not found");
		} else {
			for (TAApplication application : listOfApplications) {
				ApplicationDetails appDetails = new ApplicationDetails();
				UserModel user = userRepository.findById(application.getApplicant_id()).orElseThrow(() -> new ApplicationNotFoundException("Application not found"));
				appDetails.setApplicant_id(application.getApplicant_id());
				appDetails.setFirstName(user.getFirstname());
				appDetails.setLastName(user.getLastname());
				appDetails.setApplication_id(application.getApplication_id());
				appDetails.setApplication_status(application.getApplication_status());
				appDetails.setApplyFor(application.getApplyFor());
				appDetails.setCvFileId(application.getCvFileId());
				appDetails.setExperienceInCourse(application.getExperienceInCourse());
				appDetails.setPriorExperience(application.getPriorExperience());
				appDetails.setFromDate(application.getFromDate());
				appDetails.setToDate(application.getToDate());
				appDetails.setOffer_accepted(application.getOffer_accepted());
				applicationDetails.add(appDetails);
			}
		}
		return applicationDetails;
		
		}
	
	public int changeApplicationStatus (ApplicationDetails applicationDetails, String applicationStatus) {
		return taApplicationRepository.changeApplicationStatus(applicationStatus, applicationDetails.getApplication_id(), applicationDetails.getApplicant_id());
	}
}

