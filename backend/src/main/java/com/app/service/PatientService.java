package com.app.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.LoggedUserDTO;
import com.app.dto.PatientDTO;
import com.app.dto.UserDTO;
import com.app.pojos.Patient;
import com.app.pojos.User;
import com.app.repository.PatientRepository;
import com.app.repository.UserRepository;

@Service
@Transactional
public class PatientService implements IPatientService{
	
	@Autowired
	private PatientRepository patientRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	UserService userService;
	
	@Override
	public String registerPatient(PatientDTO patientDTO) {
		
		Patient newPatient = new Patient(patientDTO);
		
		patientRepository.save(newPatient);
		
		User user = userService.registerUser(new UserDTO(false, newPatient));
		userRepository.save(user);
		
		return "Registered Successfully.";
		
	}
	
	@Override
	public String updatePatient(PatientDTO patientDTO) {
		
		Patient patient = new Patient(patientDTO);
		patient.setPatientId(patientDTO.getPatientId());
		patientRepository.save(patient);
		return "Profile Updated Successfully";
	}

	@Override
	public LoggedUserDTO authenticatePatient(String email, String password) {
		
		Patient patient = patientRepository.findByEmail(email);
		if(patient != null) {
			if(patient.getPassword().equals(password)) {
				PatientDTO patientDTO = new PatientDTO(patient);
				return new LoggedUserDTO(true, false, patientDTO);
			}
			else
				return new LoggedUserDTO(false, "Invalid Password!!!");
				
		}
		else {
			return null;
		}
	}
	

	@Override
	public void updatePassword(User user, String newPassword) {
		
		Patient updatePatientPassword = patientRepository.findByEmail(user.getEmail());
		updatePatientPassword.setPassword(newPassword);
		patientRepository.save(updatePatientPassword);
	}

}
