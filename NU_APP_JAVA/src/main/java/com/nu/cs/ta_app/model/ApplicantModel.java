package com.nu.cs.ta_app.model;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Component
public class ApplicantModel {
	private String firstName;
	private String lastName;
	private String role;
	private int id;
	
}
