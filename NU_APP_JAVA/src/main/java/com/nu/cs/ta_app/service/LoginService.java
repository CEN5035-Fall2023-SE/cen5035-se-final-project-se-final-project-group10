package com.nu.cs.ta_app.service;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nu.cs.ta_app.Exception.UserNotFoundException;
import com.nu.cs.ta_app.model.AuthenticationResponse;
import com.nu.cs.ta_app.model.LoginRequest;
import com.nu.cs.ta_app.model.RegisterRequest;
import com.nu.cs.ta_app.model.Role;
import com.nu.cs.ta_app.model.UserModel;
import com.nu.cs.ta_app.repository.UserRepository;
import com.nu.cs.ta_app.security.JWTService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginService {
	
	private final PasswordEncoder passwordEncoder;
	private final UserRepository userRepository;
	private final JWTService jwtService;
	private final AuthenticationManager authenticationManager;
	
	public AuthenticationResponse register(RegisterRequest register) {
		UserModel user = UserModel.builder()
									.firstname(register.getFirstName())
									.lastname(register.getLastName())
									.username(register.getUsername())
									.password(passwordEncoder.encode(register.getPassword()))
									.role(register.getRole())
									.build();
		userRepository.save(user);
		String token = jwtService.generateToken(user);
		return AuthenticationResponse.builder()
				.token(token)
				.build();
		
	}
	
	public AuthenticationResponse login(LoginRequest loginRequest) throws Exception{
		String token = null;
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
				);
		UserModel user = userRepository.findByUsername(loginRequest.getUsername()).orElseThrow(() -> new UserNotFoundException("User not found"));
		if (user.getRole().equals(loginRequest.getRole())) {
			token = jwtService.generateToken(user);
		} else {
			throw new Exception("Role is Not correct");
		}
		
		return AuthenticationResponse.builder()
				.token(token)
				.build();
	}
}
