package com.app.dto;

import java.time.LocalDate;

import javax.validation.constraints.NotNull;

import com.app.pojos.Patient;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PatientDTO {
	
	private Long patientId;
	
	@NotNull(message = "Please enter your name")
	private String patientName;
	
	private String email;

	private String password;
	
	private Long patientAadharNo;

	private LocalDate patientDob;

	private String patientAddress;

	private String patientCity;

	private Long patientMobileNo;

	public PatientDTO(Patient patient) {
		
		super();
		this.patientId = patient.getPatientId();
		this.patientName = patient.getPatientName();
		this.email = patient.getEmail();
		this.password = patient.getPassword();
		this.patientAadharNo = patient.getPatientAadharNo();
		this.patientDob = patient.getPatientDob();
		this.patientAddress = patient.getPatientAddress();
		this.patientCity = patient.getPatientCity();
		this.patientMobileNo = patient.getPatientMobileNo();
	}
}
