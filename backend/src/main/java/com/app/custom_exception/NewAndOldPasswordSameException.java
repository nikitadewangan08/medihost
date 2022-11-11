package com.app.custom_exception;

public class NewAndOldPasswordSameException extends RuntimeException {
	
	private static final long serialVersionUID = 7396086619412643322L;
	public NewAndOldPasswordSameException(String errMsg) {
		super(errMsg);
	}
}
