package com.app.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LoggedUserDTO {

	private boolean isDoctor;
	
	private Object userDTO;
	
	private boolean status;
	
	private String message;
	
	public LoggedUserDTO(boolean status, boolean isDoctor, Object userDTO) {
		this.status = status;
		this.isDoctor = isDoctor;
		this.userDTO = userDTO;
	}

	public LoggedUserDTO(boolean status, String message) {
		super();
		this.status = status;
		this.message = message;
	}
	
	
	
}
