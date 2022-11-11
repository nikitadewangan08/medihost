package com.app.service;

import java.util.List;

import com.app.dto.DoctorDTO;
import com.app.dto.LoggedUserDTO;
import com.app.pojos.User;

public interface IDoctorService {

	public String registerDoctor(DoctorDTO doctorDTO);
	
	public LoggedUserDTO authenticateDoctor(String email, String password);
	
	public List<DoctorDTO> getDoctorsByCityAndSpeciality(String doctorCity, String doctorSpeciality);
	
	public String updateDoctor(DoctorDTO doctorDTO);
	
	public void updatePassword(User user, String newPassword);
}
