package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.pojos.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
	
	//Doctor findByEmailAndPassword(String email, String password);

	List<Doctor> findByDoctorCityAndDoctorSpeciality(String doctorCity, String doctorSpeciality);

	Doctor findByEmail(String email);
	
	@Modifying
	@Query(value = "update doctor d set d.password = :password where d.email = :email",nativeQuery = true) 
	void updatePassword( @Param("email") String email, @Param("password") String password);
	
	
}
