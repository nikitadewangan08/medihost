package com.app.exception_handler;

import java.time.LocalDateTime;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.app.custom_exception.NewAndOldPasswordSameException;
import com.app.custom_exception.OTPExpiredException;
import com.app.custom_exception.RecordNotFoundException;
import com.app.custom_exception.ResourceAlreadyExistsException;
import com.app.dto.APIResponseDTO;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

	@ExceptionHandler(ResourceAlreadyExistsException.class)
	public ResponseEntity<String> handleResourceAlreadyExistsException(ResourceAlreadyExistsException e,
			WebRequest request) {

		System.out.println("in handle ResourceAlreadyExistsException " + e);
		// 1 create payload containing exception details
		APIResponseDTO exceptionResponse = new APIResponseDTO(e.getMessage(), HttpStatus.BAD_REQUEST,
				LocalDateTime.now(), false, request.getDescription(false));
		// 2. return response entity
		return new ResponseEntity<>(exceptionResponse.getMessage(), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(RecordNotFoundException.class)
	public ResponseEntity<String> handleUserNotFoundException(RecordNotFoundException ex,
			WebRequest request) {

		System.out.println("in handle handleUserNotFoundException " + ex);
		APIResponseDTO exceptionResponse = new APIResponseDTO(ex.getMessage(), HttpStatus.BAD_REQUEST,
				LocalDateTime.now(), false, request.getDescription(false));
		// 2. return response entity
		return new ResponseEntity<>(exceptionResponse.getMessage(), HttpStatus.BAD_REQUEST);
	}
	@ExceptionHandler(NewAndOldPasswordSameException.class)
	public ResponseEntity<String> handleNewAndOldPasswordSameException(NewAndOldPasswordSameException ex,
			WebRequest request) {

		System.out.println("in handle handleNewAndOldPasswordSameException " + ex);
		APIResponseDTO exceptionResponse = new APIResponseDTO(ex.getMessage(), HttpStatus.BAD_REQUEST,
				LocalDateTime.now(), false, request.getDescription(false));
		// 2. return response entity
		return new ResponseEntity<>(exceptionResponse.getMessage(), HttpStatus.BAD_REQUEST);
	}

	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException e,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		APIResponseDTO exceptionResponse = new APIResponseDTO(e.getMessage(), HttpStatus.BAD_REQUEST,
				LocalDateTime.now(), false, request.getDescription(false));
		return new ResponseEntity<>(exceptionResponse.getMessage(), HttpStatus.BAD_REQUEST);

	}

	@ExceptionHandler(OTPExpiredException.class)
	public ResponseEntity<?> handleOTPExpiredException(RuntimeException e, WebRequest request) {
		System.out.println("in handle OTPExpiredException " + e);
		e.printStackTrace();
		APIResponseDTO exceptionResponse = new APIResponseDTO(e.getMessage(), HttpStatus.BAD_REQUEST,
				LocalDateTime.now(), false, request.getDescription(false));
		return new ResponseEntity<>(exceptionResponse.getMessage(), HttpStatus.BAD_REQUEST);
	}



	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<?> handleRuntimeException(RuntimeException e, WebRequest request) {
		System.out.println("in handle run time exc " + e);
		e.printStackTrace();
		APIResponseDTO exceptionResponse = new APIResponseDTO(e.getMessage(), HttpStatus.BAD_REQUEST,
				LocalDateTime.now(), false, request.getDescription(false));
		return new ResponseEntity<>(exceptionResponse.getMessage(), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<?> handleAllException(Exception e, WebRequest request) {
		System.out.println("in handle Exception "+e);
		e.printStackTrace();
		APIResponseDTO exceptionResponse = new APIResponseDTO(e.getMessage(),
				HttpStatus.INTERNAL_SERVER_ERROR, LocalDateTime.now(), false, request.getDescription(false));
		return new ResponseEntity<>(exceptionResponse.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
