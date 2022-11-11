package com.app.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentDTO {

	private Long patientId;
	
	private Long doctorId;
	
	private LocalDate requestedDate;
	
	private String problemDescription;
	
//	public AppointmentDTO(Appointment a) {
//		super();
//		this.patientId = a.getPatient().getPatientId();
//		this.doctorId = a.getDoctor().getDoctorId();
//		this.requestedDate = a.getRequestedDate();
//		this.problemDescription = a.getProblemDescription();
//	}
}
