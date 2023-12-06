package com.nu.cs.ta_app.security;

import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import com.nu.cs.ta_app.model.UserModel;
import com.nu.cs.ta_app.repository.UserRepository;

import jakarta.servlet.Filter;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
	
	private final UserRepository userRepository;
	// private final AuthenticationProvider authenticationProvider;
	private final UserDetailsService userDetailsService;
	@Lazy
	private final JWTAuthenticationFilter JWTAuthFilter;
	
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//		http.csrf().disable()
//		.authorizeHttpRequests((authorize) -> {
//            authorize.anyRequest().authenticated();
//        })
//		.formLogin(form -> form
//    			.loginPage("http://localhost:3000/login")
//    			.loginProcessingUrl("/authenticate")
//    			.defaultSuccessUrl("http://localhost:3000/auth")
//    			.permitAll()
//    		);
//		
//		return http.build();
		
		http.csrf().disable()
			.cors(corsCustomizer->corsCustomizer.configurationSource(new CorsConfigurationSource() {
				
				@Override
				public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
					CorsConfiguration configuration = new CorsConfiguration();
				    configuration.setAllowedOrigins(Collections.singletonList("http://localhost:3000/"));
				    configuration.setAllowedMethods(Arrays.asList("POST", "GET", "PUT"));
				    configuration.setExposedHeaders(Arrays.asList("*", "Content-Disposition"));
				    // configuration.setAllowedHeaders(Arrays.asList("Authorization", "content-type"));
				    configuration.setAllowedHeaders(Collections.singletonList("*"));
					return configuration;
				}
			}))
			.authorizeHttpRequests()
			.requestMatchers("/authentication/*","/download/*")
			.permitAll()
			.anyRequest()
			.authenticated()
			.and()
			.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
			.authenticationProvider(authenticationProvider())
			.addFilterBefore(JWTAuthFilter, UsernamePasswordAuthenticationFilter.class);
		
		return http.build();
	}
	
	@Bean
	public AuthenticationProvider authenticationProvider () {
		DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
		daoAuthenticationProvider.setUserDetailsService(userDetailsService);
		daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
		return daoAuthenticationProvider;
	}
	
	
//	@Bean
//	CorsConfigurationSource corsConfigurationSource() {
//		CorsConfiguration configuration = new CorsConfiguration();
//		configuration.setAllowedOrigins(Arrays.asList("https://example.com"));
//		configuration.setAllowedMethods(Arrays.asList("GET","POST"));
//		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//		source.registerCorsConfiguration("/**", configuration);
//		return source;
//	}
//	
//	@Bean
//	UrlBasedCorsConfigurationSource corsConfigurationSource() {
//	    CorsConfiguration configuration = new CorsConfiguration();
//	    configuration.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
//	    configuration.setAllowedMethods(Arrays.asList("GET","POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
//	    configuration.setExposedHeaders(Arrays.asList("Authorization", "content-type"));
//	    configuration.setAllowedHeaders(Arrays.asList("Authorization", "content-type"));
////	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
////	    source.registerCorsConfiguration("/**", configuration);
//	    return configuration;
//	}
	
	@Bean
	public AuthenticationManager authenticationManager (AuthenticationConfiguration config) throws Exception{
		return config.getAuthenticationManager();
	}
	
	  @Bean
	    public static PasswordEncoder passwordEncoder(){
	        return new BCryptPasswordEncoder();
	    }
}
