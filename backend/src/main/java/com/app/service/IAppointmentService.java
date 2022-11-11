package com.app.service;

import java.util.List;

import com.app.dto.AppointmentDTO;
import com.app.dto.ConsultationDTO;
import com.app.dto.DoctorAppointmentDTO;
import com.app.dto.PatientAppointmentDTO;

public interface IAppointmentService {
	
	public String requestAppointment(AppointmentDTO appointmentDTO);
	
	public List<PatientAppointmentDTO> getPatientAppointmentListByPatientId(Long patientId);
	
	public List<DoctorAppointmentDTO> getDoctorAppointmentListByDoctorId(Long doctorId);
	
	public String actionizeAppointmentRequest(Long appointmentId, String action, int slot, String remarks);
	
	public String consult(ConsultationDTO consultationDTO);
	
	public List<Integer> getAvailableSlots(Long doctorId, String requestedDate);
}
