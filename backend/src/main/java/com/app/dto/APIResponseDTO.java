package com.app.dto;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class APIResponseDTO {

	private String message;
	private HttpStatus status;
	private LocalDateTime timestamp;
	private boolean success;
	private String details;
}
