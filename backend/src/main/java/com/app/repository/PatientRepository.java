package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long> {

	Patient findByEmail(String email);
}
