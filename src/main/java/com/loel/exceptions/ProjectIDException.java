package com.loel.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ProjectIDException extends RuntimeException {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

	public ProjectIDException(String message) {
		super(message);
	}
}
