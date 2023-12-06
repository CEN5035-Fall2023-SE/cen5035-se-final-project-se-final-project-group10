package com.nu.cs.ta_app.Exception;

public class CourseNotFoundException extends RuntimeException{
	public CourseNotFoundException (String message) {
		super(message);
	}
}
