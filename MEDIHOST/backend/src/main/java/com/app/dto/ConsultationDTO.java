package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConsultationDTO {

	private Long appointmentId;
	
	private String medication;
	
	private String diagnosis;
	
	private String prognosis;
	
	private String remarks;
}
