// src/main/java/com/caretaker/platform/exception/UserAlreadyExistsException.java
package com.caretaker.platform.exception;

public class UserAlreadyExistsException extends Exception {
    public UserAlreadyExistsException(String message) {
        super(message);
    }
}