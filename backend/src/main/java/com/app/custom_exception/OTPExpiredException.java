package com.app.custom_exception;

public class OTPExpiredException extends RuntimeException {
	
	private static final long serialVersionUID = -3134140889957578132L;
	public OTPExpiredException(String errorMsg) {
		super(errorMsg);
	}
}
