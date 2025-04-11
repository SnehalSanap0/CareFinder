// src/main/java/com/caretaker/platform/exception/ApplicationAlreadyExistsException.java
package com.caretaker.platform.exception;

public class ApplicationAlreadyExistsException extends RuntimeException {

    public ApplicationAlreadyExistsException(String message) {
        super(message);
    }

    public ApplicationAlreadyExistsException(String message, Throwable cause) {
        super(message, cause);
    }
}