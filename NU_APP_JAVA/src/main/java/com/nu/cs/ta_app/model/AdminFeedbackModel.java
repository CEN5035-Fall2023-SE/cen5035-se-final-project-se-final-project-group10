package com.nu.cs.ta_app.model;

import java.util.List;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Component
public class AdminFeedbackModel {
	private int applicant_id;
	private String firstName;
	private String lastName;
	private List<InstructorFeedback> instructorFeedbackList;
}
