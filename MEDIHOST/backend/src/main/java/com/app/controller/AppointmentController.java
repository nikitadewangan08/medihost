package com.app.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AppointmentDTO;
import com.app.service.AppointmentService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/appointment")
public class AppointmentController {
	
	@Autowired
	AppointmentService appointmentService;

	@PostMapping("/requestappointment")
	public ResponseEntity<String> requestAppointment(@RequestBody AppointmentDTO appointmentDTO){
		
		String result = appointmentService.requestAppointment(appointmentDTO);
		return new ResponseEntity<String>(result, HttpStatus.OK);
	}
	
	@GetMapping(path = "/availableslots")
	public ResponseEntity<List<Integer>> getAvailableSlots(@RequestParam Long doctorId, @RequestParam String requestedDate){
	
		List<Integer> availableSlots = appointmentService.getAvailableSlots(doctorId, requestedDate);
		return new ResponseEntity<List<Integer>>(availableSlots, HttpStatus.OK);
	}
	
}
