package com.app.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.service.OptionsService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class OptionsController {
	
	@Autowired
	private OptionsService optionsService;
	
	@GetMapping("/options/{type}")
	public ResponseEntity<List<String>> getOptions(@PathVariable int type){
		try {
			System.out.println("in options");
			return new ResponseEntity<List<String>>(optionsService.getOptions(type), HttpStatus.OK);
		}
		catch(Exception e) {
			return new ResponseEntity<List<String>>(new ArrayList<>(), HttpStatus.OK);
		}
	}
 
}
