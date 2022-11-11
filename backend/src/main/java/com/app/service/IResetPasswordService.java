package com.app.service;

import java.time.LocalDateTime;

import com.app.dto.ResetPasswordRequestDTO;
import com.app.pojos.User;

public interface IResetPasswordService {

	String forgotPassword(String email);
	
	String generateOTP();
	
	String verifyOTP(String verifyOTP);
	
	boolean isOTPExpired(final LocalDateTime OTPCreationDate);
	
	String resetPassword(ResetPasswordRequestDTO resetPasswordRequest);
	
	void clearOTP(User user);
}
