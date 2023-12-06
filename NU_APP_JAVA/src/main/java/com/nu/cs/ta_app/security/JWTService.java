package com.nu.cs.ta_app.security;

import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Jwts.KEY;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTService {
	
	private static final String secret_key = "something secret";
	
	public String extractUsername(String token) {
		return extractClaim(token, Claims::getSubject);
	}
	
	public Claims extractClaims (String token) {
		return Jwts
				.parser()
				.setSigningKey(getSigningKey())
				.build()
				.parseClaimsJws(token)
				.getBody();
				
	}
	
	public <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
		final Claims claims = extractClaims(token);
		return claimResolver.apply(claims);
	}

	private Key getSigningKey() {
		byte[] keyBytes = Decoders.BASE64.decode("c29tZXRoaW5nIHNlY3JldCB0aGF0IG5vIGJvZHkgc2hvdWxkIGJlIGd1ZXNzaW5nIGl0IHJpZ2h0IQ==");
		return Keys.hmacShaKeyFor(keyBytes);
	}
	
	public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
		return Jwts
				.builder()
				.setClaims(extraClaims)
				.setSubject(userDetails.getUsername())
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis()+1000*60*60*24))
				.signWith(getSigningKey(), SignatureAlgorithm.HS256)
				.compact();
				
	}
	
	public String generateToken(UserDetails userDetails) {
		return Jwts
				.builder()
				.setSubject(userDetails.getUsername())
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis()+1000*60*60*24))
				.signWith(getSigningKey(), SignatureAlgorithm.HS256)
				.compact();
				
	}
	
	public boolean isTokenValid (String token, UserDetails userDetails) {
		String userName = extractUsername(token);
		return userName.equals(userDetails.getUsername()) && !isTokenExpired(token);
	}
	
	public boolean isTokenExpired(String token) {
		return extractExpirationDate(token).before(new Date());
	}
	
	public Date extractExpirationDate (String token) {
		return extractClaim(token, Claims::getExpiration);
	}
}
