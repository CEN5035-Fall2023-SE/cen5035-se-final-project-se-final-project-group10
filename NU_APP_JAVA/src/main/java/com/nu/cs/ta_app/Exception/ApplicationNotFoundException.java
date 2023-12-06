package com.nu.cs.ta_app.Exception;

public class ApplicationNotFoundException extends RuntimeException{
	public ApplicationNotFoundException(String message) {
		super(message);
	}
}
