package com.app.dto;

import java.time.LocalDate;

import com.app.pojos.Appointment;
import com.app.pojos.Status;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor

public class DoctorAppointmentDTO {

	private Long appointmentId;
	
	private PatientDTO patient;
	
	//private DoctorDTO doctor;
	
	private LocalDate requestedDate;
	
	private int slot;
	
	private Status status;
	
	private String problemDescription;
	
	private String medication;
	
	private String diagnosis;
	
	private String prognosis;
	
	private String remarks; 

	public DoctorAppointmentDTO(Appointment a) {
		
		this.appointmentId = a.getAppointmentId();
		this.patient = new PatientDTO(a.getPatient());
		//this.doctor = new DoctorDTO(a.getDoctor());
		this.requestedDate = a.getRequestedDate();
		this.slot = a.getSlot();
		this.status = a.getStatus();
		this.problemDescription = a.getProblemDescription();
		this.medication = a.getMedication();
		this.diagnosis = a.getDiagnosis();
		this.prognosis = a.getPrognosis();
		this.remarks = a.getRemarks();
	}
}
