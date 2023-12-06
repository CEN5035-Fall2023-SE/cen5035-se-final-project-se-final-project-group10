package com.nu.cs.ta_app.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.nu.cs.ta_app.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class AppConfig {
	
	private final UserRepository userRepository;
	
	@Bean
    public UserDetailsService userDetailsService(){
		return username -> userRepository.findByUsername(username)
				.orElseThrow(()-> new UsernameNotFoundException("User not found"));
    }
}
