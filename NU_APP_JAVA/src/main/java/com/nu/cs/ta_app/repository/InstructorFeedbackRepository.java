package com.nu.cs.ta_app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.nu.cs.ta_app.model.InstructorFeedback;

public interface InstructorFeedbackRepository extends JpaRepository<InstructorFeedback, Integer>{
	
	
	@Query(value = "SELECT * FROM nu_cs.instructor_feedback u WHERE u.applicant_id = ?", 
			  nativeQuery = true)
	public Optional<List<InstructorFeedback>> findAllByApplicantId (int id);
}
