package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.UserDTO;
import com.app.pojos.Doctor;
import com.app.pojos.Patient;
import com.app.pojos.User;
import com.app.pojos.UserRole;
import com.app.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserService implements IUserService {

	@Autowired
	UserRepository userRepository;

	@Override
	public User registerUser(UserDTO registerUser) {
		
		//log.info("Saving new user {} to User DataBase", registerUser.getUser());

		if (registerUser.isDoctor() == true) {
			System.out.println("In user reg doc true");
			Doctor registeredDoctor = (Doctor) registerUser.getUser();
			User userDoctor = new User(
				registeredDoctor.getDoctorName(),
				registeredDoctor.getEmail(),
				registeredDoctor.getPassword(),
				UserRole.ROLE_DOCTOR.toString(),
				true
				);
			return userDoctor;
		}
		else {
			Patient registeredPatient = (Patient) registerUser.getUser();
			System.out.println("In user reg doc true");
			User userPatient = new User(
					registeredPatient.getPatientName(),
					registeredPatient.getEmail(),
					registeredPatient.getPassword(),
					UserRole.ROLE_PATIENT.toString(),
					true
					);	
			return userPatient;
		}
	}

	@Override
	public User getUser(String userEmail) {
		log.info("Fetching user {}", userEmail);
		return userRepository.findByEmail(userEmail);
	}

	@Override
	public List<User> getUsers() {
		log.info("Fetching all users");
		return userRepository.findAll();
	}

	@Override
	public void updatePassword(User user, String newPassword) {
		
		log.info("updating password all users");
		User updateUser = userRepository.findByEmail(user.getEmail());
		updateUser.setPassword(newPassword);
		userRepository.save(updateUser);	
	}
}
