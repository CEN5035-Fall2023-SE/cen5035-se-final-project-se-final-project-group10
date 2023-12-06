package com.nu.cs.ta_app.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.nu.cs.ta_app.Exception.UserNotFoundException;
import com.nu.cs.ta_app.model.ApplicantModel;
import com.nu.cs.ta_app.model.InstructorFeedback;
import com.nu.cs.ta_app.model.UserModel;
import com.nu.cs.ta_app.repository.CourseRepository;
import com.nu.cs.ta_app.repository.InstructorFeedbackRepository;
import com.nu.cs.ta_app.repository.TAOpenPositionsRepository;
import com.nu.cs.ta_app.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class InstructorService {
	private final UserRepository userRepository;
	private final InstructorFeedbackRepository instructorRepository;
	
	public List<ApplicantModel> findByFirstName (String firstName) {
		List<UserModel> userList = userRepository.findByFirstname(firstName).orElseThrow(()-> new UserNotFoundException("user not found"));
		List<ApplicantModel> applicantList = new ArrayList<>();
		if (userList.size() >0) {
			for (UserModel user: userList) {
				if (user.getRole().toString().equals("APPLICANT")) {
					ApplicantModel ap = new ApplicantModel();
					ap.setFirstName(user.getFirstname());
					ap.setLastName(user.getLastname());
					ap.setId(user.getId());
					applicantList.add(ap);
				}
				
			}
		}
		
		if (applicantList.size() == 0) {
			throw new UserNotFoundException("user not found");
		} else {
			return applicantList;
		}
	}
	
	public List<ApplicantModel> findByFullName (String firstName, String lastName) {
		List<UserModel> userList = userRepository.findByFullname(firstName, lastName).orElseThrow(()-> new UserNotFoundException("user not found"));
		List<ApplicantModel> applicantList = new ArrayList<>();
		if (userList.size() >0) {
			for (UserModel user: userList) {
				if (user.getRole().toString().equals("APPLICANT")) {
					ApplicantModel ap = new ApplicantModel();
					ap.setFirstName(user.getFirstname());
					ap.setLastName(user.getLastname());
					ap.setId(user.getId());
					applicantList.add(ap);
				}
				
			}
		}
		
		if (applicantList.size() == 0) {
			throw new UserNotFoundException("user not found");
		} else {
			return applicantList;
		}
	}
	
	public int submitFeedback (InstructorFeedback instructorFeedback) {
		InstructorFeedback savedFeedback = instructorRepository.save(instructorFeedback);
		return savedFeedback.getId();
	}
}
