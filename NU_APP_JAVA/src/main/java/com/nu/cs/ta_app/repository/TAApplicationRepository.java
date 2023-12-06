package com.nu.cs.ta_app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.nu.cs.ta_app.model.Applicant.TAApplication;

public interface TAApplicationRepository extends JpaRepository<TAApplication, Integer>{
	
	public static String Comm_Review = "Committee Member Review";
	public static String Comm_Approved = "Committee Member Approved";
	public static String Comm_Rejected = "Committee Member Rejected";
	
	@Query(
			  value = "SELECT * FROM nu_cs.ta_applications u WHERE u.applicant_id = ?", 
			  nativeQuery = true)
	public Optional<List<TAApplication>> findAllByapplicant_id(int applicant_id);
	
	@Modifying
	@Transactional
	@Query(
			value = "UPDATE nu_cs.ta_applications set offer_accepted = ?1 WHERE application_id = ?3 and applicant_id = ?2",
			nativeQuery = true
			)
	public int acceptOrDeclineApplication (String acceptOrDecline, int applicant_id, int application_id);
	
	
	@Query(value = "SELECT * FROM nu_cs.ta_applications u WHERE u.apply_for = ?",
			nativeQuery = true)
	public List<TAApplication> findAllByCourseName (String courseName);
	
	@Query(value = "SELECT * FROM nu_cs.ta_applications u WHERE u.apply_for = ?1 and application_status = ?2",
			nativeQuery = true)
	public List<TAApplication> findAllByCourseNameAndApplicationStatus (String courseName, String application_status);
	
	@Modifying
	@Transactional
	@Query(
			value = "UPDATE nu_cs.ta_applications set application_status = ?1 WHERE application_id = ?2 and applicant_id = ?3",
			nativeQuery = true
			)
	public int changeApplicationStatus (String applicationStatus, int application_id, int applicant_id);
	
	@Query(value = "SELECT * FROM nu_cs.ta_applications u WHERE u.apply_for = ?1 and application_status in ('Committee Member Review', 'Committee Member Approved', 'Committee Member Rejected')",
			nativeQuery = true)
	public List<TAApplication> findAllByCourseNameForMember (String courseName);
	
}
