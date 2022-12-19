package com.nashtech.rookies.exceptions;

public class InvalidDataInputException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public InvalidDataInputException() {
		super();
	}

	public InvalidDataInputException(String message, Throwable cause) {
		super(message, cause);
	}

	public InvalidDataInputException(String message) {
		super(message);
	}

}