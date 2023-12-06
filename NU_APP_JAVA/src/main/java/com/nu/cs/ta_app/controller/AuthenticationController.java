package com.nu.cs.ta_app.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nu.cs.ta_app.model.AuthenticationResponse;
import com.nu.cs.ta_app.model.LoginRequest;
import com.nu.cs.ta_app.model.RegisterRequest;
import com.nu.cs.ta_app.service.LoginService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/authentication")
@RequiredArgsConstructor
public class AuthenticationController {
	
	private final LoginService loginService;
	
	@PostMapping("/register")
	public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest register) {
		AuthenticationResponse authResponse = loginService.register(register);
		return ResponseEntity.ok(authResponse);
	}
	
	@PostMapping("/login")
	public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginRequest loginRequest) throws Exception {
		System.out.println("LOgging in");
		AuthenticationResponse authResponse = null;
		authResponse = loginService.login(loginRequest);
		return ResponseEntity.ok(authResponse);
	}
}
