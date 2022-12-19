package com.nashtech.rookies.exceptions.handlers;

import com.nashtech.rookies.dto.response.ErrorResponse;
import com.nashtech.rookies.exceptions.ExistsAssignmentException;
import com.nashtech.rookies.exceptions.InvalidDataInputException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionsHandler extends ResponseEntityExceptionHandler {

	@ExceptionHandler({ InvalidDataInputException.class })
	protected ResponseEntity<ErrorResponse> handleItemExistException(RuntimeException exception, WebRequest request) {
		ErrorResponse error = new ErrorResponse("03", exception.getMessage());
		return new ResponseEntity<ErrorResponse>(error, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler({ ExistsAssignmentException.class })
	protected ResponseEntity<ErrorResponse> handleExistsAssignmentException(RuntimeException exception,
			WebRequest request) {
		ErrorResponse error = new ErrorResponse("04", exception.getMessage());
		return new ResponseEntity<ErrorResponse>(error, HttpStatus.BAD_REQUEST);
	}

	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		Map<String, String> errors = new HashMap<>();
		ex.getBindingResult().getAllErrors().forEach((error) -> {
			String fieldName = ((FieldError) error).getField();
			String errorMessage = error.getDefaultMessage();
			errors.put(fieldName, errorMessage);
		});
		ErrorResponse error = new ErrorResponse("03", "Validation Error", errors);
		return new ResponseEntity<Object>(error, HttpStatus.BAD_REQUEST);
	}
}
