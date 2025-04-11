// src/main/java/com/caretaker/platform/dto/LoginRequest.java
package com.caretaker.platform.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}