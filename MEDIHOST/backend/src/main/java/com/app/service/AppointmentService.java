package com.app.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.AppointmentDTO;
import com.app.dto.ConsultationDTO;
import com.app.dto.DoctorAppointmentDTO;
import com.app.dto.PatientAppointmentDTO;
import com.app.pojos.Appointment;
import com.app.pojos.Doctor;
import com.app.pojos.Patient;
import com.app.pojos.Status;
import com.app.repository.AppointmentRepository;
import com.app.repository.DoctorRepository;
import com.app.repository.PatientRepository;

@Service
@Transactional
public class AppointmentService implements IAppointmentService{
	
	@Autowired
	AppointmentRepository appointmentRepository;
	
	@Autowired
	PatientRepository patientRepository;
	
	@Autowired
	DoctorRepository doctorRepository;
	
	@Override
	public String requestAppointment(AppointmentDTO appointmentDTO) {
		
		Optional<Patient> patient = patientRepository.findById(appointmentDTO.getPatientId());
		Optional<Doctor> doctor = doctorRepository.findById(appointmentDTO.getDoctorId());
		
		Appointment newAppointment = new Appointment(patient.get(), doctor.get(), appointmentDTO);
		
		appointmentRepository.save(newAppointment);
		
		return "Appointment Requested Successfully";
		
	}
	
	@Override
	public List<PatientAppointmentDTO> getPatientAppointmentListByPatientId(Long patientId) {
		
		List<Appointment> appointments = appointmentRepository.findByPatientPatientIdOrderByAppointmentIdDesc(patientId);
		List<PatientAppointmentDTO> patientAppointmentDTOList = new ArrayList<>();
		
		for(Appointment a : appointments) {
			PatientAppointmentDTO tempPatientAppointmentDTO = new PatientAppointmentDTO(a);
			patientAppointmentDTOList.add(tempPatientAppointmentDTO);
		}
		return patientAppointmentDTOList;
	}

	@Override
	public List<DoctorAppointmentDTO> getDoctorAppointmentListByDoctorId(Long doctorId) {
		
		List<Appointment> appointments = appointmentRepository.findByDoctorDoctorIdOrderByAppointmentIdDesc(doctorId);
		List<DoctorAppointmentDTO> doctorAppointmentDTOList = new ArrayList<>();
		
		for(Appointment a : appointments) {
			DoctorAppointmentDTO tempDoctorAppointmentDTOList = new DoctorAppointmentDTO(a);
			doctorAppointmentDTOList.add(tempDoctorAppointmentDTOList);
		}
		return doctorAppointmentDTOList;
	}

	@Override
	public String actionizeAppointmentRequest(Long appointmentId, String action, int slot, String remarks) {
		
		Optional<Appointment> appointment = appointmentRepository.findById(appointmentId);
		
		if(appointment.isPresent()) {
			
			if(action.equalsIgnoreCase("approve")) {
				appointment.get().setSlot(slot);
				appointment.get().setStatus(Status.SCHEDULED);
				appointment.get().setRemarks(remarks);
				appointmentRepository.save(appointment.get());
				return "Appointment Scheduled Successfully";
			}
			else if(action.equalsIgnoreCase("reject")){
				appointment.get().setStatus(Status.REFUSED);
				appointment.get().setRemarks(remarks);
				appointmentRepository.save(appointment.get());
				return "Appointment Rejected";
			}
			else {
				return "Invalid Action";
			}
		}
		else
			return "Appointment Details Not Found";
	}

	public String consult(ConsultationDTO consultationDTO) {
		
		Optional<Appointment> appointment = appointmentRepository.findById(consultationDTO.getAppointmentId());
		
		if(appointment.isPresent() && appointment.get().getStatus().equals(Status.SCHEDULED)) {
			
			appointment.get().setMedication(consultationDTO.getMedication());
			appointment.get().setDiagnosis(consultationDTO.getDiagnosis());
			appointment.get().setPrognosis(consultationDTO.getPrognosis());
			appointment.get().setRemarks(consultationDTO.getRemarks());
			appointment.get().setStatus(Status.CONSULTED);
			appointmentRepository.save(appointment.get());
			return "Consulted Successfully";
		}
		else
			return "Details Not Found or Appointment Not Approved Yet";
	}

	@Override
	public List<Integer> getAvailableSlots(Long doctorId, String requestedDate) {
		
		List<Integer> allSlots = Arrays.asList(1, 2, 3, 4, 5, 6, 7);
		
		LocalDate requestDate  = LocalDate.parse(requestedDate);
		
		List<Integer> bookedSlots = appointmentRepository.getBookedSlots(doctorId, requestDate);
		
		List<Integer> availableSlots = allSlots.stream().filter(s -> !bookedSlots.contains(s)).collect(Collectors.toList());
		
		return availableSlots;
	}
}
