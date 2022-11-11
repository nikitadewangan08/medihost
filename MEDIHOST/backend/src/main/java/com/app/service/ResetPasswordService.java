
package com.app.service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.custom_exception.NewAndOldPasswordSameException;
import com.app.custom_exception.OTPExpiredException;
import com.app.custom_exception.RecordNotFoundException;
import com.app.dto.ResetPasswordRequestDTO;
import com.app.pojos.User;
import com.app.pojos.UserRole;
import com.app.repository.UserRepository;

import net.bytebuddy.utility.RandomString;

@Service
public class ResetPasswordService implements IResetPasswordService {

	private static final long OTP_VALID_DURATION = 5; // 1 minutes

	@Autowired
	UserRepository userRepository;

	@Autowired
	PatientService patientService;

	@Autowired
	DoctorService doctorService;

	@Autowired
	UserService userService;

//	@Autowired
//	private PasswordEncoder bCryptPasswordEncoder;
//	
	@Autowired
	EmailService emailService;

	@Override
	public String forgotPassword(String userEmail) {

		User user = userRepository.findByEmail(userEmail);

		if (user == null) {
			throw new RecordNotFoundException("Invalid email ID");
		}

		user.setResetPasswordOTP(generateOTP());
		user.setResetOTPCreationDate(LocalDateTime.now());

		System.out.println(
				"OTP Created" + user.getResetPasswordOTP() + "\ndate:" + user.getResetOTPCreationDate().toString());

		userRepository.save(user);

		emailService.sendOtpMessage(user.getEmail(),
				emailService.buildEmail(user.getUsername(), user.getResetPasswordOTP()));

		return "Verification OTP sent to the given email address";

	}

	@Override
	public String generateOTP() {
		
		String OTP = RandomString.make(8);
		return OTP;
	}

	@Override
	public boolean isOTPExpired(LocalDateTime OTPCreationDate) {
		
		System.out.println("verifying OTP time : " + OTPCreationDate);
		LocalDateTime now = LocalDateTime.now();
		System.out.println("curr time: " + now);
		Duration diff = Duration.between(OTPCreationDate, now);
		System.out.println("diff of OTP time : " + diff.toMinutes());
		System.out.println("OTP_VALID_DURATION: " + OTP_VALID_DURATION);
		return diff.toMinutes() >= OTP_VALID_DURATION ? true : false;
	}

	@Override
	public String verifyOTP(String verifyOTP) {

		Optional<User> userOptional = userRepository.findByResetPasswordOTP(verifyOTP);

		if (!userOptional.isPresent()) {
			throw new RecordNotFoundException("Invalid OTP please submit correct OTP");
		}

		LocalDateTime tokenCreationDate = userOptional.get().getResetOTPCreationDate();
		System.out.println("goin to verify expiry mtd: " + tokenCreationDate);

		if (isOTPExpired(tokenCreationDate)) {
			System.out.println("otp expired");
			throw new OTPExpiredException("OTP expired");
		}

		return "OTP Verified Successfully";
	}

	@Override
	public String resetPassword(ResetPasswordRequestDTO resetRequest) {
		
//		String newPassword = bCryptPasswordEncoder.encode(resetRequest.getPassword());
		
		User user = userRepository.findByEmail(resetRequest.getEmail());
		
		String newPassword = resetRequest.getPassword();
		System.out.println("newPassword:" + newPassword);
		String oldPassword = user.getPassword();
		System.out.println("oldPassword:" + oldPassword);
		if (newPassword.equals(oldPassword)) {
			throw new NewAndOldPasswordSameException("Can't store same password");
		}
		
		clearOTP(user);
		
		userService.updatePassword(user, newPassword);
		
		if (user.getRole().trim().equals(UserRole.ROLE_DOCTOR.toString())) {
			doctorService.updatePassword(user, newPassword);	
		}else {
		patientService.updatePassword(user, newPassword);
		}	
		
		return "password updated successfully";
	}

	@Override
	public void clearOTP(User user) {
		
		System.out.println("clearing OTP details in User DataBase");
		user.setResetPasswordOTP(null);
		System.out.println(user.getResetPasswordOTP());
		user.setResetOTPCreationDate(null);
		userRepository.save(user);
	}

}
