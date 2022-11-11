package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ForgotPasswordDTO;
import com.app.dto.LoggedUserDTO;
import com.app.dto.LoginDTO;
import com.app.dto.ResetPasswordRequestDTO;
import com.app.service.DoctorService;
import com.app.service.PatientService;
import com.app.service.ResetPasswordService;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {
	
	@Autowired
	ResetPasswordService resetPasswordService;
	
	@Autowired
	PatientService patientService;
	
	@Autowired
	DoctorService doctorService;
	
	@PostMapping(path = "")
	public ResponseEntity<?> authenticateUser(@RequestBody LoginDTO loginDTO){
		
		String email = loginDTO.getEmail();
		String password = loginDTO.getPassword();
		
		LoggedUserDTO doctorDTO = doctorService.authenticateDoctor(email, password);
		LoggedUserDTO patientDTO = patientService.authenticatePatient(email, password);
		
		try {
			if(doctorDTO != null) {
					return new ResponseEntity<>(doctorDTO, HttpStatus.OK);
			}
			else if(patientDTO != null){
					return new ResponseEntity<>(patientDTO, HttpStatus.OK);
			}
			else {
				return new ResponseEntity<>(new LoggedUserDTO(false, "Invalid email!!!") , HttpStatus.OK);
			}
		} 
		catch (Exception e) {
			
			return new ResponseEntity<String>("Something went wrong!!!." , HttpStatus.BAD_REQUEST);
		}
		
	}
	
	@PostMapping("/forgotpassword")
	public ResponseEntity<String> processForgotPassword(@RequestBody ForgotPasswordDTO dto) {
		
		String forgotPasswordStatus = resetPasswordService.forgotPassword(dto.getEmail());
		return new ResponseEntity<>( forgotPasswordStatus , HttpStatus.OK);
	}
	

	@PostMapping("/validateotp")
	public ResponseEntity<String> processValidateOTP(@RequestParam("resetPasswordOTP") String OTP) {
		String otpVerficationStatus = resetPasswordService.verifyOTP(OTP);
				return new ResponseEntity<>( otpVerficationStatus , HttpStatus.OK);
	}

	@PutMapping("/resetpassword")
	public ResponseEntity<String> processResetPassword(@RequestBody ResetPasswordRequestDTO resetRequest) {
		
		String resetPasswordStatus = resetPasswordService.resetPassword(resetRequest);
		return new ResponseEntity<>( resetPasswordStatus , HttpStatus.OK);
				
	}
}
