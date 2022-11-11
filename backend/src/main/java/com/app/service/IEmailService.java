package com.app.service;

public interface IEmailService {


	void sendOtpMessage(String to, String email);
	
	 String buildEmail(String name, String OTP);

}
