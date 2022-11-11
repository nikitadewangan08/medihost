package com.app.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.DoctorDTO;
import com.app.dto.LoggedUserDTO;
import com.app.dto.UserDTO;
import com.app.pojos.Doctor;
import com.app.pojos.User;
import com.app.repository.DoctorRepository;
import com.app.repository.UserRepository;

@Service
@Transactional(rollbackOn = Exception.class)
public class DoctorService implements IDoctorService{

	@Autowired
	 DoctorRepository doctorRepository;
	
	@Autowired
	 UserRepository userRepository;
	
	@Autowired
	UserService userService;
	
	@Override
	public String registerDoctor(DoctorDTO doctorDTO) {
		
		Doctor newDoctor = new Doctor(doctorDTO);
		doctorRepository.save(newDoctor);
		System.out.println("In service doc reg");
		User user = userService.registerUser(new UserDTO(true, newDoctor));
		userRepository.save(user);
		
		return "Registered Successfully";
		
	}

	@Override
	public LoggedUserDTO authenticateDoctor(String email, String password) {
		
		Doctor doctor = doctorRepository.findByEmail(email);
		if(doctor != null) {
			if(doctor.getPassword().equals(password)) {
				DoctorDTO doctorDTO = new DoctorDTO(doctor);
				return new LoggedUserDTO(true, true, doctorDTO);
			}
			else
				return new LoggedUserDTO(false, "Invalid Password!!!");
		}
		else{
			return null;
		}
	}
	
	@Override
	public List<DoctorDTO> getDoctorsByCityAndSpeciality(String doctorCity, String doctorSpeciality) {
	
		List<Doctor> doctor = doctorRepository.findByDoctorCityAndDoctorSpeciality(doctorCity, doctorSpeciality);
		List<DoctorDTO> doctorDTOList = new ArrayList<>();
		
		for(Doctor d : doctor) {
			DoctorDTO tempDoctorDTO = new DoctorDTO(d);
			doctorDTOList.add(tempDoctorDTO);
		}
		return doctorDTOList;
	}

	@Override
	public String updateDoctor(DoctorDTO doctorDTO) {
		
//		Doctor doctor = doctorRepository.findByEmail(doctorDTO.getEmail());
//		doctor.setDoctorName(doctorDTO.getDoctorName());
//		doctor.setPassword(doctorDTO.getPassword());
//		doctor.setDoctorAddress(doctorDTO.getDoctorAddress());
//		doctor.setDoctorCity(doctorDTO.getDoctorCity());
//		doctor.setDoctorMobileNo(doctorDTO.getDoctorMobileNo());
		
		Doctor doctor = new Doctor(doctorDTO);
	    doctor.setDoctorId(doctorDTO.getDoctorId());
		doctorRepository.save(doctor);
		return "Profile Updated Successfully";
		
	}
	
	@Override
	public void updatePassword(User user, String newPassword) {
		
		Doctor doctor = doctorRepository.findByEmail(user.getEmail());
	    doctor.setPassword(newPassword);
		doctorRepository.save(doctor);
		
	}
}
