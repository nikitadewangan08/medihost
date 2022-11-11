package com.app.service;

import com.app.dto.LoggedUserDTO;
import com.app.dto.PatientDTO;
import com.app.pojos.User;

public interface IPatientService {

	public String registerPatient(PatientDTO patientDTO);
	
	public String updatePatient(PatientDTO patientDTO);
	
	public LoggedUserDTO authenticatePatient(String email, String password);
	
	public void updatePassword(User user, String newPassword);
}
