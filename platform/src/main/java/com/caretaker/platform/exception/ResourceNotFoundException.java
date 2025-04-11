// src/main/java/com/caretaker/platform/exception/ResourceNotFoundException.java
package com.caretaker.platform.exception;

public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}