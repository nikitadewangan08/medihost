package com.app.dto;

import javax.validation.constraints.NotNull;

import com.app.pojos.Doctor;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DoctorDTO {
	
	@JsonInclude(Include.NON_DEFAULT)
	private Long doctorId;
	
	@NotNull(message = "Please enter your name")
	private String doctorName;

	private String email;

	private String password;
	
	private String doctorUPRNNo;

	private String doctorAddress;

	private String doctorCity;

	private Long doctorMobileNo;

	private String doctorSpeciality;

	public DoctorDTO(Doctor doctor) {
		
		this.doctorId = doctor.getDoctorId();
		this.doctorName = doctor.getDoctorName();
		this.email = doctor.getEmail();
		this.password = doctor.getPassword();
		this.doctorUPRNNo = doctor.getDoctorUPRNNo();
		this.doctorAddress = doctor.getDoctorAddress();
		this.doctorCity = doctor.getDoctorCity();
		this.doctorMobileNo = doctor.getDoctorMobileNo();
		this.doctorSpeciality = doctor.getDoctorSpeciality();
	}

}
