package com.app.pojos;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.app.dto.AppointmentDTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "appointment")
@NoArgsConstructor
public class Appointment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "appointment_id")
	private Long appointmentId;
	
	@ManyToOne
	@JoinColumn(name = "patient_id")
	private Patient patient;
	
	@ManyToOne
	@JoinColumn(name = "doctor_id")
	private Doctor doctor;
	
	@Column(name = "requested_date")
	private LocalDate requestedDate;
	
	private int slot;
	
	@Column(name = "problem_description")
	private String problemDescription;
	
	@Enumerated(EnumType.STRING)
	private Status status;
	
	private String medication;
	
	private String diagnosis;
	
	private String prognosis;
	
	private String remarks;

	public Appointment(Patient patient, Doctor doctor, AppointmentDTO appointmentDTO) {
		
		super();
		this.requestedDate = appointmentDTO.getRequestedDate();
		this.problemDescription = appointmentDTO.getProblemDescription();
		this.status = Status.PENDING;
		this.patient = patient;
		this.doctor = doctor;

	}
	
}
