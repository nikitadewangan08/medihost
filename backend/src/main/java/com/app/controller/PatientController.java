package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.PatientAppointmentDTO;
import com.app.dto.PatientDTO;
import com.app.service.AppointmentService;
import com.app.service.PatientService;

@RestController
@RequestMapping("/api/patient")
@CrossOrigin(origins = "http://localhost:3000")
public class PatientController {

	@Autowired
	PatientService patientService;
	
	@Autowired
	AppointmentService appointmentService;
	
	@PostMapping(path = "/register")
	public ResponseEntity<String> registerPatient(@RequestBody PatientDTO patientDTO){
	
		try {
			String result = patientService.registerPatient(patientDTO);
			return new ResponseEntity<String>(result, HttpStatus.CREATED);
		} 
		catch (Exception e) {
			System.out.println(e.getMessage());
			if(e.getMessage().contains("UK_bawli8xm92f30ei6x9p3h8eju"))
				return new ResponseEntity<String>("Email " + patientDTO.getEmail() + " is already registered.", HttpStatus.BAD_REQUEST);
			else
				return new ResponseEntity<String>("Something went wrong. Please try again after sometime.", HttpStatus.OK);
		}
		
	}
	
	@PutMapping(path = "/update")
	public ResponseEntity<String> updatePatient(@RequestBody PatientDTO patientDTO){
		
		try {
			String result = patientService.updatePatient(patientDTO);
			return new ResponseEntity<String>(result, HttpStatus.OK);
		}
		catch(Exception e) {
			return new ResponseEntity<String>("Something went wrong. Please update again after sometime.", HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping(path = "/myappointmentlist")
	public ResponseEntity<List<PatientAppointmentDTO>> getPatientAppointmentListByPatientId(@RequestParam Long patientId){
		
		List<PatientAppointmentDTO> appointmentList = appointmentService.getPatientAppointmentListByPatientId(patientId);
		
		return new ResponseEntity<List<PatientAppointmentDTO>>(appointmentList, HttpStatus.OK);
	}
}


