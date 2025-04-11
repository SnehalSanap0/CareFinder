// src/main/java/com/caretaker/platform/dto/SignupRequest.java
package com.caretaker.platform.dto;

import lombok.Data;

@Data
public class SignupRequest {
    private String username;
    private String email;
    private String password;
    private boolean caretaker;

}

