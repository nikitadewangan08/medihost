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

public class PatientAppointmentDTO {

	//private PatientDTO patient;
	
	private Long appointmentId;
	
	private DoctorDTO doctor;
	
	private LocalDate requestedDate;
	
	private int slot;
	
	private String problemDescription;
	
	private Status status;
	
	private String medication;
	
	private String diagnosis;
	
	private String prognosis;
	
	private String remarks; 

	public PatientAppointmentDTO(Appointment a) {
		
		//this.patient = new PatientDTO(a.getPatient());
		this.appointmentId = a.getAppointmentId();
		this.doctor = new DoctorDTO(a.getDoctor());
		this.requestedDate = a.getRequestedDate();
		this.slot = a.getSlot();
		this.problemDescription = a.getProblemDescription();
		this.status = a.getStatus();
		this.medication = a.getMedication();
		this.diagnosis = a.getDiagnosis();
		this.prognosis = a.getPrognosis();
		this.remarks = a.getRemarks();
	}
}
