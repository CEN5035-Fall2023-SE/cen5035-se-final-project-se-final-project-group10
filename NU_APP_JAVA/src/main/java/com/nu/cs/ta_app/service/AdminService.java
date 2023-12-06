package com.nu.cs.ta_app.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.nu.cs.ta_app.Exception.ApplicationNotFoundException;
import com.nu.cs.ta_app.Exception.CourseNotFoundException;
import com.nu.cs.ta_app.Exception.UserNotFoundException;
import com.nu.cs.ta_app.model.AdminFeedbackModel;
import com.nu.cs.ta_app.model.ApplicantModel;
import com.nu.cs.ta_app.model.ApplicationDetails;
import com.nu.cs.ta_app.model.Course;
import com.nu.cs.ta_app.model.InstructorFeedback;
import com.nu.cs.ta_app.model.TAPosition;
import com.nu.cs.ta_app.model.UserModel;
import com.nu.cs.ta_app.model.Applicant.TAApplication;
import com.nu.cs.ta_app.repository.CourseRepository;
import com.nu.cs.ta_app.repository.InstructorFeedbackRepository;
import com.nu.cs.ta_app.repository.TAApplicationRepository;
import com.nu.cs.ta_app.repository.TAOpenPositionsRepository;
import com.nu.cs.ta_app.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {
	
	private final TAOpenPositionsRepository taOpenPositionsRepository;
	private final  CourseRepository courseRepository;
	private final TAApplicationRepository taApplicationRepository;
	private final UserRepository userRepository;
	private final InstructorFeedbackRepository instructorFeedbackRepository;
	
	public int openTAPositionsFor (TAPosition taPosition) {
		Course course = courseRepository.findByCourseName(taPosition.getCourse()).orElseThrow(() -> new CourseNotFoundException("Course Not Found"));
		TAPosition existingPosition = null;
		try {
			existingPosition = taOpenPositionsRepository.findByCourse(course.getCourseName());
		} catch (Exception e) {
			
		}
		if (existingPosition != null) {
			int existingOpenPositionsForTheCourse = existingPosition.getPositions();
			int updatedPositions = existingOpenPositionsForTheCourse + taPosition.getPositions();
			return taOpenPositionsRepository.updatePosition(updatedPositions, existingPosition.getId(), existingPosition.getCourse());
		} else {
			TAPosition taPositionSaved = taOpenPositionsRepository.save(taPosition);
			return taPositionSaved.getId();
		}
	}
	
	public List<ApplicationDetails> searchWithCourseName (String courseName) {
		List<TAApplication> listOfApplications= taApplicationRepository.findAllByCourseName(courseName);
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
	
	public List<AdminFeedbackModel> findByFirstName (String firstName) {
		List<UserModel> userList = userRepository.findByFirstname(firstName).orElseThrow(()-> new UserNotFoundException("user not found"));
		List<AdminFeedbackModel> adminFeedbackModelList = new ArrayList<>();
		if (userList.size() >0) {
			for (UserModel user: userList) {
				if (user.getRole().toString().equals("APPLICANT")) {
					List<InstructorFeedback> instructorFeedbackList;
					try {
						instructorFeedbackList = instructorFeedbackRepository.findAllByApplicantId(user.getId()).orElseThrow(() -> new RuntimeException("There is no Feedback for this applicant"));
						
					} catch (Exception e) {
						instructorFeedbackList = new ArrayList<>();
					}
					AdminFeedbackModel adminFeedbackModel = new AdminFeedbackModel();
					adminFeedbackModel.setApplicant_id(user.getId());
					adminFeedbackModel.setFirstName(user.getFirstname());
					adminFeedbackModel.setLastName(user.getLastname());
					adminFeedbackModel.setInstructorFeedbackList(instructorFeedbackList);
					adminFeedbackModelList.add(adminFeedbackModel);
					
				}
				
			}
		}
		
		if (userList.size() == 0) {
			throw new UserNotFoundException("user not found");
		} else {
			return adminFeedbackModelList;
		}
	}
	
	
	public List<AdminFeedbackModel> findByFullName (String firstName, String lastName) {
		List<UserModel> userList = userRepository.findByFullname(firstName, lastName).orElseThrow(()-> new UserNotFoundException("user not found"));
		List<AdminFeedbackModel> adminFeedbackModelList = new ArrayList<>();
		if (userList.size() >0) {
			for (UserModel user: userList) {
				if (user.getRole().toString().equals("APPLICANT")) {
					List<InstructorFeedback> instructorFeedbackList;
					try {
						instructorFeedbackList = instructorFeedbackRepository.findAllByApplicantId(user.getId()).orElseThrow(() -> new RuntimeException("There is no Feedback for this applicant"));
						
					} catch (Exception e) {
						instructorFeedbackList = new ArrayList<>();
					}
					AdminFeedbackModel adminFeedbackModel = new AdminFeedbackModel();
					adminFeedbackModel.setApplicant_id(user.getId());
					adminFeedbackModel.setFirstName(user.getFirstname());
					adminFeedbackModel.setLastName(user.getLastname());
					adminFeedbackModel.setInstructorFeedbackList(instructorFeedbackList);
					adminFeedbackModelList.add(adminFeedbackModel);
					
				}
				
			}
		}
		
		if (userList.size() == 0) {
			throw new UserNotFoundException("user not found");
		} else {
			return adminFeedbackModelList;
		}
	}
	
}
