package com.nu.cs.ta_app.model;

import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {

	private String firstName;
	private String lastName;
	private String username;
	private String password;
	private Role role;
}
