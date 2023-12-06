package com.nu.cs.ta_app.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class InstructorFeedback {
	private int applicant_id;
	private String feedback;
	@Id
	@GeneratedValue
	private int id;
	private String instructorName;
}
