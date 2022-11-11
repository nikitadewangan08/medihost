package com.app.pojos;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.app.dto.PatientDTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "patient")
public class Patient extends Login {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "patient_id", unique = true)
	private Long patientId;
	
	@Column(name = "patient_name", length = 50)
	private String patientName;
	
	@Column(name = "patient_aadhar_no", unique = true)
	private Long patientAadharNo;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Column(name = "patient_dob")
	private LocalDate patientDob;
	
	@Column(name = "patient_address", length = 60)
	private String patientAddress;
	
	@Column(name = "patient_city", length = 40)
	private String patientCity;
	
	@Column(name = "patient_mobile_no", unique = true)
	private Long patientMobileNo;
	
	@OneToMany(mappedBy = "appointmentId")
	List<Appointment> appointments;
	
	public Patient(PatientDTO patientDTO) {
		
		super(patientDTO.getEmail(), patientDTO.getPassword());
		this.patientName = patientDTO.getPatientName();
		this.patientAadharNo = patientDTO.getPatientAadharNo();
		this.patientDob = patientDTO.getPatientDob();
		this.patientAddress = patientDTO.getPatientAddress();
		this.patientCity = patientDTO.getPatientCity();
		this.patientMobileNo = patientDTO.getPatientMobileNo();
	}
}
