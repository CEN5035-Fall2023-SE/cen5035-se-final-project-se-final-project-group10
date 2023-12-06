package com.nu.cs.ta_app.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nu.cs.ta_app.Exception.UserNotFoundException;
import com.nu.cs.ta_app.model.Profile;
import com.nu.cs.ta_app.model.UserModel;
import com.nu.cs.ta_app.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/profile")
@RequiredArgsConstructor
public class ProfileController {
	
	private final UserRepository userRepository;
	private final Profile profile;
	
	@GetMapping("/getFullProfile/{username}")
	public ResponseEntity<Profile> getFullProfile (@PathVariable String username) {
		UserModel user = userRepository.findByUsername(username).orElseThrow(() -> new UserNotFoundException("user not found"));
		profile.setFirstname(user.getFirstname());
		profile.setLastname(user.getLastname());
		profile.setId(user.getId());
		profile.setRole(user.getRole().toString());
		profile.setUsername(user.getUsername());
		return ResponseEntity.ok(profile);
	}

}
