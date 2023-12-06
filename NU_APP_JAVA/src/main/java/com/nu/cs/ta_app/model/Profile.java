package com.nu.cs.ta_app.model;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Component
public class Profile {
	private int id;
	private String firstname;
	private String lastname;
	private String Role;
	private String username;
}
