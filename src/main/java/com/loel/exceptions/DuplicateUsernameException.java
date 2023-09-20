package com.loel.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class DuplicateUsernameException extends RuntimeException {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

	public DuplicateUsernameException(String message) {
		super(message);
	}
}
