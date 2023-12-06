package com.nu.cs.ta_app.security;

import java.io.IOException;

import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.micrometer.common.lang.NonNull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;


@Component
@RequiredArgsConstructor
public class JWTAuthenticationFilter extends OncePerRequestFilter{
	
	
	private final JWTService JWTService;
	@Lazy
	private final UserDetailsService userDetailsService;
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		final String authHeaderFromRequest = request.getHeader("Authorization");
		if (authHeaderFromRequest == null || !authHeaderFromRequest.startsWith("Bearer ")) {
			filterChain.doFilter(request, response);
			return;
		}
		final String jwtTokenFromRequest = authHeaderFromRequest.substring(7);
		final String usernameFromToken = JWTService.extractUsername(jwtTokenFromRequest);
		
		if (usernameFromToken != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			UserDetails userDetails = this.userDetailsService.loadUserByUsername(usernameFromToken);
			if (JWTService.isTokenValid(jwtTokenFromRequest, userDetails)) {
				// if the token is valid, create a usernamepassword authentication token and store it in security context.
				UsernamePasswordAuthenticationToken usenamepasswordtoken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
				usenamepasswordtoken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(usenamepasswordtoken);
				filterChain.doFilter(request, response);
			}
		}
		
	}

}
