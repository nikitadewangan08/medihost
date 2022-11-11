package com.app.controller;

import java.util.ArrayList;
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

import com.app.dto.ConsultationDTO;
import com.app.dto.DoctorAppointmentDTO;
import com.app.dto.DoctorDTO;
import com.app.dto.SearchDoctorDTO;
import com.app.service.AppointmentService;
import com.app.service.DoctorService;


@RestController
@RequestMapping("/api/doctor")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorController {

	@Autowired
	DoctorService doctorService;
	
	@Autowired
	AppointmentService appointmentService;
	
	@PostMapping(path = "/register")
	public ResponseEntity<String> registerDoctor(@RequestBody DoctorDTO doctorDTO){
		
		try {
			System.out.println("In reg doc - ok ");
			String result = doctorService.registerDoctor(doctorDTO);
			return new ResponseEntity<String>(result, HttpStatus.CREATED);
		}
		catch(Exception e) {
			if(e.getMessage().contains("K_jdtgexk368pq6d2yb3neec59d")) {
				System.out.println("In reg doc - email already exist");
				return new ResponseEntity<String>("Email " + doctorDTO.getEmail() + " is already registered.", HttpStatus.BAD_REQUEST);
			}
				
			else {
				e.printStackTrace();
				System.out.println("In reg doc- error "+e.getMessage());
				return new ResponseEntity<String>("Something went wrong. Please try again after sometime.", HttpStatus.OK);
			}
				
		}
	}
	
	@PostMapping(path = "/getdoctorsbycityandspeciality")
	public ResponseEntity<List<DoctorDTO>> getDoctorsByCityAndSpeciality(@RequestBody SearchDoctorDTO searchDoctorDTO){
		
		String doctorCity = searchDoctorDTO.getDoctorCity();
		String doctorSpeciality = searchDoctorDTO.getDoctorSpeciality();
		
		List<DoctorDTO> doctorDTO = doctorService.getDoctorsByCityAndSpeciality(doctorCity, doctorSpeciality);
		try {
			
			return new ResponseEntity<List<DoctorDTO>>(doctorDTO, HttpStatus.OK);
		} 
		catch (Exception e) {
			return new ResponseEntity<List<DoctorDTO>>(new ArrayList<>() , HttpStatus.NOT_FOUND);
		}
		
	}

	@PutMapping(path = "/update")
	public ResponseEntity<String> updateDoctor(@RequestBody DoctorDTO doctorDTO){
		
		try {
			String result = doctorService.updateDoctor(doctorDTO);
			return new ResponseEntity<String>(result, HttpStatus.OK);
		}
		catch(Exception e) {
			return new ResponseEntity<String>("Something went wrong. Please update again after sometime.", HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping(path = "/myappointmentlist")
	public ResponseEntity<List<DoctorAppointmentDTO>> getDoctorAppointmentListByDoctorId(@RequestParam Long doctorId){
		
		List<DoctorAppointmentDTO> appointmentList = appointmentService.getDoctorAppointmentListByDoctorId(doctorId);
		return new ResponseEntity<List<DoctorAppointmentDTO>>(appointmentList, HttpStatus.OK);
		
	}
	
	@PostMapping(path = "/appointmentrequest")
	public ResponseEntity<String> actionizeAppointmentRequest(@RequestParam("appointmentId") Long appointmentId, @RequestParam("action") String action, @RequestParam("slot") int slot,
			@RequestParam("remarks") String remarks){
		String result = appointmentService.actionizeAppointmentRequest(appointmentId, action, slot, remarks);
		return new ResponseEntity<String>(result, HttpStatus.OK);

	}
	
	@PostMapping(path = "/consult")
	public ResponseEntity<String> consult(@RequestBody ConsultationDTO consultationDTO){
		String result = appointmentService.consult(consultationDTO);
		return new ResponseEntity<String>(result, HttpStatus.OK);
	}
}
