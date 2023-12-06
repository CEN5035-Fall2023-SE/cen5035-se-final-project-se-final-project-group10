package com.nu.cs.ta_app.model;

import java.util.Date;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Component
public class ApplicationDetails {
	private String firstName;
	private String lastName;
	private int applicant_id;
	private int application_id;
	private String applyFor;
	private String priorExperience;
	private String experienceInCourse;
	private Date fromDate;
	private Date toDate;
	private String cvFileId;
	private String application_status;
	private String offer_accepted;
}
