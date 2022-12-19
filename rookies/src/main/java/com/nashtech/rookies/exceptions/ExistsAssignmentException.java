package com.nashtech.rookies.exceptions;

public class ExistsAssignmentException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public ExistsAssignmentException() {
		super();
	}

	public ExistsAssignmentException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public ExistsAssignmentException(String message, Throwable cause) {
		super(message, cause);
	}

	public ExistsAssignmentException(String message) {
		super(message);
	}

	public ExistsAssignmentException(Throwable cause) {
		super(cause);
	}

}
